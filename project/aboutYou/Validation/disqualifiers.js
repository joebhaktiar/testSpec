import * as Alerts from '../Structure/Alerts'
import { showJobOrPension } from '../Form/FormObject'

const disqualifiers = (values) => {
  const dq = {}

  if (showJobOrPension(values) && values.jobOrPension === 'no') {
    dq.jobOrPension = {
      id: 'jobOrPension',
      elements: Alerts.jobOrPension()
    }
  }

  return dq
}

export default disqualifiers
