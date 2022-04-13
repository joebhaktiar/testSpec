import React from 'react'
import HtmlBuilder from '../../../components/HtmlBuilder'
import routes from '../../../templates/helpers/routes'

export const skipAheadWarning = (langCode) => (
  <HtmlBuilder elements={
    [
      {
        key: 'checkPreviousPages-p1',
        type: 'Paragraph',
        text: 'adjustments.p.skipAhead',
        className: 'text mt-1',
        replacements: [
          {
            type: 'route',
            key: ':aboutYou',
            href: routes(langCode, 'twe').aboutYou,
            text: 'adjustments.a.aboutYouWarningLink',
            external: false,
            dataTestID: 'aboutYouLinkBack',
          },
          {
            type: 'route',
            key: ':incomeWithholding',
            href: routes(langCode, 'twe').incomeWithholding,
            text: 'adjustments.a.incomeWithholdingWarningLink',
            external: false,
            dataTestID: 'incomeWithholdingLinkBack',
          }
        ]
      },
    ]}
  />
)
