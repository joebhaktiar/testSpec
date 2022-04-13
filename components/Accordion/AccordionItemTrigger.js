import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { gaEvent } from '../../helpers'
import AccordionPlus from '../Icons/AccordionPlus'
import AccordionMinus from '../Icons/AccordionMinus'
import Heading from '../Heading'

const AccordionItemTrigger = ({
  id,
  level,
  multiItem,
  isExpanded,
  setIsExpanded,
  disabled,
  activeIndex,
  setActiveIndex,
  index,
  children,
  accordionOpenArr,
  setAccordionOpenArr,
  isOpen,
  dataTestId,
  title,
  site,
  siteDispatch,
  lang,
  bgColor = '#fff',
  className,
  accordionSmall,
  sendGAEvent = false,
  buttonAriaLabel
}) => {
  const iconClass = clsx('fill-current inline-block', disabled ? 'text-gray-600' : 'text-blue-500', accordionSmall ? 'text-lg' : 'text-1.5xl')
  const icon = isExpanded ? (
    <AccordionMinus className={iconClass} />
  ) : (
    <AccordionPlus className={iconClass} />
  )

  const handleClick = () => {
    // if (disabled) {
    //   setIsExpanded(false)
    // } else {
    if (multiItem) {
      setIsExpanded(!isExpanded)

      const newAccordionOpenArr = [...accordionOpenArr]
      newAccordionOpenArr[index] = !isExpanded
      setAccordionOpenArr(newAccordionOpenArr)
    } else {
      if (multiItem) {
        setIsExpanded(!isExpanded)
      } else {
        setActiveIndex(index)

        if (activeIndex === index) {
          setIsExpanded(!isExpanded)
        }
      }
    }

    // if (!isExpanded) {
    //   gaEvent(gaLabel, 'Open', children)
    // }
    // }
  }

  useEffect(() => {
    if (!multiItem) {
      if (activeIndex === index) {
        setIsExpanded(true)
      } else {
        setIsExpanded(false)
      }
    }
  }, [activeIndex])

  useEffect(() => {
    if (multiItem) {
      if (isOpen) {
        setIsExpanded(true)
        sendGAEvent && gaEvent('TWE Tax Credits Accordion', 'Open', title)
      } else {
        setIsExpanded(false)
      }
    }
  }, [isOpen])

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={
        clsx(
          'w-full m-0 flex items-center font-bold border-gray-500 border-t',
          accordionSmall ? 'p-2 text-md' : 'p-4 text-xl',
          className
        )
      }
    >
      <button
        type="button"
        style={{ top: '3px' }}
        onClick={() => handleClick()}
        aria-expanded={isExpanded}
        className={clsx(
          'Accordion-trigger Accordion-icon mr-2 flex',
          disabled && 'cursor-not-allowed text-gray-600'
        )}
        aria-controls={id}
        aria-label={buttonAriaLabel}
        id={`${id}-trigger`}
        data-testid={`${dataTestId}-trigger`}
        disabled={disabled}
      >
        {icon}
      </button>

      <Heading
        level={level}
        id={`accordionHeading${index}`}
        className={clsx('Accordion-title inline-block')}
        dataTestId={`${dataTestId}-title`}
        onBlur={(e) => {
          if (e.target.textContent.length === 0) {
            e.target.innerText = lang('incomeWithholding.h2.accordionTitle', { ':number': lang(`global.span.number${index + 1}`) })
          }
        }}
      >
        {title}
      </Heading>

      {children}
    </div>
  )
}

AccordionItemTrigger.propTypes = {
  id: PropTypes.string,
  level: PropTypes.string,
  multiItem: PropTypes.bool,
  gaLabel: PropTypes.string,
  isExpanded: PropTypes.bool,
  setIsExpanded: PropTypes.func,
  disabled: PropTypes.bool,
  activeIndex: PropTypes.number,
  setActiveIndex: PropTypes.func,
  index: PropTypes.number,
  children: PropTypes.any,
  accordionOpenArr: PropTypes.any,
  setAccordionOpenArr: PropTypes.any,
  isOpen: PropTypes.bool,
}

export default AccordionItemTrigger
