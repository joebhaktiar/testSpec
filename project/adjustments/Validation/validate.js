const validate = (values, lang) => {
  const errors = {}

  Object.keys(values.adjustments).forEach((item) => {
    if (values.adjustments[item].checked) {
      if (!values.adjustments[item].info[0].amount || values.adjustments[item].info[0].amount === '$.') {
        errors[`adjustments.${item}.info[0].amount`] = lang(`adjustments.a.${item}RequiredError`)
      }
    }
  })

  return errors
}

export default validate
