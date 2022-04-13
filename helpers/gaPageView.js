import ReactGA from 'react-ga'

const gaPageView = (location, pageTitle) => {
  ReactGA.set({ location })
  ReactGA.pageview(location, undefined, pageTitle)
}

export default gaPageView
