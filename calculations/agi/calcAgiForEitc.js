import totalAgiCalc from './totalAgiCalc'

const calcAgiForEitc = (values) => {
  let earned = 0
  let unearned = 0
  let adjustments = 0
  let deductions = 0

  Object.keys(values).forEach((item) => {
    switch (values[item].category) {
      case 'earned':
        earned += values[item].total
        break
      case 'unearned':
        unearned += values[item].total
        break
      case 'adjustments':
        adjustments += values[item].total
        break
      case 'deductions':
        deductions += values[item].total
        break
      default:
        null
    }
  })

  const total = totalAgiCalc(earned, unearned, adjustments, deductions)

  return {
    agi: total < 0 ? 0 : total,
    earned,
    deductions
  }
}

export default calcAgiForEitc
