import moment from 'moment';
let initialCheckBoxFlags = [false, true, false, false, false, true, false, false, false, false, false, false, false, true, false];
const defaultTradingPartners = [0, 1, 2];
const defaultRecordFlags = [3, 9, 10];
const defaultFieldFlags = [4, 5, 6, 7];
const defaultFieldNames = [0, 1, 2, 3, 4];
const defaultCovYear = parseInt(moment().format('YYYY'));
const defaultStartDate = moment().subtract(1, 'month');


export function lvspFieldFlagSelected(state=defaultFieldFlags,action){

  switch(action.type){
    case "LVSP_FIELD_FLAG": {
      return action.fieldFlagSelected
    }

    default:
    return state;
  }
}
export function lvspStartDate(state = moment().subtract(1, 'month'), action) {
  console.log('lvspStartDate - ' + action.type);
  switch (action.type) {


    case 'LVSP_START_DATE':
      {
        return action.startDate;
      }
    default:
      return state;
  }
}
export function lvspCovYear(state = parseInt(moment().format('YYYY')), action) {
  console.log('lvspCovYear - ' + action.type);
  switch (action.type) {
    case 'LVSP_COV_YEAR':
      {
        if (action.covYear == undefined)
        {
          return null;
        }
        return action.covYear;
      }
    default:
      return state;
  }
}
export function lvspTradSelected(state = [0,1,2], action) {
  switch (action.type) {
    case 'LVSP_TRAD_SELECTED':
      {
        return action.tradSelected;
      }
    default:
      return state;
  }
}


export function lvspRecordFlagSelected(state = defaultRecordFlags, action) {
  switch (action.type) {
    case 'LVSP_RECORD_FLAG_SELECTED':
      {
        return action.fieldRecordSelected;
      }
    default:
      return state;
  }
}
export function lvspFieldNameSelected(state = defaultFieldNames, action) {
  switch (action.type) {
    case 'LVSP_FIELD_NAME_SELECTED':
      {
        return action.fieldNameSelected;
      }
    default:
      return state;
  }
}


export function lvspTableData(state = [], action) {
  switch (action.type) {
    case 'LVSP_TABLE_DATA':
      {
        if (action.tableData == undefined)
        {
          return [];
        }
        return action.tableData;
      }
    default:
      return state;
  }
}



export function lvspTableHeader(state = [], action) {
  switch (action.type) {
    case 'LVSP_TABLE_HEADER':
      {
        if (action.tableHeader == undefined)
        {
          return [];
        }
        return action.tableHeader;
      }
    default:
      return state;
  }
}