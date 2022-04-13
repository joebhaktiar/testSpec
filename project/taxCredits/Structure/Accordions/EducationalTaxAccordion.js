import { useContext } from 'react'
import { useFormikContext } from 'formik'
import SiteContext from '../../../../context/Site/SiteContext'
import Alert from '../../../../components/Alert'
import { AccordionItem, AccordionItemBody, AccordionItemTrigger } from '../../../../components/Accordion'
import FormBuilder from '../../../../components/FormBuilder'
import { educationCreditFormElements } from '../../Form/FormObject'

const EducationalTaxAccordion = ({ ...props }) => {
  const { site, lang, siteDispatch } = useContext(SiteContext)
  const { accordionOpenArr } = site.forms.taxCredits
  const { demographics, filingStatus } = site.forms.aboutYou.values
  const { values } = useFormikContext()

  const setAccordionOpenArr = (newAccordionOpenArr) => siteDispatch({ type: 'UPDATE_ACCORDION_OPEN', payload: newAccordionOpenArr })
  const showEducationWarning = () => filingStatus === 'single'
    && !demographics.includes('willClaimDependents')
    && values.aotc !== '' && values.llc !== ''

  return (
    <AccordionItem
      id="educationalAccordionItem"
      isOpen={accordionOpenArr[2]}
      dataTestId="educationalAccordion"
      {...props}
    >
      <AccordionItemTrigger
        accordionOpenArr={accordionOpenArr}
        setAccordionOpenArr={setAccordionOpenArr}
        title={lang('taxCredits.span.educationalAccordionTitle')}
        sendGAEvent
        buttonAriaLabel="Educational Accordion"
      />
      <AccordionItemBody>
        <FormBuilder options={educationCreditFormElements(lang, site)} />

        {showEducationWarning() && (
          <Alert
            id="educationCreditWarning"
            title={lang('global.h2.caution')}
            type="warning"
            autoFocus
            gaLabel="Education Credit Warning"
          >
            <p>{lang('taxCredits.p.educationCreditWarning')}</p>
          </Alert>
        )}
      </AccordionItemBody>
    </AccordionItem>
  )
}

export default EducationalTaxAccordion
