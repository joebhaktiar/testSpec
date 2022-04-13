import PropTypes from 'prop-types'
import React, { useContext, useEffect } from 'react'
import Link from '../Link'
import { buildClassList } from '../../helpers'
import { CONTAINER_LG } from '../../helpers/constants'
import HeaderContext from '../../context/Header/HeaderContext'

const LangSwitcher = ({ list }) => {
  const { header, headerDispatch, width } = useContext(HeaderContext)

  const toggle = (value) => {
    headerDispatch({
      type: 'TOGGLE_LANG',
      payload: value,
    })
  }

  const getList = () =>
    list.map((item) => (
      <li key={item.key} className={item.langCode}>
        <Link
          router
          asHref={item.asHref}
          langCode={item.langCode}
          href={item.href}
          className={buildClassList([
            'languageLink text-blue-500 p-4 block text-left font-bold leading-none',
            'hover:text-blue-600 focus:text-blue-600 active:text-blue-800',
          ])}
          data-testid={width < CONTAINER_LG ? item.mobileDataTestId : item.desktopDataTestId}
        >
          {item.text}
        </Link>
      </li>
    ))

  useEffect(() => {
    const handleClick = (e) => {
      const closestEl = e.target.closest('#dropdownMenu')
      const langButton = document.getElementById('languageButton')
      const navLangButton = document.getElementById('navLangButton')

      if (e.target === langButton || e.target === navLangButton) {
        return
      }

      if (!closestEl) {
        toggle(false)
      }
    }

    document.body.addEventListener('click', handleClick)

    return () => {
      document.body.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <>
      <ul
        id="dropdownMenu"
        className={buildClassList([
          'dropdownMenu bg-gray-400 ',
          'lg:absolute lg:z-50 lg:w-48 lg:mt-2 lg:border-gray-400 lg:shadow',
          header.langState ? 'visible' : 'hidden',
        ])}
      >
        {list && getList(list)}
      </ul>
    </>
  )
}

LangSwitcher.propTypes = {
  list: PropTypes.array,
  switchLanguage: PropTypes.func,
}

export default LangSwitcher
