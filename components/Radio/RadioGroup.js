import { memo } from 'react'
import PropTypes from 'prop-types'
import { useFormikContext, getIn } from 'formik'
import clsx from 'clsx'
import HelpTipButton from '../HelpTip/HelpTipButton'
import HelpTipBody from '../HelpTip/HelpTipBody'
import Radio from './Radio'
import Replacement from '../HtmlBuilder/Replacement'
import TextError from '../TextError'

const RadioGroup = (props) => {
  const {
    label,
    name,
    id,
    required = false,
    helpTip,
    hintText,
    dataTestId,
    options,
    horizontal = false,
    show = true,
    onClick,
    onChange,
    touchedfield,
    className,
    replacements = [],
    ...rest
  } = props
  const { errors, touched } = useFormikContext()

  return (
    <div
      data-testid={dataTestId}
      id={id}
      className={clsx(
        'fade-in',
        show ? 'block' : 'hidden'
      )}
    >
      <fieldset className={className} id={name}>
        <label htmlFor={name} data-testid={`${dataTestId}-label`} id={`${name}-label`} aria-label={`${label}${required ? '*' : ''}`}>
          <Replacement text={label} replace={replacements} />{required && <span className="text-red-500 ml-1">*</span>}

          {helpTip && (
            <HelpTipButton
              page={helpTip.page}
              expanded={helpTip.expanded}
              dataTestID={`${name}HelpTip`}
              name={name}
              aria-label={helpTip.ariaLabel}
              gaLabel={helpTip.gaLabel ? helpTip.gaLabel : helpTip.ariaLabel}
            />
          )}
        </label>

        {helpTip && (
          <HelpTipBody
            id={`${name}-helpTip`}
            tabIndex="0"
            expanded={helpTip.expanded}
            elements={helpTip.elements()}
          />
        )}

        {hintText && (
          <span data-testid={`${dataTestId}-hintText`} className="block text-gray-600 mt-1 text-sm">{hintText}</span>
        )}

        <Radio
          name={name}
          options={options}
          onChange={onChange}
          onClick={onClick}
          horizontal={horizontal}
          dataTestId={dataTestId}
          {...rest}
        />

        {getIn(errors, name) && getIn(touched, name) && (
          <TextError
            id={`${name}-error-message`}
            data-testid={`${name}-error`}
          >
            {getIn(errors, name)}
          </TextError>
        )}

      </fieldset>
    </div>
  )
}

RadioGroup.propTypes = {
  helpTip: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      ariaLabel: PropTypes.string,
      elements: PropTypes.func,
      expanded: PropTypes.bool,
      page: PropTypes.string
    })
  ]),
  id: PropTypes.string,
  hintText: PropTypes.string,
  className: PropTypes.string,
  options: PropTypes.array,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  show: PropTypes.bool,
  format: PropTypes.string,
  dataTestId: PropTypes.string,
  fullWidth: PropTypes.bool,
  horizontal: PropTypes.bool,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  touchedfield: PropTypes.any,
}

const memoizedComp = memo(RadioGroup)

export default memoizedComp
