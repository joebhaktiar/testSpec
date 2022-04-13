import React, { useContext } from 'react'
import { Breadcrumbs, BreadcrumbItem } from '../../components/Breadcrumbs'
import SiteContext from '../../context/Site/SiteContext'
import { routes as pathNames } from '../helpers'

const TWEBreadCrumbs = ({ pathName }) => {
  const { lang, langCode } = useContext(SiteContext)
  const routes = pathNames(langCode, 'twe')

  const base = () => [
    {
      key: 'breadcrumb-1',
      text: 'global.breadcrumb.home',
      url: 'https://www.irs.gov/',
    },
    {
      key: 'breadcrumb-2',
      text: 'global.breadcrumb.file',
      url: 'https://www.irs.gov/filing',
    },
    {
      key: 'breadcrumb-3',
      text: 'global.breadcrumb.individuals',
      url: 'https://www.irs.gov/individuals',
    },
    {
      key: 'breadcrumb-4',
      text: 'global.breadcrumb.twe',
      url: 'https://www.irs.gov/individuals/tax-withholding-estimator',
    },
  ]

  const aboutYou = () => [
    {
      key: 'breadcrumb-5-1',
      text: 'global.breadcrumb.aboutYou',
      type: 'text',
    },
  ]

  const incomeWithholding = () => [
    {
      key: 'breadcrumb-5-1',
      text: 'global.breadcrumb.incomeWithholding',
      type: 'text',
    },
  ]

  const adjustments = () => [
    {
      key: 'breadcrumb-5-2',
      text: 'global.breadcrumb.adjustments',
      type: 'text',
    },
  ]

  const deductions = () => [
    {
      key: 'breadcrumb-5-3',
      text: 'global.breadcrumb.deductions',
      type: 'text',
    },
  ]

  const taxCredits = () => [
    {
      key: 'breadcrumb-5-4',
      text: 'global.breadcrumb.taxCredits',
      type: 'text',
    },
  ]

  const results = () => [
    {
      key: 'breadcrumb-5-4',
      text: 'global.breadcrumb.results',
      type: 'text',
    },
  ]

  const breadcrumbsLocation = () => {
    switch (pathName) {
      case routes.aboutYou:
        return base().concat(aboutYou())
      case `${routes.aboutYou}/`:
        return base().concat(aboutYou())
      case `${routes.aboutYou}/[langCode]`:
        return base().concat(aboutYou())
      case routes.incomeWithholding:
        return base().concat(incomeWithholding())
      case `${routes.incomeWithholding}/`:
        return base().concat(incomeWithholding())
      case '/app/tax-withholding-estimator/income-and-withholding/[langCode]':
        return base().concat(incomeWithholding())
      case routes.adjustments:
        return base().concat(adjustments())
      case `${routes.adjustments}/`:
        return base().concat(adjustments())
      case '/app/tax-withholding-estimator/adjustments/[langCode]':
        return base().concat(adjustments())
      case routes.deductions:
        return base().concat(deductions())
      case `${routes.deductions}/`:
        return base().concat(deductions())
      case '/app/tax-withholding-estimator/deductions/[langCode]':
        return base().concat(deductions())
      case routes.taxCredits:
        return base().concat(taxCredits())
      case `${routes.taxCredits}/`:
        return base().concat(taxCredits())
      case '/app/tax-withholding-estimator/tax-credits/[langCode]':
        return base().concat(taxCredits())
      case routes.results:
        return base().concat(results())
      case `${routes.results}/`:
        return base().concat(results())
      case '/app/tax-withholding-estimator/results/[langCode]':
        return base().concat(results())
      default:
        return base().concat(aboutYou())
    }
  }

  const breadcrumbs = breadcrumbsLocation(pathName),
    breadcrumbsLinks = breadcrumbs.map(({ text, url, key, path }) => (
      <BreadcrumbItem key={key} href={url} to={path}>
        {lang(text)}
      </BreadcrumbItem>
    ))

  return (
    <Breadcrumbs name={pathName} className="hidden lg:block">
      {breadcrumbsLinks}
    </Breadcrumbs>
  )
}

export default TWEBreadCrumbs
