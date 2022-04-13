import { useContext } from 'react'
import SiteContext from '../../../../context/Site/SiteContext'
import { AccordionItem, AccordionItemBody, AccordionItemTrigger } from '../../../../components/Accordion'
import FormBuilder from '../../../../components/FormBuilder'
import { alternativeMinimumCreditFormElements } from '../../Form/FormObject'

const AlternativeMinimumCreditAccordion = ({ ...props }) => {
  const { site, lang, siteDispatch } = useContext(SiteContext)
  const { accordionOpenArr } = site.forms.taxCredits

  const setAccordionOpenArr = (newAccordionOpenArr) => siteDispatch({ type: 'UPDATE_ACCORDION_OPEN', payload: newAccordionOpenArr })

  return (
    <AccordionItem
      id="alternativeMinimumCreditAccordionItem"
      isOpen={accordionOpenArr[7]}
      dataTestId="alternativeMinimumCreditAccordion"
      {...props}
    >
      <AccordionItemTrigger
        accordionOpenArr={accordionOpenArr}
        setAccordionOpenArr={setAccordionOpenArr}
        title={lang('taxCredits.span.alternativeMinimumCreditAccordionTitle')}
        sendGAEvent
        buttonAriaLabel="Alternative Minimum Credit Accordion"
      />
      <AccordionItemBody>
        <FormBuilder options={alternativeMinimumCreditFormElements(lang, site)} />
      </AccordionItemBody>
    </AccordionItem>
  )
}

export default AlternativeMinimumCreditAccordion
