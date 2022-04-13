import { useContext } from 'react'
import SiteContext from '../../../../context/Site/SiteContext'
import { AccordionItem, AccordionItemBody, AccordionItemTrigger } from '../../../../components/Accordion'
import FormBuilder from '../../../../components/FormBuilder'
import { homeOwnerTaxFormElements } from '../../Form/FormObject'

const HomeOwnerTaxAccordion = ({ ...props }) => {
  const { site, lang, siteDispatch } = useContext(SiteContext)
  const { accordionOpenArr } = site.forms.taxCredits

  const setAccordionOpenArr = (newAccordionOpenArr) => siteDispatch({ type: 'UPDATE_ACCORDION_OPEN', payload: newAccordionOpenArr })

  return (
    <AccordionItem
      id="homeOwnerTaxAccordionItem"
      isOpen={accordionOpenArr[4]}
      dataTestId="homeOwnerTaxAccordion"
      {...props}
    >
      <AccordionItemTrigger
        accordionOpenArr={accordionOpenArr}
        setAccordionOpenArr={setAccordionOpenArr}
        title={lang('taxCredits.span.homeOwnerTaxAccordionTitle')}
        sendGAEvent
        buttonAriaLabel="Homeowner Accordion"
      />
      <AccordionItemBody>
        <FormBuilder options={homeOwnerTaxFormElements(lang, site)} />
      </AccordionItemBody>
    </AccordionItem>
  )
}

export default HomeOwnerTaxAccordion
