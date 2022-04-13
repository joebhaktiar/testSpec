export const deductionsToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'deductions.h2.deductionsTT1',
      dataTestID: 'deductionsToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'deductions.p.deductionsTT1',
      dataTestID: 'deductionsToolTipParagraph1',
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'deductions.p.deductionsTT2',
      className: 'my-4',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic501',
          href: 'https://www.irs.gov/taxtopics/tc501',
          text: 'deductions.a.deductionsTT1',
          external: true,
          dataTestID: 'deductionsTT1Link',
        }
      ]
    }
  ]
)

export const medicalToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'deductionPayments.h2.medicalTT1',
      dataTestID: 'medicalToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'deductionPayments.p.medicalTT1',
      dataTestID: 'medicalToolTipParagraph1',
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'deductionPayments.p.medicalTT2',
      className: 'my-3',
    },
    {
      key: 'tt-1-4',
      type: 'Paragraph',
      text: 'deductionPayments.p.medicalTT3',
      className: 'my-4',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic502',
          href: 'https://www.irs.gov/taxtopics/tc502',
          text: 'deductionPayments.a.medicalTT1',
          external: true,
          dataTestID: 'MedicalTT1Link',
        }
      ]
    }
  ]
)

export const paidToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'deductionPayments.h2.paidTT1',
      dataTestID: 'paidToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'deductionPayments.p.paidTT1',
      dataTestID: 'paidToolTipParagraph1',
    },
    {
      key: 'tt-1-3',
      type: 'List',
      className: 'ml-10 mb-4 list list-disc',
      dataTestID: 'paidToolTipList',
      list: [
        'deductionPayments.li.paidTT1',
        'deductionPayments.li.paidTT2',
        'deductionPayments.li.paidTT3',
        'deductionPayments.li.paidTT4'
      ]
    },
    {
      key: 'tt-1-4',
      type: 'Paragraph',
      text: 'deductionPayments.p.paidTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic503',
          href: 'https://www.irs.gov/taxtopics/tc503',
          text: 'deductionPayments.a.paidTT1',
          external: true,
          dataTestID: 'paidTT1Link',
        }
      ]
    },
    {
      key: 'tt-1-5',
      type: 'Paragraph',
      className: 'my-3',
      text: 'deductionPayments.p.paidTT3',
      dataTestID: 'paidToolTipParagraph3',
    }
  ]
)

export const qualifiedToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'deductionPayments.h2.qualifiedTT1',
      dataTestID: 'qualifiedToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'deductionPayments.p.qualifiedTT1',
      dataTestID: 'qualifiedToolTipParagraph1',
    },
    {
      key: 'tt-1-3',
      type: 'List',
      className: 'ml-10 mb-4 list list-disc',
      dataTestID: 'qualifiedToolTipList',
      list: [
        'deductionPayments.li.qualifiedTT1',
        'deductionPayments.li.qualifiedTT2',
      ]
    },
    {
      key: 'tt-1-4',
      type: 'Paragraph',
      text: 'deductionPayments.p.qualifiedTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic505',
          href: 'https://www.irs.gov/taxtopics/tc505',
          text: 'deductionPayments.a.qualifiedTT1',
          external: true,
          dataTestID: 'qualifiedTT1Link',
        }
      ]
    }
  ]
)

export const charityToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'deductionPayments.h2.charityTT1',
      dataTestID: 'charityToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'deductionPayments.p.charityTT1',
      dataTestID: 'charityToolTipParagraph1',
      replacements: [
        {
          type: 'link',
          key: ':irsTopicTaxExempt',
          href: 'https://www.irs.gov/charities-non-profits/tax-exempt-organization-search',
          text: 'deductionPayments.a.charityTT1',
          external: true,
          dataTestID: 'charityTT1Link',
        }
      ]
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'deductionPayments.p.charityTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic526',
          href: 'https://www.irs.gov/publications/p526',
          text: 'deductionPayments.a.charityTT2',
          external: true,
          dataTestID: 'charityTT1Link',
        },
        {
          type: 'link',
          key: ':irsTopic506',
          href: 'https://www.irs.gov/taxtopics/tc506',
          text: 'deductionPayments.a.charityTT3',
          external: true,
          dataTestID: 'charityTT1Link',
        }
      ]
    }
  ]
)

export const casualtyToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'deductionPayments.h2.casualtyTT1',
      dataTestID: 'casualtyToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'deductionPayments.p.casualtyTT1',
      dataTestID: 'casualtyToolTipParagraph1',
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'deductionPayments.p.casualtyTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic515',
          href: 'https://www.irs.gov/taxtopics/tc515',
          text: 'deductionPayments.a.casualtyTT1',
          external: true,
          dataTestID: 'casualtyTT1Link',
        }
      ]
    }
  ]
)

export const otherToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'deductionPayments.h2.otherTT1',
      dataTestID: 'otherToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      text: 'deductionPayments.p.otherTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic529',
          href: 'https://www.irs.gov/forms-pubs/about-publication-529',
          text: 'deductionPayments.a.otherTT1',
          external: true,
          dataTestID: 'otherTT1Link',
        }
      ]
    }
  ]
)