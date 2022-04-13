import * as Yup from 'yup'
import { showJobOrPension, showDemographics } from '../Form/FormObject'

// CONDITIONS
const jobOrPensionRequired = (jobOrPension, values) => !(showJobOrPension(values) && (jobOrPension === '' || jobOrPension === undefined))
const demographicsRequired = (demographics, values) => !(showDemographics(values) && !demographics.includes('willClaimDependents'))

// SCHEMA
const validationSchema = (lang, values) => Yup.object({}).shape({
  filingStatus: Yup.string().required(lang('aboutYou.a.filingStatusError')),
  jobOrPension: Yup.string()
    .test('jobOrPension is required', lang('aboutYou.a.jobOrPensionError'), (jobOrPension) => jobOrPensionRequired(jobOrPension, values)),
  demographics: Yup.array()
    .when('filingStatus', {
      is: (val) => val === 'head-of-household',
      then: Yup.array().test('demographics is required', lang('aboutYou.a.willClaimDependentsError', { ':filingStatus': lang('global.label.HoH') }), (demographics) => demographicsRequired(demographics, values)),
    })
    .when('filingStatus', {
      is: (val) => val === 'widow',
      then: Yup.array().test('demographics is required', lang('aboutYou.a.willClaimDependentsError', { ':filingStatus': lang('global.label.widow') }), (demographics) => demographicsRequired(demographics, values)),
    })
})

export default validationSchema
