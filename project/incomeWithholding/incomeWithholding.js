import { useState, useContext, useEffect, memo } from 'react'
import clsx from 'clsx'
import { Formik, Form, FieldArray, getIn } from 'formik'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { animateScroll, Link as LinkScroll } from 'react-scroll'
import { isObject, flatMap } from 'lodash'
import SiteContext from '../../context/Site/SiteContext'
import { gaInit, gaPageView, gaEvent } from '../../helpers'
import routes from '../../templates/helpers/routes'
import Accordion, { AccordionItem, AccordionItemBody, AccordionItemTrigger } from '../../components/Accordion'
import Alert from '../../components/Alert'
import Counter from '../../components/Counter'
import FormBuilder from '../../components/FormBuilder'
import Heading from '../../components/Heading'
import HtmlBuilder from '../../components/HtmlBuilder'
import NavButtons from '../../components/NavButtons/NavButtons'
import RadioGroup from '../../components/Radio/RadioGroup'
import AutoSubmit from './Form/AutoSubmit'
import * as ToolTips from './Structure/ToolTipsHtml'
import {
  salaryFormElements,
  pensionFormElements,
  hourlyFormElements,
  otherSourcesFormElements,
  ssiFormElements
} from './Form/FormObject'
import Touched from './Form/Touched'
import validationSchema from './Validation/validationSchema'
import accordionOpenErrors from './helpers/accordionOpenErrors'
import { skipAheadWarning } from './Structure/Alerts'

const IncomeWithholding = () => {
  const router = useRouter()

  const { site, env, lang, langCode, siteDispatch, currentRateParams } = useContext(SiteContext)
  const { accordionOpenArr } = site.forms.incomeWithholding
  const [showErrors, setShowErrors] = useState(false)
  const { filingStatus } = site.forms.aboutYou.values
  const setAccordionOpenArr = (newAccordionOpenArr) => siteDispatch({ type: 'UPDATE_ACCORDION_OPEN_INCOME', payload: newAccordionOpenArr })

  const initialValues = site.forms.incomeWithholding.values
  const { numOfJobs } = site.forms.incomeWithholding.values

  const handleErrorLink = (event, id) => {
    event.preventDefault()

    document.getElementById(id).focus()
  }

  const handleErrorCheck = async (validateForm) => {
    try {
      const results = await validateForm()

      if (Object.keys(results).length > 0) {
        setTimeout(() => {
          accordionOpenErrors(results, setAccordionOpenArr, accordionOpenArr)
        }, 300)

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

  const isCompleted = (values, errors) => {
    const eachJob = values.jobs.map((value) => value.incomeType !== ''
      && (value.timePeriodOfJob !== '' || value.ssiAllYear !== ''))

    const isTrue = ((value) => value === true)

    return Object.keys(errors).length === 0 && eachJob.every(isTrue)
  }

  const onSubmit = (values) => {
    gaEvent('TWE Selection', 'Income Sources', values.jobs.length)

    router.push(routes(langCode, 'twe').adjustments, undefined, { shallow: true })
  }

  const flattenObj = (val, keys = []) =>
  (isObject(val) // if it's an object or array
    ? flatMap(val, (v, k) => flattenObj(v, [...keys, k])) // iterate it and call fn with the value and the collected keys
    : keys.join('.')) // return the joined keys

  const getErrorsObj = (errors, touched) => flattenObj(errors).filter((item) => getIn(touched, item) === true)

  useEffect(() => {
    animateScroll.scrollToTop({ duration: 0 })

    gaInit(env.gaCode)
    langCode === 'en'
      ? gaPageView('/app/tax-withholding-estimator/income-and-withholding/', 'Tax Withholding Estimator - Income and Withholding')
      : gaPageView(`/app/tax-withholding-estimator/income-and-withholding/${langCode}/`, 'Tax Withholding Estimator - Income and Withholding')
  }, [])

  return (
    <div className={clsx('block fade-in')}>
      <Heading
        level="2"
        className="text-2xl font-bold fade-in"
        data-testid="incomeWithholdingTitle"
      >
        {lang('incomeWithholding.h2.title')}
      </Heading>

      {!site.forms.aboutYou.completed && (
        <Alert
          id="incomeWithholdingSkipAheadWarning"
          title={lang('global.heading.attention')}
          type="warning"
          gaLabel="Income & Withholding Skip Ahead Warning"
        >
          {skipAheadWarning(langCode)}
        </Alert>
      )}

      {site.forms.aboutYou.completed && (
        <>
          <p className="fade-in mt-3" data-testid="incomeWithholdingSubtitle">
            {lang('incomeWithholding.p.subtitle')}
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema(lang, site.forms.incomeWithholding.values, filingStatus, currentRateParams)}
            onSubmit={(values) => onSubmit(values)}
            validateOnBlur={false}
          >
            {({ values, errors, isSubmitting, validateForm, setFieldValue, touched }) => (
              <>
                <Form className="w-full" noValidate>
                  <AutoSubmit isCompleted={isCompleted} />

                  {showErrors && getErrorsObj(errors, touched).length > 0
                    && (
                      <Alert
                        dataTestId="errorBoxHeading"
                        className={clsx('lg:w-10/12', (showErrors && getErrorsObj(errors, touched).length > 0) ? '' : 'hidden')}
                        id="error-messages"
                        title={getErrorsObj(errors, touched).length > 1
                          ? lang('global.heading.errorMultiple', { ':num': getErrorsObj(errors, touched).length })
                          : lang('global.heading.errorSingle')}
                        type="error"
                        gaLabel="Income & Withholding Errors Alert"
                      >
                        <ol className="ml-4 my-2 list list-decimal">
                          {getErrorsObj(errors, touched).map((error, index) => (
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
                                {getIn(errors, getErrorsObj(errors, touched)[index])}
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

                  <FieldArray
                    name="jobs"
                  >
                    {
                      (fieldArrayProps) => {
                        const { push, remove } = fieldArrayProps

                        return (
                          <>
                            <Counter
                              label={lang(filingStatus === 'married' ? 'incomeWithholding.label.numOfJobsMFJ' : 'incomeWithholding.label.numOfJobs',)}
                              boldLabel
                              name="numOfJobs"
                              id="numOfJobs"
                              className="mt-6 mb-4"
                              min={1}
                              max={filingStatus === 'married' ? 20 : 10}
                              dataTestId="numOfJobs"
                              decreaseAriaLabel={`${numOfJobs} ${numOfJobs === 1 ? 'Income' : 'Incomes'}: decrease number of incomes`}
                              increaseAriaLabel={`${numOfJobs} ${numOfJobs === 1 ? 'Income' : 'Incomes'}: increase number of incomes`}
                              addOnClick={() => {
                                const newForms = {
                                  aboutYou: site.forms.aboutYou,
                                  incomeWithholding: {
                                    ...site.forms.incomeWithholding,
                                    accordionOpenArr: [...site.forms.incomeWithholding.accordionOpenArr, false],
                                    helpTips: {
                                      ...site.forms.incomeWithholding.helpTips,
                                      [`jobs.${site.forms.incomeWithholding.values.jobs.length}.incomeType`]: {
                                        'key': 'tt-incomeType-1',
                                        'id': 'incomeTypeTT',
                                        'open': false
                                      },
                                      [`jobs.${site.forms.incomeWithholding.values.jobs.length}.dateRange`]: {
                                        'key': 'tt-dateRange-1',
                                        'id': 'dateRangeTT',
                                        'open': false
                                      },
                                      [`jobs.${site.forms.incomeWithholding.values.jobs.length}.payFrequency`]: {
                                        'key': 'tt-payFrequency-1',
                                        'id': 'payFrequencyTT',
                                        'open': false
                                      },
                                      [`jobs.${site.forms.incomeWithholding.values.jobs.length}.taxesPerPayPeriod`]: {
                                        'key': 'tt-taxesPerPayPeriod-1',
                                        'id': 'taxesPerPayPeriodTT',
                                        'open': false
                                      },
                                      [`jobs.${site.forms.incomeWithholding.values.jobs.length}.ssiBenefitsYTD`]: {
                                        'key': 'tt-ssiBenefitsYTD-1',
                                        'id': 'ssiBenefitsYTDTT',
                                        'open': false
                                      },
                                      [`jobs.${site.forms.incomeWithholding.values.jobs.length}.contributeToCafeteriaPlan`]: {
                                        'key': 'tt-contributeToCafeteriaPlan-1',
                                        'id': 'contributeToCafeteriaPlanTT',
                                        'open': false
                                      },
                                      [`jobs.${site.forms.incomeWithholding.values.jobs.length}.cafeteriaPlanPayPeriodAmount`]: {
                                        'key': 'tt-cafeteriaPlanPayPeriodAmount-1',
                                        'id': 'cafeteriaPlanPayPeriodAmountTT',
                                        'open': false
                                      },
                                      [`jobs.${site.forms.incomeWithholding.values.jobs.length}.cafeteriaPlanYTDAmount`]: {
                                        'key': 'tt-cafeteriaPlanYTDAmount-1',
                                        'id': 'cafeteriaPlanYTDAmountTT',
                                        'open': false
                                      },
                                      [`jobs.${site.forms.incomeWithholding.values.jobs.length}.annualSalary`]: {
                                        'key': 'tt-annualSalary-1',
                                        'id': 'annualSalaryTT',
                                        'open': false
                                      },
                                      [`jobs.${site.forms.incomeWithholding.values.jobs.length}.wagesYTD`]: {
                                        'key': 'tt-wagesYTD-1',
                                        'id': 'wagesYTDTT',
                                        'open': false
                                      },
                                      [`jobs.${site.forms.incomeWithholding.values.jobs.length}.ssiMonthlyAmount`]: {
                                        'key': 'tt-ssiMonthlyAmount-1',
                                        'id': 'ssiMonthlyAmountTT',
                                        'open': false
                                      },
                                      [`jobs.${site.forms.incomeWithholding.values.jobs.length}.contributionsAndBonuses.retirement.checked`]: {
                                        'key': 'tt-incomeType-1',
                                        'id': 'retirement',
                                        'open': false
                                      },
                                      [`jobs.${site.forms.incomeWithholding.values.jobs.length}.contributionsAndBonuses.cafeteriaPlan.checked`]: {
                                        'key': 'tt-incomeType-1',
                                        'id': 'cafeteriaPlan',
                                        'open': false
                                      },
                                      [`jobs.${site.forms.incomeWithholding.values.jobs.length}.contributionsAndBonuses.bonusFuture.checked`]: {
                                        'key': 'tt-incomeType-1',
                                        'id': 'bonusFuture',
                                        'open': false
                                      },
                                      [`jobs.${site.forms.incomeWithholding.values.jobs.length}.contributionsAndBonuses.bonusPast.checked`]: {
                                        'key': 'tt-incomeType-1',
                                        'id': 'bonusPast',
                                        'open': false
                                      }
                                    },
                                  },
                                  adjustments: site.forms.adjustments,
                                  deductions: site.forms.deductions,
                                  taxCredits: site.forms.taxCredits,
                                  results: site.forms.results,
                                }

                                siteDispatch({
                                  type: 'UPDATE_FORMS',
                                  payload: newForms,
                                })

                                push(
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
                                    hourlyPayStatements: [''],
                                    contributionsAndBonuses: {
                                      retirement: {
                                        checked: false,
                                        info: [
                                          {
                                            amount: ''
                                          }
                                        ]
                                      },
                                      cafeteriaPlan: {
                                        checked: false,
                                        info: [
                                          {
                                            amount: ''
                                          }
                                        ]
                                      },
                                      bonusFuture: {
                                        checked: false,
                                        info: [
                                          {
                                            employerWillWithhold: [],
                                            amount: ''
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
                                )
                              }}
                              removeOnClick={() => {
                                remove(site.forms.incomeWithholding.values.jobs.length - 1)

                                const newAccordionOpenArr = [...accordionOpenArr]
                                newAccordionOpenArr.splice(site.forms.incomeWithholding.values.jobs.length - 1, 1)

                                const newForms = {
                                  aboutYou: site.forms.aboutYou,
                                  incomeWithholding: {
                                    ...site.forms.incomeWithholding,
                                    accordionOpenArr: newAccordionOpenArr,
                                  },
                                  adjustments: site.forms.adjustments,
                                  deductions: site.forms.deductions,
                                  taxCredits: site.forms.taxCredits,
                                  results: site.forms.results,
                                }

                                siteDispatch({
                                  type: 'UPDATE_FORMS',
                                  payload: newForms,
                                })
                              }}
                            />

                            <Accordion level="2" multiItem>
                              {values.jobs.map((job, index) => (
                                <AccordionItem isOpen={accordionOpenArr[index]} key={index} id={`job${index + 1}`}>
                                  <AccordionItemTrigger
                                    accordionOpenArr={accordionOpenArr}
                                    setAccordionOpenArr={setAccordionOpenArr}
                                    title={lang('incomeWithholding.h2.accordionTitle', { ':number': lang(`global.span.number${index + 1}`) })}
                                    site={site}
                                    siteDispatch={siteDispatch}
                                    lang={lang}
                                    buttonAriaLabel={`Income Source ${index + 1} Accordion`}
                                  >
                                    {index > 0 && (
                                      <button
                                        type="button"
                                        aria-label={`Remove Income Source ${index + 1}`}
                                        className="ml-auto"
                                        onClick={() => {
                                          remove(index)

                                          const newAccordionOpenArr = [...accordionOpenArr]
                                          newAccordionOpenArr.splice(index, 1)

                                          setFieldValue('numOfJobs', values.numOfJobs - 1)

                                          setTimeout(() => {
                                            const newJobs = [...values.jobs]
                                            newJobs.splice(index, 1)

                                            const newValues = {
                                              ...values,
                                              jobs: newJobs
                                            }

                                            const newForms = {
                                              aboutYou: site.forms.aboutYou,
                                              incomeWithholding: {
                                                ...site.forms.incomeWithholding,
                                                accordionOpenArr: newAccordionOpenArr,
                                                completed: isCompleted(newValues, errors),
                                                values: {
                                                  ...values,
                                                  numOfJobs: values.numOfJobs - 1,
                                                  jobs: [...newJobs],
                                                }
                                              },
                                              adjustments: site.forms.adjustments,
                                              deductions: site.forms.deductions,
                                              taxCredits: site.forms.taxCredits,
                                              results: site.forms.results,
                                            }

                                            siteDispatch({
                                              type: 'UPDATE_FORMS',
                                              payload: newForms,
                                            })
                                          }, 300)
                                        }}
                                      >
                                        <FontAwesomeIcon
                                          className="text-gray-600 ml-2 mr-3 text-md"
                                          icon={faTrashAlt}
                                        />
                                      </button>
                                    )}
                                  </AccordionItemTrigger>
                                  <AccordionItemBody>
                                    <RadioGroup
                                      label={lang('incomeWithholding.label.incomeType')}
                                      name={`jobs.${index}.incomeType`}
                                      id="incomeType"
                                      required
                                      helpTip={{
                                        page: 'incomeWithholding',
                                        expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.incomeType`].open,
                                        ariaLabel: 'Type of Income - Help Tip',
                                        elements: () => ToolTips.incomeTypeToolTip(index),
                                      }}
                                      className="mt-6"
                                      dataTestId={`incomeType${index}`}
                                      options={[
                                        {
                                          id: `jobs.${index}.incomeType-salary`,
                                          value: 'salary',
                                          label: lang('incomeWithholding.label.salary'),
                                        },
                                        {
                                          id: `jobs.${index}.incomeType-hourly`,
                                          value: 'hourly',
                                          label: lang('incomeWithholding.label.hourly'),
                                        },
                                        {
                                          id: `jobs.${index}.incomeType-pension`,
                                          value: 'pension',
                                          label: lang('incomeWithholding.label.pension'),
                                          disabled: index === 0,
                                        },
                                        {
                                          id: `jobs.${index}.incomeType-ssi`,
                                          value: 'ssi',
                                          label: lang('incomeWithholding.label.ssi'),
                                          disabled: index === 0,
                                        },
                                        {
                                          id: `jobs.${index}.incomeType-none`,
                                          value: 'none',
                                          label: lang('incomeWithholding.label.none'),
                                        },
                                      ]}
                                    />

                                    {values.jobs[index].incomeType === 'none' && (
                                      <Alert
                                        inputType="alert"
                                        id="noIncomeTypeWarning"
                                        title={lang('incomeWithholding.h2.noIncomeTypeWarning')}
                                        type="warning"
                                        autoFocus
                                        gaLabel="No Income Type Warning"
                                      >
                                        <HtmlBuilder elements={[
                                          {
                                            key: 'taxesPaidWarningP1',
                                            type: 'Paragraph',
                                            className: 'my-3',
                                            text: 'incomeWithholding.p.noIncomeTypeWarning',
                                            dataTestID: 'taxesPaidWarning1',
                                          },
                                          {
                                            key: 'taxesPaidWarningP2',
                                            type: 'Paragraph',
                                            className: 'my-3',
                                            text: 'incomeWithholding.p.noIncomeTypeWarningLink1',
                                            dataTestID: 'taxesPaidWarning1',
                                            replacements: [
                                              {
                                                type: 'link',
                                                key: ':irsTopic505',
                                                href: 'https://www.irs.gov/publications/p505',
                                                text: 'incomeWithholding.a.noIncomeTypeWarningLink1',
                                                external: true,
                                                dataTestID: 'numOfEitcQCTT2Link',
                                              }
                                            ]
                                          }
                                        ]}
                                        />
                                      </Alert>
                                    )}

                                    {values.jobs[index].incomeType === 'salary' && (
                                      <>
                                        <Touched form={salaryFormElements(values, site, lang, langCode, index, setFieldValue, errors, currentRateParams)} />
                                        <FormBuilder options={salaryFormElements(values, site, lang, langCode, index, setFieldValue, errors, currentRateParams)} />
                                      </>
                                    )}

                                    {values.jobs[index].incomeType === 'pension' && (
                                      <>
                                        <Touched form={pensionFormElements(values, site, lang, langCode, index, errors, currentRateParams)} />
                                        <FormBuilder options={pensionFormElements(values, site, lang, langCode, index, errors, currentRateParams)} />
                                      </>
                                    )}

                                    {values.jobs[index].incomeType === 'hourly' && (
                                      <>
                                        <Touched form={hourlyFormElements(values, site, lang, langCode, index, setFieldValue, errors, currentRateParams)} />
                                        <FormBuilder options={hourlyFormElements(values, site, lang, langCode, index, setFieldValue, errors, currentRateParams)} />
                                      </>
                                    )}

                                    {values.jobs[index].incomeType === 'ssi' && (
                                      <>
                                        <Touched form={ssiFormElements(values, site, lang, langCode, index, currentRateParams)} />
                                        <FormBuilder options={ssiFormElements(values, site, lang, langCode, index, currentRateParams)} />
                                      </>
                                    )}
                                  </AccordionItemBody>
                                </AccordionItem>
                              ))}
                            </Accordion>
                          </>
                        )
                      }
                    }
                  </FieldArray>

                  <FormBuilder options={otherSourcesFormElements(values, site, lang, setFieldValue)} />

                  <NavButtons
                    nextOnclick={() => handleErrorCheck(validateForm)}
                    backOnclick={() => router.push(routes(langCode, 'twe').aboutYou, undefined, { shallow: true })}
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

const memoizedComp = memo(IncomeWithholding)

export default memoizedComp
