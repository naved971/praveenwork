
import moment from 'moment';
let initialCheckBoxFlags = [false, true, false, false, false, true, false, false, false, false, false, false, false, true, false];
export function lvspStartDate(startDate) {
  console.log("LVSP_START_DATE - " + startDate);
  return {type: 'LVSP_START_DATE', startDate};
}
export function updateLVSPStartDate(startDate) {
  console.log("updateLVSPStartDate");
  return (dispatch) => {
    dispatch(lvspStartDate(startDate));
  }
}
export function lvspCovYear(covYear) {
  console.log("LVSP_COV_YEAR");
  return {type: 'LVSP_COV_YEAR', covYear};
}
export function updateLVSPCovYear(covYear) {
  return (dispatch) => {
    dispatch(lvspCovYear(covYear));
  }
}

export function updateFieldFlagSelected(fieldFlagSelected){
  return (dispatch)=>{
    dispatch(lvspFieldFlagSelected(fieldFlagSelected))
  }
}

export function lvspFieldFlagSelected(fieldFlagSelected){
  return {type:"LVSP_FIELD_FLAG", fieldFlagSelected}
}

export function lvspTradSelected(tradSelected) {
  return {type: 'LVSP_TRAD_SELECTED', tradSelected};
}
export function updateLVSPTradSelected(tradSelected) {
  return (dispatch) => {
    dispatch(lvspTradSelected(tradSelected));
  }
}
export function lvspCheckBoxFlags(checkBoxFlags) {
  return {type: 'LVSP_CHECKBOX_FLAGS', checkBoxFlags};
}
export function updateLVSPCheckBoxFlags(checkBoxFlags) {
  return (dispatch) => {
    dispatch(lvspCheckBoxFlags(checkBoxFlags));
  }
}
export function lvspSelectAllCheckBox(selectAllCheckBox) {
  return {type: 'LVSP_SELECT_ALL_CHECKBOX', selectAllCheckBox};
}
export function updateLVSPSelectAllCheckBox(selectAllCheckBox) {
  return (dispatch) => {
    dispatch(lvspSelectAllCheckBox(selectAllCheckBox));
  }
}
export function lvspTableData(tableData) {
  return {type: 'LVSP_TABLE_DATA', tableData};
}
export function updateLVSPTableData(tableData) {
  return (dispatch) => {
    dispatch(lvspTableData(tableData));
  }
}
export function resetLVSPState(covYear) {
  return (dispatch) => {
    dispatch(lvspCovYear(parseInt(moment().format('YYYY'))));
    dispatch(lvspStartDate(moment().subtract(1, 'month')));
    dispatch(lvspTradSelected([0,1,2]));
    dispatch(lvspSelectAllCheckBox(false));
    dispatch(lvspCheckBoxFlags(initialCheckBoxFlags));
  }
}


