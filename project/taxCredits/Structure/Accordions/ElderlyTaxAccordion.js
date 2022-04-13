import { useContext } from 'react'
import SiteContext from '../../../../context/Site/SiteContext'
import { AccordionItem, AccordionItemBody, AccordionItemTrigger } from '../../../../components/Accordion'
import FormBuilder from '../../../../components/FormBuilder'
import { elderlyTaxCreditFormElements } from '../../Form/FormObject'

const ElderlyTaxAccordion = ({ ...props }) => {
  const { site, lang, siteDispatch } = useContext(SiteContext)
  const { accordionOpenArr } = site.forms.taxCredits

  const setAccordionOpenArr = (newAccordionOpenArr) => siteDispatch({ type: 'UPDATE_ACCORDION_OPEN', payload: newAccordionOpenArr })

  return (
    <AccordionItem
      id="elderlyTaxAccordionItem"
      isOpen={accordionOpenArr[5]}
      dataTestId="elderlyTaxAccordion"
      {...props}
    >
      <AccordionItemTrigger
        accordionOpenArr={accordionOpenArr}
        setAccordionOpenArr={setAccordionOpenArr}
        title={lang('taxCredits.span.elderlyTaxAccordionTitle')}
        sendGAEvent
        buttonAriaLabel="Elderly or Disabled Accordion"
      />
      <AccordionItemBody>
        <FormBuilder options={elderlyTaxCreditFormElements(lang, site)} />
      </AccordionItemBody>
    </AccordionItem>
  )
}

export default ElderlyTaxAccordion
