import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import SiteContext from '../../../context/Site/SiteContext'
import routes from '../../../templates/helpers/routes'

const StartOver = () => {
  const { site, siteDispatch, lang, langCode } = useContext(SiteContext)
  const router = useRouter()

  const resetForm = () => {
    const aboutYouHelpTips = { ...site.forms.aboutYou.helpTips }
    const incomeWithholdingHelpTips = { ...site.forms.incomeWithholding.helpTips }
    const adjustmentsHelpTips = { ...site.forms.adjustments.helpTips }
    const deductionsHelpTips = { ...site.forms.deductions.helpTips }
    const taxCreditsHelpTips = { ...site.forms.taxCredits.helpTips }

    Object.keys(aboutYouHelpTips).forEach((field) => {
      aboutYouHelpTips[field].open = false
    })

    Object.keys(incomeWithholdingHelpTips).forEach((field) => {
      incomeWithholdingHelpTips[field].open = false
    })

    Object.keys(adjustmentsHelpTips).forEach((field) => {
      adjustmentsHelpTips[field].open = false
    })

    Object.keys(deductionsHelpTips).forEach((field) => {
      deductionsHelpTips[field].open = false
    })

    Object.keys(taxCreditsHelpTips).forEach((field) => {
      taxCreditsHelpTips[field].open = false
    })

    const newForms = {
      ...site.forms,
      aboutYou: {
        ...site.forms.aboutYou,
        completed: false,
        values: {
          filingStatus: '',
          jobOrPension: '',
          demographics: [],
        },
      },
      incomeWithholding: {
        ...site.forms.incomeWithholding,
        completed: false,
        accordionOpenArr: [
          true
        ],
        values: {
          numOfJobs: 1,
          jobs: [
            {
              incomeType: '',
              timePeriodOfJob: '',
              dateRange: {
                startDate: '',
                endDate: ''
              },
              payFrequency: '',
              dateLastPayPeriod: '',
              wagesPerPayPeriod: '',
              wagesYTD: '',
              isIncomeAmountCorrect: '',
              correctedWages: '',
              taxesPerPayPeriod: '',
              taxesYTD: '',
              hourlyWage: '',
              hours: '',
              payStatementOptions: '',
              ssiAllYear: '',
              ssiMonthlyAmount: '',
              ssiBenefitsYTD: '',
              pensionEachPayment: '',
              contributeToCafeteriaPlan: '',
              cafeteriaPlanPayPeriodAmount: '',
              cafeteriaPlanYTDAmount: '',
              annualSalary: '',
              hourlyPayStatements: [
                ''
              ],
              contributionsAndBonuses: {
                retirement: {
                  checked: false,
                  info: [
                    {
                      amount: '',
                      amountYTD: ''
                    }
                  ]
                },
                cafeteriaPlan: {
                  checked: false,
                  info: [
                    {
                      amount: '',
                      amountYTD: ''
                    }
                  ]
                },
                bonusFuture: {
                  checked: false,
                  info: [
                    {
                      amount: '',
                      employerWillWithhold: []
                    }
                  ]
                },
                bonusPast: {
                  checked: false,
                  info: [
                    {
                      amount: ''
                    }
                  ]
                }
              },
              noContributions: []
            }
          ],
          otherIncome: {
            scholarship: {
              checked: false,
              info: [
                {
                  amount: '',
                  taxes: ''
                }
              ]
            },
            unemployment: {
              checked: false,
              info: [
                {
                  amount: '',
                  taxes: ''
                }
              ]
            },
            selfEmployment: {
              checked: false,
              info: [
                {
                  amount: '',
                  taxes: ''
                }
              ]
            },
            investments: {
              checked: false,
              info: [
                {
                  amount: '',
                  taxes: ''
                }
              ]
            },
            otherTaxableIncome: {
              checked: false,
              info: [
                {
                  amount: '',
                  taxes: ''
                }
              ]
            },
            otherTaxes: {
              checked: false,
              info: [
                {
                  amount: '',
                  taxes: ''
                }
              ]
            }
          },
          noOtherIncome: []
        },
      },
      adjustments: {
        ...site.forms.adjustments,
        completed: false,
        completed2: false,
        rates: [],
        values: {
          adjustments: {
            seHealthInsurance: {
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            sepSimple: {
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            seHealthInsuranceSpouse: {
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            sepSimpleSpouse: {
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            studentLoan: {
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            educator: {
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            ira: {
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            hsa: {
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            moving: {
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            alimony: {
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            earlyWithdrawal: {
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            business: {
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            }
          },
          adjustmentsTotal: 0
        },
      },
      deductions: {
        ...site.forms.deductions,
        completed: false,
        completed2: false,
        rates: [],
        values: {
          deductions: '',
          deductionPayments: {
            medical: {
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            paid: {
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            qualified: {
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            charity: {
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            casualty: {
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            other: {
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            }
          },
          deductionPaymentsDisabled: {
            medical: {
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            paid: {
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            qualified: {
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            charity: {
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            casualty: {
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            other: {
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            }
          },
          itemizedCalculations: [],
          itemizedCalculationsDisabled: [],
          deductionsTotal: 0
        },
      },
      taxCredits: {
        ...site.forms.taxCredits,
        completed: false,
        accordionOpenArr: [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        ],
        values: {
          childrenAges: [''],
          numOfChildDependentCareQC: 0,
          childDependentCareAmount: '',
          numOfEitcQC: 0,
          adoptionCreditAmount: '',
          foreignTaxCredit: '',
          educationCredit: '',
          retirementSavingsCredit: '',
          homeOwnerTaxCredit: '',
          homeOwnerMortgageTaxCredit: '',
          elderlyTaxCredit: '',
          businessCredit: '',
          alternateMinimumCredit: '',
          energyMotorVehicleTaxCredit: '',
          energyRefuelingTaxCredit: '',
          energyPlugInTaxCredit: ''
        },
      },
      results: {
        ...site.forms.results,
        completed: false,
      }
    }

    siteDispatch({
      type: 'UPDATE_FORMS',
      payload: newForms,
    })

    router.push(routes(langCode, 'twe').aboutYou, undefined, { shallow: true })
  }

  return (
    <button
      id="startOverBtn"
      className="text-blue-500 underline mt-3 startOverBtn"
      type="button"
      data-testid="startOverLink"
      onClick={() => {
        resetForm()
      }}
    >
      {lang('results.span.startOver')}
    </button>
  )
}

export default StartOver
