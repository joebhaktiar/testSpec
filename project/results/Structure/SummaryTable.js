import { useContext } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import moment from 'moment'
import 'moment/locale/es'
import Accordion, { AccordionItem, AccordionItemTrigger, AccordionItemBody } from '../../../components/Accordion'
import { formatMoney } from '../../../helpers'
import { getToday, cutoffDateStart } from '../../../helpers/dateHelper'
import SiteContext from '../../../context/Site/SiteContext'
import routes from '../../../templates/helpers/routes'
import Button from '../../../components/Button'
import Heading from '../../../components/Heading'

const SummaryTable = ({ taxpayer, param }) => {
  const router = useRouter()
  const { site, lang, langCode, width, siteDispatch } = useContext(SiteContext)
  const { accordionOpenArr } = site.forms.results

  const setAccordionOpenArr = (newAccordionOpenArr) => siteDispatch({ type: 'UPDATE_ACCORDION_OPEN_RESULTS', payload: newAccordionOpenArr })

  const { filingStatus, demographics } = site.forms.aboutYou.values
  const { otherIncome } = site.forms.incomeWithholding.values
  const { adjustments } = site.forms.adjustments.values
  const { deductionPayments, deductionsTotal, itemizedCalculations } = site.forms.deductions.values
  const { childrenAges, numOfEitcQC, numOfStudents, numOfChildDependentCareQC, childDependentCareAmount } = site.forms.taxCredits.values
  const taxAfterCredits = site.forms.taxCredits.values
  const reducer = (sum, item) => sum + parseInt(item.amount)

  const currIncomeJobs = taxpayer.totalIncome.currentIncomes.filter((income, index) => ['salary', 'hourly'].includes(income.incomeType))
  const pastIncomeJobs = taxpayer.totalIncome.pastIncomes.filter((income, index) => ['salary', 'hourly'].includes(income.incomeType))
  const currIncomePensions = taxpayer.totalIncome.currentIncomes.filter((income, index) => ['pension'].includes(income.incomeType))
  const pastIncomePensions = taxpayer.totalIncome.pastIncomes.filter((income, index) => ['pension'].includes(income.incomeType))
  const { ssiIncomes } = taxpayer.totalIncome
  const otherIncomes = []
  Object.keys(taxpayer.totalIncome.otherIncome).forEach((item) => {
    if (taxpayer.totalIncome.otherIncome[item].checked) {
      otherIncomes.push({ type: item, amount: taxpayer.totalIncome.otherIncome[item].info.reduce(reducer, 0) })
    }
  })

  const getMainArray = (taxpayer, param) => {
    const getAboutYouSectionBody = () => {
      const leftBodyList = []
      const rightBodyList = []
      const listItems = []

      listItems.push({ title: lang('results.p.filingStatus'), value: lang(`global.label.${filingStatus}`), dataTestId: 'aboutYouFilingStatus' }, { title: lang('results.p.claimedAsDependent'), value: demographics.includes('claimedAsDependent') ? lang('global.label.yes') : lang('global.label.no'), dataTestId: 'aboutYouClaimedAsDependent' })

      const newDemographics = [...demographics].filter((item) => item !== 'claimedAsDependent' && item !== '')

      newDemographics.forEach((item) => {
        listItems.push({ title: lang(`results.label.${item}`, { ':year': param.current_year }), value: lang('global.label.yes'), dataTestId: `aboutYou${item}`, })
      })

      listItems.forEach((item, index) => {
        index % 2 === 0
          ? leftBodyList.push(item)
          : rightBodyList.push(item)
      })

      return ([
        {
          bodyType: 'list',
          list: [...leftBodyList]
        },
        {
          bodyType: 'list',
          list: [...rightBodyList]
        }
      ])
    }

    const getIncomeWithholdingBody = () => {
      const leftBodyList = [
        { title: lang('results.p.totalPreTax'), value: formatMoney(taxpayer.agi.finalTotalIncome), dataTestId: 'incomeWithholdingTotalPreTax' },
        { title: lang('results.p.netIncome'), value: formatMoney(taxpayer.agi.finalTotalIncome - taxpayer.agi.finalTotalRetCafe), dataTestId: 'incomeWithholdingNetIncome' },
      ]
      const rightBodyList = [
        { title: lang('results.p.totalFedIncome'), value: formatMoney(taxpayer.totalWHTaxesYTDFuture), dataTestId: 'incomeWithholdingTotalFedIncome' },
        { title: lang('results.p.projectedWithheld'), value: formatMoney(taxpayer.projectWithholding.total), dataTestId: 'incomeWithholdingProjectedWithheld' },
      ]

      if (taxpayer.agi.finalTotalRetCafe > 0) {
        leftBodyList.splice(1, 0, { title: lang('results.p.totalRetCafe'), value: formatMoney(taxpayer.agi.finalTotalRetCafe), dataTestId: 'incomeWithholdingTotalRetCafe' })
      }

      return ([
        {
          bodyType: 'list',
          list: [...leftBodyList]
        },
        {
          bodyType: 'list',
          list: [...rightBodyList]
        }
      ])
    }

    const getAdjustmentsSectionBody = () => {
      const leftBodyList = []
      const rightBodyList = []
      const listItems = []

      const checkedAdjustments = Object.keys(adjustments).filter((item) => adjustments[item].checked)

      checkedAdjustments.forEach((item) => {
        if (item === 'studentLoan') {
          if (adjustments[item].info.reduce(reducer, 0) > taxpayer.studentLoanPhaseOutDed) {
            listItems.push({ title: lang(`results.p.${item}Entered`), value: formatMoney(adjustments[item].info.reduce(reducer, 0)), dataTestId: `adjustments${item}Entered` })
            listItems.push({ title: lang(`results.p.${item}Allowed`), value: formatMoney(taxpayer.studentLoanPhaseOutDed), dataTestId: `adjustments${item}Allowed` })
          } else {
            listItems.push({ title: lang(`results.p.${item}`), value: formatMoney(adjustments[item].info.reduce(reducer, 0)), dataTestId: `adjustments${item}` })
          }
        } else if (item === 'educator') {
          const eduLimit = filingStatus === 'married' ? param.EDUCATOR_MFJ : param.EDUCATOR_NON_MFJ
          if (adjustments[item].info.reduce(reducer, 0) > eduLimit) {
            listItems.push({ title: lang(`results.p.${item}Entered`), value: formatMoney(adjustments[item].info.reduce(reducer, 0)), dataTestId: `adjustments${item}Entered` })
            listItems.push({ title: lang(`results.p.${item}Allowed`), value: formatMoney(eduLimit), dataTestId: `adjustments${item}Allowed` })
          } else {
            listItems.push({ title: lang(`results.p.${item}`), value: formatMoney(adjustments[item].info.reduce(reducer, 0)), dataTestId: `adjustments${item}` })
          }
        } else if (['seHealthInsurance', 'sepSimple'].includes(item)) {
          if (otherIncome.selfEmployment.checked) {
            listItems.push({ title: lang(`results.p.${item}`), value: formatMoney(adjustments[item].info.reduce(reducer, 0)), dataTestId: `adjustments${item}` })
          }
        } else if (['seHealthInsuranceSpouse', 'sepSimpleSpouse'].includes(item)) {
          if (otherIncome.selfEmployment.checked && filingStatus === 'married') {
            listItems.push({ title: lang(`results.p.${item}`), value: formatMoney(adjustments[item].info.reduce(reducer, 0)), dataTestId: `adjustments${item}` })
          }
        } else {
          listItems.push({ title: lang(`results.p.${item}`), value: formatMoney(adjustments[item].info.reduce(reducer, 0)), dataTestId: `adjustments${item}` })
        }
      })

      taxpayer.totalAdjustments + taxpayer.studentLoanPhaseOutDed > 0 && listItems.push({ title: lang('results.p.adjustmentsTotal'), value: formatMoney(taxpayer.totalAdjustments + taxpayer.studentLoanPhaseOutDed), dataTestId: 'adjustmentsTotal' })

      taxpayer.selfEmployTax > 0 && listItems.push({ title: lang('results.p.halfSelfEmployment'), value: formatMoney(taxpayer.selfEmployTax / 2), dataTestId: 'adjustmentsHalfSelfEmployment' })

      listItems.forEach((item, index) => {
        index % 2 === 0
          ? leftBodyList.push(item)
          : rightBodyList.push(item)
      })

      return ([
        {
          bodyType: 'list',
          list: [...leftBodyList]
        },
        {
          bodyType: 'list',
          list: [...rightBodyList]
        }
      ])
    }

    const getDeductionsSectionBody = () => {
      const leftBodyList = []
      const rightBodyList = []
      const listItems = []
      let newDeductionsTotal = deductionsTotal

      const checkedDeductions = Object.keys(deductionPayments).filter((item) => deductionPayments[item].checked)

      listItems.push({ title: lang('results.p.standardDeduction'), value: formatMoney(taxpayer.standardDeduction), dataTestId: 'deductionsStandardDeduction' })

      checkedDeductions.forEach((item) => {
        if (item === 'medical') {
          newDeductionsTotal = newDeductionsTotal - deductionPayments[item].info.reduce(reducer, 0) + taxpayer.finalMedDeduction

          listItems.push({ title: lang(`results.p.${item}Entered`), value: formatMoney(deductionPayments[item].info.reduce(reducer, 0)), dataTestId: `deductions${item}Entered` })
          listItems.push({ title: lang(`results.p.${item}Allowed`), value: formatMoney(taxpayer.finalMedDeduction), dataTestId: `deductionPayments${item}Allowed` })
        } else if (item === 'paid') {
          const saltLimit = filingStatus === 'married-separate' ? param.SALT_tax_limit_mfs : param.SALT_tax_limit

          if (deductionPayments[item].info.reduce(reducer, 0) > saltLimit) {
            newDeductionsTotal = newDeductionsTotal - deductionPayments[item].info.reduce(reducer, 0) + saltLimit

            listItems.push({ title: lang(`results.p.${item}Entered`), value: formatMoney(deductionPayments[item].info.reduce(reducer, 0)), dataTestId: `deductions${item}Entered` })
            listItems.push({ title: lang(`results.p.${item}Allowed`), value: formatMoney(saltLimit), dataTestId: `deductionPayments${item}Allowed` })
          } else {
            listItems.push({ title: lang(`results.p.${item}`), value: formatMoney(deductionPayments[item].info.reduce(reducer, 0)), dataTestId: `deductions${item}` })
          }
        } else {
          listItems.push({ title: lang(`results.p.${item}`), value: formatMoney(deductionPayments[item].info.reduce(reducer, 0)), dataTestId: `deductions${item}` })
        }
      })

      if (checkedDeductions.length > 0) {
        listItems.splice(1, 0, { title: lang('results.p.deductionsTotal'), value: formatMoney(newDeductionsTotal), dataTestId: 'deductionsTotal' })
      }

      if (itemizedCalculations.includes('itemized')) {
        listItems.push({ title: lang('results.p.itemizedDeductions'), value: lang('global.label.yes'), dataTestId: 'deductionsItemizedDeductions' })
      }

      listItems.forEach((item, index) => {
        index % 2 === 0
          ? leftBodyList.push(item)
          : rightBodyList.push(item)
      })

      return ([
        {
          bodyType: 'list',
          list: [...leftBodyList]
        },
        {
          bodyType: 'list',
          list: [...rightBodyList]
        }
      ])
    }

    const getTaxBerforeCreditsBody = () => {
      const leftBodyList = []
      const rightBodyList = []
      const listItems = []

      listItems.push(
        { title: lang('results.p.taxableIncome'), value: formatMoney(taxpayer.taxableIncome), dataTestId: 'taxBeforeCreditsTaxableIncome' },
        { title: lang('results.p.incomeTaxCreds'), value: formatMoney(taxpayer.taxOnTaxableIncome.tableTax), dataTestId: 'taxBeforeCreditsIncomeTaxCreds' }
      )

      taxpayer.medTaxMod > 0 && listItems.push({ title: lang('results.p.medTaxMod'), value: formatMoney(taxpayer.medTaxMod), dataTestId: 'taxBeforeCreditsmedTaxMod' })

      if (otherIncome.selfEmployment.checked) {
        listItems.push({ title: lang('results.p.selfEmploymentTax'), value: formatMoney(taxpayer.selfEmployTax), dataTestId: 'getTaxBeforeCreditsSelfEmploymentTax' })
      }

      listItems.forEach((item, index) => {
        index % 2 === 0
          ? leftBodyList.push(item)
          : rightBodyList.push(item)
      })

      return ([
        {
          bodyType: 'list',
          list: [...leftBodyList]
        },
        {
          bodyType: 'list',
          list: [...rightBodyList]
        }
      ])
    }

    const getTaxCreditsBody = () => {
      const taxCreditFields = [
        'foreignTaxCredit',
        'homeOwnerTaxCredit',
        'elderlyTaxCredit',
        'alternativeMinimumCredit',
        'energyRefuelingTaxCredit',
        'adoptionCreditAmount',
        'retirementSavingsCredit',
        'homeOwnerMortgageTaxCredit',
        'businessCredit',
        'energyMotorVehicleTaxCredit',
        'energyPlugInTaxCredit'
      ]
      const leftBodyList = []
      const rightBodyList = []
      let numOfDepsUnder17 = 0
      let numOfDepsOver16 = 0

      const { ctcOtherDepTotalCredits, educationTotalCredits, eitcTotalCredit } = taxpayer.taxCredits

      const nonRefundableCreditsTotal = ctcOtherDepTotalCredits.totalNonrefundCredits
      const refundableCreditsTotal = ctcOtherDepTotalCredits.refundableAddtlChildTaxCredit
        + educationTotalCredits.refundableAOTC
        + eitcTotalCredit

      childrenAges.forEach((age) => {
        age !== '' && parseInt(age) <= 16 && numOfDepsUnder17++
        age !== '' && parseInt(age) >= 17 && numOfDepsOver16++
      })

      numOfDepsOver16 > 0 && leftBodyList.push({ title: lang('results.p.numOfDepsOver16'), value: numOfDepsOver16, dataTestId: 'taxCreditsNumOfDepsOver16' })
      numOfDepsUnder17 > 0 && rightBodyList.push({ title: lang('results.p.numOfDepsUnder17'), value: numOfDepsUnder17, dataTestId: 'taxCreditsNumOfDepsUnder17' })

      if (numOfDepsOver16 > 0 || numOfDepsUnder17 > 0) {
        leftBodyList.push(
          {
            title: lang('results.p.nonRefundCreditCTC'),
            value: formatMoney(ctcOtherDepTotalCredits.nonRefundCreditCTC),
            dataTestId: 'taxCreditsTaxCreditTotal'
          }
        ) && rightBodyList.push(
          {
            title: lang('results.p.refundableAddtlChildTaxCredit'),
            value: formatMoney(ctcOtherDepTotalCredits.refundableAddtlChildTaxCredit),
            dataTestId: 'taxCreditsTaxCreditTotal'
          }
        )
      }

      numOfEitcQC > 0 && rightBodyList.push({ title: lang('results.p.numOfEitcQC'), value: numOfEitcQC, dataTestId: 'taxCreditsNumOfEitqcQC' })

      numOfChildDependentCareQC > 0 && leftBodyList.push({ title: lang('results.p.numOfChildDependentCareQC'), value: numOfChildDependentCareQC, dataTestId: 'taxCreditsNumOfChildDependentCareQC' })

      eitcTotalCredit > 0 && rightBodyList.push({ title: lang('results.p.eitcTotal'), value: formatMoney(eitcTotalCredit), dataTestId: 'eitcTotal' })

      childDependentCareAmount > 0 && leftBodyList.push({ title: lang('results.p.childDependentCareAmount'), value: formatMoney(taxpayer.depCareCredit), dataTestId: 'taxCreditsNumOfStudents' })

      numOfStudents > 0 && rightBodyList.push({ title: lang('results.p.numOfStudents'), value: numOfStudents, dataTestId: 'taxCreditsNumOfStudents' })

      numOfStudents > 0 && leftBodyList.push({ title: lang('results.p.nonRefundableAOTC'), value: formatMoney(educationTotalCredits.nonRefundableAOTC), dataTestId: 'taxCreditsTaxCreditTotal' })
      numOfStudents > 0 && rightBodyList.push({ title: lang('results.p.refundableAOTC'), value: formatMoney(educationTotalCredits.refundableAOTC), dataTestId: 'taxCreditsTaxCreditTotal' })

      taxCreditFields.forEach((item) => site.forms.taxCredits.values[item] > 0
        && leftBodyList.push({ title: lang(`results.p.${item}`), value: formatMoney(site.forms.taxCredits.values[item]), dataTestId: `taxCredits${item}` }))

      leftBodyList.length > 0 && leftBodyList.push({ title: lang('results.p.taxCreditsNonRefundableTotal'), value: formatMoney(nonRefundableCreditsTotal), dataTestId: 'taxCreditsTaxCreditTotal' })
      rightBodyList.length > 0 && rightBodyList.push({ title: lang('results.p.taxCreditsRefundableTotal'), value: formatMoney(refundableCreditsTotal), dataTestId: 'taxCreditsTaxCreditTotal' })

      return ({
        body: [
          {
            bodyType: 'list',
            list: [...leftBodyList]
          },
          {
            bodyType: 'list',
            list: [...rightBodyList]
          }
        ],
        subtitle: leftBodyList.length > 0 || rightBodyList.length > 0 ? '' : lang('results.p.taxCreditsAccordionEmpty')
      })
    }

    const getTaxAfterCreditsBody = (taxpayer, param) => {
      const getRecW4Value = (taxpayer, param) => {
        let value = null,
          sliderValue = site.slider.value

        sliderValue = taxpayer.finalW4Recom.shutDownWithholding > site.slider.value ? taxpayer.finalW4Recom.shutDownWithholding : site.slider.value

        if (getToday(param).isBefore(cutoffDateStart(param))) {
          value = (taxpayer.totalWHTaxesYTDFuture > taxpayer.totalTaxLiability.finalTaxObligation) && taxpayer.incomeFutureFlag
            ? taxpayer.totalWHTaxesYTDFuture + taxpayer.totalTaxLiability.finalTaxObligation + sliderValue
            : taxpayer.totalTaxLiability.finalTaxObligation + sliderValue
        }

        return value
      }

      const leftBodyList = [
        { title: lang('results.p.totalTaxLiabilityAfterCreds'), value: taxpayer.totalTaxLiability.finalTaxObligation < 0 ? formatMoney(0) : formatMoney(taxpayer.totalTaxLiability.finalTaxObligation), dataTestId: 'taxAfterCreditsTotalLiabilityAfterCreds' },
        { title: lang('results.p.totalTaxPaidThisYearIfNothing'), value: formatMoney(taxpayer.projectWithholding.total), dataTestId: 'taxAfterCreditsTotalTaxPaidThisYearIfNothing' }
      ]

      const rightBodyList = [
        { title: lang('results.p.totalTaxPaidSoFar'), value: formatMoney(taxpayer.totalWHTaxesYTDFuture), dataTestId: 'taxAfterCreditsTotalPaidSoFar' }
      ]

      if (getToday(param).isBefore(cutoffDateStart(param))) {
        rightBodyList.push({ title: lang('results.p.totalTaxPaidW4'), value: formatMoney(getRecW4Value(taxpayer, param)), dataTestId: 'taxAfterCreditsTotalTaxPaidW4' })
      }

      const getTaxAfterCreds = Object.keys(taxAfterCredits).filter((item) => taxAfterCredits[item].checked)

      getTaxAfterCreds.forEach((item, index) => {
        index % 2 === 0 ? leftBodyList.push({ title: lang(`results.p.${item}`), value: formatMoney(taxAfterCredits[item].reduce(reducer, 0)), dataTestId: `taxAfterCredits${item}` }) : rightBodyList.push({ title: lang(`results.p.${item}`), value: formatMoney(taxAfterCredits[item].reduce(reducer, 0)) })
      })

      return ([
        {
          bodyType: 'list',
          list: [...leftBodyList]
        },
        {
          bodyType: 'list',
          list: [...rightBodyList]
        }
      ])
    }

    const mainArray = [
      {
        id: 'aboutYou',
        section: lang('results.h2.sectionAboutYou'),
        route: 'aboutYou',
        body: getAboutYouSectionBody(),
        accordionTriggerAriaLabel: 'About You Accordion'
      },
      {
        id: 'incomeWithholding',
        section: lang('results.h2.sectionIncomeWithholding'),
        route: 'incomeWithholding',
        body: getIncomeWithholdingBody(),
        accordionTriggerAriaLabel: 'Income & Withholding Accordion'
      },
      {
        id: 'adjustments',
        label: 'Adjustments',
        section: lang('results.h2.sectionAdjustments'),
        route: 'adjustments',
        subtitle: Object.keys(adjustments).filter((item) => adjustments[item].checked).length > 0 ? lang('results.p.adjustmentAccordionEnteredSubtitle') : lang('results.p.adjustmentAccordionNotEnteredSubtitle'),
        body: getAdjustmentsSectionBody(),
        accordionTriggerAriaLabel: 'Adjustments Accordion'
      },
      {
        id: 'agi',
        section: lang('results.h2.sectionAGI'),
        route: null,
        subtitle: lang('results.p.agiAccordionSubtitle'),
        accordionTriggerAriaLabel: 'Adjusted Gross Income Accordion',
        body: [
          {
            bodyType: 'list',
            list: [{ title: lang('results.p.agi'), value: formatMoney(taxpayer.agi.agi), dataTestId: 'adjustedGrossIncome' }]
          },
          {
            bodyType: 'list',
            list: []
          }
        ]
      },
      {
        id: 'deductions',
        section: lang('results.h2.sectionDeductions'),
        route: 'deductions',
        subtitle: lang('results.p.deductionsAccordionSubtitle'),
        body: getDeductionsSectionBody(),
        accordionTriggerAriaLabel: 'Deductions Accordion'
      },
      {
        id: 'taxBeforeCredits',
        section: lang('results.h2.sectionTaxBeforeCredits'),
        route: null,
        body: getTaxBerforeCreditsBody(),
        accordionTriggerAriaLabel: 'Tax Before Credits Accordion'
      },
      {
        id: 'taxCredits',
        section: lang('results.h2.sectionTaxCredits'),
        route: 'taxCredits',
        subtitle: getTaxCreditsBody().subtitle,
        body: getTaxCreditsBody().body,
        accordionTriggerAriaLabel: 'Tax Credits Accordion'
      },
      {
        id: 'taxAfterCredits',
        section: lang('results.h2.sectionTaxAfterCredits'),
        route: null,
        body: getTaxAfterCreditsBody(taxpayer, param),
        accordionTriggerAriaLabel: 'Tax After Credits Accordion'
      },
    ]

    return mainArray
  }

  const getBody = (item, index) => {
    let body = null

    switch (item.bodyType) {
      case 'list':
        body = item.list.map((listItem, i) => (
          <div className={clsx('border-b border-gray-500 pt-2 pb-1 px-3', (index % 2 === 0 || width <= 769) && 'md:mr-4 mr-0')}>
            <span style={{ width: '70%' }} className="inline-block" data-testid={`${listItem.dataTestId}Label`}>{listItem.title}</span>
            <span style={{ width: '30%' }} className="inline-block font-bold text-right" data-testid={`${listItem.dataTestId}Value`}>{listItem.value}</span>
          </div>
        ))
        break
      default:
    }

    return <div className="w-full">{body}</div>
  }

  const getNestedAccordion = () => {
    const getIncomeSalaryHourlyBody = (income, numJob) => {
      const leftBodyList = [
        { title: lang('results.span.wagesSalaryTips'), value: formatMoney(income.wagesAndBonus), dataTestId: `incomeJobWagesTips${numJob}` },
        { title: lang('results.span.totalFedIncome'), value: income.futureDateFlag ? 0 : formatMoney(income.taxWithheldYTD), dataTestId: `incomeJobTotalFedIncome${numJob}` },
      ]

      const rightBodyList = [
        { title: lang('results.span.totalNonTaxable'), value: formatMoney(income.nonTaxPayrollTotal), dataTestId: `incomeJobTotalNonTaxable${numJob}` },
        { title: lang('results.span.projectedTotalTax'), value: income.totalProjectedTaxWH < 0 ? formatMoney(0) : formatMoney(income.totalProjectedTaxWH + income.bonusTaxWH), dataTestId: `incomeJobProjectedTotalTax${numJob}` },
      ]

      income.pastDateFlag && rightBodyList.shift()

      return ([
        {
          bodyType: 'list',
          list: [...leftBodyList]
        },
        {
          bodyType: 'list',
          list: [...rightBodyList]
        }
      ])
    }

    const getIncomePensionBody = (income, numPension) => {
      const leftBodyList = [
        { title: lang('results.span.annualPension'), value: formatMoney(income.totalWages), dataTestId: `incomePensionAnnual${numPension}` },
        { title: lang('results.span.pensionTotalFedIncome'), value: formatMoney(income.taxWithheldYTD), dataTestId: `incomePensionTotalFedIncome${numPension}` },
      ]

      const rightBodyList = [
        { title: lang('results.span.pensionProjectedTotalTax'), value: income.totalProjectedTaxWH < 0 ? formatMoney(0) : formatMoney(income.totalProjectedTaxWH), dataTestId: `incomePensionProjectedTotalTax${numPension}` },
      ]

      return ([
        {
          bodyType: 'list',
          list: [...leftBodyList]
        },
        {
          bodyType: 'list',
          list: [...rightBodyList]
        }
      ])
    }

    const getIncomeSsiBody = (income, numSsi) => {
      const leftBodyList = []
      const rightBodyList = []
      const listItems = [{ title: lang('results.span.ssiBenefits'), value: formatMoney(income.totalIncome), dataTestId: `incomeSsiBenefits${numSsi}` }]

      !income.pastFlag && !income.futureDateFlag && listItems.push({ title: lang('results.span.ssiWithheld'), value: formatMoney(income.taxWHLastPayPeriod), dataTestId: `incomeSsiWithheld${numSsi}` })
      !income.futureDateFlag && listItems.push({ title: lang('results.span.ssiWithheldDate'), value: formatMoney(income.taxWithheldYTD), dataTestId: `incomeSsiWithheldDate${numSsi}` })

      listItems.forEach((item, index) => {
        index % 2 === 0
          ? leftBodyList.push(item)
          : rightBodyList.push(item)
      })

      return ([
        {
          bodyType: 'list',
          list: [...leftBodyList]
        },
        {
          bodyType: 'list',
          list: [...rightBodyList]
        }
      ])
    }

    const getOtherIncomeBody = () => {
      const leftBodyList = []
      const rightBodyList = []
      const listItems = []

      otherIncomes.forEach((item) => {
        listItems.push({ title: lang(`results.span.${item.type}`), value: formatMoney(item.amount), dataTestId: `incomeOther${item.type}` })
      })

      // listItems.push({ title: lang('results.span.unemploymentFedIncomeTaxWh'), value: lang('placeholder'), dataTestId: 'incomeOtherUnemploymentFedIncomeTaxWh' }, { title: lang('results.span.selfEmploymentTaxPayments'), value: lang('placeholder'), dataTestId: 'incomeOtherSelfEmploymentTaxPayments' })

      listItems.forEach((item, index) => {
        index % 2 === 0
          ? leftBodyList.push(item)
          : rightBodyList.push(item)
      })

      return ([
        {
          bodyType: 'list',
          list: [...leftBodyList]
        },
        {
          bodyType: 'list',
          list: [...rightBodyList]
        }
      ])
    }

    const incomes = [...currIncomeJobs, ...pastIncomeJobs, ...currIncomePensions, ...pastIncomePensions, ...ssiIncomes]

    let numJob = 0
    let numPension = 0
    let numSsi = 0

    const accordions = incomes.map((income, index) => {
      switch (income.incomeType) {
        case 'salary':
        case 'hourly':
          numJob++
          return (
            <div className="p-3">
              <Accordion borderColor="400">
                <AccordionItem id="accordionItem" dataTestId={`jobNestedAccordion${numJob}`}>
                  <AccordionItemTrigger bgColor="#f3f3f3" accordionSmall
                    buttonAriaLabel={`Job ${numJob} Accordion`}>
                    {lang('results.h2.jobHeader', { ':number': lang(`global.span.number${numJob}`) })}
                  </AccordionItemTrigger>
                  <AccordionItemBody padding="small">
                    <div className="flex flex-col md:flex-row my-2">
                      {getIncomeSalaryHourlyBody(income, numJob).map((bItem, i) => getBody(bItem, i))}
                    </div>
                  </AccordionItemBody>
                </AccordionItem>
              </Accordion>
            </div>
          )
        case 'pension':
          numPension++
          return (
            <div className="p-3">
              <Accordion borderColor="400">
                <AccordionItem id="accordionItem" dataTestId={`pensionNestedAccordion${numPension}`}>
                  <AccordionItemTrigger bgColor="#f3f3f3" accordionSmall buttonAriaLabel={`Pension ${numPension} Accordion`}>
                    {lang('results.h2.pensionHeader', { ':number': lang(`global.span.number${numPension}`) })}
                  </AccordionItemTrigger>
                  <AccordionItemBody padding="small">
                    <div className="flex flex-col md:flex-row my-2">
                      {getIncomePensionBody(income, numPension).map((bItem, i) => getBody(bItem, i))}
                    </div>
                  </AccordionItemBody>
                </AccordionItem>
              </Accordion>
            </div>
          )
        case 'ssi':
          numSsi++
          return (
            <div className="p-3">
              <Accordion borderColor="400">
                <AccordionItem id="accordionItem" dataTestId={`ssiNestedAccordion${numSsi}`}>
                  <AccordionItemTrigger bgColor="#f3f3f3" accordionSmall buttonAriaLabel={`Social Security ${numSsi} Accordion`}>
                    {lang('results.h2.ssiHeader', { ':number': lang(`global.span.number${numSsi}`) })}
                  </AccordionItemTrigger>
                  <AccordionItemBody padding="small">
                    <div className="flex flex-col md:flex-row my-2">
                      {getIncomeSsiBody(income, numSsi).map((bItem, i) => getBody(bItem, i))}
                    </div>
                  </AccordionItemBody>
                </AccordionItem>
              </Accordion>
            </div>
          )
        default:
          null
      }
    })

    if (otherIncomes.length > 0) {
      accordions.push((
        <div className="p-3">
          <Accordion borderColor="400">
            <AccordionItem id="accordionItem" dataTestId="otherIncomeNestedAccordion">
              <AccordionItemTrigger bgColor="#f3f3f3" accordionSmall buttonAriaLabel="Other Incomes Accordion">
                {lang('results.h2.otherIncomeHeader')}
              </AccordionItemTrigger>
              <AccordionItemBody padding="small">
                <div className="flex flex-col md:flex-row my-2">
                  {getOtherIncomeBody().map((bItem, i) => getBody(bItem, i))}
                </div>
              </AccordionItemBody>
            </AccordionItem>
          </Accordion>
        </div>
      ))
    }

    return accordions
  }

  return (
    <>
      <div className="border border-gray-400 p-4">
        <Heading
          level="2"
          className="text-1.5xl font-bold mb-1"
          data-testid="yourInformationHeader"
        >
          {lang('results.h2.yourInfomration')}
        </Heading>
        <p>{lang('results.p.yourInfomrationSubtitle')}</p>
        <div className="text-right mt-2">
          <p
            className="uppercase text-xs"
          >
            {lang('results.p.yourInformtionPreparedDate', { ':date': `${moment(getToday(param)).locale(langCode).format('dddd')}, ${moment(getToday(param)).locale(langCode).format('MMMM D YYYY')}` })}
          </p>
        </div>
      </div>
      <Accordion multiItem>
        {getMainArray(taxpayer, param).map((item, index) => (
          <AccordionItem dataTestId={`${item.id}`} id={`${item.id}Accordion`} isOpen={accordionOpenArr[index]}>
            <AccordionItemTrigger
              accordionOpenArr={accordionOpenArr}
              setAccordionOpenArr={setAccordionOpenArr}
              bgColor="#e4f3fb"
              disabled
              title={item.section}
              accordionSmall
              className={clsx('p-2', !item.route && 'py-4')}
              buttonAriaLabel={item.accordionTriggerAriaLabel}
            >
              {item.route && (
                <Button
                  onClick={() => router.push(routes(langCode, 'twe')[item.route], undefined, { shallow: true })}
                  secondary
                  buttonSmall
                  className="editBtn ml-auto bg-blue-300 text-base"
                  widthClasses="w-auto"
                  dataTestId={`${item.id}EditButton`}
                  ariaLabel={`Edit ${item.section}`}
                >
                  {lang('global.button.edit')}
                </Button>
              )
              }
            </AccordionItemTrigger>
            <AccordionItemBody padding="none">
              {item.subtitle && <p className="m-3 italic" dataTestId={`${item.id}Subtitle`}>{item.subtitle}</p>}
              <div className="flex flex-col md:flex-row my-2" id={`${item.id}Information`}>
                {item.body.map((bItem, i) => getBody(bItem, i))}
              </div>
              {item.id === 'incomeWithholding' && getNestedAccordion()}
            </AccordionItemBody>
          </AccordionItem>
        )
        )}
      </Accordion>
    </>
  )
}

export default SummaryTable
