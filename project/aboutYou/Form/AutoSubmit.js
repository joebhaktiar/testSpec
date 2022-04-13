import { useEffect, useContext } from 'react'
import { useFormikContext } from 'formik'
import SiteContext from '../../../context/Site/SiteContext'

const AutoSubmit = ({ isCompleted }) => {
  const { values } = useFormikContext()
  const { site, siteDispatch } = useContext(SiteContext)
  const isJobsOverflowed = values.filingStatus !== 'married' && site.forms.incomeWithholding.values.jobs.length > 10

  const newDemographicsArray = [...values.demographics]

  if (values.filingStatus === 'single' || values.filingStatus === 'head-of-household' || values.filingStatus === 'married-separate') {
    const is65OrOlderSpouseIndex = newDemographicsArray.indexOf('is65OrOlderSpouse')
    is65OrOlderSpouseIndex >= 0 && newDemographicsArray.splice(is65OrOlderSpouseIndex, 1)

    const blindSpouseIndex = newDemographicsArray.indexOf('blindSpouse')
    blindSpouseIndex >= 0 && newDemographicsArray.splice(blindSpouseIndex, 1)
  } else if (values.filingStatus === 'widow') {
    const is65OrOlderSpouseIndex = newDemographicsArray.indexOf('is65OrOlderSpouse')
    is65OrOlderSpouseIndex >= 0 && newDemographicsArray.splice(is65OrOlderSpouseIndex, 1)

    const blindSpouseIndex = newDemographicsArray.indexOf('blindSpouse')
    blindSpouseIndex >= 0 && newDemographicsArray.splice(blindSpouseIndex, 1)

    const claimedAsDependentIndex = newDemographicsArray.indexOf('claimedAsDependent')
    claimedAsDependentIndex >= 0 && newDemographicsArray.splice(claimedAsDependentIndex, 1)
  }

  const newJobsArr = [...site.forms.incomeWithholding.values.jobs]
  isJobsOverflowed && newJobsArr.splice(10)

  useEffect(() => {
    const newForms = {
      aboutYou: {
        ...site.forms.aboutYou,
        values: {
          ...site.forms.aboutYou.values,
          ...values,
          demographics: newDemographicsArray,
        },
        completed: isCompleted(values),
      },
      incomeWithholding: {
        ...site.forms.incomeWithholding,
        values: {
          ...site.forms.incomeWithholding.values,
          numOfJobs: newJobsArr.length,
          jobs: [...newJobsArr]
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
  }, [values])

  return null
}

export default AutoSubmit
