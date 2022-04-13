import { useState, useContext, useEffect } from 'react'
import clsx from 'clsx'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import { animateScroll, Link as LinkScroll } from 'react-scroll'
import SiteContext from '../../context/Site/SiteContext'
import { gaInit, gaPageView, gaEvent } from '../../helpers'
import routes from '../../templates/helpers/routes'
import Alert from '../../components/Alert'
import FormBuilder from '../../components/FormBuilder'
import Heading from '../../components/Heading'
import HtmlBuilder from '../../components/HtmlBuilder'
import NavButtons from '../../components/NavButtons/NavButtons'
import AutoSubmit from './Form/AutoSubmit'
import { deductionsFormElements } from './Form/FormObject'
import validationSchema from './Validation/validationSchema'

const Deductions = () => {
  const router = useRouter()

  const { site, env, lang, langCode, currentRateParams } = useContext(SiteContext)
  const [showErrors, setShowErrors] = useState(false)

  const { filingStatus } = site.forms.aboutYou.values

  const initialValues = site.forms.deductions.values

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

  const isCompleted = (values) => values.deductions !== ''

  const onSubmit = (values) => {
    gaEvent('TWE Selection', 'Deductions', values.deductions)
    router.push(routes(langCode, 'twe').taxCredits, undefined, { shallow: true })
  }

  useEffect(() => {
    animateScroll.scrollToTop({ duration: 0 })

    gaInit(env.gaCode)
    langCode === 'en'
      ? gaPageView('/app/tax-withholding-estimator/deductions/', 'Tax Withholding Estimator - Deductions')
      : gaPageView(`/app/tax-withholding-estimator/deductions/${langCode}/`, 'Tax Withholding Estimator - Deductions')
  }, [])

  return (
    <div className={clsx('block fade-in')}>
      <Heading
        level="2"
        className="text-2xl font-bold fade-in"
        data-testid="deductionsTitle"
      >
        {lang('deductions.h2.title')}
      </Heading>

      {(!site.forms.aboutYou.completed || !site.forms.incomeWithholding.completed || !site.forms.adjustments.completed) && (
        <Alert
          id="deductionsSkipAheadWarning"
          title={lang('global.heading.attention')}
          type="warning"
          gaLabel="Deductions Skip Ahead Warning"
        >
          <p>{lang('deductions.p.skipAhead')}</p>
        </Alert>
      )}

      {site.forms.aboutYou.completed && site.forms.incomeWithholding.completed && site.forms.adjustments.completed && (
        <>
          <p className="fade-in mt-3" data-testid="deductionsSubtitle">
            {lang('deductions.p.subtitle')}
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema(lang)}
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
                        gaLabel="Deductions Errors Alert"
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

                  <HtmlBuilder elements={
                    [
                      {
                        key: 'p1',
                        type: 'Paragraph',
                        text: 'global.span.asterisk',
                        className: 'mt-3 fade-in',
                        dataTestID: 'reqText',
                        replacements: [
                          {
                            type: 'redText',
                            key: ':*',
                            text: '*'
                          }
                        ]
                      },
                    ]
                  }
                  />

                  {filingStatus === 'married-separate' && (
                    <Alert
                      dataTestId="mfsInfoBoxHeading"
                      className={clsx('lg:w-10/12')}
                      id="mfsInfo-messages"
                      title={lang('deductions.h3.mfsInfoAlertHeading')}
                      type="info"
                      gaLabel="Deductions MFS Info Alert"
                    >
                      <p>{lang('deductions.p.mfsInfoAlertHeading')}</p>
                    </Alert>
                  )}

                  <FormBuilder options={deductionsFormElements(values, site, lang, setFieldValue, currentRateParams)} />

                  <NavButtons
                    nextOnclick={() => handleErrorCheck(validateForm)}
                    backOnclick={() => router.push(routes(langCode, 'twe').adjustments, undefined, { shallow: true })}
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

export default Deductions
