import { showSpouseAge, showDeceasedSpouseAge } from '../components/Pages/eitc/filing-status/Helpers/fsScenarios'

const qcCheck = (values, childNumber, age, spouseAge, deceasedSpouseAge, fsValues) => {
  const relationship = (values[`child${childNumber}`] && values[`child${childNumber}`].relationship) || ''
  const childAge = (values[`child${childNumber}`] && values[`child${childNumber}`].age) || ''
  const student = (values[`child${childNumber}`] && values[`child${childNumber}`].student) || ''
  const younger = (values[`child${childNumber}`] && values[`child${childNumber}`].younger) || ''
  const childPermDisable = (values[`child${childNumber}`] && values[`child${childNumber}`].permanentlyDisabled) || ''

  let finalAge = age

  if (age === 'under24'
    && ((showSpouseAge(fsValues, age) && spouseAge === 'spouseAge-under24')
      || (showDeceasedSpouseAge(fsValues, age) && deceasedSpouseAge === 'deceasedSpouseAge-under24'))) {
    finalAge = 'under24'
  }

  if ((showSpouseAge(fsValues, age) && spouseAge === 'spouseAge-25-64')
    || (showDeceasedSpouseAge(fsValues, age) && deceasedSpouseAge === 'deceasedSpouseAge-25-64')) {
    finalAge = 'age-25-64'
  }

  if ((showSpouseAge(fsValues, age) && spouseAge === 'spouseAge-over65')
    || (showDeceasedSpouseAge(fsValues, age) && deceasedSpouseAge === 'deceasedSpouseAge-over65')) {
    finalAge = 'over65'
  }

  if (relationship === 'other') {
    return 'children.p.notQualifies'
  }

  if (!childPermDisable && childAge === 'age-over24') {
    return 'children.p.notQualifies'
  }

  if (!childPermDisable && childAge === 'age-19-23' && student === 'no') {
    return 'children.p.notQualifies'
  }

  if (!childPermDisable && younger === 'no') {
    return 'children.p.notQualifies'
  }

  if (childPermDisable && relationship !== 'other' && relationship !== '') {
    return 'children.p.qualifies'
  }

  if (finalAge === 'under24') {
    if (relationship !== 'other' && childAge === 'age-under18' && younger === 'yes') {
      return 'children.p.qualifies'
    }

    if (relationship !== 'other' && childAge === 'age-19-23' && student === 'yes' && younger === 'yes') {
      return 'children.p.qualifies'
    }
  }

  if (finalAge === 'age-25-64' || finalAge === 'over65') {
    if (relationship !== 'other' && childAge === 'age-under18') {
      return 'children.p.qualifies'
    }

    if (relationship !== 'other' && childAge === 'age-19-23' && student === 'yes') {
      return 'children.p.qualifies'
    }
  }

  return ''
}

export default qcCheck
