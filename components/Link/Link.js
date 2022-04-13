/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import PropTypes from 'prop-types'
import NextLink from 'next/link'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faHandsHelping } from '@fortawesome/free-solid-svg-icons'

const iconList = {
  Book: (
    <FontAwesomeIcon
      className="header-icon icon-book hidden lg:inline-block"
      icon={faBook}
      height="1em"
      width="1em"
    />
  ),
  HandsHelping: (
    <FontAwesomeIcon
      className="header-icon icon-hands-helping hidden lg:inline-block"
      icon={faHandsHelping}
      height="1em"
      width="1em"
    />
  ),
}

const Link = ({
  href,
  asHref,
  className,
  children,
  langCode,
  external = false,
  icon,
  router = false,
  ariaLabel,
  dataTestId,
  ...rest
}) => {
  let asHrefReplace = asHref
  if (router) {
    if (!asHref) {
      asHrefReplace = href
    }

    return (
      <NextLink href={href} as={asHrefReplace}>
        <a
          aria-label={ariaLabel}
          className={clsx([className])}
        >
          {children}
        </a>
      </NextLink>
    )
  }
  return (
    <a
      href={href}
      className={clsx([className])}
      target={external ? '_blank' : '_self'}
      lang={langCode}
      xmlLang={langCode}
      rel={external ? 'noopener noreferrer' : ''}
      aria-label={external ? `${ariaLabel} This link will open in a new window.` : ariaLabel}
      data-testid={dataTestId}
      {...rest}
    >
      {icon && iconList[icon]}
      {children}
    </a>
  )
}

Link.propTypes = {
  href: PropTypes.string,
  asHref: PropTypes.string,
  onClick: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.any,
  langCode: PropTypes.string,
  external: PropTypes.bool,
  icon: PropTypes.any,
  router: PropTypes.bool,
  ariaLabel: PropTypes.string,
  dataTestId: PropTypes.string,
}

export default Link
