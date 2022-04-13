import PropTypes from 'prop-types'
import { useContext } from 'react'
import clsx from 'clsx'
import { camelCase } from 'lodash'
import SiteContext from '../../../context/Site/SiteContext'
import Accordion, { AccordionItem, AccordionItemTrigger, AccordionItemBody } from '../../../components/Accordion'
import HelpTipBody from '../../../components/HelpTip/HelpTipBody'
import HelpTipButton from '../../../components/HelpTip/HelpTipButton'
import HtmlBuilder from '../../../components/HtmlBuilder'
import Replacement from '../../../components/HtmlBuilder/Replacement'
import { formatMoney } from '../../../helpers'
import { getIncomeTimeframe } from '../../incomeWithholding/Form/scenarios/helpers'

const Recommendations = ({ recommendationProps, defaultValue, lang, param }) => {
  const { overUnderAmt, sliderProps, jobs, shutDownSalary, shutDownWithholding, filingStatus } = recommendationProps
  const { site } = useContext(SiteContext)
  const sliderValue = defaultValue
  const checkSliderPosition = sliderValue === Math.abs(overUnderAmt)
  const isRefund = overUnderAmt < 0

  const underOverMessage = (job) => {
    let finalMessage = ''

    if (isRefund) {
      finalMessage = job.finalPaycheck < job.taxWHLastPayPeriod ? 'Over' : 'Under'
    }

    if (!isRefund) {
      finalMessage = job.finalPaycheck < job.taxWHLastPayPeriod ? 'OweOver' : 'OweUnder'
    }

    return finalMessage
  }

  const getToolTipContent = (job) => {
    let elements = null

    const isLine3 = job.finalPaycheck < job.standardWithholding
    const isLessThan = sliderValue < Math.abs(overUnderAmt)

    if (isLine3) {
      if (isLessThan) {
        elements = [
          {
            key: 'tt-1-1',
            type: 'Paragraph',
            className: 'my-3',
            text: 'results.p.scenarioLine3Less',
            dataTestID: 'resultsWithholdingToolTip',
          },
        ]
      } else {
        elements = [
          {
            key: 'tt-1-2',
            type: 'Paragraph',
            className: 'my-3',
            text: 'results.p.scenarioLine3More',
            dataTestID: 'resultsWithholdingToolTip',
          },
        ]
      }
    } else {
      if (isLessThan) {
        elements = [
          {
            key: 'tt-2-1',
            type: 'Paragraph',
            className: 'my-3',
            text: 'results.p.scenarioLine4Less',
            dataTestID: 'resultsWithholdingToolTip',
          },
          {
            key: 'tt-2-2',
            type: 'Paragraph',
            className: 'my-3',
            text: 'results.p.scenarioLine4Less2',
            dataTestID: 'resultsWithholdingToolTip',
            replacements: [
              {
                type: 'italic',
                key: ':evenThough',
                text: 'results.p.scenarioLine4Less2Italic'
              }
            ]
          },
        ]
      } else {
        elements = [
          {
            key: 'tt-3-1',
            type: 'Paragraph',
            className: 'my-3',
            text: 'results.p.scenarioLine4More',
            dataTestID: 'resultsWithholdingToolTip',
          },
        ]
      }
    }

    return elements
  }

  const salaryIntro = (job, index, length) => [
    {
      key: 'salaryIntroSalaryShutdown',
      type: 'Paragraph',
      className: shutDownSalary < 0 ? 'mb-4 fade-in' : 'hidden',
      text: 'results.p.salaryIntroSalaryShutdown',
      dataTestID: 'salaryIntroSalaryShutdown',
      replacements: [
        {
          type: 'link',
          key: ':estimatedTaxes',
          href: 'https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes',
          text: 'results.a.salaryIntroSalaryShutdown',
          external: true,
          dataTestID: 'estimatedTaxesTT1Link',
        }
      ]
    },
    {
      key: 'salaryIntroHeading',
      type: 'Heading',
      level: '3',
      className: 'font-bold text-lg fade-in',
      text: length === 1 ? 'results.h2.salaryIntroHeading' : `results.h2.salaryIntroHeading${index + 1}`,
      dataTestID: `salaryIntroHeading${index}`,
      replacements: [
        {
          type: 'simpleText',
          key: ':amount',
          text: formatMoney(job.totalWages)
        }
      ]
    },
    {
      key: 'salaryIntroParagraph1',
      type: 'Paragraph',
      text: getIncomeTimeframe(site.forms.incomeWithholding.values, index, param) === 'future' ? 'results.p.salaryIntroParagraph1Future' : `results.p.salaryIntroParagraph1${underOverMessage(job)}`,
      className: 'my-4 fade-in',
      dataTestID: `salaryIntroParagraph1${index}`,
      replacements: [
        {
          type: 'simpleText',
          key: ':amount1',
          text: formatMoney(job.finalPaycheck)
        },
        {
          type: 'simpleText',
          key: ':amount2',
          text: sliderValue < Math.abs(overUnderAmt) && isRefund ? formatMoney(Math.abs(job.diff)) : formatMoney(Math.abs(job.diff))
        }
      ]
    },
    {
      key: 'salaryIntroParagraph2',
      type: 'Paragraph',
      text: 'results.p.salaryIntroParagraph2',
      className: 'my-4 fade-in',
      dataTestID: `salaryIntroParagraph2${index}`,
      replacements: [
        {
          type: 'bold',
          key: ':amount1',
          text: formatMoney(job.standardWithholding),
          dataTestID: 'standardWithholdingAmount'
        },
        {
          type: 'simpleText',
          key: ':amount2',
          text: formatMoney(sliderValue)
        }
      ]
    },
  ]

  const salaryAccordion = (job, index) => [
    {
      key: 'salaryAccordionParagraph1',
      type: 'Paragraph',
      text: 'results.p.salaryAccordionParagraph1',
      className: 'my-4 fade-in',
      dataTestID: `salaryAccordionParagraph1-${index}`,
    },
    {
      key: 'salaryAccordionParagraph2',
      type: 'Paragraph',
      text: 'results.p.salaryAccordionParagraph2',
      className: 'my-4 fade-in',
      dataTestID: `salaryAccordionParagraph2-${index}`,
    },
    {
      key: 'salaryAccordionParagraph3',
      type: 'Paragraph',
      text: 'results.p.salaryAccordionParagraph3',
      className: 'my-4 fade-in',
      dataTestID: `salaryAccordionParagraph3-${index}`,
      replacements: [
        {
          type: 'bold',
          key: ':step',
          text: 'results.p.salaryAccordionParagraph1Step'
        }
      ]
    },
    {
      key: 'salaryAccordionParagraph4',
      type: 'Paragraph',
      text: 'results.p.salaryAccordionParagraph4',
      className: 'my-4 fade-in',
      dataTestID: `salaryAccordionParagraph4-${index}`,
      replacements: [
        {
          type: 'bold',
          key: ':step',
          text: 'results.p.salaryAccordionParagraph2Step'
        },
        {
          type: 'bold',
          key: ':filingStatus',
          text: `results.p.${camelCase(filingStatus)}`
        }
      ]
    },
  ]

  const pensionIntro = (job, index, length) => [
    {
      key: 'pensionIntroHeading',
      type: 'Heading',
      level: '3',
      className: 'font-bold text-lg fade-in',
      text: length === 1 ? 'results.h2.pensionIntroHeading' : `results.h2.pensionIntroHeading${index + 1}`,
      dataTestID: `pensionIntroHeading${index}`,
      replacements: [
        {
          type: 'simpleText',
          key: ':amount',
          text: formatMoney(job.totalWages)
        }
      ]
    },
    {
      key: 'pensionIntroParagraph',
      type: 'Paragraph',
      text: getIncomeTimeframe(site.forms.incomeWithholding.values, index, param) === 'future' ? 'results.p.salaryIntroParagraph1Future' : `results.p.pensionIntroParagraph${underOverMessage(job)}`,
      className: 'my-4 fade-in',
      dataTestID: `pensionIntroParagraph${index}`,
      replacements: [
        {
          type: 'simpleText',
          key: ':amount1',
          text: formatMoney(job.finalPaycheck)
        },
        {
          type: 'simpleText',
          key: ':amount2',
          text: formatMoney(Math.abs(job.diff))
        }
      ]
    },
  ]

  const pensionAccordion = (job, index) => [
    {
      key: 'pensionAccordionParagraph1',
      type: 'Paragraph',
      text: 'results.p.pensionAccordionParagraph1',
      className: 'my-4 fade-in',
      dataTestID: `pensionAccordionParagraph1-${index}`,
      replacements: [
        {
          type: 'bold',
          key: ':step',
          text: 'results.p.pensionAccordionParagraph1Step'
        }
      ]
    },
    {
      key: 'pensionAccordionParagraph2',
      type: 'Paragraph',
      text: 'results.p.pensionAccordionParagraph2',
      className: 'my-4 fade-in',
      dataTestID: `pensionAccordionParagraph2-${index}`,
      replacements: [
        {
          type: 'bold',
          key: ':step',
          text: 'results.p.pensionAccordionParagraph2Step'
        }
      ]
    },
    {
      key: 'pensionAccordionList',
      type: 'List',
      className: 'ml-10 mb-4 list list-disc',
      dataTestID: 'pensionAccordionList',
      list: [
        'results.li.pensionAccordionList1',
        'results.li.pensionAccordionList2',
        'results.li.pensionAccordionList3',
        'results.li.pensionAccordionList4',
        'results.li.pensionAccordionList5'
      ],
      replacements: [
        [],
        [
          {
            type: 'bold',
            key: ':filingStatus',
            text: `results.p.${camelCase(filingStatus)}`
          }
        ],
        [
          {
            type: 'bold',
            key: ':allowance',
            text: job.suggestedAllowances
          }
        ],
        [
          {
            type: 'bold',
            key: ':withholding',
            text: formatMoney(job.addtlWHDueFH),
            dataTestID: 'withholdingAmount'
          },
          {
            type: 'downloadPDF',
            key: ':link',
            text: 'results.p.pensionAccordionListDownloadLink',
            params: {
              type: 'fw4p',
              suggestedAllowances: job.suggestedAllowances,
              addtlWHDueFH: job.addtlWHDueFH,
              filingStatus
            }
          }
        ],
        []
      ]
    },
    {
      key: 'pensionAccordionParagraph3',
      type: 'Paragraph',
      text: 'results.p.pensionAccordionParagraph3',
      className: 'my-4 fade-in',
      dataTestID: `pensionAccordionParagraph3-${index}`,
      replacements: [
        {
          type: 'bold',
          key: ':step',
          text: 'results.p.pensionAccordionParagraph3Step'
        },
        {
          type: 'simpleText',
          key: ':amount2',
          text: formatMoney(job.diff)
        }
      ]
    },
  ]

  const salaryJob = (job, index, length) => (
    <>
      <HtmlBuilder elements={salaryIntro(job, index, length)} />
      <Accordion borderColor="400">
        <AccordionItem id={`recommendationAccordion${index}`} dataTestId={`recommendationAccordion${index}`}>
          <AccordionItemTrigger bgColor="#f3f3f3" buttonAriaLabel={`Recommendation Accordion ${index + 1}`}>
            {lang('results.h4.incomeAccordionTitle')}
          </AccordionItemTrigger>
          <AccordionItemBody padding="small">
            <HtmlBuilder elements={salaryAccordion(job, index)} />

            <p className="inline"><Replacement
              text={lang(job.addtlWHDueFH > 0 ? 'results.p.salaryAccordionParagraph5Line4' : 'results.p.salaryAccordionParagraph5Line3')}
              replace={[
                {
                  type: 'bold',
                  key: ':step',
                  text: 'results.p.salaryAccordionParagraph3Step'
                },
                {
                  type: 'bold',
                  key: ':amount1',
                  text: formatMoney(job.addtlWHDueFH > 0 ? job.addtlWHDueFH : job.finalAnnualAmtFH),
                  dataTestID: 'amount1SalaryParagraph5'
                },
                {
                  type: 'downloadPDF',
                  key: ':link',
                  text: 'results.p.salaryAccordionParagraph5Link',
                  params: {
                    type: 'fw4',
                    addtlWHDueFH: job.addtlWHDueFH,
                    filingStatus,
                    finalAnnualAmtFH: job.finalAnnualAmtFH
                  }
                },
              ]}
            /></p>
            <HelpTipButton
              page="results"
              expanded={site.forms.results.helpTips.results.open}
              dataTestID="resultsWithholding-helpTip-button"
              name="results"
              aria-label="Withholding - Help Tip"
            />

            <HelpTipBody
              id="results-helpTip"
              tabIndex="0"
              widthClass="w-full"
              expanded={site.forms.results.helpTips.results.open}
              elements={[...getToolTipContent(job)]}
              testID="results-helpTip-body"
            />

            <HtmlBuilder elements={[
              {
                key: 'salaryAccordionParagraph6',
                type: 'Paragraph',
                text: 'results.p.salaryAccordionParagraph6',
                className: 'my-4 fade-in',
                dataTestID: `salaryAccordionParagraph6-${index}`,
                replacements: [
                  {
                    type: 'bold',
                    key: ':step',
                    text: 'results.p.salaryAccordionParagraph4Step'
                  }
                ]
              }]}
            />
          </AccordionItemBody>
        </AccordionItem>
      </Accordion>
      <hr className={clsx('border-gray-400 my-4', jobs.length === (index + 1) && 'hidden')} />
    </>
  )

  const pensionJob = (job, index) => (
    <>
      <HtmlBuilder elements={pensionIntro(job, index)} />
      <Accordion borderColor="400">
        <AccordionItem id={`pensionIncome${index + 1}`}>
          <AccordionItemTrigger level="4" bgColor="#f3f3f3">
            {lang('results.h4.incomeAccordionTitle')}
          </AccordionItemTrigger>
          <AccordionItemBody padding="small">
            <HtmlBuilder elements={pensionAccordion(job, index)} />
          </AccordionItemBody>
        </AccordionItem>
      </Accordion>
      <hr className={clsx('border-gray-400 my-4', jobs.length === (index + 1) && 'hidden')} />
    </>
  )

  const shutDownWithholdingIntro = [
    {
      key: 'shutDownWithholdingIntroParagraph',
      type: 'Paragraph',
      text: 'results.p.shutDownWithholdingIntroParagraph',
      className: 'mb-4 fade-in',
      dataTestID: 'shutDownWithholdingIntroParagraph',
    },
  ]

  const underShutDownWithholdingIntro = [
    {
      key: 'underShutDownWithholdingIntro',
      type: 'Paragraph',
      text: 'results.p.underShutDownWithholdingIntro',
      className: 'mb-4 fade-in',
      dataTestID: 'underShutDownWithholdingIntro',
    },
  ]

  return (
    <div className="border border-blue-500 w-full md:w-2/3 mx-auto mt-4" id="recommendationsBox">
      <div className="bg-blue-300 px-4 py-3 text-lg font-bold">
        <h3>{lang('results.h3.rmdMainHeading', { ':amount': formatMoney(sliderValue) })}</h3>
      </div>
      <div className="p-5 job-container">
        {shutDownWithholding > sliderValue && <HtmlBuilder elements={underShutDownWithholdingIntro} />}
        {shutDownWithholding === sliderValue && shutDownWithholding !== 0 && <HtmlBuilder elements={shutDownWithholdingIntro} />}
        {shutDownWithholding <= sliderValue && checkSliderPosition && <p>{lang('results.p.rmdP1')}</p>}
        {shutDownWithholding <= sliderValue && !checkSliderPosition
          && (
            <>
              {jobs.map((job, i) => (
                <div className="income-container" id={`job-${job.incomeType}-${i}`}>
                  {['salary', 'hourly'].includes(job.incomeType) && salaryJob(job, i, jobs.length)}
                  {['pension'].includes(job.incomeType) && pensionJob(job, i)}
                </div>
              ))}
            </>
          )}
      </div>
    </div>
  )
}

Recommendations.propTypes = {
  defaultValue: PropTypes.number,
  recommendationProps: PropTypes.any,
}

export default Recommendations
