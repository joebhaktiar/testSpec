import { useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUISlider from '@material-ui/core/Slider'
import SiteContext from '../../../context/Site/SiteContext'
import { formatMoney, gaEvent } from '../../../helpers'

const sliderStyleObject = {
  root: {
    color: '#F3F3F3',
    height: 16,
    border: 'none',
    padding: '12px 0',
    width: 'calc(100% - 27px)'
  },
  thumb: {
    height: 26,
    width: 50,
    borderRadius: 0,
    backgroundColor: '#fff',
    backgroundImage: 'url(/imgs/slider.svg)',
    // border: '2px solid #0073AF',
    marginTop: -5,
    marginLeft: '-25px',
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
      outline: '2px solid #2199e8'
    },
  },
  active: {},
  valueLabel: {
    left: '0',
    top: -25,
    '& *': {
      background: 'transparent',
      color: '#000',
      fontWeight: '600',
      fontSize: '1rem',
      transform: 'none',
      width: '50px'
    },
    '::before': {
      content: '*'
    },
  },
  track: {
    height: 16,
    borderRadius: 0,
    backgroundColor: '#0073AF'
  },
  rail: {
    width: '100%',
    height: 16,
    borderRadius: 0,
    backgroundColor: '#F3F3F3',
    border: '1px solid #c4c4c5'
  },
  mark: {
    backgroundColor: 'currentColor',
    height: 1,
    width: 0,
    marginTop: -3,
    top: 0,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor'
  },
  markLabel: {
    top: -14,
    fontSize: 44,
    color: 'black'
  }
}

const StyledSlider = withStyles(sliderStyleObject)(MUISlider)

const Slider = ({ slider }) => {
  const { site, siteDispatch } = useContext(SiteContext)
  const { maxValueForTheSlider,
    minValueForTheSlider,
    incrementsForTheSlider,
    marks,
    defaultValue,
    labelMargin } = slider

  const handleSliderChange = (_event, value) => {
    if (value !== site.slider.value) {
      siteDispatch({
        type: 'UPDATE_SLIDER',
        payload: { value },
      })

      gaEvent('Tax Witholding Estimator Results', 'Click', 'Results Refund Slider')
    }
  }

  return (
    <div className="arrowBox">
      <div style={{ marginBottom: labelMargin, marginLeft: 26 }}>
        <StyledSlider
          valueLabelDisplay="on"
          defaultValue={defaultValue}
          getAriaValueText={(value) => `${formatMoney(value)}`}
          aria-labelledby="Customizable Refund Amount"
          onChangeCommitted={handleSliderChange}
          step={incrementsForTheSlider}
          min={minValueForTheSlider}
          valueLabelFormat={formatMoney}
          max={maxValueForTheSlider}
          marks={marks}
        />
      </div>
      <div className="minMaxLabels">
        <span className="minMaxLeft">{formatMoney(0)}</span>
        <span className="minMaxRight">{formatMoney(maxValueForTheSlider)}</span>
      </div>
    </div>
  )
}

export default Slider
