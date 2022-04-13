import PropTypes from 'prop-types'
import React from 'react'

/**
 * Renders the standard official site banner indicating that this site is an
 * official government site.
 *
 * This component is usually rendered in the common {@link Header}. You should
 * only need to add this manually if you are implementing your own header.
 * In that case, this should be the element that is at the very top of the
 * window.
 *
 * For more information, please consult the
 * [U.S. Web Design Standards](https://standards.usa.gov).
 */
const OfficialSiteBanner = ({ fluid, message, ...rest }) => (
  <div className="bg-gray-400 lg:block hidden" {...rest}>
    <div className="container">
      <div className="flex">
        <img
          src="data:image/png;base64,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"
          width="24"
          height="17"
          className="mr-3"
          alt="U.S. Flag"
          data-testid="U.S. Flag"
          style={{ width: '24px', height: '17px', marginTop: '4px' }}
        />
        <span className="text-xs my-1plus" data-testid="US Flag text">
          {message ? message : 'An official website of the United States Government'}
        </span>
      </div>
    </div>
  </div>
)

OfficialSiteBanner.propTypes = {
  fluid: PropTypes.any,
  message: PropTypes.any,
}

export default OfficialSiteBanner