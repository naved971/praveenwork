import moment from 'moment';
const defaultTradingPartners = [0, 1, 2];
const defaultRecordFlags = [3, 9, 10];
const defaultFieldFlags = [4, 5, 6, 7];
const defaultFieldNames = [0, 1, 2, 3, 4];
const defaultCovYear = parseInt(moment().format('YYYY'));
const defaultStartDate = moment().subtract(1, 'month');
export function fsdStartDate(startDate) {
  return {type: 'FSD_START_DATE', startDate};
}
export function updateFSDStartDate(startDate) {
  return (dispatch) => {
    dispatch(fsdStartDate(startDate));
  }
}
export function fsdCovYear(covYear) {
  return {type: 'FSD_COV_YEAR', covYear};
}
export function updateFSDCovYear(covYear) {
  return (dispatch) => {
    dispatch(fsdCovYear(covYear));
  }
}
export function fsdTradSelected(tradSelected) {
  return {type: 'FSD_TRAD_SELECTED', tradSelected};
}
export function updateFSDTradSelected(tradSelected) {
  return (dispatch) => {
    dispatch(fsdTradSelected(tradSelected));
  }
}
export function fsdFieldFlagSelected(fieldFlagSelected) {
  return {type: 'FSD_FIELD_FLAG_SELECTED', fieldFlagSelected};
}
export function updateFSDFieldFlagSelected(fieldFlagSelected) {
  return (dispatch) => {
    dispatch(fsdFieldFlagSelected(fieldFlagSelected));
  }
}
export function fsdRecordFlagSelected(fieldRecordSelected) {
  return {type: 'FSD_RECORD_FLAG_SELECTED', fieldRecordSelected};
}
export function updateFSDRecordFlagSelected(fieldRecordSelected) {
  return (dispatch) => {
    dispatch(fsdRecordFlagSelected(fieldRecordSelected));
  }
}
export function fsdFieldNameSelected(fieldNameSelected) {
  return {type: 'FSD_FIELD_NAME_SELECTED', fieldNameSelected};
}
export function updateFSDFieldNameSelected(fieldNameSelected) {
  return (dispatch) => {
    dispatch(fsdFieldNameSelected(fieldNameSelected));
  }
}
export function fsdTableData(tableData) {
  return {type: 'FSD_TABLE_DATA', tableData};
}
export function updateFSDTableData(tableData) {
  return (dispatch) => {
    dispatch(fsdTableData(tableData));
  }
}
export function resetFSDState(covYear) {
  return (dispatch) => {
    dispatch(fsdCovYear(defaultCovYear));
    dispatch(fsdStartDate(defaultStartDate));
    dispatch(fsdTradSelected(defaultTradingPartners));
    dispatch(fsdRecordFlagSelected(defaultRecordFlags));
    dispatch(fsdFieldFlagSelected(defaultFieldFlags));
    dispatch(fsdFieldNameSelected(defaultFieldNames));
  }
}
export function fsdTableHeaders(headers) {
  return {type: 'FSD_TABLE_HEADERS', headers};
}
export function updateFSDTableHeaders(headers) {
  return (dispatch) => {
    dispatch(fsdTableHeaders(headers));
  }
}


