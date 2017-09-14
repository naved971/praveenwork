import moment from 'moment';
let initialCheckBoxFlags = [false, true, false, false, false, true, false, false, false, false, false, false, false, true, false];
const defaultFieldFlags = [4, 5, 6, 7];

export function lvspFieldFlagSelected(state=defaultFieldFlags,action){

  switch(action.type){
    case "LVSP_FIELD_FLAG": {
      debugger;
      return action.fieldFlagSelected
    }

    default:
    return state;
  }
}
export function lvspStartDate(state = moment().subtract(1, 'month'), action) {
  console.log('lvspStartDate - ' + action.type);
  debugger;
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


