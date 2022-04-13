import * as Yup from 'yup'

const validationSchema = (lang) => Yup.object({}).shape({
  deductions: Yup.string().required(lang('deductions.a.deductionsTypeRequiredError'))
})

export default validationSchema
