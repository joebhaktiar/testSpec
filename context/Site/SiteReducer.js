import {
  UPDATE_FORMS,
} from '../types'

const updateForms = (payload, state) => ({
  ...state,
  site: {
    ...state.site,
    forms: payload,
  },
})

const updateAccordionOpen = (payload, state) => ({
  ...state,
  site: {
    ...state.site,
    forms: {
      ...state.site.forms,
      taxCredits: {
        ...state.site.forms.taxCredits,
        accordionOpenArr: payload,
      }
    }
  },
})

const updateAccordionOpenIncome = (payload, state) => ({
  ...state,
  site: {
    ...state.site,
    forms: {
      ...state.site.forms,
      incomeWithholding: {
        ...state.site.forms.incomeWithholding,
        accordionOpenArr: payload,
      }
    }
  },
})

const updateAccordionOpenResults = (payload, state) => ({
  ...state,
  site: {
    ...state.site,
    forms: {
      ...state.site.forms,
      results: {
        ...state.site.forms.results,
        accordionOpenArr: payload,
      }
    }
  },
})

const updateNumOfChildren = (payload, state) => ({
  ...state,
  site: {
    ...state.site,
    forms: {
      ...state.site.forms,
      qualifyingChildren: {
        ...state.site.forms.qualifyingChildren,
        numOfChildren: payload
      }
    },
  },
})

const updateSlider = (payload, state) => {
  const newState = ({
    ...state,
    site: {
      ...state.site,
      slider: {
        ...state.site.slider,
        ...payload
      },
    },
  })

  return newState
}

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORMS:
      return updateForms(action.payload, state)
    case 'UPDATE_ACCORDION_OPEN':
      return updateAccordionOpen(action.payload, state)
    case 'UPDATE_ACCORDION_OPEN_INCOME':
      return updateAccordionOpenIncome(action.payload, state)
    case 'UPDATE_ACCORDION_OPEN_RESULTS':
      return updateAccordionOpenResults(action.payload, state)
    case 'UPDATE_NUM_OF_CHILDREN':
      return updateNumOfChildren(action.payload, state)
    case 'UPDATE_SLIDER':
      return updateSlider(action.payload, state)
    default:
      return state
  }
}

export default reducer
