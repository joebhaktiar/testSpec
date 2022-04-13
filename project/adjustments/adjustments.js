import { useState, useContext, useEffect } from 'react'
import clsx from 'clsx'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import { animateScroll, Link as LinkScroll } from 'react-scroll'
import SiteContext from '../../context/Site/SiteContext'
import { gaInit, gaPageView, gaEvent, formatMoney } from '../../helpers'
import routes from '../../templates/helpers/routes'
import Alert from '../../components/Alert'
import FormBuilder from '../../components/FormBuilder'
import Heading from '../../components/Heading'
import NavButtons from '../../components/NavButtons/NavButtons'
import AutoSubmit from './Form/AutoSubmit'
import { adjustmentsFormElements } from './Form/FormObject'
import { skipAheadWarning } from './Structure/Alerts'

const Adjustments = () => {
  const router = useRouter()

  const { site, env, lang, langCode, currentRateParams } = useContext(SiteContext)
  const [showErrors, setShowErrors] = useState(false)

  const initialValues = site.forms.adjustments.values

  const handleErrorLink = (event, id) => {
    event.preventDefault()
    document.getElementById(id).focus()
  }

  const handleErrorCheck = async (validateForm) => {
    try {
      const results = await validateForm()
      if (Object.keys(results).length > 0) {
        setShowErrors(true)
        animateScroll.scrollTo(370, { duration: 600 })
        document.getElementById('error-messages').focus()
      } else {
        setShowErrors(false)
      }
    } catch (error) {
      console.error('error', error)
    }
  }

  const isCompleted = (values) => values.adjustments !== ''

  const onSubmit = (values) => {
    const checkedTrue = (element) => values.adjustments[element].checked

    Object.keys(values.adjustments).some(checkedTrue) && gaEvent('TWE Selection', 'Value Selected', 'Adjustments')

    router.push(routes(langCode, 'twe').deductions, undefined, { shallow: true })
  }

  useEffect(() => {
    animateScroll.scrollToTop({ duration: 0 })

    gaInit(env.gaCode)
    langCode === 'en'
      ? gaPageView('/app/tax-withholding-estimator/adjustments/', 'Tax Withholding Estimator - Adjustments')
      : gaPageView(`/app/tax-withholding-estimator/adjustments/${langCode}/`, 'Tax Withholding Estimator - Adjustments')
  }, [])

  return (
    <div className={clsx('block fade-in')}>
      <Heading
        level="2"
        className="text-2xl font-bold fade-in"
        data-testid="adjustmentsTitle"
      >
        {lang('adjustments.h2.title')}
      </Heading>

      {(!site.forms.aboutYou.completed || !site.forms.incomeWithholding.completed) && (
        <Alert
          id="adjustmentsSkipAheadWarning"
          title={lang('global.heading.attention')}
          type="warning"
          gaLabel="Adjustments Skip Ahead Warning"
        >
          {skipAheadWarning(langCode)}
        </Alert>
      )}

      {site.forms.aboutYou.completed && site.forms.incomeWithholding.completed && (
        <>
          <p className="fade-in mt-3" data-testid="adjustmentsSubtitle">
            {lang('adjustments.p.subtitle')}
          </p>

          <Formik
            initialValues={initialValues}
            onSubmit={(values) => onSubmit(values)}
            validateOnBlur={false}
          >
            {({ values, errors, isSubmitting, validateForm, setFieldValue }) => (
              <>
                <Form className="w-full" noValidate>
                  <AutoSubmit isCompleted={isCompleted} />

                  {showErrors && Object.keys(errors).length > 0
                    && (
                      <Alert
                        dataTestId="errorBoxHeading"
                        className={clsx('lg:w-10/12', (showErrors && Object.keys(errors).length > 0) ? '' : 'hidden')}
                        id="error-messages"
                        title={Object.keys(errors).length > 1
                          ? lang('global.heading.errorMultiple', { ':num': Object.keys(errors).length })
                          : lang('global.heading.errorSingle')}
                        type="error"
                        gaLabel="Adjustments Errors Alert"
                      >
                        <ol className="ml-4 my-2 list list-decimal">
                          {Object.keys(errors).map((error, index) => (
                            <li className="my-1" key={index} data-testid={`${error}-errorListItem`}>
                              <LinkScroll
                                href="#"
                                to={error}
                                spy
                                offset={-85}
                                smooth
                                className="link"
                                onClick={(event) => handleErrorLink(event, error)}
                              >
                                {errors[error]}
                              </LinkScroll>
                            </li>
                          ))}
                        </ol>

                      </Alert>
                    )
                  }

                  <FormBuilder options={adjustmentsFormElements(values, site, lang, setFieldValue, currentRateParams)} />

                  <h3
                    className={clsx(
                      'font-bold text-1.5xl mt-6 mb-2',
                    )}
                    data-testid="total"
                  >
                    {lang('adjustments.h3.amountTotal', { ':amount': formatMoney(site.forms.adjustments.values.adjustmentsTotal) })}
                  </h3>
                  <p>
                    {lang('adjustments.p.portionOfAdjustments')}
                  </p>

                  <NavButtons
                    nextOnclick={() => handleErrorCheck(validateForm)}
                    backOnclick={() => router.push(routes(langCode, 'twe').incomeWithholding, undefined, { shallow: true })}
                    backText={lang('global.button.back')}
                    nextText={lang('global.button.next')}
                    backDisable={isSubmitting}
                    nextDisable={isSubmitting}
                  />
                </Form>
              </>
            )}
          </Formik>
        </>
      )}
    </div>
  )
}

export default Adjustments
