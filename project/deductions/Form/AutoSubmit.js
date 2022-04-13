import { useEffect, useContext } from 'react'
import { useFormikContext } from 'formik'
import SiteContext from '../../../context/Site/SiteContext'
import deductionsCalc from '../helpers/deductionsCalc'

const AutoSubmit = ({ isCompleted }) => {
  const { values } = useFormikContext()
  const { site, siteDispatch } = useContext(SiteContext)

  useEffect(() => {
    const newForms = {
      aboutYou: site.forms.aboutYou,
      incomeWithholding: site.forms.incomeWithholding,
      adjustments: site.forms.adjustments,
      deductions: {
        ...site.forms.deductions,
        values: {
          ...site.forms.deductions.values,
          ...values,
          deductionsTotal: deductionsCalc(values),
        },
        completed: isCompleted(values),
      },
      taxCredits: site.forms.taxCredits,
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
