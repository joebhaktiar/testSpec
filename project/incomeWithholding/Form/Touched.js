import { useEffect } from 'react'
import { useFormikContext } from 'formik'

const Touched = ({ form }) => {
  const { setFieldTouched, values } = useFormikContext()

  const fieldNames = () => {
    let filteredArr = form.filter((item) => item.show === false && item.type !== 'htmlBuilder').map((item) => item?.name)

    filteredArr = [...filteredArr]

    return filteredArr
  }

  useEffect(() => {
    fieldNames().forEach((item) => {
      if (item.includes('dateRange')) {
        setFieldTouched(`${item}.startDate`, false, false)
        setFieldTouched(`${item}.endDate`, false, false)
      } else if (item.includes('hourlyPayStatements')) {
        setFieldTouched(`${item}`, [false], false)
      } else {
        setFieldTouched(item, false, false)
      }
    })
  }, [values])

  return null
}

export default Touched
