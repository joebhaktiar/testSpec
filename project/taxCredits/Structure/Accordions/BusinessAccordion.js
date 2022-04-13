import { useContext } from 'react'
import SiteContext from '../../../../context/Site/SiteContext'
import { AccordionItem, AccordionItemBody, AccordionItemTrigger } from '../../../../components/Accordion'
import FormBuilder from '../../../../components/FormBuilder'
import { businessCreditFormElements } from '../../Form/FormObject'

const BusinessAccordion = ({ ...props }) => {
  const { site, lang, siteDispatch } = useContext(SiteContext)
  const { accordionOpenArr } = site.forms.taxCredits

  const setAccordionOpenArr = (newAccordionOpenArr) => siteDispatch({ type: 'UPDATE_ACCORDION_OPEN', payload: newAccordionOpenArr })

  return (
    <AccordionItem
      id="businessAccordionItem"
      isOpen={accordionOpenArr[6]}
      dataTestId="businessAccordion"
      {...props}
    >
      <AccordionItemTrigger
        accordionOpenArr={accordionOpenArr}
        setAccordionOpenArr={setAccordionOpenArr}
        title={lang('taxCredits.span.businessAccordionTitle')}
        sendGAEvent
        buttonAriaLabel="Business Accordion"
      />
      <AccordionItemBody>
        <FormBuilder options={businessCreditFormElements(lang, site)} />
      </AccordionItemBody>
    </AccordionItem>
  )
}

export default BusinessAccordion
