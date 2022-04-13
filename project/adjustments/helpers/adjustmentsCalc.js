import { formatNumber } from '../../../helpers'

const adjustmentsCalc = (values, filingStatus, selfEmploymentChecked) => {
  const categories = Object.keys(values.adjustments)
  const totalsArr = []

  const categoryAmounts = categories.map((category) => {
    if (['seHealthInsurance', 'sepSimple'].includes(category)) {
      if (selfEmploymentChecked) {
        const infoArray = values.adjustments[category].info
        const amounts = infoArray.map((item) => item.amount)

        return amounts
      }
    } else if (['seHealthInsuranceSpouse', 'sepSimpleSpouse'].includes(category)) {
      if (filingStatus === 'married' && selfEmploymentChecked) {
        const infoArray = values.adjustments[category].info
        const amounts = infoArray.map((item) => item.amount)

        return amounts
      }
    } else {
      const infoArray = values.adjustments[category].info
      const amounts = infoArray.map((item) => item.amount)

      return amounts
    }

    return []
  })

  categoryAmounts.forEach((infoArr) => {
    infoArr.forEach((item) => {
      const num = (item === '' || Number.isNaN(parseFloat(formatNumber(item)))) ? 0 : parseFloat(formatNumber(item))

      totalsArr.push(num)
    })
  })

  const adjustmentsTotal = totalsArr.reduce((total, num) => total + num, 0)

  return adjustmentsTotal
}

export default adjustmentsCalc
