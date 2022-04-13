import PropTypes, { element } from 'prop-types'
import React, { useContext, useEffect } from 'react'
import { animateScroll } from 'react-scroll'
import { buildClassList } from '../../helpers'
import { CONTAINER_LG, CONTAINER_XL } from '../../helpers/constants'
import HeaderNav from './HeaderNav'
import HeaderNavItem from './HeaderNavItem'
import OfficialSiteBanner from './OfficialSiteBanner'
import IRSLogo from '../Icons/IRSLogo'
import Link from '../Link'
import HeaderContext from '../../context/Header/HeaderContext'

const HeaderLogo = (props) => {
  const { logoLink, children } = props

  return (
    <Link
      href={logoLink}
      className="logo block h-8-5 w-24 my-4 lg:w-25 lg:h-9"
      ariaLabel="IRS Home"
      id="irsgovLink"
      data-testid="irsgovLink"
      external
    >
      {children}
    </Link>
  )
}

HeaderLogo.propTypes = {
  children: PropTypes.any,
  logoLink: PropTypes.any,
}

const Header = ({ headerNavItems, mobileHeaderNavItems, title, children, dataTestId, ...props }) => {
  const { header, width, lang, langCode, headerDispatch } = useContext(HeaderContext)
  const logoLink
    = langCode === undefined || langCode === 'en' ? 'https://www.irs.gov/' : `https://www.irs.gov/${langCode}`

  const headerNavDesktop = (
    <div className="flex flex-grow hidden lg:block my-4">
      <HeaderNav className="headerNav" data-testid="headerNavDesktop">
        {headerNavItems
          && Object.values(headerNavItems).map(({ text, ...rest }) => (
            <HeaderNavItem languageButton="languageButton" {...rest}>
              {text}
            </HeaderNavItem>
          ))}
      </HeaderNav>
    </div>
  )

  const headerNavMobile = (
    <div className="flex justify-end flex-grow lg:hidden mt-4 uppercase">
      <HeaderNav className="headerNav" data-testid="headerNavMobile">
        {mobileHeaderNavItems
          && Object.values(mobileHeaderNavItems).map(({ text, toggleText, ...rest }) => (
            <HeaderNavItem className="uppercase" {...rest}>
              {header.menuState ? toggleText : text}
            </HeaderNavItem>
          ))}
      </HeaderNav>
    </div>
  )

  const toggle = (value) => {
    headerDispatch({
      type: 'TOGGLE_LANG',
      payload: value,
    })
  }

  useEffect(() => {
    if (header.langState) {
      toggle(false)
    }
  }, [])

  return (
    <header
      aria-label="Site"
      data-testid="header-component"
      className={buildClassList(['top-0 lg:relative z-40', width < CONTAINER_LG ? 'isStickyNav' : ''])}
    >
      <a
        className="skipnav absolute p-6 left-0 bg-transparent"
        title="Skip to main content"
        href="#main-content"
        onClick={() => {
          // animateScroll.scrollTo(100, { duration: 600 })
          const mainContent = document.getElementById('main-content')
          console.log('mainContent', mainContent)
          setTimeout(() => {
            mainContent.focus()
          }, 300)
        }
        }
      >
        Skip to main content
      </a>

      <OfficialSiteBanner message={lang('global.p.usGov')} data-testid="OfficialSiteBanner" />
      <div className="header bg-blue-500">
        <div style={{ maxWidth: `${CONTAINER_XL}px` }} className="flex relative px-5 mx-auto">
          <HeaderLogo {...props} logoLink={logoLink} logoLinkTitle={title}>
            <IRSLogo
              className="h-8-5 w-20 sm:w-24 lg:w-25 lg:h-auto text-white"
              focusable={false}
              data-testid="IRSLogo"
            />
          </HeaderLogo>
          {headerNavMobile}
          {headerNavDesktop}
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  children: PropTypes.any,
  dataTestId: PropTypes.any,
  headerNavItems: PropTypes.array,
  mobileHeaderNavItems: PropTypes.array,
  title: PropTypes.any,
}

export default Header
