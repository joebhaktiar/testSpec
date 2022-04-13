export const seHealthInsuranceToolTip = (param) => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'adjustments.h2.seHealthInsuranceTT1',
      dataTestID: 'seHealthInsuranceToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'adjustments.p.seHealthInsuranceTT1',
      dataTestID: 'seHealthInsuranceToolTipParagraph1',
      replacements: [
        {
          type: 'simpleText',
          key: ':pastYear',
          text: param.current_year - 1,
          dataTestID: 'adjustmentsseHealthInsuranceTT1PastYear',
        }
      ]
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'adjustments.p.seHealthInsuranceTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic535',
          href: 'https://www.irs.gov/publications/p535',
          text: 'adjustments.a.seHealthInsuranceTT1',
          external: true,
          dataTestID: 'adjustmentsseHealthInsuranceTT1Link',
        }
      ]
    }
  ]
)

export const seHealthInsuranceSpouseToolTip = (param) => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'adjustments.h2.seHealthInsuranceSpouseTT1',
      dataTestID: 'seHealthInsuranceSpouseToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'adjustments.p.seHealthInsuranceSpouseTT1',
      dataTestID: 'seHealthInsuranceSpouseToolTipParagraph1',
      replacements: [
        {
          type: 'simpleText',
          key: ':pastYear',
          text: param.current_year - 1,
          dataTestID: 'adjustmentsseHealthInsuranceTT1PastYear',
        }
      ]
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'adjustments.p.seHealthInsuranceSpouseTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic535',
          href: 'https://www.irs.gov/publications/p535',
          text: 'adjustments.a.seHealthInsuranceSpouseTT1',
          external: true,
          dataTestID: 'adjustmentsseHealthInsuranceSpouseTT1Link',
        }
      ]
    }
  ]
)
export const sepSimpleToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'adjustments.h2.sepSimpleTT1',
      dataTestID: 'sepSimpleToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'adjustments.p.sepSimpleTT1',
      dataTestID: 'sepSimpleToolTipParagraph1',
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'adjustments.p.sepSimpleTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':selfEmployed',
          href: 'https://www.irs.gov/retirement-plans/self-employed-individuals-calculating-your-own-retirement-plan-contribution-and-deduction',
          text: 'adjustments.a.sepSimpleTT1',
          external: true,
          dataTestID: 'adjustmentssepSimpleTT1Link',
        }
      ]
    }
  ]
)

export const sepSimpleSpouseToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'adjustments.h2.sepSimpleSpouseTT1',
      dataTestID: 'sepSimpleSpouseToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'adjustments.p.sepSimpleSpouseTT1',
      dataTestID: 'sepSimpleSpouseToolTipParagraph1',
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'adjustments.p.sepSimpleSpouseTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':selfEmployed',
          href: 'https://www.irs.gov/retirement-plans/self-employed-individuals-calculating-your-own-retirement-plan-contribution-and-deduction',
          text: 'adjustments.a.sepSimpleSpouseTT1',
          external: true,
          dataTestID: 'adjustmentssepSimpleSpouseTT1Link',
        }
      ]
    }
  ]
)

export const studentLoanToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'adjustments.h2.studentLoanTT1',
      dataTestID: 'studentLoanToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'adjustments.p.studentLoanTT1',
      dataTestID: 'studentLoanToolTipParagraph1',
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'adjustments.p.studentLoanTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic456',
          href: 'https://www.irs.gov/taxtopics/tc456',
          text: 'adjustments.a.studentLoanTT1',
          external: true,
          dataTestID: 'adjustmentsStudentLoanTT1Link',
        }
      ]
    }
  ]
)

export const educatorToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'adjustments.h2.educatorTT1',
      dataTestID: 'educatorToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'adjustments.p.educatorTT1',
      dataTestID: 'educatorToolTipParagraph1',
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'adjustments.p.educatorTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic458',
          href: 'https://www.irs.gov/taxtopics/tc458',
          text: 'adjustments.a.educatorTT1',
          external: true,
          dataTestID: 'adjustmentsEducatorTT1Link',
        }
      ]
    }
  ]
)

export const iraToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'adjustments.h2.iraTT1',
      dataTestID: 'iraToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'adjustments.p.iraTT1',
      dataTestID: 'iraToolTipParagraph1',
    },
    {
      key: 'tt-1-3',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'adjustments.h2.iraTT2',
      dataTestID: 'iraToolTipHeading2'
    },
    {
      key: 'tt-1-4',
      type: 'Paragraph',
      text: 'adjustments.p.iraTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopicIra',
          href: 'https://www.irs.gov/retirement-plans/ira-deduction-limits',
          text: 'adjustments.a.iraTT1',
          external: true,
          dataTestID: 'adjustmentsIRATT1Link',
        }
      ]
    }
  ]
)

export const hsaToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'adjustments.h2.hsaTT1',
      dataTestID: 'hsaToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'adjustments.p.hsaTT1',
      dataTestID: 'hsaToolTipParagraph1',
    },
    {
      key: 'tt-1-3',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'adjustments.h2.hsaTT2',
      dataTestID: 'hsaToolTipHeading2'
    },
    {
      key: 'tt-1-4',
      type: 'Paragraph',
      text: 'adjustments.p.hsaTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic969',
          href: 'https://www.irs.gov/forms-pubs/about-publication-969',
          text: 'adjustments.a.hsaTT1',
          external: true,
          dataTestID: 'adjustmentsHSATT1Link',
        }
      ]
    }
  ]
)

export const movingToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'adjustments.h2.movingTT1',
      dataTestID: 'movingToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'adjustments.p.movingTT1',
      dataTestID: 'movingToolTipParagraph1',
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'adjustments.p.movingTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic455',
          href: 'https://www.irs.gov/taxtopics/tc455',
          text: 'adjustments.a.movingTT1',
          external: true,
          dataTestID: 'adjustmentsMovingTT1Link',
        }
      ]
    }
  ]
)

export const alimonyToolTip = (param) => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'adjustments.h2.alimonyTT1',
      dataTestID: 'alimonyToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'adjustments.p.alimonyTT1',
      dataTestID: 'alimonyToolTipParagraph1',
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'adjustments.p.alimonyTT2',
      dataTestID: 'alimonyToolTipParagraph2',
      replacements: [
        {
          key: ':irsNoteBold',
          type: 'bold',
          text: 'adjustments.b.alimonyTT2',
          dataTestID: 'alimonyToolTipHeading2'
        },
        {
          key: ':pastYear',
          type: 'simpleText',
          text: param.current_year - 1,
          dataTestID: 'alimonyToolTipPastYear'
        },
        {
          key: ':currentYear',
          type: 'simpleText',
          text: param.current_year,
          dataTestID: 'alimonyToolTipCurrentYear'
        },
        {
          type: 'link',
          key: ':irsTopic452',
          href: 'https://www.irs.gov/taxtopics/tc452',
          text: 'adjustments.a.alimonyTT1',
          external: true,
          dataTestID: 'adjustmentsAlimonyTT1Link',
        },
      ]
    }
  ]
)

export const earlyWithdrawalToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'adjustments.h2.earlyWithdrawalTT1',
      dataTestID: 'earlyWithdrawalToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'adjustments.p.earlyWithdrawalTT1',
      dataTestID: 'earlyWithdrawalToolTipParagraph1',
    },
    {
      key: 'tt-1-4',
      type: 'Paragraph',
      text: 'adjustments.p.earlyWithdrawalTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopicEw',
          href: 'https://www.irs.gov/retirement-plans/hardships-early-withdrawals-and-loans',
          text: 'adjustments.a.earlyWithdrawalTT1',
          external: true,
          dataTestID: 'adjustmentsEarlyWithdrawalTT1Link',
        }
      ]
    }
  ]
)

export const businessToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'adjustments.h2.businessTT1',
      dataTestID: 'businessToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'adjustments.p.businessTT1',
      dataTestID: 'businessToolTipParagraph1',
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'adjustments.p.businessTT2',
      dataTestID: 'businessToolTipParagraph2',
    },
    {
      key: 'tt-1-4',
      type: 'Paragraph',
      text: 'adjustments.p.businessTT3',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic2106',
          href: 'https://www.irs.gov/instructions/i2106',
          text: 'adjustments.a.businessTT1',
          external: true,
          dataTestID: 'adjustmentsBusinessTT1Link',
        }
      ]
    }
  ]
)
