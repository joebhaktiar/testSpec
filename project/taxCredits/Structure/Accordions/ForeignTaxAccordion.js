import { useContext } from 'react'
import SiteContext from '../../../../context/Site/SiteContext'
import { AccordionItem, AccordionItemBody, AccordionItemTrigger } from '../../../../components/Accordion'
import FormBuilder from '../../../../components/FormBuilder'
import { foreignTaxFormElements } from '../../Form/FormObject'

const ForeignTaxAccordion = ({ ...props }) => {
  const { site, lang, siteDispatch } = useContext(SiteContext)
  const { accordionOpenArr } = site.forms.taxCredits

  const setAccordionOpenArr = (newAccordionOpenArr) => siteDispatch({ type: 'UPDATE_ACCORDION_OPEN', payload: newAccordionOpenArr })

  return (
    <AccordionItem
      id="foreignTaxAccordionItem"
      isOpen={accordionOpenArr[1]}
      dataTestId="foreignTaxAccordion"
      {...props}
    >
      <AccordionItemTrigger
        accordionOpenArr={accordionOpenArr}
        setAccordionOpenArr={setAccordionOpenArr}
        title={lang('taxCredits.span.foreignTaxAccordionTitle')}
        sendGAEvent
        buttonAriaLabel="Foreign Tax Credit Accordion"
      />
      <AccordionItemBody>
        <FormBuilder options={foreignTaxFormElements(lang, site)} />
      </AccordionItemBody>
    </AccordionItem>
  )
}

export default ForeignTaxAccordion
