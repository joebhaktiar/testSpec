import * as ToolTips from '../Structure/ToolTipsHtml'

// SCENARIOS
export const showJobOrPension = (values) => values.filingStatus !== ''
export const showDemographics = (values) => showJobOrPension(values) && values.jobOrPension === 'yes'

// FORM ELEMENTS
export const aboutYouFormElements = (values, site, lang, param) => ([
  {
    inputType: 'radio',
    label: lang('aboutYou.label.filingStatus'),
    name: 'filingStatus',
    id: 'filingStatus',
    required: true,
    className: 'mt-6',
    dataTestId: 'filingStatus',
    helpTip: {
      page: 'aboutYou',
      expanded: site.forms.aboutYou.helpTips.filingStatus.open,
      ariaLabel: 'Filing Status - Help Tip',
      elements: () => ToolTips.filingStatusToolTip(),
    },
    options: [
      {
        id: 'filingStatus-single',
        value: 'single',
        label: lang('aboutYou.legend.filingStatus1'),
        ariaLabel: `${lang('aboutYou.label.filingStatus')}* ${lang('aboutYou.legend.filingStatus1')}`,
      },
      {
        id: 'filingStatus-mfj',
        value: 'married',
        label: lang('aboutYou.legend.filingStatus2'),
      },
      {
        id: 'filingStatus-mfs',
        value: 'married-separate',
        label: lang('aboutYou.legend.filingStatus5'),
      },
      {
        id: 'filingStatus-hoh',
        value: 'head-of-household',
        label: lang('aboutYou.legend.filingStatus3'),
      },
      {
        id: 'filingStatus-qw',
        value: 'widow',
        label: lang('aboutYou.legend.filingStatus4'),
      },

    ]
  },
  {
    inputType: 'radio',
    label: lang(values.filingStatus === 'married' ? 'aboutYou.label.jobOrPensionMFJ' : 'aboutYou.label.jobOrPension'),
    name: 'jobOrPension',
    id: 'jobOrPension',
    required: true,
    show: showJobOrPension(values),
    className: 'mt-6',
    dataTestId: 'jobOrPension',
    helpTip: {
      page: 'aboutYou',
      expanded: site.forms.aboutYou.helpTips.jobOrPension.open,
      ariaLabel: 'Job or Pension - Help Tip',
      elements: () => ToolTips.jobOrPensionToolTip(),
    },
    options: [
      {
        id: 'jobOrPension-yes',
        value: 'yes',
        label: lang('global.label.yes'),
        ariaLabel: `${lang(values.filingStatus === 'married' ? 'aboutYou.label.jobOrPensionMFJ' : 'aboutYou.label.jobOrPension')}* ${lang('global.label.yes')}`,
      },
      {
        id: 'jobOrPension-no',
        value: 'no',
        label: lang('global.label.no'),
      },
    ]
  },
  {
    inputType: 'checkbox',
    name: 'demographics',
    label: lang('aboutYou.label.demographics'),
    className: 'inline-block mt-6',
    show: showDemographics(values),
    dataTestId: 'demographicsCheckboxGroup',
    options: [
      {
        id: 'is65OrOlder',
        value: 'is65OrOlder',
        label: lang('aboutYou.label.is65OrOlder', { ':futureYear': param.current_year + 1 }),
        checkedValue: site.forms.aboutYou.values.demographics.includes('is65OrOlder'),
        dataTestId: 'is65OrOlder'
      },
      {
        id: 'is65OrOlderSpouse',
        value: 'is65OrOlderSpouse',
        label: lang('aboutYou.label.is65OrOlderSpouse', { ':futureYear': param.current_year + 1 }),
        show: values.filingStatus === 'married',
        checkedValue: site.forms.aboutYou.values.demographics.includes('is65OrOlderSpouse'),
        dataTestId: 'is65OrOlderSpouse'
      },
      {
        id: 'blind',
        value: 'blind',
        label: lang('aboutYou.label.blind'),
        checkedValue: site.forms.aboutYou.values.demographics.includes('blind'),
        dataTestId: 'blind',
        helpTip: {
          page: 'aboutYou',
          expanded: site.forms.aboutYou.helpTips.blind.open,
          ariaLabel: 'Is Blind - Help Tip',
          elements: () => ToolTips.blindToolTip(),
        }
      },
      {
        id: 'blindSpouse',
        value: 'blindSpouse',
        label: lang('aboutYou.label.blindSpouse'),
        show: values.filingStatus === 'married',
        checkedValue: site.forms.aboutYou.values.demographics.includes('blindSpouse'),
        dataTestId: 'blindSpouse'
      },
      {
        id: 'claimedAsDependent',
        value: 'claimedAsDependent',
        label: lang('aboutYou.label.claimedAsDependent'),
        checkedValue: site.forms.aboutYou.values.demographics.includes('claimedAsDependent'),
        dataTestId: 'claimedAsDependent',
        show: values.filingStatus !== 'widow',
        helpTip: {
          page: 'aboutYou',
          expanded: site.forms.aboutYou.helpTips.claimedAsDependent.open,
          ariaLabel: 'Claimed As Dependent - Help Tip',
          elements: () => ToolTips.claimedAsDependentToolTip(),
        }
      },
      {
        id: 'willClaimDependents',
        value: 'willClaimDependents',
        label: lang('aboutYou.label.willClaimDependents'),
        required: values.filingStatus === 'widow' || values.filingStatus === 'head-of-household',
        checkedValue: site.forms.aboutYou.values.demographics.includes('willClaimDependents'),
        dataTestId: 'willClaimDependents',
        helpTip: {
          page: 'aboutYou',
          expanded: site.forms.aboutYou.helpTips.willClaimDependents.open,
          ariaLabel: 'Will Claim Dependents - Help Tip',
          elements: () => ToolTips.willClaimDependentsToolTip(),
        }
      },
    ]
  },
])
