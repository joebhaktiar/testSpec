import { useEffect, useContext } from 'react'
import { useFormikContext } from 'formik'
import SiteContext from '../../../context/Site/SiteContext'
import adjustmentsCalc from '../helpers/adjustmentsCalc'

const AutoSubmit = ({ isCompleted }) => {
  const { values } = useFormikContext()
  const { site, siteDispatch } = useContext(SiteContext)

  useEffect(() => {
    const newForms = {
      aboutYou: site.forms.aboutYou,
      incomeWithholding: site.forms.incomeWithholding,
      adjustments: {
        ...site.forms.adjustments,
        values: {
          ...site.forms.adjustments.values,
          ...values,
          adjustmentsTotal: adjustmentsCalc(values, site.forms.aboutYou.values.filingStatus, site.forms.incomeWithholding.values.otherIncome.selfEmployment.checked),
        },
        completed: isCompleted(values),
      },
      deductions: site.forms.deductions,
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
