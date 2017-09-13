import * as types from './actionTypes';
import * as constValues from '../utils/DashboardConstants';
import moment from 'moment';
require('es6-promise').polyfill();
require('isomorphic-fetch');
/***Action creators for End To End View ***/
export function fetchFailed(bool) {
    return {
        type: types.LOAD_TXN_DATA_FAILURE,
        hasErrored: bool
    };
}
export function fetchDataLoading(bool) {
    return {
        type: types.IS_LOADING,
        isLoading: bool
    };
}
export function fetchDataSuccess(items) {
    return {
        type: types.LOAD_TXN_DATA_SUCCESS,
        items
    };
}


export function countsFetchData(url, payload) {
    return (dispatch) => {
        if (payload == null) {
            payload = JSON.stringify(
                {
                    "enrollmentFromDate": moment().subtract(1, 'days').format('MM/DD/YYYY'),
                    "enrollmentthroughDate": moment().format('MM/DD/YYYY')
                });
        }
        dispatch(fetchDataLoading(true));
        fetch(url, {
            method: "POST",
            credentials: "same-origin",
            body: payload,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(fetchDataLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(fetchDataSuccess(items)))
            .catch(() => {
                dispatch(fetchFailed(true))
            }
            );
    };
}
/***Action creators for List View ***/
export function fetchListDataFailed(bool) {
    return {
        type: types.FETCH_LIST_DATA_FAILURE,
        hasListErrored: bool
    };
}
export function fetchListDataLoading(bool) {
    return {
        type: types.FETCH_LIST_IS_LOADING,
        isListLoading: bool
    };
}
export function fetchListDataSuccess(listData) {
    return {
        type: types.FETCH_LIST_DATA_SUCCESS,
        listData
    };
}


export function fetchListViewData(url, payload) {
    return (dispatch) => {
        if (payload == null) {
            payload = JSON.stringify(
                {
                    "enrollmentFromDate": moment().subtract(1, 'days').format('MM/DD/YYYY'),
                    "enrollmentthroughDate": moment().format('MM/DD/YYYY'),
                    'pageNo': '1',
                    'sourceSystem': 'NASCO',
                    'originSourceSystem': 'Edifecs'
                });
        }
        if (payload instanceof Object) {
            payload = JSON.stringify(payload);
        }
        dispatch(fetchListDataLoading(true));
        fetch(url, {
            method: "POST",
            credentials: "same-origin",
            body: payload,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(fetchListDataLoading(false));
                return response;
            })
            .then(response => {
                return response.json();
            })
            .then((response) => {
                dispatch(fetchListDataSuccess(response));
            })
            .catch(() => {
                dispatch(fetchListDataFailed(true))
            }
            );
    };
}
/***Action creators for Event Detail View ***/
export function fetchEventDataFailed(bool) {
    return {
        type: types.FETCH_EVENT_DATA_FAILURE,
        hasEventErrored: bool
    };
}
export function fetchEventDataLoading(bool) {
    return {
        type: types.FETCH_EVENT_IS_LOADING,
        isEventLoading: bool
    };
}
export function fetchEventDataSuccess(eventData) {
    return {
        type: types.FETCH_EVENT_DATA_SUCCESS,
        eventData
    };
}


export function fetchEventViewData(url, payload) {
    return (dispatch) => {
        dispatch(fetchEventDataLoading(true));
        fetch(url, {
            method: "POST",
            body: payload,
            credentials: "same-origin",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(fetchEventDataLoading(false));
                return response;
            })
            .then(response => {
                return response.json();
            })
            .then((eventData) => {
                dispatch(fetchEventDataSuccess(eventData));
            })
            .catch(() => {
                dispatch(fetchEventDataFailed(true))
            }
            );
    };
}
/***Action creators for Event Detail View  Tab Change***/
export function changeSelectedTab(selectedTab, tabNamespace) {
    return {
        type: types.CHANGE_SELECTED_TAB,
        tab: selectedTab,
        namespace: tabNamespace
    };
}
/***Action creators for List View Export to Excel***/
export function fetchListDataFailedExcel(bool) {
    return {
        type: types.FETCH_LIST_DATA_FAILURE_EXCEL,
        hasListErrored: bool
    };
}
export function fetchListDataLoadingExcel(bool) {
    return {
        type: types.FETCH_LIST_IS_LOADING_EXCEL,
        isListLoading: bool
    };
}
export function fetchListDataSuccessExcel(listData) {
    return {
        type: types.FETCH_LIST_DATA_SUCCESS_EXCEL,
        listData
    };
}
export function fetchListViewDataExcel(url, payload) {
    return (dispatch) => {
        if (payload == null) {
            payload = JSON.stringify(
                {
                    "enrollmentFromDate": moment().subtract(1, 'days').format('MM/DD/YYYY'),
                    "enrollmentthroughDate": moment().format('MM/DD/YYYY'),
                    'pageNo': '0',
                    'sourceSystem': 'NASCO',
                    'originSourceSystem': 'Edifecs'
                });
        }
        if (payload instanceof Object) {
            payload = JSON.stringify(payload);
        }
        dispatch(fetchListDataLoadingExcel(true));
        fetch(url, {
            method: "POST",
            credentials: "same-origin",
            body: payload,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(fetchListDataLoadingExcel(false));
                return response;
            })
            .then(response => {
                return response.json();
            })
            .then((response) => {
                dispatch(fetchListDataSuccessExcel(response));
            })
            .catch(() => {
                dispatch(fetchListDataFailedExcel(true))
            }
            );
    };
}
// Business Exceptions
export function fetchBusinessDataFailed(bool) {
    return {
        type: types.FETCH_BUSINESS_DATA_FAILURE,
        hasBusinessErrored: bool
    };
}
export function fetchBusinessDataLoading(bool) {
    return {
        type: types.FETCH_BUSINESS_IS_LOADING,
        isBusinessLoading: bool
    };
}
export function fetchBusinessDataSuccess(listData) {
    return {
        type: types.FETCH_BUSINESS_DATA_SUCCESS,
        exceptionData
    };
}


export function fetchBusinessExceptionData(url, payload) {
    return (dispatch) => {       
        if (payload instanceof Object) {
            payload = JSON.stringify(payload);
        }
        dispatch(fetchBusinessDataLoading(true));
        fetch(url, {
            method: "GET",
            credentials: "same-origin",
            body: payload,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(fetchBusinessDataLoading(false));
                return response;
            })
            .then(response => {
                return response.json();
            })
            .then((response) => {
                dispatch(fetchBusinessDataSuccess(response));
            })
            .catch(() => {
                dispatch(fetchBusinessDataFailed(true))
            }
            );
    };
}




