export const recommendationWarning = () => (
  [
    {
      key: 'resultsRecommendationWarningParagraph1',
      type: 'Paragraph',
      className: 'mb-3',
      text: 'results.p.resultsRecommendationWarning1',
      dataTestID: 'resultsRecommendationWarningParagraph1',
    },
    {
      key: 'resultsRecommendationWarningParagraph1b',
      type: 'Paragraph',
      className: 'mb-3',
      text: 'results.p.resultsRecommendationWarning1b',
      dataTestID: 'resultsRecommendationWarningParagraph1b',
    },
    {
      key: 'resultsRecommendationWarningParagraph2',
      type: 'Paragraph',
      className: 'mb-3',
      text: 'results.p.resultsRecommendationWarning2',
      dataTestID: 'resultsRecommendationWarningParagraph2',
      replacements: [
        {
          type: 'link',
          key: ':faq',
          href: 'https://www.irs.gov/individuals/tax-withholding-estimator-faqs',
          text: 'results.a.resultsRecommendationWarning',
          external: true,
          dataTestID: 'resultsRecommendationWarningLink',
        }
      ]
    }
  ]
)

export const decemberMesgRefund = () => (
  [
    {
      key: 'decemberMesg-p1',
      type: 'Paragraph',
      text: 'results.p.decemberMesgRefundWarning1',
      className: 'text',
    },
  ]
)

export const decemberMesgOwe = () => (
  [
    {
      key: 'decemberMesgOwe-p1',
      type: 'Paragraph',
      text: 'results.p.decemberMesgOweWarning1',
      className: 'text mb-3',
      replacements: [
        {
          type: 'link',
          key: ':estimatedTaxes',
          href: 'https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes',
          text: 'results.a.estimatedTaxes',
          external: true,
          dataTestID: 'irsPub505Link',
        }
      ]
    },
    {
      key: 'decemberMesgOwe-p2',
      type: 'Paragraph',
      text: 'results.p.decemberMesgOweWarning2',
      className: 'text mb-3',
    },
    {
      key: 'decemberMesgOwe-p3',
      type: 'Paragraph',
      text: 'results.p.decemberMesgOweWarning3',
      className: 'text',
      replacements: [
        {
          type: 'link',
          key: ':faq',
          href: 'https://www.irs.gov/individuals/tax-withholding-estimator-faqs',
          text: 'results.a.faq',
          external: true,
          dataTestID: 'resultsFaq',
        }
      ]
    },
  ]
)
