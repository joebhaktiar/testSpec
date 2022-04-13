import { valuesTemplate, noneTemplate, resultsTemplate } from './childHelpers'

const updateChildValues = (site, siteDispatch, value, values) => {
  let i = 1
  const initValueTemp = {}
  const initResults = {}
  const initMatrix = {
    'live51Pct': [false, false, false],
    'claimOther': [false, false, false],
    'claimOtherConfirm': [null, null, null],
    'fileJoint': [false, false, false],
    'fileJointConfirm': [null, null, null],
    'permanentlyDisabled': [false, false, false],
    'relationship': [null, null, null],
    'age': [null, null, null],
    'student': [null, null, null],
    'younger': [null, null, null]
  }
  const num = parseInt(value)

  while (i <= num) {
    initValueTemp[`child${i}`] = valuesTemplate
    initResults[`child${i}`] = resultsTemplate
    i++
  }
  initValueTemp.none = noneTemplate

  const newForms = {
    ...site.forms,
    filingStatus: {
      ...site.forms.filingStatus,
      fsCalc: values.filingStatus === 'fsUnknown' ? values.filingStatus.fsCalc : values.filingStatus,
      values: {
        ...site.forms.filingStatus.values,
        ...values,
        numOfDependents: value
      }
    },
    qualifyingChildren: {
      ...site.forms.qualifyingChildren,
      completed: false,
      values: {
        ...site.forms.qualifyingChildren.values,
        child: { ...initValueTemp },
        'us50Percent': ''
      },
      qcResults: { ...initResults },
      matrix: { ...initMatrix }
    }
  }

  siteDispatch({
    type: 'UPDATE_FORMS',
    payload: newForms,
  })
}

export default updateChildValues
