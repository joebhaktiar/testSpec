import * as ToolTips from '../Structure/ToolTipsHtml'

// SCENARIOS
export const showJobOrPension = (values) => values.filingStatus !== ''

// FORM ELEMENTS
export const adjustmentsFormElements = (values, site, lang, setFieldValue, param) => {
  const formElements = ([
    {
      inputType: 'conditionalCheckbox',
      label: lang('adjustments.label.adjustments', { ':year': param.current_year }),
      name: 'adjustments',
      placeholder: lang('global.placeholder.amount'),
      className: 'inline-block',
      pushObject: {
        amount: ''
      },
      options: [
        {
          checkedValue: values.adjustments.studentLoan.checked,
          fieldArray: values.adjustments.studentLoan.info,
          name: 'adjustments.studentLoan.checked',
          label: lang('adjustments.label.studentLoan'),
          groupName: 'studentLoan',
          showFields: values.adjustments.studentLoan.checked,
          callout: {
            title: lang('adjustments.label.studentLoanCallout')
          },
          helpTip: {
            page: 'adjustments',
            expanded: site.forms.adjustments.helpTips['adjustments.studentLoan.checked'].open,
            ariaLabel: 'Student Loan - Help Tip',
            elements: () => ToolTips.studentLoanToolTip(),
            dataTestID: 'studentLoan'
          },
          handleChange: () => {
            if (values.adjustments.studentLoan.checked) {
              setFieldValue('adjustments.studentLoan.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                label: lang('global.label.amount'),
                name: `adjustments.studentLoan.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-2',
                dataTestId: `studentLoan${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Student Loan Interest Deduction: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          )
        },
        {
          checkedValue: values.adjustments.educator.checked,
          fieldArray: values.adjustments.educator.info,
          name: 'adjustments.educator.checked',
          label: lang('adjustments.label.educator'),
          groupName: 'educator',
          showFields: values.adjustments.educator.checked,
          callout: {
            title: lang('adjustments.label.educatorCallout', { ':amount': site.forms.aboutYou.values.filingStatus === 'married' ? '$500' : '$250' })
          },
          helpTip: {
            page: 'adjustments',
            expanded: site.forms.adjustments.helpTips['adjustments.educator.checked'].open,
            ariaLabel: 'Educator - Help Tip',
            elements: () => ToolTips.educatorToolTip(),
            dataTestID: 'educator'
          },
          handleChange: () => {
            if (values.adjustments.educator.checked) {
              setFieldValue('adjustments.educator.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                label: lang('global.label.amount'),
                name: `adjustments.educator.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-2',
                dataTestId: `educator${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Educator Expense Deduction: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          )
        },
        {
          checkedValue: values.adjustments.ira.checked,
          fieldArray: values.adjustments.ira.info,
          name: 'adjustments.ira.checked',
          label: lang('adjustments.label.ira'),
          groupName: 'ira',
          showFields: values.adjustments.ira.checked,
          helpTip: {
            page: 'adjustments',
            expanded: site.forms.adjustments.helpTips['adjustments.ira.checked'].open,
            ariaLabel: 'IRA - Help Tip',
            elements: () => ToolTips.iraToolTip(),
            dataTestID: 'ira'
          },
          handleChange: () => {
            if (values.adjustments.ira.checked) {
              setFieldValue('adjustments.ira.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                label: lang('global.label.amount'),
                name: `adjustments.ira.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-2',
                dataTestId: `ira${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove IRA Contribution: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          )
        },
        {
          checkedValue: values.adjustments.hsa.checked,
          fieldArray: values.adjustments.hsa.info,
          name: 'adjustments.hsa.checked',
          label: lang('adjustments.label.hsa'),
          groupName: 'hsa',
          showFields: values.adjustments.hsa.checked,
          helpTip: {
            page: 'adjustments',
            expanded: site.forms.adjustments.helpTips['adjustments.hsa.checked'].open,
            ariaLabel: 'HSA - Help Tip',
            elements: () => ToolTips.hsaToolTip(),
            dataTestID: 'hsa'
          },
          handleChange: () => {
            if (values.adjustments.hsa.checked) {
              setFieldValue('adjustments.hsa.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                label: lang('global.label.amount'),
                name: `adjustments.hsa.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-2',
                dataTestId: `hsa${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Health Savings Deduction: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          )
        },
        {
          checkedValue: values.adjustments.moving.checked,
          fieldArray: values.adjustments.moving.info,
          name: 'adjustments.moving.checked',
          label: lang('adjustments.label.moving'),
          groupName: 'moving',
          showFields: values.adjustments.moving.checked,
          helpTip: {
            page: 'adjustments',
            expanded: site.forms.adjustments.helpTips['adjustments.moving.checked'].open,
            ariaLabel: 'Moving - Help Tip',
            elements: () => ToolTips.movingToolTip(),
            dataTestID: 'moving'
          },
          handleChange: () => {
            if (values.adjustments.moving.checked) {
              setFieldValue('adjustments.moving.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                label: lang('global.label.amount'),
                name: `adjustments.moving.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-2',
                dataTestId: `moving${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Moving Expense: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          )
        },
        {
          checkedValue: values.adjustments.alimony.checked,
          fieldArray: values.adjustments.alimony.info,
          name: 'adjustments.alimony.checked',
          label: lang('adjustments.label.alimony'),
          groupName: 'alimony',
          showFields: values.adjustments.alimony.checked,
          helpTip: {
            page: 'adjustments',
            expanded: site.forms.adjustments.helpTips['adjustments.alimony.checked'].open,
            ariaLabel: 'Alimony - Help Tip',
            elements: () => ToolTips.alimonyToolTip(param),
            dataTestID: 'alimony'
          },
          handleChange: () => {
            if (values.adjustments.alimony.checked) {
              setFieldValue('adjustments.alimony.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                label: lang('global.label.amount'),
                name: `adjustments.alimony.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-2',
                dataTestId: `alimony${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Alimony Paid: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          )
        },
        {
          checkedValue: values.adjustments.earlyWithdrawal.checked,
          fieldArray: values.adjustments.earlyWithdrawal.info,
          name: 'adjustments.earlyWithdrawal.checked',
          label: lang('adjustments.label.earlyWithdrawal'),
          groupName: 'earlyWithdrawal',
          showFields: values.adjustments.earlyWithdrawal.checked,
          helpTip: {
            page: 'adjustments',
            expanded: site.forms.adjustments.helpTips['adjustments.earlyWithdrawal.checked'].open,
            ariaLabel: 'Early Withdrawal - Help Tip',
            elements: () => ToolTips.earlyWithdrawalToolTip(),
            dataTestID: 'earlyWithdrawal'
          },
          handleChange: () => {
            if (values.adjustments.earlyWithdrawal.checked) {
              setFieldValue('adjustments.earlyWithdrawal.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                label: lang('global.label.amount'),
                name: `adjustments.earlyWithdrawal.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-2',
                dataTestId: `earlyWithdrawal${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Early Withdrawal: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          )
        },
        {
          checkedValue: values.adjustments.business.checked,
          fieldArray: values.adjustments.business.info,
          name: 'adjustments.business.checked',
          label: lang('adjustments.label.business'),
          groupName: 'business',
          showFields: values.adjustments.business.checked,
          helpTip: {
            page: 'adjustments',
            expanded: site.forms.adjustments.helpTips['adjustments.business.checked'].open,
            ariaLabel: 'Business Credits - Help Tip',
            elements: () => ToolTips.businessToolTip(),
            dataTestID: 'business'
          },
          handleChange: () => {
            if (values.adjustments.business.checked) {
              setFieldValue('adjustments.business.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                label: lang('global.label.amount'),
                name: `adjustments.business.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-2',
                dataTestId: `business${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Business Credit: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          )
        },
      ]
    },
  ])

  if (site.forms.incomeWithholding.values.otherIncome.selfEmployment.checked) {
    const marriedOptions = [
      {
        checkedValue: values.adjustments.seHealthInsurance.checked,
        fieldArray: values.adjustments.seHealthInsurance.info,
        name: 'adjustments.seHealthInsurance.checked',
        label: lang('adjustments.label.seHealthInsurance'),
        groupName: 'seHealthInsurance',
        showFields: values.adjustments.seHealthInsurance.checked,
        helpTip: {
          page: 'adjustments',
          expanded: site.forms.adjustments.helpTips['adjustments.seHealthInsurance.checked'].open,
          ariaLabel: 'Self-employed health insurance - Help Tip',
          elements: () => ToolTips.seHealthInsuranceToolTip(param),
          dataTestID: 'seHealthInsurance'
        },
        handleChange: () => {
          if (values.adjustments.seHealthInsurance.checked) {
            setFieldValue('adjustments.seHealthInsurance.info', [{ amount: '' }])
          }
        },
        formElements: (fieldArrIndex, remove) => (
          [
            {
              inputType: 'currencyField',
              label: lang('global.label.amount'),
              name: `adjustments.seHealthInsurance.info[${fieldArrIndex}].amount`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-2',
              dataTestId: 'seHealthInsurance0',
              removeBtnObj: {
                dataTestID: `deleteButton${fieldArrIndex}`,
                ariaLabel: `Remove Self-employed health insurance deduction: ${fieldArrIndex + 1}`,
                fieldArrIndex,
                remove,
              }
            },
          ]
        )
      },
      {
        checkedValue: values.adjustments.seHealthInsuranceSpouse.checked,
        fieldArray: values.adjustments.seHealthInsuranceSpouse.info,
        name: 'adjustments.seHealthInsuranceSpouse.checked',
        label: lang('adjustments.label.seHealthInsuranceSpouse'),
        groupName: 'seHealthInsuranceSpouse',
        showFields: values.adjustments.seHealthInsuranceSpouse.checked,
        helpTip: {
          page: 'adjustments',
          expanded: site.forms.adjustments.helpTips['adjustments.seHealthInsuranceSpouse.checked'].open,
          ariaLabel: 'Spouse’s self-employed health insurance - Help Tip',
          elements: () => ToolTips.seHealthInsuranceSpouseToolTip(param),
          dataTestID: 'seHealthInsuranceSpouse'
        },
        handleChange: () => {
          if (values.adjustments.seHealthInsuranceSpouse.checked) {
            setFieldValue('adjustments.seHealthInsuranceSpouse.info', [{ amount: '' }])
          }
        },
        formElements: (fieldArrIndex, remove) => (
          [
            {
              inputType: 'currencyField',
              label: lang('global.label.amount'),
              name: `adjustments.seHealthInsuranceSpouse.info[${fieldArrIndex}].amount`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-2',
              dataTestId: 'seHealthInsuranceSpouse0',
              removeBtnObj: {
                dataTestID: `deleteButton${fieldArrIndex}`,
                ariaLabel: `Remove Spouse’s self-employed health insurance deduction: ${fieldArrIndex + 1}`,
                fieldArrIndex,
                remove,
              }
            },
          ]
        )
      },
      {
        checkedValue: values.adjustments.sepSimple.checked,
        fieldArray: values.adjustments.sepSimple.info,
        name: 'adjustments.sepSimple.checked',
        label: lang('adjustments.label.sepSimple'),
        groupName: 'sepSimple',
        showFields: values.adjustments.sepSimple.checked,
        helpTip: {
          page: 'adjustments',
          expanded: site.forms.adjustments.helpTips['adjustments.sepSimple.checked'].open,
          ariaLabel: 'SEP, SIMPLE - Help Tip',
          elements: () => ToolTips.sepSimpleToolTip(),
          dataTestID: 'sepSimple'
        },
        handleChange: () => {
          if (values.adjustments.sepSimple.checked) {
            setFieldValue('adjustments.sepSimple.info', [{ amount: '' }])
          }
        },
        formElements: (fieldArrIndex, remove) => (
          [
            {
              inputType: 'currencyField',
              label: lang('global.label.amount'),
              name: `adjustments.sepSimple.info[${fieldArrIndex}].amount`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-2',
              dataTestId: 'sepSimple0',
              removeBtnObj: {
                dataTestID: `deleteButton${fieldArrIndex}`,
                ariaLabel: `Remove SEP, SIMPLE contribution: ${fieldArrIndex + 1}`,
                fieldArrIndex,
                remove,
              }
            },
          ]
        )
      },
      {
        checkedValue: values.adjustments.sepSimpleSpouse.checked,
        fieldArray: values.adjustments.sepSimpleSpouse.info,
        name: 'adjustments.sepSimpleSpouse.checked',
        label: lang('adjustments.label.sepSimpleSpouse'),
        groupName: 'sepSimpleSpouse',
        showFields: values.adjustments.sepSimpleSpouse.checked,
        helpTip: {
          page: 'adjustments',
          expanded: site.forms.adjustments.helpTips['adjustments.sepSimpleSpouse.checked'].open,
          ariaLabel: 'Spouse’s SEP, SIMPLE - Help Tip',
          elements: () => ToolTips.sepSimpleSpouseToolTip(),
          dataTestID: 'seSimpleSpouse'
        },
        handleChange: () => {
          if (values.adjustments.sepSimpleSpouse.checked) {
            setFieldValue('adjustments.sepSimpleSpouse.info', [{ amount: '' }])
          }
        },
        formElements: (fieldArrIndex, remove) => (
          [
            {
              inputType: 'currencyField',
              label: lang('global.label.amount'),
              name: `adjustments.sepSimpleSpouse.info[${fieldArrIndex}].amount`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-2',
              dataTestId: 'sepSimpleSpouse0',
              removeBtnObj: {
                dataTestID: `deleteButton${fieldArrIndex}`,
                ariaLabel: `Remove Spouse’s  SEP, SIMPLE contribution: ${fieldArrIndex + 1}`,
                fieldArrIndex,
                remove,
              }
            },
          ]
        )
      },
    ]

    const unmarriedOptions = [
      {
        checkedValue: values.adjustments.seHealthInsurance.checked,
        fieldArray: values.adjustments.seHealthInsurance.info,
        name: 'adjustments.seHealthInsurance.checked',
        label: lang('adjustments.label.seHealthInsurance'),
        groupName: 'seHealthInsurance',
        showFields: values.adjustments.seHealthInsurance.checked,
        helpTip: {
          page: 'adjustments',
          expanded: site.forms.adjustments.helpTips['adjustments.seHealthInsurance.checked'].open,
          ariaLabel: 'Self-employed health insurance - Help Tip',
          elements: () => ToolTips.seHealthInsuranceToolTip(param),
          dataTestID: 'seHealthInsurance'
        },
        handleChange: () => {
          if (values.adjustments.seHealthInsurance.checked) {
            setFieldValue('adjustments.seHealthInsurance.info', [{ amount: '' }])
          }
        },
        formElements: (fieldArrIndex, remove) => (
          [
            {
              inputType: 'currencyField',
              label: lang('global.label.amount'),
              name: `adjustments.seHealthInsurance.info[${fieldArrIndex}].amount`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-2',
              dataTestId: 'seHealthInsurance0',
              removeBtnObj: {
                dataTestID: `deleteButton${fieldArrIndex}`,
                ariaLabel: `Remove Self-employed health insurance deduction: ${fieldArrIndex + 1}`,
                fieldArrIndex,
                remove,
              }
            },
          ]
        )
      },
      {
        checkedValue: values.adjustments.sepSimple.checked,
        fieldArray: values.adjustments.sepSimple.info,
        name: 'adjustments.sepSimple.checked',
        label: lang('adjustments.label.sepSimple'),
        groupName: 'sepSimple',
        showFields: values.adjustments.sepSimple.checked,
        helpTip: {
          page: 'adjustments',
          expanded: site.forms.adjustments.helpTips['adjustments.sepSimple.checked'].open,
          ariaLabel: 'SEP, SIMPLE - Help Tip',
          elements: () => ToolTips.sepSimpleToolTip(),
          dataTestID: 'sepSimple'
        },
        handleChange: () => {
          if (values.adjustments.sepSimple.checked) {
            setFieldValue('adjustments.sepSimple.info', [{ amount: '' }])
          }
        },
        formElements: (fieldArrIndex, remove) => (
          [
            {
              inputType: 'currencyField',
              label: lang('global.label.amount'),
              name: `adjustments.sepSimple.info[${fieldArrIndex}].amount`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-2',
              dataTestId: 'sepSimple0',
              removeBtnObj: {
                dataTestID: `deleteButton${fieldArrIndex}`,
                ariaLabel: `Remove SEP, SIMPLE contribution: ${fieldArrIndex + 1}`,
                fieldArrIndex,
                remove,
              }
            },
          ]
        )
      },
    ]

    if (site.forms.aboutYou.values.filingStatus === 'married') {
      formElements[0].options = [...marriedOptions, ...formElements[0].options]
    } else {
      formElements[0].options = [...unmarriedOptions, ...formElements[0].options]
    }
  }

  return formElements
}
