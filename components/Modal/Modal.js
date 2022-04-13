import PropTypes from 'prop-types';
import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Heading from '../Heading'

function Modal({ title, close, children }) {
  useEffect(() => {
    document.getElementById('modal-close').focus()
  }, [])

  return (
    <div
      className="flex fixed h-screen w-screen top-0 left-0 items-center justify-center z-50 bg-black bg-opacity-50 fade-in"
      onClick={() => close()}
      role="alertdialog"
    >
      <div
        className="p-4 md:p-8 w-3/4 lg:w-2/5 flow-root bg-white"
        data-testid="modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close filing status help tip"
          className="float-right"
          type="button"
          onClick={() => close()}
          id="modal-close"
        >
          <FontAwesomeIcon
            className="mx-1"
            icon={faTimes}
            size="1x"
          />
        </button>
        <Heading level="1" className="text-2xl font-bold mb-2">{title}</Heading>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.any,
}

export default Modal
