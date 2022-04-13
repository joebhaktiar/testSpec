import { useState, useContext, useEffect } from 'react'
import clsx from 'clsx'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import { animateScroll, Link as LinkScroll } from 'react-scroll'
import SiteContext from '../../context/Site/SiteContext'
import { gaInit, gaPageView, gaEvent } from '../../helpers'
import routes from '../../templates/helpers/routes'
import Accordion from '../../components/Accordion'
import Alert from '../../components/Alert'
import Heading from '../../components/Heading'
import NavButtons from '../../components/NavButtons/NavButtons'
import AutoSubmit from './Form/AutoSubmit'
import {
  ChildTaxAccordion,
  ForeignTaxAccordion,
  EducationalTaxAccordion,
  RetirementSavingsAccordion,
  HomeOwnerTaxAccordion,
  ElderlyTaxAccordion,
  BusinessAccordion,
  AlternativeMinimumCreditAccordion,
  EnergyTaxCreditAccordion
} from './Structure/Accordions'

const TaxCredits = () => {
  const router = useRouter()

  const { site, env, lang, langCode, siteDispatch } = useContext(SiteContext)
  const { demographics } = site.forms.aboutYou.values
  const { accordionOpenArr } = site.forms.taxCredits
  const [showErrors, setShowErrors] = useState(false)

  const setAccordionOpenArr = (newAccordionOpenArr) => siteDispatch({ type: 'UPDATE_ACCORDION_OPEN', payload: newAccordionOpenArr })

  const initialValues = site.forms.taxCredits.values

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

  const isCompleted = (values) => values.taxCredits !== ''

  const onSubmit = (values) => {
    const creditValues = Object.keys(values)
      .filter((item) => item !== 'childrenAges'
        && item !== 'numOfChildDependentCareQC'
        && item !== 'numOfEitcQC'
        && item !== 'numOfStudents')

    const isNotEmpty = (element) => values[element] !== ''

    if (creditValues.some(isNotEmpty)) {
      gaEvent('TWE Selection', 'Value Selected', 'Tax Credit')
    }

    router.push(routes(langCode, 'twe').results, undefined, { shallow: true })
  }

  useEffect(() => {
    animateScroll.scrollToTop({ duration: 0 })

    if (demographics.includes('willClaimDependents')) {
      const newAccordionOpenArr = [...accordionOpenArr]
      newAccordionOpenArr[0] = true

      setAccordionOpenArr(newAccordionOpenArr)
    } else {
      const newAccordionOpenArr = [...accordionOpenArr]
      newAccordionOpenArr[0] = false

      setAccordionOpenArr(newAccordionOpenArr)
    }

    gaInit(env.gaCode)
    langCode === 'en'
      ? gaPageView('/app/tax-withholding-estimator/tax-credits/', 'Tax Withholding Estimator - Tax Credits')
      : gaPageView(`/app/tax-withholding-estimator/tax-credits/${langCode}/`, 'Tax Withholding Estimator - Tax Credits')
  }, [])

  return (
    <div className={clsx('block fade-in')}>
      <Heading
        level="2"
        className="text-2xl font-bold fade-in"
        data-testid="taxCreditsTitle"
      >
        {lang('taxCredits.h2.title')}
      </Heading>

      {(!site.forms.aboutYou.completed
        || !site.forms.incomeWithholding.completed
        || !site.forms.adjustments.completed
        || !site.forms.deductions.completed) && (
          <Alert
            id="taxCreditsSkipAheadWarning"
            title={lang('global.heading.attention')}
            type="warning"
            gaLabel="Tax Credits Skip Ahead Warning"
          >
            <p>{lang('taxCredits.p.skipAhead')}</p>
          </Alert>
        )}

      {site.forms.aboutYou.completed
        && site.forms.incomeWithholding.completed
        && site.forms.adjustments.completed
        && site.forms.deductions.completed && (
          <>
            <p className="fade-in my-3" data-testid="taxCreditsSubtitle">
              {lang('taxCredits.p.subtitle')}
            </p>

            <p
              className={clsx(
                'fade-in mb-6',
                demographics.includes('willClaimDependents') ? 'inline-block' : 'hidden'
              )}
              data-testid="taxCreditsHasDependentsInto"
            >
              {lang('taxCredits.p.hasDependentsInto')}
            </p>

            <Formik
              initialValues={initialValues}
              // validationSchema={validationSchema(lang)}
              onSubmit={(values) => onSubmit(values)}
              validateOnChange={false}
            >
              {({ errors, isSubmitting, validateForm }) => (
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
                          gaLabel="Tax Credits Errors Alert"
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

                    <Accordion level="4" multiItem>
                      <ChildTaxAccordion />
                      <ForeignTaxAccordion />
                      <EducationalTaxAccordion />
                      <RetirementSavingsAccordion />
                      <HomeOwnerTaxAccordion />
                      <ElderlyTaxAccordion />
                      <BusinessAccordion />
                      <AlternativeMinimumCreditAccordion />
                      <EnergyTaxCreditAccordion />
                    </Accordion>

                    <NavButtons
                      nextOnclick={() => handleErrorCheck(validateForm)}
                      backOnclick={() => router.push(routes(langCode, 'twe').deductions, undefined, { shallow: true })}
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

export default TaxCredits
