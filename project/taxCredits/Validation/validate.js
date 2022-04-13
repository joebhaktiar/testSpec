import * as Yup from 'yup'

const validationSchema = (lang, values) => Yup.object({}).shape({
  filingStatus: Yup.string().required(lang('aboutYou.a.filingStatusError')),
  jobOrPension: Yup.string()
    .when('filingStatus', {
      is: (value) =>
        value === 'single'
        || value === 'married'
        || value === 'head-of-household'
        || value === 'widow'
        || value === 'married-separate',
      then: Yup.string().required(lang('aboutYou.a.jobOrPensionError')),
      otherwise: Yup.string()
    })
})

export default validationSchema
