import moment from 'moment';
const defaultTradingPartners = [0, 1, 2];
const defaultRecordFlags = [3, 9, 10];
const defaultFieldFlags = [4, 5, 6, 7];
const defaultFieldNames = [0, 1, 2, 3, 4];
const defaultCovYear = parseInt(moment().format('YYYY'));
const defaultStartDate = moment().subtract(1, 'month');




export function fsdStartDate(state = defaultStartDate, action) {
  switch (action.type) {
    case 'FSD_START_DATE':
      {
        return action.startDate;
      }
    default:
      return state;
  }
}
export function fsdCovYear(state = defaultCovYear, action) {
  switch (action.type) {
    case 'FSD_COV_YEAR':
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
export function fsdTradSelected(state = defaultTradingPartners, action) {
  switch (action.type) {
    case 'FSD_TRAD_SELECTED':
      {
        return action.tradSelected;
      }
    default:
      return state;
  }
}
export function fsdFieldFlagSelected(state = defaultFieldFlags, action) {
  switch (action.type) {
    case 'FSD_FIELD_FLAG_SELECTED':
      {
        return action.fieldFlagSelected;
      }
    default:
      return state;
  }
}
export function fsdRecordFlagSelected(state = defaultRecordFlags, action) {
  switch (action.type) {
    case 'FSD_RECORD_FLAG_SELECTED':
      {
        return action.fieldRecordSelected;
      }
    default:
      return state;
  }
}
export function fsdFieldNameSelected(state = defaultFieldNames, action) {
  switch (action.type) {
    case 'FSD_FIELD_NAME_SELECTED':
      {
        return action.fieldNameSelected;
      }
    default:
      return state;
  }
}
export function fsdTableData(state = [], action) {
  switch (action.type) {
    case 'FSD_TABLE_DATA':
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
export function fsdTableHeaders(state = [], action) {
  switch (action.type) {
    case 'FSD_TABLE_HEADERS':
      {
        if (action.headers == undefined)
        {
          return [];
        }
        return action.headers;
      }
    default:
      return state;
  }
}


