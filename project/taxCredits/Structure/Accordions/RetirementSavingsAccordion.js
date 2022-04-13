import { useContext } from 'react'
import SiteContext from '../../../../context/Site/SiteContext'
import { AccordionItem, AccordionItemBody, AccordionItemTrigger } from '../../../../components/Accordion'
import FormBuilder from '../../../../components/FormBuilder'
import { retirementSavingsCreditFormElements } from '../../Form/FormObject'

const RetirementSavingsAccordion = ({ ...props }) => {
  const { site, lang, siteDispatch } = useContext(SiteContext)
  const { accordionOpenArr } = site.forms.taxCredits

  const setAccordionOpenArr = (newAccordionOpenArr) => siteDispatch({ type: 'UPDATE_ACCORDION_OPEN', payload: newAccordionOpenArr })

  return (
    <AccordionItem
      id="retirementSavingsAccordionItem"
      isOpen={accordionOpenArr[3]}
      dataTestId="retirementSavingsAccordion"
      {...props}
    >
      <AccordionItemTrigger
        accordionOpenArr={accordionOpenArr}
        setAccordionOpenArr={setAccordionOpenArr}
        title={lang('taxCredits.span.retirementSavingsAccordionTitle')}
        sendGAEvent
        buttonAriaLabel="Retirement Savings Accordion"
      />
      <AccordionItemBody>
        <FormBuilder options={retirementSavingsCreditFormElements(lang, site)} />
      </AccordionItemBody>
    </AccordionItem>
  )
}

export default RetirementSavingsAccordion
