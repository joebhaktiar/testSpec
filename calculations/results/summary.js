import { formatMoney, checkForQC } from '../../helpers'
import routes from '../../templates/helpers/routes'

const summary = (values, langCode, qcResults) => {
  const earnedArray = []
  const unearnedArray = []
  const adjustmentsArray = []

  Object.keys(values.agi.values).forEach((fieldName) => {
    if (values.agi.values[fieldName].total > 0) {
      if (values.agi.values[fieldName].category === 'earned' || values.agi.values[fieldName].category === 'deductions') {
        earnedArray.push({
          indent: true,
          label: '',
          value: [`result.span.${fieldName}`, values.agi.values[fieldName].category === 'deductions'
            ? `${formatMoney(values.agi.values[fieldName].total)}`
            : formatMoney(values.agi.values[fieldName].total)],
          edit: routes(langCode, 'eitc').agi,
          ariaLabel: `agi.label.${fieldName}`,
        })
        earnedArray[0].label = 'earned'
      }

      if (values.agi.values[fieldName].category === 'unearned') {
        unearnedArray.push({
          indent: true,
          label: '',
          value: [`result.span.${fieldName}`, formatMoney(values.agi.values[fieldName].total)],
          edit: routes(langCode, 'eitc').agi,
          ariaLabel: `agi.label.${fieldName}`,
        })
        unearnedArray[0].label = 'unearned'
      }

      if (values.agi.values[fieldName].category === 'adjustments') {
        adjustmentsArray.push({
          indent: true,
          label: '',
          value: [`result.span.${fieldName}`, formatMoney(values.agi.values[fieldName].total)],
          edit: routes(langCode, 'eitc').agi,
          ariaLabel: `agi.label.${fieldName}`,
        })
        adjustmentsArray[0].label = 'adjustment'
      }
    }

    return null
  })

  const childValue = () => {
    const numFinal = checkForQC(qcResults).final
    if (numFinal === 0) {
      return 'results.p.noQualifyingChildren'
    }
    if (numFinal === 1) {
      return 'results.p.oneQualifyingChild'
    }
    if (numFinal === 2) {
      return 'results.p.twoQualifyingChildren'
    }
    return 'results.p.threeQualifyingChildren'
  }

  const childrenArray = [
    {
      label: 'children',
      value: childValue(),
      edit: routes(langCode, 'eitc').qualifyingChildren,
      ariaLabel: 'results.label.children',
    },
  ]

  const temp = [
    {
      label: 'taxYear',
      value: values.general.values.year,
      edit: routes(langCode, 'eitc').general,
      ariaLabel: 'results.label.taxYear',
    },
    {
      label: 'filingStatus',
      value: `global.label.${values.filingStatus.fsCalc}`,
      edit: routes(langCode, 'eitc').filingStatus,
      ariaLabel: 'results.label.filingStatus',
    },
    {
      label: 'agi',
      value: formatMoney(values.agi.values.results.agi),
      edit: routes(langCode, 'eitc').agi,
      ariaLabel: 'results.label.agi',
    },
  ]

  return [...temp, ...earnedArray, ...unearnedArray, ...adjustmentsArray, ...childrenArray]
}

export default summary
