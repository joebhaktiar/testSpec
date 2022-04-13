import PropTypes from 'prop-types'
import { useContext } from 'react'
import clsx from 'clsx'
import SiteContext from '../../../context/Site/SiteContext'

const Gauge = ({ angleClass }) => {
  const { langCode } = useContext(SiteContext)

  return (
    <div className="gauge">
      <img src={`/imgs/gauge-${langCode}.svg`} className="gaugeBG" alt="Estimated over/under payment" tabIndex={0} />
      <img src="/imgs/needle.svg" className={clsx('needle', angleClass)} aria-hidden tabIndex={-1} />
    </div>
  )
}

Gauge.propTypes = {
  angleClass: PropTypes.oneOf(['zero', 'owe', 'refund', 'oweLittle', 'refundLittle']),
}

export default Gauge
