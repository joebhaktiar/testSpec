import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import StepIndicator, { StepIndicatorItem } from '../../components/StepIndicator'
import SiteContext from '../../context/Site/SiteContext'
import routes from '../helpers/routes'

const TWEStepIndicator = ({ activePage }) => {
  const { site, width, lang, langCode } = useContext(SiteContext)
  const stepIndicatorSteps = Object.keys(site.forms)
  const activeStep = activePage === 'default' ? '' : lang(site.forms[activePage].stepIndicatorTitle)
  const numOfSteps = Object.keys(site.forms).length
  const stepNumber = activePage === 'default' ? 'null' : Object.keys(site.forms).indexOf(activePage)
  const title = `${lang('global.span.step')} ${stepNumber + 1} ${lang('global.span.of')} ${numOfSteps}: ${activeStep}`

  const stepIndicatorStepsInfo = stepIndicatorSteps.map((name, index) => {
    const item = site.forms[name]
    const asPath = routes(langCode, 'twe')[name]
    const path = langCode === 'en' ? asPath : asPath.replace(`/${langCode}`, '/[langCode]')

    return (
      <StepIndicatorItem
        key={index}
        title={lang(item.stepIndicatorTitle)}
        completed={item.completed}
        path={path}
        asPath={asPath}
        stepNumber={index + 1}
        active={activePage === name}
      />
    )
  })

  return (
    <StepIndicator
      width={width}
      title={title}
    >
      {stepIndicatorStepsInfo}
    </StepIndicator>
  )
}

TWEStepIndicator.propTypes = {
  activePage: PropTypes.string
}

export default TWEStepIndicator
