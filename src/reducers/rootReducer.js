import { combineReducers } from 'redux';
import { fetchDataLoading, fetchFailed, fetchTransactionData } from './countReducer';
import { fetchListDataLoading, fetchListDataFailure, fetchListViewData, fetchListDataLoadingExcel, fetchListDataFailureExcel, fetchListViewDataExcel } from './listDataReducer';
import { fetchEventDataLoading, fetchEventDataFailure, fetchEventViewData } from './eventDataReducer';
import { tabsReducer } from './tabReducer';
import { reducer as formReducer } from 'redux-form';
import { fetchReconDataLoading, fetchReconDataFailure, fetchReconData } from './reconDataReducer';
//import { fetchBusinessDataLoading, fetchBusinessDataFailure, fetchBusinessViewData } from './businessExceptionReducer';
import {rsdStartDate, rsdCovYear, rsdTradSelected, rsdSelectAllCheckBox, rsdCheckBoxFlags, rsdTableData} from './recordSummaryDetailsReducer';
import {fsdStartDate,fsdCovYear,fsdTradSelected,fsdFieldFlagSelected,fsdRecordFlagSelected,fsdFieldNameSelected, fsdTableHeaders} from './fieldSummaryDetailsReducer';
import {lvspFieldFlagSelected ,lvspStartDate}from "./listViewSummaryPageDataReducer"
const rootReducer = combineReducers({
    fetchDataLoading,
    fetchFailed,
    fetchTransactionData,
    fetchListDataLoading,
    fetchListDataFailure,
    fetchListViewData,
    fetchListDataLoadingExcel,
    fetchListDataFailureExcel,
    fetchListViewDataExcel,
    fetchEventDataLoading,
    fetchEventDataFailure,
    fetchEventViewData,
    fetchReconDataLoading,
    fetchReconDataFailure,
    fetchReconData,
   // fetchBusinessDataLoading,
    //fetchBusinessDataFailure,
   // fetchBusinessViewData,
    form: formReducer,
    rsdStartDate,
    rsdCovYear,
    rsdTradSelected,
    rsdCheckBoxFlags,
    rsdSelectAllCheckBox,
    rsdTableData,
    fsdStartDate,fsdCovYear,fsdTradSelected,fsdFieldFlagSelected,fsdRecordFlagSelected,fsdFieldNameSelected,fsdTableHeaders,

    lvspFieldFlagSelected, lvspStartDate
})
export default rootReducer;








