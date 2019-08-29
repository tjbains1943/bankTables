import records from "../../utils/transformData";

// Constants
const UPDATE_CURRENT_RECORD = "landingPage/UPDATE_CURRENT_RECORD";
const CLOSE_MODAL = "landingPage/CLOSE_MODAL";
const UPDATE_ACCOUNT_FILTERS = "landingPage/UPDATE_ACCOUNT_FILTERS";
const UPDATE_TRANSACTION_FILTERS = "landingPage/UPDATE_TRANSACTION_FILTERS";
const UPDATE_RECORDS = "landingPage/UPDATE_RECORDS";
const CLOSE_SNACKBAR = "landingPage/CLOSE_SNACKBAR";

// Action Creators
export const closeSnackbar = () => ({
  type: CLOSE_SNACKBAR,
});

export const updateCurrentRecords = currentRecord => ({
  type: UPDATE_CURRENT_RECORD,
  currentRecord,
});

export const updateRecords = records => ({
  type: UPDATE_RECORDS,
  records,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
  isModalOpen: false,
});

export const updateAccountFilters = accountFilters => ({
  type: UPDATE_ACCOUNT_FILTERS,
  accountFilters,
});

export const updateTransactionFilters = transactionFilters => ({
  type: UPDATE_TRANSACTION_FILTERS,
  transactionFilters,
});

// Initial State
const initialState = {
  records,
  currentRecord: null,
  isModalOpen: false,
  showSnackbar: false,
  initialRecords: records,
  accountFilters: {},
  transactionFilters: {},
};

// Reducer
export default function dataTable(state = initialState, action) {
  switch (action.type) {
    case CLOSE_SNACKBAR:
      return {
        ...state,
        showSnackbar: true,
      };

    case UPDATE_RECORDS:
      return {
        ...state,
        records: action.records,
        showSnackbar: true,
      };

    case UPDATE_ACCOUNT_FILTERS:
      return {
        ...state,
        accountFilters: action.accountFilters,
      };

    case UPDATE_TRANSACTION_FILTERS:
      return {
        ...state,
        transactionFilters: action.transactionFilters,
      };

    case UPDATE_CURRENT_RECORD:
      return {
        ...state,
        currentRecord: action.currentRecord,
        isModalOpen: true,
      };

    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
      };

    default:
      return state;
  }
}
