const accordionOpenErrors = (errors, setAccordionOpenArr, accordionOpenArr) => {
  const newAccordionOpenArr = [...accordionOpenArr]

  if (errors.jobs) {
    accordionOpenArr.forEach((item, index) => {
      if (errors.jobs[index]) {
        newAccordionOpenArr[index] = true
      } else {
        newAccordionOpenArr[index] = false
      }
    })
  }

  setAccordionOpenArr(newAccordionOpenArr)
}

export default accordionOpenErrors
