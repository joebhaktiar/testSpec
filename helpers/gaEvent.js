import ReactGA from 'react-ga'

const gaEvent = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
    // value: process.env.NODE_ENV !== "production" ? 0 : 1
  })
}

export default gaEvent
