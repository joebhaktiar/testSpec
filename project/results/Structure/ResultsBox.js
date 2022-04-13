import { useContext } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Gauge from './Gauge'
import SiteContext from '../../../context/Site/SiteContext'
import HtmlBuilder from '../../../components/HtmlBuilder'
import { formatMoney } from '../../../helpers'
import { getIncomeTimeframe } from '../../incomeWithholding/Form/scenarios/helpers'
import { getToday, cutoffDateStart } from '../../../helpers/dateHelper'

const ResultsBox = ({ resultsBoxProps, lang, param, taxpayer }) => {
  const { site } = useContext(SiteContext)
  const {
    expectedTaxWithholding,
    anticipatedTaxObligation,
    estimatedOverPayment,
    ssiIncome,
    isRefund,
    refundableTaxCreditsTotal,
    taxBeforeRefundable
  } = resultsBoxProps

  const getGaugeClass = () => {
    let gaugeClass
    // const check = Math.abs(estimatedOverPayment)
    switch (true) {
      case (estimatedOverPayment <= -999):
        gaugeClass = 'owe'
        break
      case (estimatedOverPayment < 0 && estimatedOverPayment > -999):
        gaugeClass = 'oweLittle'
        break
      case (estimatedOverPayment === 0):
        gaugeClass = 'zero'
        break
      case (estimatedOverPayment > 0 && estimatedOverPayment < 999):
        gaugeClass = 'refundLittle'
        break
      case (estimatedOverPayment >= 999):
        gaugeClass = 'refund'
        break
      default:
        gaugeClass = 'zero'
    }

    return gaugeClass
  }

  const getIncomeTimeFrames = () => {
    const incomeTimeFrames = []

    site.forms.incomeWithholding.values.jobs.forEach((job, index) => {
      incomeTimeFrames.push(getIncomeTimeframe(site.forms.incomeWithholding.values, index, param))
    })

    return incomeTimeFrames
  }

  const getResultsBoxTitle = () => {
    let mainText = null
    let bold = null

    if (!getToday(param).isBefore(cutoffDateStart(param))) {
      mainText = 'results.h2.box1Header2DecMsg'
    } else if (taxpayer.finalW4Recom.currentIncomes.length <= 0) {
      mainText = 'results.h2.onlyPastIncomes'
    } else if (getIncomeTimeFrames().every((curValue) => curValue === 'future')) {
      mainText = 'results.h2.box1Header2Future'
    } else {
      mainText = 'results.h2.box1Header2'
    }

    if (estimatedOverPayment === 0) {
      bold = 'results.p.oweZero'
    } else if (isRefund) {
      bold = 'results.p.refundLikely'
    } else {
      bold = 'results.p.oweLikely'
    }

    return { mainText, bold }
  }

  return (
    <>
      <div className="resultsBox relative border border-gray-500 py-3 mt-8">
        <HtmlBuilder elements={
          [
            {
              key: 'yourResultsTitle',
              type: 'Heading',
              level: '3',
              text: lang('results.h2.box1Header1'),
              className: 'text-2xl font-bold text-center mt-8',
              dataTestID: 'yourResultsTitle',
            },
            {
              key: 'yourResultsSubtitle',
              type: 'Paragraph',
              className: 'mb-3 text-center',
              text: lang('results.p.basedOnInfoEntered'),
              dataTestID: 'yourResultsSubtitle',
            }
          ]
        }
        />

        <div className="flex flex-col lg:flex-row pb-4 mt-6">
          <div className="w-full lg:w-1/2 px-6 lg:pl-14">
            <div className="w-full">
              <HtmlBuilder elements={
                [
                  {
                    key: 'resultsAccuracyParagraph1',
                    type: 'Paragraph',
                    className: 'my-3 text-lg text-left',
                    text: getResultsBoxTitle().mainText,
                    dataTestID: 'resultsAccuracyParagraph1',
                    replacements: [
                      {
                        key: ':yourResults',
                        type: 'bold',
                        text: getResultsBoxTitle().bold,
                        dataTestID: 'yourResultsBold'
                      },
                    ]
                  }
                ]
              }
              />
              <div className="border-t border-b border-black">
                <div className="border-b border-gray-500 py-3 flex justify-between">
                  <p data-testid="expectedTaxLabel">{lang('results.span.exptectedTax')}*</p>
                  <p className="" data-testid="expectedTaxValue">{formatMoney(expectedTaxWithholding)}</p>
                </div>
                <div className="py-3 border-b border-gray-500 flex justify-between">
                  <p data-testid="anticipatedTaxLabel">{lang(refundableTaxCreditsTotal > 0 ? 'results.span.taxBeforeRefundableCreds' : 'results.span.anticipatedTax')}**</p>
                  <p className="float-right" data-testid="anticipatedTaxValue">{formatMoney(refundableTaxCreditsTotal > 0 ? taxBeforeRefundable : anticipatedTaxObligation)}</p>
                </div>
                {refundableTaxCreditsTotal > 0 && (
                  <div className="py-3">
                    <p data-testid="estimatedRefundCreditsLabel flex justify-between">{lang('results.span.totalRefundableCredits')}</p>
                    <p className="float-right" data-testid="estimatedRefundCreditsValue">{formatMoney(refundableTaxCreditsTotal)}</p>
                  </div>
                )}
              </div>
              <div className="py-3 font-bold  flex justify-between">
                <p data-testid="estimatedLabel">
                  {isRefund ? lang('results.span.estimatedOverPayment') : lang('results.span.estimatedUnderPayment')}</p>
                <p className={clsx(estimatedOverPayment < 0 && !isRefund ? 'text-red-500' : 'text-black-500', 'float-right')} data-testid="estimatedValue">
                  {formatMoney(!isRefund ? Math.abs(Math.round(expectedTaxWithholding) - Math.round(taxBeforeRefundable) + Math.round(refundableTaxCreditsTotal))
                    : Math.round(expectedTaxWithholding) - Math.round(taxBeforeRefundable) + Math.round(refundableTaxCreditsTotal))}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 mt-4 lg:mt-3 m-auto">
            <Gauge angle={5} angleClass={getGaugeClass()} />
          </div>
        </div>

        <div className="px-6 lg:px-10">
          <HtmlBuilder elements={
            [
              {
                key: 'resultsAccuracyParagraph',
                type: 'Paragraph',
                className: 'my-3 text-xs text-center',
                text: 'results.p.accuracyNote',
                dataTestID: 'resultsAccuracyParagraph',
                replacements: [
                  {
                    key: ':importantNote',
                    type: 'bold',
                    text: 'results.b.importantNote',
                    dataTestID: 'importantNoteBold'
                  },
                ]
              }
            ]
          }
          />
        </div>
      </div>
      <ul className="mt-2" id="asteriksNoteList">
        <li className="text-xs" data-testid="firstAsteriskLabel">{lang(getToday(param).isBefore(cutoffDateStart(param)) ? 'results.li.firstAsterisk' : 'results.li.firstAsteriskDecMsg')}</li>
        <li className="text-xs" data-testid="secondAsteriskLabel">{lang('results.li.secondAsterisk', { ':currentYear1': param.current_year, ':currentYear2': param.current_year, ':futureYear': param.current_year + 1 })}</li>
        {ssiIncome > 0 && <li className="text-xs" data-testid="ssiAsteriskLabel">{lang('results.li.ssiAsterisk')}</li>}
      </ul>

      <hr className="border-gray-500 mb-8 mt-4" />
    </>
  )
}

ResultsBox.propTypes = {
  resultsBoxProps: PropTypes.any,
  lang: PropTypes.func,
}

export default ResultsBox
