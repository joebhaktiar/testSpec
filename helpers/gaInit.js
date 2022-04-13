import ReactGA from 'react-ga'

const gaInit = (gaCode) => {
  ReactGA.initialize(gaCode, {
    allowLinker: true,
    titleCase: false,
  })

  const hostname = window.location.host

  ReactGA.set({ hostname: hostname || 'apps.irs.gov' })
}

export default gaInit
