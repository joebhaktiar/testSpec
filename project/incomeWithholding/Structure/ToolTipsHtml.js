export const incomeTypeToolTip = (index) => {
  const elements = [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'incomeWithholding.h2.incomeTypeTT1',
      dataTestID: 'incomeTypeToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.incomeTypeTT1',
      dataTestID: 'incomeTypeToolTipParagraph1',
      replacements: [
        {
          key: ':salaryBold',
          type: 'bold',
          text: 'incomeWithholding.b.incomeTypeTT1',
          dataTestID: 'incomeTypeToolTipBold1'
        },
      ]
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.incomeTypeTT2',
      dataTestID: 'incomeTypeToolTipParagraph2',
      replacements: [
        {
          key: ':hourlyBold',
          type: 'bold',
          text: 'incomeWithholding.b.incomeTypeTT2',
          dataTestID: 'incomeTypeToolTipBold2'
        },
      ]
    },
    {
      key: 'tt-1-4',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.incomeTypeTT3',
      dataTestID: 'incomeTypeToolTipParagraph3',
      replacements: [
        {
          key: ':pensionBold',
          type: 'bold',
          text: 'incomeWithholding.b.incomeTypeTT3',
          dataTestID: 'incomeTypeToolTipBold3'
        },
      ]
    },
    {
      key: 'tt-1-5',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.incomeTypeTT4',
      dataTestID: 'incomeTypeToolTipParagraph4',
      replacements: [
        {
          key: ':ssiBold',
          type: 'bold',
          text: 'incomeWithholding.b.incomeTypeTT4',
          dataTestID: 'incomeTypeToolTipBold4'
        },
      ]
    }
  ]

  index === 0 && elements.push(
    {
      key: 'tt-1-6',
      type: 'Paragraph',
      text: 'incomeWithholding.p.incomeTypeTT5',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':incomePub505',
          href: 'https://www.irs.gov/publications/p505',
          text: 'incomeWithholding.a.incomeTypeTT1',
          external: true,
          dataTestID: 'incomeWithholdingincomeTypeTT1Link',
        }
      ]
    }
  )

  return elements
}

export const payFrequencyToolTip = () => (
  [
    {
      key: 'tt-2-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'incomeWithholding.h2.payFrequencyTT1',
      dataTestID: 'payFrequencyToolTipHeading1'
    },
    {
      key: 'tt-2-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.payFrequencyTT1',
      dataTestID: 'payFrequencyToolTipParagraph1',
    },
  ]
)

export const pensionPayFrequencyToolTip = () => (
  [
    {
      key: 'tt-2-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'incomeWithholding.h2.pensionPayFrequencyTT1',
      dataTestID: 'pensionPayFrequencyToolTipHeading1'
    },
    {
      key: 'tt-2-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.pensionPayFrequencyTT1',
      dataTestID: 'pensionPayFrequencyToolTipParagraph1',
    },
  ]
)

export const taxesPerPayPeriodToolTip = () => (
  [
    {
      key: 'tt-3-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'incomeWithholding.h2.taxesPerPayPeriodTT1',
      dataTestID: 'taxesPerPayPeriodToolTipHeading1'
    },
    {
      key: 'tt-3-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.taxesPerPayPeriodTT1',
      dataTestID: 'taxesPerPayPeriodToolTipParagraph1',
    },
  ]
)

export const retirementToolTip = () => (
  [
    {
      key: 'tt-4-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'incomeWithholding.h2.retirementTT1',
      dataTestID: 'retirementToolTipHeading1'
    },
    {
      key: 'tt-4-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.retirementTT1',
      dataTestID: 'retirementToolTipParagraph1',
    },
    {
      key: 'tt-4-3',
      type: 'List',
      className: 'ml-10 mb-4 list list-disc',
      dataTestID: 'retirementToolTipList',
      list: [
        'incomeWithholding.li.401kTT1',
        'incomeWithholding.li.401kTT2',
        'incomeWithholding.li.401kTT3',
        'incomeWithholding.li.401kTT4',
        'incomeWithholding.li.401kTT5',
        'incomeWithholding.li.401kTT6',
        'incomeWithholding.li.401kTT7'
      ]
    },
  ]
)

export const cafeteriaPlanToolTip = () => (
  [
    {
      key: 'tt-5-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'incomeWithholding.h2.cafeteriaPlanTT1',
      dataTestID: 'cafeteriaPlanToolTipHeading1'
    },
    {
      key: 'tt-5-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.cafeteriaPlanTT1',
      dataTestID: 'cafeteriaPlanToolTipParagraph1',
    },
    {
      key: 'tt-5-3',
      type: 'List',
      className: 'ml-10 mb-4 list list-disc',
      dataTestID: 'cafeteriaPlanToolTipList',
      list: [
        'incomeWithholding.li.cafeteriaPlanTT1',
        'incomeWithholding.li.cafeteriaPlanTT2',
        'incomeWithholding.li.cafeteriaPlanTT3',
        'incomeWithholding.li.cafeteriaPlanTT4',
        'incomeWithholding.li.cafeteriaPlanTT5',
        'incomeWithholding.li.cafeteriaPlanTT6',
        'incomeWithholding.li.cafeteriaPlanTT7',
        'incomeWithholding.li.cafeteriaPlanTT8',
        'incomeWithholding.li.cafeteriaPlanTT9',
        'incomeWithholding.li.cafeteriaPlanTT10',
      ]
    },
  ]
)

export const bonusFutureToolTip = () => (
  [
    {
      key: 'tt-6-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'incomeWithholding.h2.bonusTT1',
      dataTestID: 'bonusToolTipHeading1'
    },
    {
      key: 'tt-6-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.bonusTT1',
      dataTestID: 'bonusToolTipParagraph1',
    },
    {
      key: 'tt-6-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.bonusTT2',
      dataTestID: 'bonusToolTipParagraph',
    },
  ]
)

export const bonusPastToolTip = () => (
  [
    {
      key: 'tt-7-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'incomeWithholding.h2.bonusTT1',
      dataTestID: 'bonusToolTipHeading1'
    },
    {
      key: 'tt-7-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.bonusTT1',
      dataTestID: 'bonusToolTipParagraph1',
    },
    {
      key: 'tt-7-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.bonusTT2',
      dataTestID: 'bonusToolTipParagraph2',
    },
  ]
)

export const dateRangeToolTip = () => (
  [
    {
      key: 'tt-8-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'incomeWithholding.h2.dateRangeTT1',
      dataTestID: 'dateRangeToolTipHeading1'
    },
    {
      key: 'tt-8-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.dateRangeTT1',
      dataTestID: 'dateRangeToolTipParagraph1',
    },
    {
      key: 'tt-8-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.dateRangeTT2',
      dataTestID: 'dateRangeToolTipParagraph2',
    }
  ]
)

export const dateRangeSSIToolTip = () => (
  [
    {
      key: 'tt-9-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'incomeWithholding.h2.dateRangeSSITT1',
      dataTestID: 'dateRangeToolTipHeading1'
    },
    {
      key: 'tt-9-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.dateRangeSSITT1',
      dataTestID: 'dateRangeToolTipParagraph1',
    },
    {
      key: 'tt-9-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.dateRangeSSITT2',
      dataTestID: 'dateRangeToolTipParagraph2',
    }
  ]
)

export const timePeriodOfPensionToolTip = () => (
  [
    {
      key: 'tt-10-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'incomeWithholding.h2.timePeriodOfPensionTT1',
      dataTestID: 'timePeriodOfPensionToolTipHeading1'
    },
    {
      key: 'tt-10-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.timePeriodOfPensionTT1',
      dataTestID: 'timePeriodOfPensionToolTipParagraph1',
    },
  ]
)

export const scholarshipToolTip = () => (
  [
    {
      key: 'tt-11-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'incomeWithholding.h2.scholarshipTT1',
      dataTestID: 'scholarshipToolTipHeading1'
    },
    {
      key: 'tt-11-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.scholarshipTT1',
      dataTestID: 'scholarshipToolTipParagraph1',
    },
    {
      key: 'tt-11-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.scholarshipTT2',
      dataTestID: 'scholarshipToolTipParagraph2',
    },
    {
      key: 'tt-11-4',
      type: 'List',
      className: 'ml-10 mb-4 list list-disc',
      dataTestID: 'scholarshipToolTipList',
      list: [
        'incomeWithholding.li.scholarshipTT1',
        'incomeWithholding.li.scholarshipTT2',
      ]
    },
    {
      key: 'tt-11-5',
      type: 'Paragraph',
      text: 'incomeWithholding.p.scholarshipTT3',
      className: 'my-3',
      dataTestID: 'incomeWithholdingScholarshipTT3Paragraph',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic421',
          href: 'https://www.irs.gov/taxtopics/tc421',
          text: 'incomeWithholding.a.scholarshipTT1',
          external: true,
          dataTestID: 'incomeWithholdingScholarshipTT1Link',
        }
      ]
    }
  ]
)

export const selfEmploymentToolTip = () => (
  [
    {
      key: 'tt-12-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'incomeWithholding.h2.selfEmploymentTT1',
      dataTestID: 'selfEmploymentToolTipHeading1'
    },
    {
      key: 'tt-12-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.selfEmploymentTT1',
      dataTestID: 'selfEmploymentToolTipParagraph1',
    },
    {
      key: 'tt-12-3',
      type: 'Paragraph',
      text: 'incomeWithholding.p.selfEmploymentTT2',
      className: 'my-3',
      dataTestID: 'incomeWithholdingSelfEmploymentTT2Paragraph',
      replacements: [
        {
          type: 'link',
          key: ':pubSelfEmployed',
          href: 'https://www.irs.gov/businesses/small-businesses-self-employed/publications-and-forms-for-the-self-employed',
          text: 'incomeWithholding.a.selfEmploymentTT1',
          external: true,
          dataTestID: 'incomeWithholdingSelfEmploymentTT1Link',
        }
      ]
    }
  ]
)

export const investmentsToolTip = () => (
  [
    {
      key: 'tt-13-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'incomeWithholding.h2.investmentsTT1',
      dataTestID: 'investmentsToolTipHeading1'
    },
    {
      key: 'tt-13-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.investmentsTT1',
      dataTestID: 'investmentsToolTipParagraph1',
    },
    {
      key: 'tt-13-3',
      type: 'Paragraph',
      text: 'incomeWithholding.p.investmentsTT2',
      className: 'my-3',
      dataTestID: 'incomeWithholdingInvestmentsTT2Paragraph',
      replacements: [
        {
          type: 'link',
          key: ':whatIsEarnedIncome',
          href: 'https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit/earned-income',
          text: 'incomeWithholding.a.investmentsTT1',
          external: true,
          dataTestID: 'incomeWithholdingInvestmentsTT1Link',
        }
      ]
    }
  ]
)

export const otherTaxableIncomeToolTip = () => (
  [
    {
      key: 'tt-14-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'incomeWithholding.h2.otherTaxableIncomeTT1',
      dataTestID: 'otherTaxableIncomeToolTipHeading1'
    },
    {
      key: 'tt-4-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.otherTaxableIncomeTT1',
      dataTestID: 'otherTaxableIncomeToolTipParagraph1',
    },
    {
      key: 'tt-14-3',
      type: 'Paragraph',
      text: 'incomeWithholding.p.otherTaxableIncomeTT2',
      className: 'my-3',
      dataTestID: 'incomeWithholdingOtherTaxableIncomeTT2Paragraph',
      replacements: [
        {
          type: 'link',
          key: ':irsPub525',
          href: 'https://www.irs.gov/forms-pubs/about-publication-525',
          text: 'incomeWithholding.a.otherTaxableIncomeTT1',
          external: true,
          dataTestID: 'incomeWithholdingOtherTaxableIncomeTT1Link',
        }
      ]
    }
  ]
)

export const otherTaxesToolTip = () => (
  [
    {
      key: 'tt-15-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'incomeWithholding.h2.otherTaxesTT1',
      dataTestID: 'otherTaxesToolTipHeading1'
    },
    {
      key: 'tt-15-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.otherTaxesTT1',
      dataTestID: 'otherTaxesToolTipParagraph1',
    },
  ]
)

export const ssiBenefitsYTDToolTip = () => (
  [
    {
      key: 'tt-16-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'incomeWithholding.h2.ssiBenefitsYTD',
      dataTestID: 'ssiMonthlyAmountToolTipHeading1'
    },
    {
      key: 'tt-16-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.ssiBenefitsYTD',
      dataTestID: 'ssiMonthlyAmountToolTipParagraph1',
    },
    {
      key: 'tt-16-3',
      type: 'Paragraph',
      text: 'incomeWithholding.p.ssiBenefitsYTDTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic423',
          href: 'https://www.irs.gov/taxtopics/tc423',
          text: 'incomeWithholding.a.ssiBenefitsYTDTT1',
          external: true,
          dataTestID: 'incomeWithholdingssiBenefitsYTDTT1Link',
        }
      ]
    }
  ]
)

export const ssiMonthlyAmountToolTip = () => (
  [
    {
      key: 'tt-17-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'incomeWithholding.h2.ssiBenefitsYTD',
      dataTestID: 'ssiMonthlyAmountToolTipHeading1'
    },
    {
      key: 'tt-17-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.ssiBenefitsYTD',
      dataTestID: 'ssiMonthlyAmountToolTipParagraph1',
    },
    {
      key: 'tt-17-3',
      type: 'Paragraph',
      text: 'incomeWithholding.p.ssiBenefitsYTDTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic423',
          href: 'https://www.irs.gov/taxtopics/tc423',
          text: 'incomeWithholding.a.ssiBenefitsYTDTT1',
          external: true,
          dataTestID: 'incomeWithholdingssiBenefitsYTDTT1Link',
        }
      ]
    }
  ]
)

export const cafeteriaPlanPayPeriodAmountToolTip = () => (
  [
    {
      key: 'tt-18-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'incomeWithholding.h2.cafeteriaPlanPayPeriodAmount',
      dataTestID: 'ssiMonthlyAmountToolTipHeading1'
    },
    {
      key: 'tt-18-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.cafeteriaPlanPayPeriodAmount',
      dataTestID: 'ssiMonthlyAmountToolTipParagraph1',
    },
  ]
)

export const cafeteriaPlanYTDAmountToolTip = () => (
  [
    {
      key: 'tt-19-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'incomeWithholding.h2.cafeteriaPlanYTDAmount',
      dataTestID: 'ssiMonthlyAmountToolTipHeading1'
    },
    {
      key: 'tt-19-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.cafeteriaPlanYTDAmount',
      dataTestID: 'ssiMonthlyAmountToolTipParagraph1',
    },
  ]
)

export const annualSalaryToolTip = () => (
  [
    {
      key: 'tt-20-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'incomeWithholding.h2.annualSalary',
      dataTestID: 'ssiMonthlyAmountToolTipHeading1'
    },
    {
      key: 'tt-20-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.annualSalary',
      dataTestID: 'ssiMonthlyAmountToolTipParagraph1',
    },
  ]
)

export const wagesYTDToolTip = () => (
  [
    {
      key: 'tt-21-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'incomeWithholding.h2.wagesYTDTT1',
      dataTestID: 'wagesYTDToolTipHeading1'
    },
    {
      key: 'tt-21-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'incomeWithholding.p.wagesYTDTT1',
      dataTestID: 'wagesYTDToolTipParagraph1',
    },
  ]
)
