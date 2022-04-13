import { useState, useContext, useEffect } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { animateScroll } from 'react-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import SiteContext from '../../context/Site/SiteContext'
import { gaInit, gaPageView, gaEvent } from '../../helpers'
import { getToday, cutoffDateStart } from '../../helpers/dateHelper'
import routes from '../../templates/helpers/routes'
import Alert from '../../components/Alert'
import Button from '../../components/Button'
import HtmlBuilder from '../../components/HtmlBuilder'
import NavButtons from '../../components/NavButtons/NavButtons'
import Spinner from '../../components/Spinner'
import SummaryTable from './Structure/SummaryTable'
import ResultsBox from './Structure/ResultsBox'
import Slider from './Structure/Slider'
import Recommendations from './Structure/Recommendations'
import StartOver from './helpers/StartOver'
import Taxpayer from '../../calculations/twe/taxpayer'
import * as AlertHtml from './Structure/AlertsHtml'

const Results = () => {
  const router = useRouter()

  const { site, env, lang, langCode, siteDispatch, currentRateParams } = useContext(SiteContext)
  const [showSpinner, setShowSpinner] = useState(true)
  const [taxpayer, setTaxpayer] = useState()

  const getImportantAlert = () => {
    if (getToday(currentRateParams).isBefore(cutoffDateStart(currentRateParams))) {
      return { title: lang('global.heading.important'), body: AlertHtml.recommendationWarning() }
    }

    if (taxpayer.resultsBoxProps.isRefund) {
      return { title: lang('results.heading.decemberMsgAlert'), body: AlertHtml.decemberMesgRefund() }
    }

    return { title: lang('results.heading.decemberMsgAlert'), body: AlertHtml.decemberMesgOwe() }
  }

  useEffect(() => {
    animateScroll.scrollToTop({ duration: 0 })

    gaInit(env.gaCode)
    langCode === 'en'
      ? gaPageView('/app/tax-withholding-estimator/results/', 'Tax Withholding Estimator - Results')
      : gaPageView(`/app/tax-withholding-estimator/results/${langCode}/`, 'Tax Withholding Estimator - Results')

    if (site.forms.aboutYou.completed
      && site.forms.incomeWithholding.completed
      && site.forms.adjustments.completed
      && site.forms.deductions.completed
      && site.forms.taxCredits.completed) {
      if (taxpayer) {
        const newTaxpayer = new Taxpayer(site, currentRateParams)
        setTaxpayer(newTaxpayer)

        siteDispatch({
          type: 'UPDATE_SLIDER',
          payload: {
            value: taxpayer.recommendationProps.sliderProps.defaultValue >= 0
              ? taxpayer.recommendationProps.sliderProps.defaultValue : 0
          },
        })

        setTimeout(() => {
          document.body.style.overflow = 'visible'
          setShowSpinner(false)
        }, 300)
      } else {
        document.body.style.overflow = 'hidden'
        setShowSpinner(true)
      }
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (taxpayer) {
        console.log('taxpayer', taxpayer)

        document.body.style.overflow = 'visible'
        setShowSpinner(false)
      }
    }, 300)
  }, [taxpayer])

  useEffect(() => {
    setTaxpayer(new Taxpayer(site, currentRateParams))
  }, [site.slider, currentRateParams])

  return (
    <div className={clsx('block')}>
      {(!site.forms.aboutYou.completed
        || !site.forms.incomeWithholding.completed
        || !site.forms.adjustments.completed
        || !site.forms.deductions.completed
        || !site.forms.taxCredits.completed) && (
          <Alert
            id="resultsSkipAheadWarning"
            title={lang('global.heading.attention')}
            type="warning"
            gaLabel={lang('results.span.skipWarning')}
          >
            <p>{lang('results.p.skipAhead')}</p>
          </Alert>
        )}

      {site.forms.aboutYou.completed
        && site.forms.incomeWithholding.completed
        && site.forms.adjustments.completed
        && site.forms.deductions.completed
        && site.forms.taxCredits.completed
        && showSpinner && (
          <div
            className="spinnerWrapper"
            style={showSpinner ? { display: 'flex', flexDirection: 'column' } : { display: 'none' }}
          >
            <Spinner color="white" size="80px" />
            <p className="text-white font-bold text-2xl mt-3">{lang('global.p.loading')}</p>
          </div>
        )}

      {site.forms.aboutYou.completed
        && site.forms.incomeWithholding.completed
        && site.forms.adjustments.completed
        && site.forms.deductions.completed
        && site.forms.taxCredits.completed
        && taxpayer
        && !showSpinner && (
          <>
            <div className="flex flex-row-reverse">
              <Button
                type="button"
                secondary
                onClick={() => {
                  gaEvent('Tax Witholding Estimator Results', 'Print', site.slider.value === 0 ? '0' : site.slider.value)
                  window.print()
                }}
                data-testid="printButton"
                className="mr-0 mb-5 sm:mb-0 printBtn float-right"
              >
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faPrint}
                />
                {lang('global.button.print')}
              </Button>
            </div>

            <ResultsBox
              resultsBoxProps={taxpayer.resultsBoxProps}
              lang={lang}
              param={currentRateParams}
              taxpayer={taxpayer}
            />

            {getToday(currentRateParams).isBefore(cutoffDateStart(currentRateParams)) && taxpayer.finalW4Recom.currentIncomes.length > 0 && (
              <>
                {taxpayer.recommendationProps.shutDownSalary > 0 && (
                  <div id="sliderInformation">
                    <HtmlBuilder elements={
                      [
                        {
                          key: 'sliderTitle',
                          type: 'Heading',
                          level: '3',
                          text: taxpayer.resultsBoxProps.estimatedOverPayment >= 0
                            ? lang('results.h2.resultsLabelRefund') : lang('results.h2.resultsLabelOwe'),
                          className: 'text-2xl font-bold text-center mt-6',
                          dataTestID: 'sliderTitle',
                        },
                        {
                          key: 'sliderTitle2',
                          type: 'Heading',
                          level: '3',
                          text: lang('results.h2.resultsLabelAdjustResults'),
                          className: `text-2xl font-bold text-center mt-4 ${taxpayer.resultsBoxProps.estimatedOverPayment < 0 && 'hidden'}`,
                          dataTestID: 'sliderTitle2',
                        },
                        {
                          key: 'sliderSubtitle',
                          type: 'Paragraph',
                          className: 'mb-3 text-center',
                          text: lang('results.p.sliderLabel1'),
                          dataTestID: 'sliderSubtitle',
                        }
                      ]
                    }
                    />

                    <Slider slider={taxpayer.sliderProps} />
                  </div>
                )}

                <Recommendations
                  defaultValue={site.slider.value}
                  recommendationProps={taxpayer.recommendationProps}
                  lang={lang}
                  param={currentRateParams}
                />
              </>
            )}

            {(!getToday(currentRateParams).isBefore(cutoffDateStart(currentRateParams)) || taxpayer.finalW4Recom.currentIncomes.length > 0) && (
              <Alert
                id="resultsRecommendationWarning"
                title={lang(getImportantAlert().title)}
                type="warning"
              >
                <HtmlBuilder elements={getImportantAlert().body} />
              </Alert>
            )}

            <SummaryTable taxpayer={taxpayer} param={currentRateParams} />

            <NavButtons
              backOnclick={() => router.push(routes(langCode, 'twe').taxCredits, undefined, { shallow: true })}
              backText={lang('global.button.back')}
              backOnly
              backClassName="backBtn"
            >
              <Button
                type="button"
                onClick={() => {
                  gaEvent('Tax Witholding Estimator Results', 'Print', site.slider.value === 0 ? '0' : site.slider.value)
                  window.print()
                }}
                data-testid="printButton"
                className="mr-0 sm:mr-3 mb-5 sm:mb-0 printBtn"
              >
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faPrint}
                />
                {lang('global.button.print')}
              </Button>

              <div>
                <StartOver />
              </div>
            </NavButtons>
          </>
        )
      }
    </div>
  )
}

export default Results
