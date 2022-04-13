import { useState, useContext, useEffect } from 'react'
import clsx from 'clsx'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import { animateScroll, Link as LinkScroll } from 'react-scroll'
import SiteContext from '../../context/Site/SiteContext'
import { gaInit, gaPageView } from '../../helpers'
import routes from '../../templates/helpers/routes'
import Alert from '../../components/Alert'
import FormBuilder from '../../components/FormBuilder'
import Heading from '../../components/Heading'
import HtmlBuilder from '../../components/HtmlBuilder'
import NavButtons from '../../components/NavButtons/NavButtons'
import AutoSubmit from './Form/AutoSubmit'
import { aboutYouFormElements } from './Form/FormObject'
import Touched from './Form/Touched'
import disqualifiers from './Validation/disqualifiers'
import validationSchema from './Validation/validationSchema'

const AboutYou = () => {
  const router = useRouter()

  const { site, env, lang, langCode, currentRateParams } = useContext(SiteContext)
  const [showErrors, setShowErrors] = useState(false)

  const initialValues = site.forms.aboutYou.values

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

  const isCompleted = (values) => values.jobOrPension === 'yes'
    && ((values.filingStatus === 'single' || values.filingStatus === 'married' || values.filingStatus === 'married-separate')
      || ((values.filingStatus === 'head-of-household' || values.filingStatus === 'widow')
        && values.demographics.includes('willClaimDependents')))

  const onSubmit = () => router.push(routes(langCode, 'twe').incomeWithholding, undefined, { shallow: true })

  useEffect(() => {
    animateScroll.scrollToTop({ duration: 0 })

    gaInit(env.gaCode)
    langCode === 'en'
      ? gaPageView('/app/tax-withholding-estimator/', 'Tax Withholding Estimator - About You')
      : gaPageView(`/app/tax-withholding-estimator/${langCode}/`, 'Tax Withholding Estimator - About You')
  }, [])

  return (
    <div className={clsx('block fade-in')}>
      <Heading
        level="2"
        className="text-2xl font-bold fade-in"
        data-testid="aboutYouTitle"
      >
        {lang('aboutYou.h2.title')}
      </Heading>

      <p className="fade-in mt-3" data-testid="aboutYouSubtitle">
        {lang('aboutYou.p.subtitle', { ':year': currentRateParams.current_year })}
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(lang, site.forms.aboutYou.values)}
        // validate={(values) => validate(values, lang)}
        onSubmit={() => onSubmit()}
        validateOnBlur={false}
      >
        {({ values, errors, isSubmitting, validateForm }) => (
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
                    gaLabel="About You Errors Alert"
                  >
                    <ol className="ml-4 my-2 list list-decimal">
                      {Object.keys(errors).map((error, index) => {
                        const elmId = error === 'demographics' ? 'willClaimDependents' : error

                        return (
                          <li className="my-1" key={index} data-testid={`${error}-errorListItem`}>
                            <LinkScroll
                              href="#"
                              to={error}
                              spy
                              offset={-85}
                              smooth
                              className="link"
                              onClick={(event) => handleErrorLink(event, elmId)}
                            >
                              {errors[error]}
                            </LinkScroll>
                          </li>
                        )
                      })}
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

              <Touched form={aboutYouFormElements(values, site, lang, currentRateParams)} />
              <FormBuilder
                options={aboutYouFormElements(values, site, lang, currentRateParams)}
              />

              {(values.filingStatus === 'married'
                || values.filingStatus === 'married-separate'
                || values.filingStatus === 'head-of-household')
                && values.demographics.includes('claimedAsDependent') && (
                  <Alert
                    id="fsClaimedWarning"
                    title={lang('aboutYou.h2.fsClaimedWarning')}
                    type="warning"
                    autoFocus
                    gaLabel="Filing Status Claimed Warning"
                  >
                    <p>{lang('aboutYou.p.fsClaimedWarning')}</p>
                  </Alert>
                )}

              {Object.keys(disqualifiers(values)).length !== 0 && (
                <Alert
                  id="disqualifierWarning"
                  title={lang('aboutYou.h2.jobOrPensionWarningTitle')}
                  type="warning"
                  autoFocus
                  gaLabel="About You Ineligible Warning"
                >
                  {Object.keys(disqualifiers(values)).map((item, index) => (
                    <div key={index} data-testid={item.name}>
                      {disqualifiers(values)[item].elements}
                    </div>
                  ))}
                </Alert>
              )}

              <NavButtons
                nextText={lang('global.button.next')}
                nextDisable={isSubmitting || Object.keys(disqualifiers(values)).length !== 0}
                nextOnly
                nextOnclick={() => handleErrorCheck(validateForm)}
              />
            </Form>
          </>
        )}
      </Formik>
    </div>
  )
}

export default AboutYou
