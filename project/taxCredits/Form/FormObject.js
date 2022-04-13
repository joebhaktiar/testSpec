import * as ToolTips from '../Structure/ToolTipsHtml'

// FORM ELEMENTS
export const childCreditsFormElements = (lang, site) => {
  const { values, helpTips } = site.forms.taxCredits

  return [
    {
      inputType: 'htmlBuilder',
      elements: [
        {
          key: 'childDependentCareCreditHeading',
          type: 'Heading',
          level: '3',
          className: 'font-bold text-lg mt-6',
          text: lang('taxCredits.h3.childDependentCareHeading'),
          dataTestID: 'childDependentCareCreditHeading1'
        },
      ]
    },
    {
      inputType: 'counter',
      label: lang('taxCredits.label.numOfChildDependentCareQC'),
      name: 'numOfChildDependentCareQC',
      id: 'numOfChildDependentCareQC',
      className: 'mt-3',
      helpTip: {
        page: 'taxCredits',
        expanded: helpTips.numOfChildDependentCareQC.open,
        ariaLabel: 'Number of Children - Help Tip',
        elements: () => ToolTips.numOfChildDependentCareQCToolTip(),
      },
      min: 0,
      max: 10,
      dataTestId: 'numOfChildDependentCareQC',
      decreaseAriaLabel: `${values.numOfChildDependentCareQC} ${values.numOfChildDependentCareQC === 1 ? 'Qualifying Child' : 'Qualifying Children'}: Decrease qualifying children for child dependent care credit`,
      increaseAriaLabel: `${values.numOfChildDependentCareQC} ${values.numOfChildDependentCareQC === 1 ? 'Qualifying Child' : 'Qualifying Children'}: Increase qualifying children for child dependent care credit`,
    },
    {
      inputType: 'currencyField',
      label: lang('taxCredits.label.childDependentCareAmount'),
      name: 'childDependentCareAmount',
      placeholder: lang('global.placeholder.amount'),
      className: 'mt-6',
      helpTip: {
        page: 'taxCredits',
        expanded: site.forms.taxCredits.helpTips.childDependentCareAmount.open,
        ariaLabel: 'Child Depdendent Tax Credit - Help Tip',
        elements: () => ToolTips.childDependentCareAmountToolTip(),
      },
      dataTestId: 'childDependentCareAmount'
    },
    {
      inputType: 'htmlBuilder',
      elements: [
        {
          key: 'eitcHeading',
          type: 'Heading',
          level: '3',
          className: 'font-bold text-lg mt-6',
          text: lang('taxCredits.h3.eitcHeading'),
          dataTestID: 'eitcHeading1'
        },
      ]
    },
    {
      inputType: 'counter',
      label: lang('taxCredits.label.numOfEitcQC'),
      name: 'numOfEitcQC',
      id: 'numOfEitcQC',
      className: 'my-2',
      helpTip: {
        page: 'taxCredits',
        expanded: helpTips.numOfEitcQC.open,
        ariaLabel: 'EITC Qualifying Children - Help Tip',
        elements: () => ToolTips.numOfEitcQCToolTip(),
      },
      min: 0,
      max: 3,
      callout: {
        title: lang('taxCredits.label.numOfEitcQCCallout')
      },
      dataTestId: 'numOfEitcQC',
      decreaseAriaLabel: `${values.numOfEitcQC} ${values.numOfEitcQC === 1 ? 'Qualifying Child' : 'Qualifying Children'}: Decrease qualifying children for the earned income tax credit`,
      increaseAriaLabel: `${values.numOfEitcQC} ${values.numOfEitcQC === 1 ? 'Qualifying Child' : 'Qualifying Children'}: Increase qualifying children for the earned income tax credit`,
    },
    {
      inputType: 'htmlBuilder',
      elements: [
        {
          key: 'adoptionCreditHeading',
          type: 'Heading',
          level: '3',
          className: 'font-bold text-lg mt-6',
          text: lang('taxCredits.h3.adoptionCreditHeading'),
          dataTestID: 'adoptionCreditHeading1'
        },
      ]
    },
    {
      inputType: 'currencyField',
      label: lang('taxCredits.label.adoptionCreditAmount'),
      name: 'adoptionCreditAmount',
      placeholder: lang('global.placeholder.amount'),
      className: 'my-2',
      helpTip: {
        page: 'taxCredits',
        expanded: site.forms.taxCredits.helpTips.adoptionCreditAmount.open,
        ariaLabel: 'Adoption - Help Tip',
        elements: () => ToolTips.adoptionCreditAmountToolTip(),
      },
      dataTestId: 'adoptionCreditAmount',
    },
  ]
}

export const foreignTaxFormElements = (lang, site) => ([
  {
    inputType: 'currencyField',
    label: lang('taxCredits.label.foreignTaxCredit'),
    name: 'foreignTaxCredit',
    placeholder: lang('global.placeholder.amount'),
    className: 'my-2',
    helpTip: {
      page: 'taxCredits',
      expanded: site.forms.taxCredits.helpTips.foreignTaxCredit.open,
      ariaLabel: 'Foreign Tax Credit - Help Tip',
      elements: () => ToolTips.foreignTaxCreditToolTip(),
    },
    dataTestId: 'foreignTaxCredit',
  },
])

export const educationCreditFormElements = (lang, site) => {
  const { values } = site.forms.taxCredits

  return [
    {
      inputType: 'htmlBuilder',
      elements: [
        {
          key: 'aotcCreditHeading',
          type: 'Heading',
          level: '3',
          className: 'font-bold text-lg mb-4',
          text: lang('taxCredits.h3.aotcCreditHeading'),
          dataTestID: 'aotcCreditHeading'
        },
      ]
    },
    {
      inputType: 'counter',
      label: lang('taxCredits.label.numOfStudents'),
      name: 'numOfStudents',
      id: 'numOfStudents',
      className: 'my-2',
      min: 0,
      max: 10,
      dataTestId: 'numOfStudents',
      decreaseAriaLabel: `${values.numOfStudents} ${values.numOfStudents === 1 ? 'Student' : 'Students'}: Decrease Number of Students`,
      increaseAriaLabel: `${values.numOfStudents} ${values.numOfStudents === 1 ? 'Student' : 'Students'}: Increase Number of Students`,
    },
    {
      inputType: 'currencyField',
      label: lang('taxCredits.label.aotc'),
      name: 'aotc',
      placeholder: lang('global.placeholder.amount'),
      callout: {
        title: lang('taxCredits.label.aotcCallout')
      },
      helpTip: {
        page: 'taxCredits',
        expanded: site.forms.taxCredits.helpTips.aotc.open,
        ariaLabel: 'American Opportunity Tax Credit - Help Tip',
        elements: () => ToolTips.aotcToolTip(),
      },
      className: 'mt-6',
      dataTestId: 'aotc',
    },
    {
      inputType: 'htmlBuilder',
      elements: [
        {
          key: 'llcCreditHeading',
          type: 'Heading',
          level: '3',
          className: `font-bold text-lg my-4 ${site.forms.aboutYou.values.filingStatus === 'married-separate' ? 'hidden' : ''}`,
          text: lang('taxCredits.h3.llcCreditHeading'),
          dataTestId: 'llcCreditHeading'
        },
      ]
    },
    {
      inputType: 'currencyField',
      label: lang('taxCredits.label.llc'),
      name: 'llc',
      placeholder: lang('global.placeholder.amount'),
      show: site.forms.aboutYou.values.filingStatus !== 'married-separate',
      callout: {
        title: lang('taxCredits.label.llcCallout')
      },
      helpTip: {
        page: 'taxCredits',
        expanded: site.forms.taxCredits.helpTips.llc.open,
        ariaLabel: 'Lifetime Learning Credit - Help Tip',
        elements: () => ToolTips.llcToolTip(),
      },
      className: 'mt-6',
      dataTestId: 'llc',
    },
  ]
}

export const retirementSavingsCreditFormElements = (lang, site) => ([
  {
    inputType: 'currencyField',
    label: lang('taxCredits.label.retirementSavingsCredit'),
    name: 'retirementSavingsCredit',
    placeholder: lang('global.placeholder.amount'),
    className: 'my-2',
    helpTip: {
      page: 'taxCredits',
      expanded: site.forms.taxCredits.helpTips.retirementSavingsCredit.open,
      ariaLabel: 'Retirement Credit - Help Tip',
      elements: () => ToolTips.retirementSavingsCreditToolTip(),
    },
    dataTestId: 'retirementSavingsCredit',
  },
])

export const homeOwnerTaxFormElements = (lang, site) => ([
  {
    inputType: 'currencyField',
    label: lang('taxCredits.label.homeOwnerTaxCredit'),
    name: 'homeOwnerTaxCredit',
    placeholder: lang('global.placeholder.amount'),
    className: 'my-2',
    helpTip: {
      page: 'taxCredits',
      expanded: site.forms.taxCredits.helpTips.homeOwnerTaxCredit.open,
      ariaLabel: 'Home Owner Tax Credit - Help Tip',
      elements: () => ToolTips.homeOwnerTaxCreditToolTip(),
    },
    dataTestId: 'homeOwnerTaxCredit',
  },
  {
    inputType: 'currencyField',
    label: lang('taxCredits.label.homeOwnerMortgageTaxCredit'),
    name: 'homeOwnerMortgageTaxCredit',
    placeholder: lang('global.placeholder.amount'),
    className: 'my-5',
    helpTip: {
      page: 'taxCredits',
      expanded: site.forms.taxCredits.helpTips.homeOwnerMortgageTaxCredit.open,
      ariaLabel: 'Home Owner Mortgage Tax Credit - Help Tip',
      elements: () => ToolTips.homeOwnerMortgageTaxCreditToolTip(),
    },
    dataTestId: 'homeOwnerMortgageTaxCredit',
  }
])

export const elderlyTaxCreditFormElements = (lang, site) => ([
  {
    inputType: 'currencyField',
    label: lang('taxCredits.label.elderlyTaxCredit'),
    name: 'elderlyTaxCredit',
    placeholder: lang('global.placeholder.amount'),
    className: 'my-2',
    helpTip: {
      page: 'taxCredits',
      expanded: site.forms.taxCredits.helpTips.elderlyTaxCredit.open,
      ariaLabel: 'Elderly Tax Credit - Help Tip',
      elements: () => ToolTips.elderlyTaxCreditToolTip(),
    },
    dataTestId: 'elderlyTaxCredit',
  },
])

export const businessCreditFormElements = (lang, site) => ([
  {
    inputType: 'currencyField',
    label: lang('taxCredits.label.businessCredit'),
    name: 'businessCredit',
    placeholder: lang('global.placeholder.amount'),
    className: 'my-2',
    helpTip: {
      page: 'taxCredits',
      expanded: site.forms.taxCredits.helpTips.businessCredit.open,
      ariaLabel: 'Business Tax Credit - Help Tip',
      elements: () => ToolTips.businessCreditToolTip(),
    },
    dataTestId: 'businessCredit',
  },
])

export const alternativeMinimumCreditFormElements = (lang, site) => ([
  {
    inputType: 'currencyField',
    label: lang('taxCredits.label.alternativeMinimumCredit'),
    name: 'alternativeMinimumCredit',
    placeholder: lang('global.placeholder.amount'),
    className: 'my-2',
    helpTip: {
      page: 'taxCredits',
      expanded: site.forms.taxCredits.helpTips.alternativeMinimumCredit.open,
      ariaLabel: 'Alternative Tax Credit - Help Tip',
      elements: () => ToolTips.alternativeMinimumCreditToolTip(),
    },
    dataTestId: 'alternativeMinimumCredit',
  },
])

export const energyTaxCreditFormElements = (lang, site) => ([
  {
    inputType: 'currencyField',
    label: lang('taxCredits.label.energyMotorVehicleTaxCredit'),
    name: 'energyMotorVehicleTaxCredit',
    placeholder: lang('global.placeholder.amount'),
    className: 'my-2',
    helpTip: {
      page: 'taxCredits',
      expanded: site.forms.taxCredits.helpTips.energyMotorVehicleTaxCredit.open,
      ariaLabel: 'Energy Motor Tax Credit - Help Tip',
      elements: () => ToolTips.energyMotorVehicleTaxCreditToolTip(),
    },
    dataTestId: 'energyMotorVehicleTaxCredit',
  },
  {
    inputType: 'currencyField',
    label: lang('taxCredits.label.energyRefuelingTaxCredit'),
    name: 'energyRefuelingTaxCredit',
    placeholder: lang('global.placeholder.amount'),
    className: 'my-5',
    helpTip: {
      page: 'taxCredits',
      expanded: site.forms.taxCredits.helpTips.energyRefuelingTaxCredit.open,
      ariaLabel: 'Energy Refueling Tax Credit - Help Tip',
      elements: () => ToolTips.energyRefuelingTaxCreditToolTip(),
    },
    dataTestId: 'energyRefuelingTaxCredit',
  },
  {
    inputType: 'currencyField',
    label: lang('taxCredits.label.energyPlugInTaxCredit'),
    name: 'energyPlugInTaxCredit',
    placeholder: lang('global.placeholder.amount'),
    className: 'my-5',
    helpTip: {
      page: 'taxCredits',
      expanded: site.forms.taxCredits.helpTips.energyPlugInTaxCredit.open,
      ariaLabel: 'Energy Plugin Tax Credit - Help Tip',
      elements: () => ToolTips.energyPlugInTaxCreditToolTip(),
    },
    dataTestId: 'energyPlugInTaxCredit',
  }
])
