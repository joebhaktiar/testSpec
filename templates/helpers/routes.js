const routes = (langCode, site = 'all') => {
  const lang = langCode || 'en'

  const allRoutes = {
    'twe': {
      localhost: '/app/tax-withholding-estimator',
      aboutYou: '/app/tax-withholding-estimator/about-you',
      incomeWithholding: '/app/tax-withholding-estimator/income-and-withholding',
      adjustments: '/app/tax-withholding-estimator/adjustments',
      deductions: '/app/tax-withholding-estimator/deductions',
      taxCredits: '/app/tax-withholding-estimator/tax-credits',
      results: '/app/tax-withholding-estimator/results',
    },
  }

  const allLangRoutes = {
    'twe': {
      localhost: `/app/tax-withholding-estimator/${lang}`,
      aboutYou: `/app/tax-withholding-estimator/about-you/${lang}`,
      incomeWithholding: `/app/tax-withholding-estimator/income-and-withholding/${lang}`,
      adjustments: `/app/tax-withholding-estimator/adjustments/${lang}`,
      deductions: `/app/tax-withholding-estimator/deductions/${lang}`,
      taxCredits: `/app/tax-withholding-estimator/tax-credits/${lang}`,
      results: `/app/tax-withholding-estimator/results/${lang}`,
    },
  }

  if (site === 'all') {
    return allRoutes
  }

  if (lang === 'en') {
    return allRoutes[site]
  }

  return allLangRoutes[site]
}

export default routes
