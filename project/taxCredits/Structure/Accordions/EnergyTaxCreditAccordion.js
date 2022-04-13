import { useContext } from 'react'
import SiteContext from '../../../../context/Site/SiteContext'
import { AccordionItem, AccordionItemBody, AccordionItemTrigger } from '../../../../components/Accordion'
import FormBuilder from '../../../../components/FormBuilder'
import { energyTaxCreditFormElements } from '../../Form/FormObject'

const EnergyTaxCreditAccordion = ({ ...props }) => {
  const { site, lang, siteDispatch } = useContext(SiteContext)
  const { accordionOpenArr } = site.forms.taxCredits

  const setAccordionOpenArr = (newAccordionOpenArr) => siteDispatch({ type: 'UPDATE_ACCORDION_OPEN', payload: newAccordionOpenArr })

  return (
    <AccordionItem
      id="energyTaxCreditAccordionItem"
      isOpen={accordionOpenArr[8]}
      dataTestId="energyTaxCreditAccordion"
      {...props}
    >
      <AccordionItemTrigger
        accordionOpenArr={accordionOpenArr}
        setAccordionOpenArr={setAccordionOpenArr}
        title={lang('taxCredits.span.energyTaxCreditAccordionTitle')}
        sendGAEvent
        buttonAriaLabel="Energy Efficient Vehicles Accordion"
      />
      <AccordionItemBody>
        <FormBuilder options={energyTaxCreditFormElements(lang, site)} />
      </AccordionItemBody>
    </AccordionItem>
  )
}

export default EnergyTaxCreditAccordion
