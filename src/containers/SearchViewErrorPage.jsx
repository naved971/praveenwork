import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RcnoRcniSideBar from './RcnoRcniSideBar';
import App from '../components/App';
import SearchViewErrorPageData from '../components/SearchViewErrorPageData';
import Spinner from 'react-spinner-material';
import moment from 'moment';
import { Row, Column } from 'react-foundation';
import { NavLink } from 'react-router-dom';
import * as rcnorcni from '../utils/RcnoRcni';
import * as dashboardConstValues from '../utils/DashboardConstants';


const covYearOptions = [...Array(36).keys()].map(value => {
    return {
        value: value + 1990,
        label: value + 1990
    }
});
const tradingPartnerOptions = [
    {
        label: '592015694B-PPO',
        id: '592015694B',
        value: 0
    }, {
        label: '592403696B-HMO',
        id: '592403696B',
        value: 1
    }, {
        label: '592876465-Dental',
        id: '592876465',
        value: 2
    }
];
const inventoryTypeOptions = [
    {
        label: 'RCNO',
        value: 0
    }
];
const errorCodeOptions = [
    {
        label: 'X',
        value: 0
    }, {
        label: 'Y',
        value: 1
    }, {
        label: 'Z',
        value: 2
    }
];
const errorTypeOptions = [
    {
        label: 'Technical',
        value: 0
    }, {
        label: 'Business',
        value: 1
    }
];
const submissionTypeOptions = [
    {
        label: 'Manual',
        value: 0
    }, {
        label: 'Automated',
        value: 1
    }
];

const summaryTableData = [
    {
        "recordIdentifier": "Non-Match with Issuer Action",
        "rcnoFirstName": "A",
        "rcnoLastName": "10007",
        "rcnoExchSubId": "0.67",
    },
    {
        "recordIdentifier": "11Non-Match with Issuer Action",
        "rcnoFirstName": "B",
        "rcnoLastName": "10007",
        "rcnoExchSubId": "0.67",
    }
];
let resultData =
    {
        "rcnoListViewRes": [
            {
                "recordIdentifier": "RCNI170630115000005",
                "firstName": "ERIN",
                "lastName": "HILL",
                "exchSubId": "0001567297",
            }, {
                "recordIdentifier": "RCNI170630115000005",
                "firstName": "ERIN",
                "lastName": "HILL",
                "exchSubId": "0001567297",
            }
        ]
    }

    
const errorCodeSearchResult = [
    {
      recordIdentifier: "111-1111-1111",
      firstName: "A1",
      lastName: "A1_LastName",
      exSubId: 2020,
      contractId: 1001,
      errorCode: 201,
      errorDesc: "Missing Fields",
      isSubmitInventoryDisabled:true
  },
    {
      recordIdentifier: "111-1111-1112",
      firstName: "A2",
      lastName: "A2_LastName",
      exSubId: 2021,
      contractId: 1002,
      errorCode: 201,
      errorDesc: "Missing Fields"
    },
    {
      recordIdentifier: "111-1111-1113",
      firstName: "A3",
      lastName: "A3_LastName",
      exSubId: 2023,
      contractId: 1003,
      errorCode: 203,
      errorDesc: "Missing Fields"
    },
    {
      recordIdentifier: "111-1111-1114",
      firstName: "A4",
      lastName: "A4_LastName",
      exSubId: 2024,
      contractId: 1004,
      errorCode: 204,
      errorDesc: "Missing Fields"
    },
    {
      recordIdentifier: "111-1111-1115",
      firstName: "A5",
      lastName: "A5_LastName",
      exSubId: 2025,
      contractId: 1005,
      errorCode: 205,
      errorDesc: "Missing Fields",
      isSubmitInventoryDisabled:true
    },
    {
      recordIdentifier: "111-1111-1116",
      firstName: "A6",
      lastName: "A6_LastName",
      exSubId: 2026,
      contractId: 1006,
      errorCode: 206,
      errorDesc: "Missing Fields"
    }
  ];


class SearchViewErrorPage extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        ['handleSubmit', 'getInputFields', 'getResultSummary', 'buildUrl', 'getAvdInputFields'].map(fn => {
            this[fn] = this[fn].bind(this)

        });
        //this.dummy();
    }

    buildUrl(parameters) {
        let url = rcnorcni.GET_FIELD_SUMMARY_DETAILS_URL;
        let qs = "";
        for (let key in parameters) {
            let value = parameters[key];
            qs += key + "=" + value + "&";
        }
        if (qs.length > 0) {
            qs = qs.substring(0, qs.length - 1); //chop off last "&"
            url = url + "?" + qs;
        }
        return url;
    }
    getResultSummary(args) {
        let url = this.buildUrl(args);


        fetch(rcnorcni.POST_Data, {
            method: 'POST', //credentials: "same-origin",
            body: JSON.stringify(args),
            headers: {
                //  'Accept': 'application/json, text/plain, */*',
                // 'Content-Type': "application/json"
                'Content-Type': "application/x-www-form-urlencoded"
            }
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((response) => {
            let data =  response.errorCodeSearchResult;

          /*  data = response.errorCodeSearchResult.map((errorStatus, index, arry) => {
                errorStatus.submitInventory = (<input type="button" name="submitInventory" value="Submit Inventory" onClick={(e) => this.handleSubmitInventory(e, errorStatus)} />);
                errorStatus.submitERE = (<input type="button" name="submitERE" value="Submit ER & E" onClick={(e) => this.handleSubmitERE(e, errorStatus)} />);
                return errorStatus;

            });*/
            this.setState({
                lastDataReceived: Date.now(),
                summaryTableData: data
            });
        }).catch((error) => {
            let data =  errorCodeSearchResult;
        
            this.setState({
                lastDataReceived: Date.now(),
                summaryTableData: data
            });

            console.log(error);
        })
    }

    handleSubmitInventory(e, selectedInventory) {
        debugger;
    }

    handleSubmitERE(e, selectedERE) {
        debugger
    }


    getInitialState() {
        const defaultTradingPartners = [0, 1, 2];
        const defaultInventoryType = {"label":"RCNO","value":0};
        // const defaultErrorCode = [0, 1, 2];
        const defaultErrorCategory = [0, 1, 2];
        const defaultErrorType = [0, 1, 2];
        const defaultSubmissionType = [0, 1];
        const defaultErrorCodeDesc = [0, 1, 2];






        return {
            // fromDate: moment().format('MM/YYYY'),
            fromDate: moment()
                .subtract(1, 'month')
                .format('MM/YYYY'),
            covYear: parseInt(moment().format('YYYY')),
            defaultTradingPartners,
            summaryTableData: summaryTableData,
            // fieldNameOptions: fieldNameOptions,
            // fieldNameAvdCustomOptions: [],
            summaryTable: undefined,
            recordFlagOptions: [],
            // fieldFlagOptions: [],
            lastDataReceived: Date.now(),
            // defaultFieldNames,
            // defaultFieldFlags,
            // defaultRecordFlags,
            defaultInventoryType,
            // defaultErrorCode,
            defaultErrorCategory,
            defaultErrorType,
            defaultSubmissionType,
            defaultErrorCodeDesc,
            errorCategoryOptions: [],
            errorCodeDescOptions: []
        };
    }
    handleSubmit(item) {

        let tradSelected = item.state.tradSelected.length == tradingPartnerOptions.length
            ? 'all'
            : undefined;
        if (tradSelected === undefined) {
            tradSelected = '';
            item
                .state
                .tradSelected
                .forEach((t) => {
                    tradSelected += tradingPartnerOptions[t].id + ',';
                })
            tradSelected = tradSelected.slice(0, -1);
        }

        /*
                    let fieldAvdNameSelected = item.state.fieldAvdNameSelected.length == this.state.fieldAvdNameSelected.length
                    ? 'all'
                    : undefined;
                if (fieldAvdNameSelected === undefined) {
                    fieldAvdNameSelected = '';
                        item.state.fieldAvdNameSelected
                        .forEach((f,i) => {
                            fieldAvdNameSelected += f.label + ',';
                        })
                        fieldAvdNameSelected = fieldAvdNameSelected.slice(0, -1);
                }
        */


        var obj = {
            frmDate: moment(item.state.startDate).format('MM/YYYY'),
            cvgYear: item.state.covYear,
            tpId: tradSelected,
            currentTabName: "RCNO"
        }
        /*
                if (currentTabName == "RCNO") {
                    obj.rcdFlag = recordFlagSelected;
                    obj.fldFlag = fieldFlagSelected;
                    obj.fldName = fieldNameSelected;
                    obj.advIsrDob = item.state.RCNO_DOB != null && item.state.RCNO_DOB != "" ? item.state.RCNO_DOB.format('YYYY/MM/DD').toString() : undefined;
                } else {
                    obj.advFfmDob = item.state.RCNI_DOB != null && item.state.RCNI_DOB != "" ? item.state.RCNI_DOB.format('YYYY/MM/DD').toString() : undefined;
                }
        */



        if (item.state.advFields && Object.keys(item.state.advFields).length > 0) {
            let advFieldsItems = item.state.advFields;


            Object.keys(advFieldsItems).forEach(key => { advFieldsItems[key] = (advFieldsItems[key] == "" || advFieldsItems[key] == undefined) ? undefined : advFieldsItems[key]; });
            obj = Object.assign(obj, advFieldsItems);
        }
        if (item.state.fieldAvdNameSelected != undefined) {
            obj.fldNmFldVal = item.state.fieldAvdNameSelected.value.map(function (value, index) {
                let FieldSelected = Object.keys(value.field).length > 0 ? value.field.label : undefined;
                var FieldValueSelected = value.fieldValue == "" ? undefined : value.fieldValue;
                if (FieldSelected != undefined && FieldValueSelected != undefined) {
                    return { fieldName: FieldSelected, fieldValue: FieldValueSelected }
                }
            });


            obj.fldNmFldVal = obj.fldNmFldVal.filter(function (element) {
                return element !== undefined;
            });
            obj.fldNmFldVal = obj.fldNmFldVal.length > 0 ? obj.fldNmFldVal : undefined;


        }
        this.getResultSummary(obj);
    }
    render() {
        return (
            <App>
                <Row style={{
                    "maxWidth": "78rem"
                }}>
                    <Row
                        className='record-summary-details'
                        style={{
                            "maxWidth": "80rem"
                        }}>
                        <Column medium={12}>
                            <div className="record-summary-breadcrumb">
                                <ol
                                    className="gwos-breadcrumbs"
                                    vocab="http://schema.org/"
                                    typeof="BreadcrumbList">
                                    <li property="itemListElement" typeof="ListItem">
                                        <NavLink to={dashboardConstValues.HOME_PAGE_URL}>
                                            <span property="name">Dashboard</span>
                                        </NavLink>
                                        <meta property="position" content="1" />
                                    </li>
                                    <li property="itemListElement" typeof="ListItem">
                                        <NavLink to={rcnorcni.RCNO_RCNI_RECORD_SUMMARY_DETAILS_URL}>
                                            <span property="name">RCNO/RCNI</span>
                                        </NavLink>
                                        <meta property="position" content="2" />
                                    </li>
                                    <li property="itemListElement" typeof="ListItem">
                                        <NavLink to={rcnorcni.RCNO_RCNI_SEARCH_AND_VIEW_ERROR_URL}>
                                            <span property="name">Search and View</span>
                                        </NavLink>
                                        <meta property="position" content="3" />
                                    </li>
                                </ol>
                            </div>
                        </Column>
                        <Column medium={3}>
                            <RcnoRcniSideBar activeKey={'4'} />
                        </Column>
                        <Column medium={9} className="record-summary-container">
                            {/* <div
                                className="modal-header"
                                style={{
                                    "backgroundColor": "#3498db",
                                    "borderBottom": "1px solid white",
                                    "borderRadius": "10px 10px"
                                }}>
                                <h4 className="modal-title">
                                    <p className="modal-title-header">Field Summary Detail</p>
                                </h4>
                            </div>
                            <br /> */}
                            <SearchViewErrorPageData
                                covYearOptions={covYearOptions}
                                lastDataReceived={this.state.lastDataReceived}
                                defaultCovYear={this.state.covYear}
                                defaultRecordFlags={this.state.defaultRecordFlags}
                                defaultFieldFlags={this.state.defaultFieldFlags}
                                defaultFieldNames={this.state.defaultFieldNames}
                                defaultTradingPartners={this.state.defaultTradingPartners}
                                tradingPartnerOptions={tradingPartnerOptions}
                                fieldFlagOptions={this.state.fieldFlagOptions}
                                recordFlagOptions={this.state.recordFlagOptions}
                                fieldNameOptions={this.state.fieldNameOptions}
                                summaryTableData={this.state.summaryTableData}
                                summaryTable={this.state.summaryTable}
                                handleSubmit={this.handleSubmit}
                                fieldNameAvdCustomOptions={this.state.fieldNameAvdCustomOptions}
                                getAvdInputFields={this.getAvdInputFields}
                                defaultInventoryType={this.state.defaultInventoryType}
                                inventoryTypeOptions={inventoryTypeOptions}
                                // defaultErrorCode={this.state.defaultErrorCode}
                                // errorCodeOptions={errorCodeOptions}
                                defaultErrorCategory={this.state.defaultErrorCategory}
                                errorCategoryOptions={this.state.errorCategoryOptions}
                                defaultErrorType={this.state.defaultErrorType}
                                errorTypeOptions={errorTypeOptions}
                                defaultSubmissionType={this.state.defaultSubmissionType}
                                submissionTypeOptions={submissionTypeOptions}
                                defaultErrorCodeDesc={this.state.defaultErrorCodeDesc}
                                errorCodeDescOptions={this.state.errorCodeDescOptions}
                                handleSubmitInventory={this.handleSubmitInventory}
                                handleSubmitERE={this.handleSubmitERE}
                            />
                        </Column>
                    </Row>
                </Row>
            </App>
        );
    }
    componentDidMount() {
        this.getInputFields();
    }
    getAvdInputFields(tabName) {
        let customerAdvFiels = [];
        let url = tabName == "RCNO" ? rcnorcni.GET_FIELD_NAME_INPUT_URL : rcnorcni.GET_FIELD_NAME_INPUT_URL;
        return fetch(url, { method: 'GET', credentials: "same-origin" }).then((response) => {
            if (!response.ok) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((response) => {
            let data = null
            //tabName== "RCNO" ? "fieldNameMapRCNO": "fieldNameMapRCNI";
            // let keys =  Object.keys(response);
            //let dataKey =keys.length>0 ? keys[0] :  tabName== "RCNO" ? "fieldNameMapRCNO": "fieldNameMapRCNI"    ;
            let dataKey = tabName == "RCNO" ? "fieldNameMapRCNO" : "fieldNameMapRCNI";
            data = response[dataKey];
            /*
            data = data.map((d, index) => {
                return { value: index, label: d }
            });
            */




            for (var key in data) {
                customerAdvFiels.push({ value: key, label: data[key] })
            }
            return { options: customerAdvFiels };


        }).catch((error) => {
            console.log(error);
        })
    }
    getInputFields() {

        this.getResultSummary({
            frmDate: this.state.fromDate,
            cvgYear: this.state.covYear,
            tpId: 'all'

        })



        // Get Error Code Description
        fetch(rcnorcni.GET_RECORD_FLAG_INPUT_URL, { method: 'GET', credentials: "same-origin" }).then((response) => {
            if (!response.ok) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((response) => {
            debugger;
            let SearchErrorDesc= response.getSearchErrorDesc;
            let errorCodeDesc= Object.keys(SearchErrorDesc).map((err,index)=>({ index:index, value: err  , label:SearchErrorDesc[err]})  ) ;
            debugger;
            
            this.setState({ errorCodeDescOptions:errorCodeDesc});
        }).catch((error) => {
            console.log(error);
        })




        fetch(rcnorcni.GET_FIELD_FLAG_INPUT_URL, { method: 'GET', credentials: "same-origin" }).then((response) => {
            if (!response.ok) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((response) => {
            debugger;

            let errorCategoryOptions=  response.errCategoryList.map((err,index)=>({ value:index, label:err})) ;
            
            this.setState({ errorCategoryOptions: errorCategoryOptions });
        }).catch((error) => {
            console.log(error);
        })


    }
}
SearchViewErrorPage.propTypes = {};
export default SearchViewErrorPage;






