import { useEffect, useContext } from 'react'
import { useFormikContext } from 'formik'
import SiteContext from '../../../context/Site/SiteContext'

const AutoSubmit = ({ isCompleted }) => {
  const { values } = useFormikContext()
  const { site, siteDispatch } = useContext(SiteContext)

  useEffect(() => {
    const newForms = {
      aboutYou: site.forms.aboutYou,
      incomeWithholding: site.forms.incomeWithholding,
      adjustments: site.forms.adjustments,
      deductions: site.forms.deductions,
      taxCredits: {
        ...site.forms.taxCredits,
        values: {
          ...site.forms.taxCredits.values,
          ...values,
        },
        completed: isCompleted(values),
      },
      results: site.forms.results,
    }

    siteDispatch({
      type: 'UPDATE_FORMS',
      payload: newForms,
    })
  }, [values])

  return null
}

export default AutoSubmit
