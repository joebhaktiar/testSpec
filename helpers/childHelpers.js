
const checkForQC = (qcResults) => {
  let counterMiddle = 0
  let counterFinal = 0
  let counterCompleted = 0

  Object.keys(qcResults).forEach((item) => {
    if (qcResults[item].middle) {
      counterMiddle++
    }
    if (qcResults[item].final) {
      counterFinal++
    }
    if (qcResults[item].completed) {
      counterCompleted++
    }
  })

  return { middle: counterMiddle, final: counterFinal, completed: counterCompleted }
}

const valuesTemplate = {
  'live51Pct': false,
  'claimOther': false,
  'claimOtherConfirm': null,
  'fileJoint': false,
  'fileJointConfirm': null,
  'permanentlyDisabled': false,
  'relationship': null,
  'age': null,
  'student': null,
  'younger': null
}

const noneTemplate = {
  'live51Pct': false,
  'claimOther': false,
  'fileJoint': false,
  'permanentlyDisabled': false,
}

const resultsTemplate = {
  'middle': false,
  'final': false,
  'completed': false
}

const numToText = (num) => {
  const list = {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
  }

  return list[num]
}

export { checkForQC, valuesTemplate, noneTemplate, resultsTemplate, numToText }
