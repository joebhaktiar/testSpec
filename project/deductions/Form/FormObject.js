import { formatMoney } from '../../../helpers'
import getStandardDeduction from '../../../calculations/twe/utils/deductions/getStandardDeduction'
import * as ToolTips from '../Structure/ToolTipsHtml'

// SCENARIOS
export const showDisabledCheckboxes = (values) => values.deductions === 'standardDeduction' || values.deductions === ''
export const showEnabledCheckboxes = (values) => values.deductions === 'itemizedDeduction'

// FORM ELEMENTS
export const deductionsFormElements = (values, site, lang, setFieldValue, param) => ([
  {
    inputType: 'radio',
    name: 'deductions',
    id: 'deductions',
    label: lang('deductions.label.deductions'),
    required: true,
    helpTip: {
      page: 'deductions',
      expanded: site.forms.deductions.helpTips.deductions.open,
      ariaLabel: 'Deductions - Help Tip',
      elements: () => ToolTips.deductionsToolTip(),
    },
    className: 'mt-6',
    replacements: [
      {
        type: 'bold',
        key: ':bold',
        text: 'deductions.bold.deductions',
        repObject: { ':amount': formatMoney(getStandardDeduction(site, 0, param)) },
      }
    ],
    dataTestId: 'deductions',
    options: [
      {
        id: 'deductions-standardDeduction',
        value: 'standardDeduction',
        label: lang('deductions.label.standardDeduction'),
        replacements: [
          {
            type: 'bold',
            key: ':bold',
            text: 'deductions.bold.standardDeduction',
            repObject: { ':amount': formatMoney(getStandardDeduction(site, 0, param)) },
          }
        ],
      },
      {
        id: 'deductions-itemizeDeductions',
        value: 'itemizedDeduction',
        label: lang('deductions.label.itemizeDeductions')
      },
    ]
  },
  {
    inputType: 'conditionalCheckbox',
    label: lang('deductions.label.deductionPayments'),
    name: 'deductionPaymentsDisabled',
    id: 'deductionPaymentsDisabled',
    placeholder: lang('global.placeholder.amount'),
    className: 'inline-block',
    show: showDisabledCheckboxes(values),
    pushObject: {
      amount: ''
    },
    options: [
      {
        checkedValue: values.deductionPaymentsDisabled.medical.checked,
        fieldArray: values.deductionPaymentsDisabled.medical.info,
        name: 'deductionPaymentsDisabled.medical.checked',
        label: lang('deductionPayments.label.medical'),
        groupName: 'medical',
        disabled: true,
        showFields: false,
        handleChange: () => {
          if (values.deductionPaymentsDisabled.medical.checked) {
            setFieldValue('deductionPaymentsDisabled.medical.info', [{ amount: '' }])
          }
        },
        formElements: (fieldArrIndex, remove) => (
          [
            {
              inputType: 'currencyField',
              label: lang('global.label.amount'),
              name: `deductionPaymentsDisabled.medical.info[${fieldArrIndex}].amount`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-4',
              dataTestId: `medical${fieldArrIndex}`,
            },
          ]
        )
      },
      {
        checkedValue: values.deductionPaymentsDisabled.paid.checked,
        fieldArray: values.deductionPaymentsDisabled.paid.info,
        name: 'deductionPaymentsDisabled.paid.checked',
        label: lang('deductionPayments.label.paid'),
        groupName: 'paid',
        disabled: true,
        showFields: false,
        handleChange: () => {
          if (values.deductionPaymentsDisabled.paid.checked) {
            setFieldValue('deductionPaymentsDisabled.paid.info', [{ amount: '' }])
          }
        },
        formElements: (fieldArrIndex, remove) => (
          [
            {
              inputType: 'currencyField',
              label: lang('global.label.amount'),
              name: `deductionPaymentsDisabled.paid.info[${fieldArrIndex}].amount`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-4',
              dataTestId: `paid${fieldArrIndex}`,
            },
          ]
        )
      },
      {
        disabled: true,
        checkedValue: values.deductionPaymentsDisabled.qualified.checked,
        fieldArray: values.deductionPaymentsDisabled.qualified.info,
        name: 'deductionPaymentsDisabled.qualified.checked',
        label: lang('deductionPayments.label.qualified'),
        groupName: 'qualified',
        showFields: false,
        handleChange: () => {
          if (values.deductionPaymentsDisabled.qualified.checked) {
            setFieldValue('deductionPaymentsDisabled.qualified.info', [{ amount: '' }])
          }
        },
        formElements: (fieldArrIndex, remove) => (
          [
            {
              inputType: 'currencyField',
              label: lang('global.label.amount'),
              name: `deductionPaymentsDisabled.qualified.info[${fieldArrIndex}].amount`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-4',
              dataTestId: `qualified${fieldArrIndex}`,
            },
          ]
        )
      },
      {
        disabled: true,
        checkedValue: values.deductionPaymentsDisabled.charity.checked,
        fieldArray: values.deductionPaymentsDisabled.charity.info,
        name: 'deductionPaymentsDisabled.charity.checked',
        label: lang('deductionPayments.label.charity'),
        groupName: 'charity',
        showFields: false,
        handleChange: () => {
          if (values.deductionPaymentsDisabled.charity.checked) {
            setFieldValue('deductionPaymentsDisabled.charity.info', [{ amount: '' }])
          }
        },
        formElements: (fieldArrIndex, remove) => (
          [
            {
              inputType: 'currencyField',
              label: lang('global.label.amount'),
              name: `deductionPaymentsDisabled.charity.info[${fieldArrIndex}].amount`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-4',
              dataTestId: `charity${fieldArrIndex}`,
            },
          ]
        )
      },
      {
        disabled: true,
        checkedValue: values.deductionPaymentsDisabled.casualty.checked,
        fieldArray: values.deductionPaymentsDisabled.casualty.info,
        name: 'deductionPaymentsDisabled.casualty.checked',
        label: lang('deductionPayments.label.casualty'),
        groupName: 'casualty',
        showFields: false,
        handleChange: () => {
          if (values.deductionPaymentsDisabled.casualty.checked) {
            setFieldValue('deductionPaymentsDisabled.casualty.info', [{ amount: '' }])
          }
        },
        formElements: (fieldArrIndex) => (
          [
            {
              inputType: 'currencyField',
              label: lang('global.label.amount'),
              name: `deductionPaymentsDisabled.casualty.info[${fieldArrIndex}].amount`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-4',
              dataTestId: `casualty${fieldArrIndex}`,
            },
          ]
        )
      },
      {
        disabled: true,
        checkedValue: values.deductionPaymentsDisabled.other.checked,
        fieldArray: values.deductionPaymentsDisabled.other.info,
        name: 'deductionPaymentsDisabled.other.checked',
        label: lang('deductionPayments.label.other'),
        groupName: 'other',
        showFields: false,
        handleChange: () => {
          if (values.deductionPaymentsDisabled.other.checked) {
            setFieldValue('deductionPaymentsDisabled.other.info', [{ amount: '' }])
          }
        },
        formElements: (fieldArrIndex, remove) => (
          [
            {
              inputType: 'currencyField',
              label: lang('global.label.amount'),
              name: `deductionPaymentsDisabled.other.info[${fieldArrIndex}].amount`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-4',
              dataTestId: `other${fieldArrIndex}`,
            },
          ]
        )
      },
    ]
  },
  {
    inputType: 'conditionalCheckbox',
    label: lang('deductions.label.deductionPayments'),
    name: 'deductionPayments',
    id: 'deductionPayments',
    placeholder: lang('global.placeholder.amount'),
    className: 'inline-block',
    show: showEnabledCheckboxes(values),
    pushObject: {
      amount: ''
    },
    options: [
      {
        checkedValue: values.deductionPayments.medical.checked,
        fieldArray: values.deductionPayments.medical.info,
        name: 'deductionPayments.medical.checked',
        label: lang('deductionPayments.label.medical'),
        groupName: 'medical',
        showFields: values.deductionPayments.medical.checked,
        helpTip: {
          page: 'deductions',
          expanded: site.forms.deductions.helpTips['deductionPayments.medical.checked'].open,
          ariaLabel: 'Medical - Help Tip',
          elements: () => ToolTips.medicalToolTip(),
          dataTestID: 'medical'
        },
        handleChange: () => {
          if (values.deductionPayments.medical.checked) {
            setFieldValue('deductionPayments.medical.info', [{ amount: '' }])
          }
        },
        formElements: (fieldArrIndex, remove) => (
          [
            {
              inputType: 'currencyField',
              label: lang('global.label.amount'),
              name: `deductionPayments.medical.info[${fieldArrIndex}].amount`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-4',
              dataTestId: `medical${fieldArrIndex}`,
              removeBtnObj: {
                dataTestID: `deleteButton${fieldArrIndex}`,
                ariaLabel: `Remove Medical and Dental Expenses: ${fieldArrIndex + 1}`,
                fieldArrIndex,
                remove,
              }
            },
          ]
        )
      },
      {
        checkedValue: values.deductionPayments.paid.checked,
        fieldArray: values.deductionPayments.paid.info,
        name: 'deductionPayments.paid.checked',
        label: lang('deductionPayments.label.paid'),
        groupName: 'paid',
        showFields: values.deductionPayments.paid.checked,
        callout: {
          title: lang('deductions.label.paidCallout', { ':amount': site.forms.aboutYou.values.filingStatus === 'married-separate' ? '$5,000' : '$10,000' })
        },
        helpTip: {
          page: 'deductions',
          expanded: site.forms.deductions.helpTips['deductionPayments.paid.checked'].open,
          ariaLabel: 'Taxes paid - Help Tip',
          elements: () => ToolTips.paidToolTip(),
          dataTestID: 'paid'
        },
        handleChange: () => {
          if (values.deductionPayments.paid.checked) {
            setFieldValue('deductionPayments.paid.info', [{ amount: '' }])
          }
        },
        formElements: (fieldArrIndex, remove) => (
          [
            {
              inputType: 'currencyField',
              label: lang('global.label.amount'),
              name: `deductionPayments.paid.info[${fieldArrIndex}].amount`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-4',
              dataTestId: `paid${fieldArrIndex}`,
              removeBtnObj: {
                dataTestID: `deleteButton${fieldArrIndex}`,
                ariaLabel: `Remove Taxes you Paid: ${fieldArrIndex + 1}`,
                fieldArrIndex,
                remove,
              }
            },
          ]
        )
      },
      {
        checkedValue: values.deductionPayments.qualified.checked,
        fieldArray: values.deductionPayments.qualified.info,
        name: 'deductionPayments.qualified.checked',
        label: lang('deductionPayments.label.qualified'),
        groupName: 'qualified',
        showFields: values.deductionPayments.qualified.checked,
        helpTip: {
          page: 'deductions',
          expanded: site.forms.deductions.helpTips['deductionPayments.qualified.checked'].open,
          ariaLabel: 'Qualified Interests - Help Tip',
          elements: () => ToolTips.qualifiedToolTip(),
          dataTestID: 'qualified'
        },
        handleChange: () => {
          if (values.deductionPayments.qualified.checked) {
            setFieldValue('deductionPayments.qualified.info', [{ amount: '' }])
          }
        },
        formElements: (fieldArrIndex, remove) => (
          [
            {
              inputType: 'currencyField',
              label: lang('global.label.amount'),
              name: `deductionPayments.qualified.info[${fieldArrIndex}].amount`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-4',
              dataTestId: `qualified${fieldArrIndex}`,
              removeBtnObj: {
                dataTestID: `deleteButton${fieldArrIndex}`,
                ariaLabel: `Remove Qualified Interests: ${fieldArrIndex + 1}`,
                fieldArrIndex,
                remove,
              }
            },
          ]
        )
      },
      {
        checkedValue: values.deductionPayments.charity.checked,
        fieldArray: values.deductionPayments.charity.info,
        name: 'deductionPayments.charity.checked',
        label: lang('deductionPayments.label.charity'),
        groupName: 'charity',
        showFields: values.deductionPayments.charity.checked,
        helpTip: {
          page: 'deductions',
          expanded: site.forms.deductions.helpTips['deductionPayments.charity.checked'].open,
          ariaLabel: 'Charity - Help Tip',
          elements: () => ToolTips.charityToolTip(),
          dataTestID: 'charity'
        },
        handleChange: () => {
          if (values.deductionPayments.charity.checked) {
            setFieldValue('deductionPayments.charity.info', [{ amount: '' }])
          }
        },
        formElements: (fieldArrIndex, remove) => (
          [
            {
              inputType: 'currencyField',
              label: lang('global.label.amount'),
              name: `deductionPayments.charity.info[${fieldArrIndex}].amount`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-4',
              dataTestId: `charity${fieldArrIndex}`,
              removeBtnObj: {
                dataTestID: `deleteButton${fieldArrIndex}`,
                ariaLabel: `Remove Gifts to Charity: ${fieldArrIndex + 1}`,
                fieldArrIndex,
                remove,
              }
            },
          ]
        )
      },
      {
        checkedValue: values.deductionPayments.casualty.checked,
        fieldArray: values.deductionPayments.casualty.info,
        name: 'deductionPayments.casualty.checked',
        label: lang('deductionPayments.label.casualty'),
        groupName: 'casualty',
        showFields: values.deductionPayments.casualty.checked,
        helpTip: {
          page: 'deductions',
          expanded: site.forms.deductions.helpTips['deductionPayments.casualty.checked'].open,
          ariaLabel: 'Casualty - Help Tip',
          elements: () => ToolTips.casualtyToolTip(),
          dataTestID: 'casualty'
        },
        handleChange: () => {
          if (values.deductionPayments.casualty.checked) {
            setFieldValue('deductionPayments.casualty.info', [{ amount: '' }])
          }
        },
        formElements: (fieldArrIndex, remove) => (
          [
            {
              inputType: 'currencyField',
              label: lang('global.label.amount'),
              name: `deductionPayments.casualty.info[${fieldArrIndex}].amount`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-4',
              dataTestId: `casualty${fieldArrIndex}`,
              removeBtnObj: {
                dataTestID: `deleteButton${fieldArrIndex}`,
                ariaLabel: `Remove Casualty Losses: ${fieldArrIndex + 1}`,
                fieldArrIndex,
                remove,
              }
            },
          ]
        )
      },
      {
        checkedValue: values.deductionPayments.other.checked,
        fieldArray: values.deductionPayments.other.info,
        name: 'deductionPayments.other.checked',
        label: lang('deductionPayments.label.other'),
        groupName: 'other',
        showFields: values.deductionPayments.other.checked,
        helpTip: {
          page: 'deductions',
          expanded: site.forms.deductions.helpTips['deductionPayments.other.checked'].open,
          ariaLabel: 'Other deductions - Help Tip',
          elements: () => ToolTips.otherToolTip(),
          dataTestID: 'other'
        },
        handleChange: () => {
          if (values.deductionPayments.other.checked) {
            setFieldValue('deductionPayments.other.info', [{ amount: '' }])
          }
        },
        formElements: (fieldArrIndex, remove) => (
          [
            {
              inputType: 'currencyField',
              label: lang('global.label.amount'),
              name: `deductionPayments.other.info[${fieldArrIndex}].amount`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-4',
              dataTestId: `other${fieldArrIndex}`,
              removeBtnObj: {
                dataTestID: `deleteButton${fieldArrIndex}`,
                ariaLabel: `Remove Other Itemized Deduction: ${fieldArrIndex + 1}`,
                fieldArrIndex,
                remove,
              }
            },
          ]
        )
      },
    ]
  },
  {
    inputType: 'htmlBuilder',
    elements: [
      {
        key: 'numOfDepHeading',
        type: 'Heading',
        level: '3',
        className: `font-bold text-1.5xl mt-6 mb-2 ${values.deductions === 'itemizedDeduction' ? 'inline-block' : 'hidden'}`,
        text: lang('deductions.h.totalItemizedDeductions', { ':amount': `${formatMoney(site.forms.deductions.values.deductionsTotal)}` }),
        dataTestID: 'itemizedTotal',
      },
      {
        key: 'test',
        type: 'Paragraph',
        level: '3',
        className: `${values.deductions === 'itemizedDeduction' ? 'block' : 'hidden'}`,
        text: lang('deductions.p.portionOfItemizedDeductions'),
        dataTestID: 'test'
      }
    ]
  },
  {
    inputType: 'checkbox',
    name: 'itemizedCalculationsDisabled',
    label: lang('deductions.label.itemizedCalculations'),
    className: 'inline-block mt-3',
    boldLabel: true,
    show: showDisabledCheckboxes(values),
    dataTestId: 'useItemizedLabel',
    options: [
      {
        id: 'itemized',
        value: 'itemizedDisabled',
        label: lang('deductions.label.itemized'),
        disabled: true,
        dataTestId: 'useItemized',
      },
    ]
  },
  {
    inputType: 'checkbox',
    name: 'itemizedCalculations',
    label: lang('deductions.label.itemizedCalculations'),
    className: 'inline-block mt-3',
    boldLabel: true,
    show: showEnabledCheckboxes(values),
    dataTestId: 'useItemizedLabel',
    options: [
      {
        id: 'itemized',
        value: 'itemized',
        label: lang('deductions.label.itemized'),
        checkedValue: site.forms.deductions.values.itemizedCalculations.includes('itemized'),
        dataTestId: 'useItemized',
      },
    ]
  }
])
