import PropTypes from 'prop-types'
import { useEffect, useReducer, useState } from 'react'
import Head from 'next/head'
import language from '../components/Language'
import Spinner from '../components/Spinner'
import HeaderContext from '../context/Header/HeaderContext'
import HeaderReducer from '../context/Header/HeaderReducer'
import header from '../context/Header/header.json'
import SiteContext from '../context/Site/SiteContext'
import SiteReducer from '../context/Site/SiteReducer'
import site from '../context/Site/site.json'
import { TOGGLE_LANG, TOGGLE_SEARCH, TOGGLE_MENU, TOGGLE_NAV } from '../context/types'
import '../public/css/react-datepicker.min.css'
import '../styles/index.css'
import '../components/Spinner/Spinner.css'
import stage from '../templates/twe/stage'

function MyApp({ Component, pageProps, router }) {
  const foreseeStage = stage === 'prod' ? 'production' : 'staging'

  const { query } = router
  const langCode = query.langCode || 'en'
  const initialHeaderState = {
    header,
  }

  const initialSiteState = {
    site,
  }

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height,
    }
  }

  const w = { width: 992 }
  const [windowDimensions, setWindowDimensions] = useState(w)
  const [showSpinner, setShowSpinner] = useState(true)
  const [pdfParams, setPdfParams] = useState()
  const [currentRateParams, setCurrentRateParams] = useState()
  const [futureRateParams, setFutureRateParams] = useState()
  const { width } = windowDimensions
  const [headerState, headerDispatch] = useReducer(HeaderReducer, initialHeaderState)
  const [siteState, siteDispatch] = useReducer(SiteReducer, initialSiteState)
  const rootEl = typeof window !== 'undefined' ? document.getElementsByTagName('html')[0] : null

  const fetchParams = async () => {
    try {
      const { pdfParamsURL } = siteState.site.env[stage]
      await fetch(pdfParamsURL).then((res) => res.json()).then((data) => setPdfParams(data))

      const { currentRatesParamsURL } = siteState.site.env[stage]
      await fetch(currentRatesParamsURL).then((res) => res.json()).then((data) => {
        setCurrentRateParams(data)
      })

      // const { futureRatesParamsURL } = siteState.site.env[stage]
      // await fetch(futureRatesParamsURL).then((res) => res.json()).then((data) => setFutureRateParams(data))
    } catch (e) {
      console.log('Error fetching params', e)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!header.menuState) {
        document.body.classList.remove('openMenu')
        rootEl.removeAttribute('class', 'openMenu')
      }
    }

    fetchParams()

    const handleResize = () => {
      setWindowDimensions(getWindowDimensions())
    }

    setWindowDimensions(getWindowDimensions())

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (currentRateParams) {
      setShowSpinner(false)
    } else {
      setShowSpinner(true)
    }
  }, [currentRateParams])

  const toggleLang = () => {
    headerDispatch({
      type: TOGGLE_LANG,
      payload: !headerState.header.langState,
    })
  }

  const toggleSearch = (e) => {
    if (e) {
      e.preventDefault()
      window.setTimeout(() => {
        document.getElementById('header-search').focus()
      }, 0)
    }

    const newSearch = {
      ...headerState.header.search,
      show: !headerState.header.search.show,
    }

    headerDispatch({
      type: TOGGLE_SEARCH,
      payload: newSearch,
    })

    if (headerState.header.menuState) {
      headerDispatch({
        type: TOGGLE_MENU,
        payload: !headerState.header.menuState,
      })
    }
  }

  const toggleMenu = (e) => {
    if (e) {
      e.preventDefault()
    }

    headerDispatch({
      type: TOGGLE_MENU,
      payload: !headerState.header.menuState,
    })

    if (headerState.header.search.show) {
      toggleSearch()
    }

    const addBodyClass = () => document.body.classList.add('openMenu')
    const removeBodyClass = () => document.body.classList.remove('openMenu')

    const root = document.getElementsByTagName('html')[0]

    headerState.header.menuState ? removeBodyClass() : addBodyClass()
    headerState.header.menuState ? root.removeAttribute('class', 'openMenu') : root.setAttribute('class', 'openMenu')
  }

  const toggleNav = (key) => {
    headerDispatch({
      type: TOGGLE_NAV,
      payload: key,
    })
  }

  const submitSearch = (formID) => {
    document.getElementById(formID).submit()
  }

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.keyCode === 27) {
        toggleNav(null)
        if (headerState.header.search.show) {
          toggleSearch()
        }
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [headerState.header.search.show])

  const lang = (key, replacements) => (
    language(key, replacements, langCode)
  )

  const Header = {
    header: headerState.header,
    headerDispatch,
    toggleMenu,
    toggleLang,
    toggleSearch,
    toggleNav,
    submitSearch,
    width,
    lang,
    langCode,
  }

  const TWE = {
    site: siteState.site,
    siteDispatch,
    width,
    lang,
    langCode,
    env: siteState.site.env[stage],
    pdfParams,
    currentRateParams,
    // futureRateParams
  }

  return (
    <>
      <Head>
        {/* FORESEE */}
        <script src={`https://gateway.foresee.com/sites/irs-gov/${foreseeStage}/gateway.min.js`}></script>
      </Head>

      {showSpinner && (
        <div
          className="spinnerWrapper"
          style={showSpinner ? { display: 'flex', flexDirection: 'column' } : { display: 'none' }}
        >
          <Spinner color="white" size="80px" />
          <p className="text-white font-bold text-2xl mt-3">{lang('global.p.loading')}</p>
        </div>
      )}

      {!showSpinner && (
        <HeaderContext.Provider value={Header}>
          <SiteContext.Provider value={TWE}>
            <Component {...pageProps} key={router.asPath} />
          </SiteContext.Provider>
        </HeaderContext.Provider>
      )}
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.func,
  router: PropTypes.any,
}

export default MyApp
