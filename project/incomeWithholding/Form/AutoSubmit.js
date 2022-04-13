import { useEffect, useContext } from 'react'
import { useFormikContext } from 'formik'
import SiteContext from '../../../context/Site/SiteContext'

const AutoSubmit = ({ isCompleted }) => {
  const { values, errors } = useFormikContext()
  const { site, siteDispatch } = useContext(SiteContext)

  useEffect(() => {
    const newForms = {
      aboutYou: site.forms.aboutYou,
      incomeWithholding: {
        ...site.forms.incomeWithholding,
        completed: isCompleted(values, errors),
        values: {
          ...site.forms.incomeWithholding.values,
          ...values,
        },
      },
      adjustments: site.forms.adjustments,
      deductions: site.forms.deductions,
      taxCredits: site.forms.taxCredits,
      results: site.forms.results,
    }

    siteDispatch({
      type: 'UPDATE_FORMS',
      payload: newForms,
    })
  }, [values, errors])

  return null
}

export default AutoSubmit
