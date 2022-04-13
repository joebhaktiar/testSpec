export const filingStatusToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'aboutYou.h2.filingStatusTT1',
      dataTestID: 'filingStatusToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'aboutYou.p.filingStatusTT1',
      dataTestID: 'filingStatusToolTipParagraph1',
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'aboutYou.p.filingStatusTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsPub501',
          href: 'https://www.irs.gov/forms-pubs/about-publication-501',
          text: 'aboutYou.a.filingStatusTT1',
          external: true,
          dataTestID: 'filingStatusTT1Link',
        }
      ]
    },
    {
      key: 'tt-1-4',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'aboutYou.h2.filingStatusTT2',
      dataTestID: 'filingStatusToolTipHeading2'
    },
    {
      key: 'tt-1-5',
      type: 'Paragraph',
      className: 'my-3',
      text: 'aboutYou.p.filingStatusTT3',
      dataTestID: 'filingStatusToolTipParagraph3',
    },
    {
      key: 'tt-1-6',
      type: 'List',
      className: 'ml-10 mb-4 list list-disc',
      dataTestID: 'filingStatusToolTipList',
      list: [
        'aboutYou.li.filingStatusTT1',
        'aboutYou.li.filingStatusTT2',
        'aboutYou.li.filingStatusTT3',
        'aboutYou.li.filingStatusTT4',
        'aboutYou.li.filingStatusTT5',
      ]
    },
    {
      key: 'tt-1-7',
      type: 'Paragraph',
      text: 'aboutYou.p.filingStatusTT4',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsPub501',
          href: 'https://www.irs.gov/forms-pubs/about-publication-501',
          text: 'aboutYou.a.filingStatusTT2',
          external: true,
          dataTestID: 'filingStatusTT2Link',
        }
      ]
    },
  ]
)

export const jobOrPensionToolTip = () => (
  [
    {
      key: 'tt-2-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'aboutYou.h2.jobOrPensionTT1',
      dataTestID: 'jobOrPensionToolTipHeading1'
    },
    {
      key: 'tt-2-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'aboutYou.p.jobOrPensionTT1',
      dataTestID: 'jobOrPensionToolTipParagraph1',
    },
  ]
)

export const blindToolTip = () => (
  [
    {
      key: 'tt-3-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'aboutYou.h2.blindTT1',
      dataTestID: 'blindToolTipHeading1'
    },
    {
      key: 'tt-3-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'aboutYou.p.blindTT1',
      dataTestID: 'blindToolTipParagraph1',
    },
    {
      key: 'tt-3-3',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'aboutYou.h2.blindTT2',
      dataTestID: 'blindToolTipHeading2'
    },
    {
      key: 'tt-3-4',
      type: 'Paragraph',
      level: '2',
      className: 'my-3',
      text: 'aboutYou.p.blindTT3',
      dataTestID: 'blindToolTipParagraph3'
    },
    {
      key: 'tt-3-5',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'blindToolTipList1',
      list: [
        'aboutYou.li.blindTT1',
        'aboutYou.li.blindTT2',
        'aboutYou.li.blindTT3'
      ]
    },
    {
      key: 'tt-3-6',
      type: 'Paragraph',
      text: 'aboutYou.p.blindTT4',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsPub501',
          href: 'https://www.irs.gov/forms-pubs/about-publication-501',
          text: 'aboutYou.a.blindTT1',
          external: true,
          dataTestID: 'blindTT1Link',
        }
      ]
    },
  ]
)

export const claimedAsDependentToolTip = () => (
  [
    {
      key: 'tt-4-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'aboutYou.h2.claimedAsDependentTT1',
      dataTestID: 'claimedAsDependentToolTipHeading1'
    },
    {
      key: 'tt-4-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'aboutYou.p.claimedAsDependentTT1',
      dataTestID: 'claimedAsDependentToolTipParagraph1',
    },
    {
      key: 'tt-4-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'aboutYou.p.claimedAsDependentTT2',
      dataTestID: 'claimedAsDependentToolTipParagraph1',
    },
    {
      key: 'tt-4-4',
      type: 'Paragraph',
      text: 'aboutYou.p.claimedAsDependentTT3',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsWhoMayIClaim',
          href: 'https://www.irs.gov/help/ita/whom-may-i-claim-as-a-dependent ',
          text: 'aboutYou.a.claimedAsDependentTT1',
          external: true,
          dataTestID: 'claimedAsDependentTT1Link',
        }
      ]
    },

  ]
)

export const willClaimDependentsToolTip = () => (
  [
    {
      key: 'tt-5-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'aboutYou.h2.willClaimDependentsTT1',
      dataTestID: 'willClaimDependentsToolTipHeading1'
    },
    {
      key: 'tt-5-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'aboutYou.p.willClaimDependentsTT1',
      dataTestID: 'willClaimDependentsToolTipParagraph1',
    },
    {
      key: 'tt-5-3',
      type: 'List',
      className: 'ml-10 mb-4 list list-disc',
      dataTestID: 'willClaimDependentsToolTipList',
      list: [
        'aboutYou.li.numOfEitcTT1',
        'aboutYou.li.numOfEitcTT2',
        'aboutYou.li.numOfEitcTT3'
      ]
    },
    {
      key: 'tt-5-4',
      type: 'Paragraph',
      className: 'my-3',
      text: 'aboutYou.p.willClaimDependentsTT2',
      dataTestID: 'willClaimDependentsToolTipParagraph2',
      replacements: [
        {
          type: 'link',
          key: ':irsWhoWillClaim',
          href: 'https://www.irs.gov/help/ita/whom-may-i-claim-as-a-dependent ',
          text: 'aboutYou.a.willClaimDependentsTT1',
          external: true,
          dataTestID: 'willClaimDependentsTT1Link',
        }
      ]
    },
  ]
)
