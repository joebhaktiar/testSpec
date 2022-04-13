import { useContext } from 'react'
import clsx from 'clsx'
import { FieldArray } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import SiteContext from '../../../../context/Site/SiteContext'
import { AccordionItem, AccordionItemBody, AccordionItemTrigger } from '../../../../components/Accordion'
import CurrencyField from '../../../../components/CurrencyField'
import FormBuilder from '../../../../components/FormBuilder'
import HtmlBuilder from '../../../../components/HtmlBuilder'
import { childCreditsFormElements } from '../../Form/FormObject'
import * as ToolTips from '../../Structure/ToolTipsHtml'

const ChildTaxAccordion = ({ ...props }) => {
  const { site, lang, siteDispatch, currentRateParams } = useContext(SiteContext)
  const { demographics } = site.forms.aboutYou.values
  const { accordionOpenArr } = site.forms.taxCredits

  const setAccordionOpenArr = (newAccordionOpenArr) => siteDispatch({ type: 'UPDATE_ACCORDION_OPEN', payload: newAccordionOpenArr })

  return (
    <AccordionItem
      id="childCreditsAccordionItem"
      isOpen={accordionOpenArr[0]}
      dataTestId="childCreditsAccordion"
      {...props}
    >
      <AccordionItemTrigger
        accordionOpenArr={accordionOpenArr}
        setAccordionOpenArr={setAccordionOpenArr}
        title={lang('taxCredits.span.childCreditsAccordionTitle')}
        sendGAEvent
        buttonAriaLabel="Child and Dependent Credits Accordion"
      />
      <AccordionItemBody>
        <p
          className={clsx(
            'fade-in mb-6',
            demographics.includes('willClaimDependents') ? 'inline-block' : 'hidden'
          )}
          data-testid="taxCreditsHasDependentsAccordionInto"
        >
          {lang('taxCredits.p.hasDependentsAccordionInto')}
        </p>

        <HtmlBuilder elements={
          [
            {
              key: 'adoptionCreditHeading',
              type: 'Heading',
              level: '3',
              className: 'font-bold text-lg mb-3',
              text: lang('taxCredits.h3.childTaxCredit'),
              dataTestID: 'childTaxCreditHeading'
            },
          ]
        }
        />

        <FieldArray name="childrenAges">
          {(fieldArrayProps) => {
            const { form, push, remove } = fieldArrayProps
            const { childrenAges } = form.values

            return (
              <>
                {childrenAges.map((age, index) => (
                  <div key={index} className="my-2">
                    <CurrencyField
                      label={lang('taxCredits.label.childrenAges', { ':year': currentRateParams.current_year })}
                      name={`childrenAges[${index}]`}
                      className="my-2 inline"
                      dataTestId="childrenAges"
                      prefix=""
                      maxLength={3}
                      allowDecimals={false}
                      disableFadeIn
                      helpTip={{
                        page: 'taxCredits',
                        expanded: site?.forms?.taxCredits?.helpTips[`childrenAges[${index}]`]?.open,
                        ariaLabel: 'Children Ages - Help Tip',
                        elements: () => ToolTips.childrenAgesToolTip(),
                      }
                      }
                    />

                    {index > 0 && (
                      <button
                        type="button"
                        data-testid={`deleteButton${index}`}
                        aria-label={`Remove childrens age ${index + 1}`}
                        onClick={() => remove(index)}
                      >
                        <FontAwesomeIcon
                          className={clsx(
                            'text-blue-500 hover:text-blue-600 active:text-blue-800 mx-1',
                          )}
                          icon={faTimesCircle}
                          size="lg"
                        />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  data-testid="addAnotherButton"
                  aria-label="Add another childrens age"
                  onClick={() => {
                    push('')
                    const newIndex = form.values.childrenAges.length
                    setTimeout(() => {
                      const amountInput = document.getElementById(`childrenAges[${newIndex}]`)
                      amountInput && amountInput.focus()
                    }, 50)
                  }}
                  disabled={form.values.childrenAges.length > 9}
                  className={clsx(
                    'block uppercase font-bold underline mt-2 mr-2',
                    form.values.childrenAges.length > 9
                      ? 'text-gray-500 hover:text-gray-500 active:text-gray-500 cursor-not-allowed'
                      : 'text-blue-500 hover:text-blue-600 active:text-blue-800',
                  )}
                >
                  <FontAwesomeIcon
                    className={clsx(
                      'fill-current mr-1',
                    )}
                    icon={faPlus}
                    size="sm"
                  />
                  {lang('taxCredits.button.addAnotherChild')}
                </button>
              </>
            )
          }
          }
        </FieldArray>

        <FormBuilder options={childCreditsFormElements(lang, site)} />
      </AccordionItemBody>
    </AccordionItem>
  )
}

export default ChildTaxAccordion
