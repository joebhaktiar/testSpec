import PropTypes from 'prop-types'
import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Alert from '../../components/Alert'
import IRSHeader from '../../components/IRSHeader'
import IRSNavBar from '../../components/IRSNavBar'
import IRSFooter from '../../components/IRSFooter'
import language from '../../components/Language'
import Heading from '../../components/Heading'
import HeaderContext from '../../context/Header/HeaderContext'
import FooterContext from '../../context/Footer/FooterContext'
import footer from '../../context/Footer/footer.json'
import { gaInit } from '../../helpers'
import { routes } from '../helpers'
import TWEBreadCrumbs from './TWEBreadCrumbs'
import TWEStepIndicator from './TWEStepIndicator'

const MainTemplate = ({ page, testId, children }) => {
  const router = useRouter()
  const { header, toggleMenu, langCode } = useContext(HeaderContext)
  const [showUntranslated, setShowUntranslated] = useState(false)
  const root = typeof window !== 'undefined' ? document.getElementsByTagName('html')[0] : null

  const langCodeCheck = () => {
    const temp = Object.keys(header.langList)

    if (!temp.includes(langCode) && langCode !== undefined) {
      if (typeof window !== 'undefined') {
        window.location.replace(routes(langCode, 'twe').localhost)
      }
    }
  }

  const lang = (key, replacements) => (
    language(key, replacements, langCode)
  )

  const Footer = {
    footer,
    lang,
    langCode,
  }

  useEffect(() => {
    langCodeCheck()

    setShowUntranslated(!header.langList[langCode || 'en'])
    root.setAttribute('lang', langCode || 'en')
  }, [langCode])

  useEffect(() => {
    langCodeCheck()
  }, [])

  return (
    <>
      <IRSHeader />
      <IRSNavBar />
      <div role="main" id="main-content" className="container mb-20 pt-1" tabIndex="0">
        <div
          tabIndex="0"
          id="overlay"
          onClick={() => toggleMenu()}
          style={{ display: header.menuState ? 'block' : 'none' }}
          role="main"
        ></div>

        <TWEBreadCrumbs data-testid={testId} pathName={router.pathname} />

        <Heading level="1" className="text-4xl font-bold" data-testid={testId}>
          {lang('global.h1.appTitle')}
        </Heading>

        <p className="text-lg" data-testid={`${testId}Intro`}>{lang('global.p.appTitle')}</p>

        <TWEStepIndicator activePage={page} />

        <hr className="border-black mb-10" aria-hidden tabIndex="-1" />

        {showUntranslated && (
          <Alert
            title={lang('global.heading.nonTranslatedWarning')}
            id="untranslatedWarning"
            type="warning"
            gaLabel="TWE Untranslated Warning"
            dataTestId="untranslated"
          >
            {lang('global.p.nonTranslatedWarning')}
          </Alert>
        )}

        {children}

      </div>
      <FooterContext.Provider value={Footer}>
        <IRSFooter />
      </FooterContext.Provider>
    </>
  )
}

MainTemplate.propTypes = {
  page: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default MainTemplate
