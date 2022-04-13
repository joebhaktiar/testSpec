import React from 'react'
import HtmlBuilder from '../../../components/HtmlBuilder'
import routes from '../../../templates/helpers/routes'

export const skipAheadWarning = (langCode) => (
  <HtmlBuilder elements={
    [
      {
        key: 'checkPreviousPages-p1',
        type: 'Paragraph',
        text: 'incomeWithholding.p.skipAhead',
        className: 'text mt-1',
        replacements: [
          {
            type: 'route',
            key: ':aboutYou1',
            href: routes(langCode, 'twe').aboutYou,
            text: 'incomeWithholding.a.aboutYouWarningLink',
            external: false,
            dataTestID: 'aboutYouLinkBack',
          },
          {
            type: 'route',
            key: ':aboutYou2',
            href: routes(langCode, 'twe').aboutYou,
            text: 'incomeWithholding.a.aboutYouWarningLink2',
            external: false,
            dataTestID: 'aboutYouLinkBack',
          }
        ]
      },
    ]}
  />
)
