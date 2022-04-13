import React from 'react'
import HtmlBuilder from '../../../components/HtmlBuilder'

export const jobOrPension = () => (
  <HtmlBuilder elements={
    [
      {
        key: 'jobOrPension-p1',
        type: 'Paragraph',
        text: 'aboutYou.p.jobOrPensionWarning1',
        className: 'text mt-1',
        replacements: [
          {
            type: 'link',
            key: ':irsPub505',
            href: 'https://www.irs.gov/publications/p505',
            text: 'aboutYou.a.irsPub505',
            external: true,
            dataTestID: 'irsPub505Link',
          }
        ]
      },
    ]}
  />
)
