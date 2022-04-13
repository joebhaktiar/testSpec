import { formatNumber } from '../../../helpers'

const deductionsCalc = (values) => {
  const categories = Object.keys(values.deductionPayments)
  const totalsArr = []

  const categoryAmounts = categories.map((category) => {
    const infoArray = values.deductionPayments[category].info
    const amounts = infoArray.map((item) => item.amount)

    return amounts
  })

  categoryAmounts.forEach((infoArr) => {
    infoArr.forEach((item) => {
      const num = (item === '' || Number.isNaN(parseFloat(formatNumber(item)))) ? 0 : parseFloat(formatNumber(item))

      totalsArr.push(num)
    })
  })

  const deductionsTotal = totalsArr.reduce((total, num) => total + num, 0)

  return deductionsTotal
}

export default deductionsCalc
