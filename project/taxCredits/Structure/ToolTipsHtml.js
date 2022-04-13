export const childrenAgesToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'taxCredits.h2.childrenAgesTT1',
      dataTestID: 'childrenAgesToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      text: 'taxCredits.p.childrenAgesTT1',
      className: 'my-3',
      dataTestID: 'childrenAgesToolTipParagraph1',
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'taxCredits.p.childrenAgesTT2',
      className: 'my-3',
      dataTestID: 'childrenAgesToolTipParagraph2',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic972',
          href: 'https://www.irs.gov/publications/p972',
          text: 'taxCredits.a.childrenAgesTT1',
          external: true,
          dataTestID: 'childrenAgesTT1Link',
        }
      ]
    },
  ]
)

export const numOfChildDependentCareQCToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'taxCredits.h2.numOfChildDependentCareQCTT1',
      dataTestID: 'numOfChildDependentCareQCToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      text: 'taxCredits.p.numOfChildDependentCareQCTT1',
      className: 'my-3',
      dataTestID: 'numOfChildDependentCareQCToolTipParagraph1'
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'taxCredits.p.numOfChildDependentCareQCTT2',
      dataTestID: 'numOfChildDependentCareQCToolTipParagraph2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic602',
          href: 'https://www.irs.gov/help/ita/am-i-eligible-to-claim-an-education-credit',
          text: 'taxCredits.a.numOfChildDependentCareQCTT1',
          external: true,
          dataTestID: 'numOfChildDependentCareQCTT1Link',
        }
      ]
    }
  ]
)

export const childDependentCareAmountToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'taxCredits.h2.childDependentCareAmountTT1',
      dataTestID: 'childDependentCareAmountToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      text: 'taxCredits.p.childDependentCareAmountTT1',
      className: 'my-3',
      dataTestID: 'childDependentCareAmountToolTipParagraph1',
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'taxCredits.p.childDependentCareAmountTT2',
      className: 'my-3',
      dataTestID: 'childDependentCareAmountToolTipParagraph2',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic602',
          href: 'https://www.irs.gov/taxtopics/tc602',
          text: 'taxCredits.a.childDependentCareAmountTT1',
          external: true,
          dataTestID: 'childDependentCareAmountTT1Link',
        }
      ]
    }
  ]
)

export const numOfEitcQCToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'taxCredits.h2.numOfEitcQCTT1',
      dataTestID: 'numOfEitcQCToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      text: 'taxCredits.p.numOfEitcQCTT1',
      className: 'my-3',
      dataTestID: 'numOfEitcQCToolTipParagraph1',
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'taxCredits.p.numOfEitcQCTT2',
      className: 'my-3',
      dataTestID: 'numOfEitcQCToolTipParagraph2',
      replacements: [
        {
          type: 'link',
          key: ':irsTopicEITC',
          href: 'https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit/use-the-eitc-assistant',
          text: 'taxCredits.a.numOfEitcQCTT1',
          external: true,
          dataTestID: 'numOfEitcQCTT1Link',
        }
      ]
    },
    {
      key: 'tt-1-4',
      type: 'Paragraph',
      text: 'taxCredits.p.numOfEitcQCTT3',
      className: 'my-3',
      dataTestID: 'numOfEitcQCToolTipParagraph3',
    },
    {
      key: 'tt-1-5',
      type: 'List',
      className: 'ml-10 mb-4 list list-disc',
      dataTestID: 'numOfEitcToolTipList',
      list: [
        'taxCredits.li.numOfEitcTT1',
        'taxCredits.li.numOfEitcTT2',
        'taxCredits.li.numOfEitcTT3',
        'taxCredits.li.numOfEitcTT4'
      ],
      replacements: [
        [],
        [],
        [
          {
            type: 'link',
            key: ':irsTopic596',
            href: 'https://www.irs.gov/forms-pubs/about-publication-596',
            text: 'taxCredits.a.numOfEitcQCTT2',
            external: true,
            dataTestID: 'numOfEitcQCTT2Link',
          }
        ],
        []
      ]
    },
    {
      key: 'tt-1-6',
      type: 'Paragraph',
      text: 'taxCredits.p.numOfEitcQCTT4',
      className: 'my-3',
      dataTestID: 'numOfEitcQCToolTipParagraph4',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic601',
          href: 'https://www.irs.gov/taxtopics/tc601',
          text: 'taxCredits.a.numOfEitcQCTT3',
          external: true,
          dataTestID: 'numOfEitcQCTT4Link',
        }
      ]
    }
  ]
)

export const adoptionCreditAmountToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'taxCredits.h2.adoptionCreditAmountTT1',
      dataTestID: 'adoptionCreditAmountToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      text: 'taxCredits.p.adoptionCreditAmountTT1',
      className: 'my-3',
      dataTestID: 'adoptionCreditAmountToolTipParagraph1',
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'taxCredits.p.adoptionCreditAmountTT2',
      className: 'my-3',
      dataTestID: 'adoptionCreditAmountToolTipParagraph2',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic607',
          href: 'https://www.irs.gov/taxtopics/tc607',
          text: 'taxCredits.a.adoptionCreditAmountTT1',
          external: true,
          dataTestID: 'adoptionCreditAmountTT1Link',
        }
      ]
    }
  ]
)

export const foreignTaxCreditToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'taxCredits.h2.foreignTaxCreditTT1',
      dataTestID: 'foreignTaxCreditToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      text: 'taxCredits.p.foreignTaxCreditTT1',
      className: 'my-3',
      dataTestID: 'foreignTaxCreditToolTipParagraph1'
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'taxCredits.p.foreignTaxCreditTT2',
      className: 'my-3',
      dataTestID: 'foreignTaxCreditToolTipParagraph2',
      replacements: [
        {
          type: 'link',
          key: ':irsTopicForeign',
          href: 'https://www.irs.gov/individuals/international-taxpayers/foreign-tax-credit',
          text: 'taxCredits.a.foreignTaxCreditTT1',
          external: true,
          dataTestID: 'foreignTaxCreditTT1Link',
        }
      ]
    }
  ]
)

export const aotcToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'taxCredits.h2.aotcTT1',
      dataTestID: 'aotcToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      text: 'taxCredits.p.aotcTT1',
      className: 'my-3',
      dataTestID: 'aotcToolTipHParagraph1',
      replacements: [
        {
          type: 'link',
          key: ':claimEducationCredit',
          href: 'https://www.irs.gov/help/ita/am-i-eligible-to-claim-an-education-credit',
          text: 'taxCredits.a.aotcTT1',
          external: true,
          dataTestID: 'aotcTT1Link',
        }
      ]
    },
  ]
)

export const llcToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'taxCredits.h2.llcTT1',
      dataTestID: 'llcToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      text: 'taxCredits.p.llcTT1',
      className: 'my-3',
      dataTestID: 'llcToolTipParagraph1',
      replacements: [
        {
          type: 'link',
          key: ':claimEducationCredit',
          href: 'https://www.irs.gov/help/ita/am-i-eligible-to-claim-an-education-credit',
          text: 'taxCredits.a.llcTT1',
          external: true,
          dataTestID: 'llcTT1Link',
        }
      ]
    },
  ]
)

export const retirementSavingsCreditToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'taxCredits.h2.retirementSavingsCreditTT1',
      dataTestID: 'retirementSavingsCreditToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      text: 'taxCredits.p.retirementSavingsCreditTT1',
      className: 'my-3',
      dataTestID: 'retirementSavingsCreditToolTipParagraph1'
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'taxCredits.p.retirementSavingsCreditTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopicRetirement',
          href: 'https://www.irs.gov/individuals/international-taxpayers/foreign-tax-credit',
          text: 'taxCredits.a.retirementSavingsCreditTT1',
          external: true,
          dataTestID: 'retirementSavingsCreditTT1Link',
        }
      ]
    }
  ]
)

export const homeOwnerTaxCreditToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'taxCredits.h2.homeOwnerTaxCreditTT1',
      dataTestID: 'homeOwnerTaxCreditToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      text: 'taxCredits.p.homeOwnerTaxCreditTT1',
      className: 'my-3',
      dataTestID: 'homeOwnerTaxCreditToolTipParagraph1'
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'taxCredits.p.homeOwnerTaxCreditTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic5695',
          href: 'https://www.irs.gov/instructions/i5695',
          text: 'taxCredits.a.homeOwnerTaxCreditTT1',
          external: true,
          dataTestID: 'homeOwnerTaxCreditTT1Link',
        }
      ]
    }
  ]
)

export const homeOwnerMortgageTaxCreditToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'taxCredits.h2.homeOwnerMortgageTaxCreditTT1',
      dataTestID: 'homeOwnerMortgageTaxCreditToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      text: 'taxCredits.p.homeOwnerMortgageTaxCreditTT1',
      className: 'my-3',
      dataTestID: 'homeOwnerMortgageTaxCreditToolTipParagraph1'
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'taxCredits.p.homeOwnerMortgageTaxCreditTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic8396',
          href: 'https://www.irs.gov/forms-pubs/about-form-8396',
          text: 'taxCredits.a.homeOwnerMortgageTaxCreditTT1',
          external: true,
          dataTestID: 'homeOwnerMortgageTaxCreditTT1Link',
        }
      ]
    }
  ]
)

export const elderlyTaxCreditToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'taxCredits.h2.elderlyTaxCreditTT1',
      dataTestID: 'elderlyTaxCreditToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      text: 'taxCredits.p.elderlyTaxCreditTT1',
      className: 'my-3',
      dataTestID: 'elderlyTaxCreditToolTipParagraph1'
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'taxCredits.p.elderlyTaxCreditTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopicElderly',
          href: 'https://www.irs.gov/credits-deductions/individuals/credit-for-the-elderly-or-the-disabled',
          text: 'taxCredits.a.elderlyTaxCreditTT1',
          external: true,
          dataTestID: 'elderlyTaxCreditTT1Link',
        }
      ]
    }
  ]
)

export const businessCreditToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'taxCredits.h2.businessCreditTT1',
      dataTestID: 'businessCreditToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      text: 'taxCredits.p.businessCreditTT1',
      className: 'my-3',
      dataTestID: 'businessCreditToolTipParagraph1'
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'taxCredits.p.businessCreditTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopicBusiness',
          href: 'https://www.irs.gov/businesses/small-businesses-self-employed/business-tax-credits',
          text: 'taxCredits.a.businessCreditTT1',
          external: true,
          dataTestID: 'businessCreditTT1Link',
        }
      ]
    }
  ]
)

export const alternativeMinimumCreditToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'taxCredits.h2.alternativeMinimumCreditTT1',
      dataTestID: 'alternativeMinimumCreditToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      text: 'taxCredits.p.alternativeMinimumCreditTT1',
      className: 'my-3',
      dataTestID: 'alternativeMinimumCreditToolTipParagraph1'
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'taxCredits.p.alternativeMinimumCreditTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopicAlternative',
          href: 'https://www.irs.gov/forms-pubs/about-form-8801',
          text: 'taxCredits.a.alternativeMinimumCreditTT1',
          external: true,
          dataTestID: 'alternativeMinimumCreditTT1Link',
        }
      ]
    },
  ]
)

export const energyMotorVehicleTaxCreditToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'taxCredits.h2.energyMotorVehicleTaxCreditTT1',
      dataTestID: 'energyMotorVehicleTaxCreditToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      text: 'taxCredits.p.energyMotorVehicleTaxCreditTT1',
      className: 'my-3',
      dataTestID: 'energyMotorVehicleTaxCreditToolTipParagraph1'
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'taxCredits.p.energyMotorVehicleTaxCreditTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic8910',
          href: 'https://www.irs.gov/forms-pubs/about-form-8910',
          text: 'taxCredits.a.energyMotorVehicleTaxCreditTT1',
          external: true,
          dataTestID: 'energyMotorVehicleTaxCreditTT1Link',
        }
      ]
    },
  ]
)

export const energyRefuelingTaxCreditToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'taxCredits.h2.energyRefuelingTaxCreditTT1',
      dataTestID: 'energyRefuelingTaxCreditToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      text: 'taxCredits.p.energyRefuelingTaxCreditTT1',
      className: 'my-3',
      dataTestID: 'energyRefuelingTaxCreditToolTipParagraph1'
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'taxCredits.p.energyRefuelingTaxCreditTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic8911',
          href: 'https://www.irs.gov/forms-pubs/about-form-8910',
          text: 'taxCredits.a.energyRefuelingTaxCreditTT1',
          external: true,
          dataTestID: 'energyRefuelingTaxCreditTT1Link',
        }
      ]
    },
  ]
)

export const energyPlugInTaxCreditToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'taxCredits.h2.energyPlugInTaxCreditTT1',
      dataTestID: 'energyPlugInTaxCreditToolTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      text: 'taxCredits.p.energyPlugInTaxCreditTT1',
      className: 'my-3',
      dataTestID: 'energyPlugInTaxCreditToolTipParagraph1'
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      text: 'taxCredits.p.energyPlugInTaxCreditTT2',
      className: 'my-3',
      replacements: [
        {
          type: 'link',
          key: ':irsTopic30D',
          href: 'https://www.irs.gov/forms-pubs/about-form-8910',
          text: 'taxCredits.a.energyPlugInTaxCreditTT1',
          external: true,
          dataTestID: 'energyPlugInTaxCreditTT1Link',
        }
      ]
    },
  ]
)
