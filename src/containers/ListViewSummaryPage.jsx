import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RcnoRcniSideBar from './RcnoRcniSideBar';
import App from '../components/App';
import ListViewSummaryPageData from '../components/ListViewSummaryPageData';
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
});;
const tradingPartnerOptions = [
    {
        label: '592015694B-PPO',
        id: '592015694',
        value: 0
    }, {
        label: '592403696B-HMO',
        id: '592403696',
        value: 1
    }, {
        label: '592876465-Dental',
        id: '592876465',
        value: 2
    }
];
//----------------------Field Flag Options without service-----------------
// const fieldFlagOptions = {
//     "fieldLvlList": [
//         "C",
//         "D",
//         "F",
//         "G",
//         "I",
//         "J",
//         "K",
//         "L",
//         "M",
//         "NA",
//         "U"
//    ]
// };
//----------------------Record Flag Options without service-----------------
// const recordFlagOptions = {
//     "recordLvlList": [
//         "B",
//         "C",
//         "D",
//         "E",
//         "F",
//         "G",
//         "I",
//         "L",
//         "M",
//         "N",
//         "P",
//         "R",
//         "U",
//         "W",
//         "Z"
//     ]
// };
//----------------------Field Name Options without service-----------------
// const fieldNameOptions = {
//     "rcnoFieldNameList": [
//         "Agent/Broker-NPN",
//         "Agent/Broker-Name",
//         "Applied-APTC-Amount",
//         "Applied-APTC-Effective-Date",
//         "Applied-APTC-End-Date",
//         "Benefit-End-Date",
//         "Benefit-Start-Date",
//         "CSR-AMT",
//         "CSR-Effective-Date",
//         "CSR-End-Date",
//         "Coverage-Year",
//         "DOB",
//         "End-of-Year-Termination-Indicator",
//         "Enrollment-Group-Member-Count",
//         "Exchange-Assigned-Member-ID",
//         "Exchange-Assigned-Policy-ID",
//         "Exchange-Assigned-Subscriber-ID",
//         "Gender",
//         "Initial-Premium-Paid-Status",
//         "Issuer-Assigned Member-ID",
//         "Issuer-Assigned-Policy-ID",
//         "Issuer-Assigned-Subscriber-ID",
//         "Mailing-Address-City",
//         "Mailing-Address-State",
//         "Mailing-Address-Street",
//         "Mailing-Address-Street-Line-2",
//         "Mailing-Address-Zip-Code",
//         "Member-First-Name",
//         "Member-Last-Name",
//         "Member-Middle-Name",
//         "Member-Premium-Amount",
//         "Member-Premium-Effective-Date",
//         "Member-Premium-End-Date",
//         "Paid-Through-Date",
//         "QHPID-Identifier",
//         "Rating-Area",
//         "Relationship-to-Subscriber-Indicator",
//         "Residential-City",
//         "Residential-County-Code",
//         "Residential-State",
//         "Residential-Street-Address",
//         "Residential-Street-Address-Line-2",
//         "Residential-Zip-Code",
//         "SSN",
//         "Subscriber-Indicator",
//         "Telephone-Number",
//         "Tobacco-Status",
//         "Total-Premium-Amount",
//         "Total-Premium-Effective-Date",
//         "Total-Premium-End-Date"
//     ]
// };

const fieldNameOptions = [
    { value: "onev", lebel: "onel" },
    { value: "twov", lebel: "twol" },
    { value: "onev1", lebel: "onel1" },
    { value: "twov1", lebel: "twol1" }
];

const summaryTableData = [
    {
        "recordIdentifier": "Non-Match with Issuer Action",
        "rcnoFirstName": "A",
        "rcnoLastName": "10007",
        "rcnoExchSubId": "0.67",
        "rcnoSocSecNum": "rcnoSocSecNum",
        "rcnoContractId": "RCNI17063",
        "rcnoFFMPolicyId": "H10162144",
        "overallInd": "M"
    },
    {
        "recordIdentifier": "11Non-Match with Issuer Action",
        "rcnoFirstName": "B",
        "rcnoLastName": "10007",
        "rcnoExchSubId": "0.67",
        "rcnoSocSecNum": "rcnoSocSecNum",
        "rcnoContractId": "RCNI17",
        "rcnoFFMPolicyId": "H10162144",
        "overallInd": "M"
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
                "socSecNum": "770404680",
                "contractId": "RCNI17063",
                "ffmPolicyId": "H10162144",
                "overallInd": "M"
            }, {
                "recordIdentifier": "RCNI170630115000005",
                "firstName": "ERIN",
                "lastName": "HILL",
                "exchSubId": "0001567297",
                "socSecNum": "770404680",
                "contractId": "RCNI17063",
                "ffmPolicyId": "H10162144",
                "overallInd": "M"
            }
        ]
    }

class ListViewSummaryPage extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();

        ['handleSubmit', 'getInputFields', 'getResultSummary', 'buildUrl', 'getAvdInputFields'].map(fn => this[fn] = this[fn].bind(this));
        //this.dummy();
    }
    dummy() {
        // Dummy Code for Testing;
        let response = resultData;
        let data = response.rcnoListViewRes;
        setTimeout(() => {
            this.setState({
                lastDataReceived: Date.now(),
                summaryTableData: data,

            });
        }, 2000);
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
        // Get Field Flags
        let urlService = args.currentTabName=="RCNO" ?rcnorcni.GET_LIST_VIEW_SUMMARY_URL :rcnorcni.GET_LIST_VIEW_SUMMARY_URL;
        args.currentTabName = undefined;
        fetch(urlService, {
            method: 'POST', credentials: "same-origin",
            body: JSON.stringify(args),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((response) => {
            let data = response;
            this.setState({
                lastDataReceived: Date.now(),
                summaryTableData: data
            });
        }).catch((error) => {
            // Dummy Code for Testing;
            let response = resultData;
            let data = response.rcnoListViewRes;
            setTimeout(() => {
                this.setState({
                    lastDataReceived: Date.now(),
                    summaryTableData: data
                });
            }, 2000);
        })
    }



    getInitialState() {
        const defaultTradingPartners = [0, 1, 2];
        const defaultRecordFlags = [3, 9, 10];
        const defaultFieldFlags = [4, 5, 6, 7];
        const defaultFieldNames = [0, 1, 2, 3, 4];



        return {
            // fromDate: moment().format('MM/YYYY'),
            fromDate: moment()
                .subtract(1, 'month')
                .format('MM/YYYY'),
            covYear: parseInt(moment().format('YYYY')),
            defaultTradingPartners,
            summaryTableData: summaryTableData,
            fieldNameOptions: fieldNameOptions,
            fieldNameAvdCustomOptions: [],
            summaryTable: undefined,
            recordFlagOptions: [],
            fieldFlagOptions: [],
            lastDataReceived: Date.now(),
            defaultFieldNames,
            defaultFieldFlags,
            defaultRecordFlags
        };

    }
    handleSubmit(item) {
        let currentTabName = item.state.selectedTab.TabName;

        console.dir(item);
        let tradSelected = item.state.tradSelected[currentTabName].length == tradingPartnerOptions.length
            ? 'all'
            : undefined;
        if (tradSelected === undefined) {
            tradSelected = '';
            item
                .state
                .tradSelected[currentTabName]
                .forEach((t) => {
                    tradSelected += tradingPartnerOptions[t].id + ',';
                })
            tradSelected = tradSelected.slice(0, -1);
        }
        let fieldFlagSelected = item.state.fieldFlagSelected[currentTabName].length == this.state.fieldFlagOptions.length
            ? 'all'
            : undefined;
        if (fieldFlagSelected === undefined) {
            fieldFlagSelected = '';
            item
                .state
                .fieldFlagSelected[currentTabName]
                .forEach((f) => {
                    fieldFlagSelected += this.state.fieldFlagOptions[f].label + ',';
                })
            fieldFlagSelected = fieldFlagSelected.slice(0, -1);
        }
        let recordFlagSelected = item.state.recordFlagSelected[currentTabName].length == this.state.recordFlagOptions.length
            ? 'all'
            : undefined;
        if (recordFlagSelected === undefined) {
            recordFlagSelected = '';
            item
                .state
                .recordFlagSelected[currentTabName]
                .forEach((f) => {
                    recordFlagSelected += this.state.recordFlagOptions[f].label + ',';
                })
            recordFlagSelected = recordFlagSelected.slice(0, -1);
        }
        let fieldNameSelected = item.state.fieldNameSelected[currentTabName].length == this.state.fieldNameOptions.length
            ? 'all'
            : undefined;
        if (fieldNameSelected === undefined) {
            fieldNameSelected = '';
            item.state.fieldNameSelected[currentTabName]
                .forEach((f, i) => {
                    // fieldNameSelected += f.label + ',';
                    fieldNameSelected += this.state.fieldNameOptions[f].label + ',';
                })
            fieldNameSelected = fieldNameSelected.slice(0, -1);
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
            frmDate: moment(item.state.startDate[currentTabName]).format('MM/YYYY'),
            cvgYear: item.state.covYear[currentTabName],
            tpId: tradSelected,
            currentTabName:currentTabName
        }

          if(currentTabName == "RCNO"){
            obj.rcdFlag=recordFlagSelected;
            obj.fldFlag= fieldFlagSelected;
            obj.fldName=fieldNameSelected;
            obj.advIsrDob= item.state.RCNO_DOB!=null && item.state.RCNO_DOB != ""?item.state.RCNO_DOB.format('YYYY/MM/DD').toString()   :undefined;

          }else{
            obj.advFfmDob= item.state.RCNI_DOB!=null && item.state.RCNI_DOB != ""?item.state.RCNI_DOB.format('YYYY/MM/DD').toString() :undefined;
          }



        if (item.state.advFields[currentTabName] && Object.keys(item.state.advFields[currentTabName]).length>0) {
            let advFieldsItems =item.state.advFields[currentTabName] ;
                
         
            Object.keys(advFieldsItems).forEach(key => {  advFieldsItems[key]=  (advFieldsItems[key] == "" || advFieldsItems[key] == undefined) ? undefined : advFieldsItems[key]; });
            obj = Object.assign(obj,advFieldsItems );
        }
        if (item.state.fieldAvdNameSelected[currentTabName] != undefined) {

            obj.fldNmFldVal =item.state.fieldAvdNameSelected[currentTabName].value.map(function (value, index) {
                let FieldSelected =  Object.keys(value.field).length > 0 ? value.field.label : undefined;
                var FieldValueSelected =  value.fieldValue == "" ? undefined :   value.fieldValue;
                if(FieldSelected != undefined &&   FieldValueSelected != undefined){
                        return { fieldName:FieldSelected , fieldValue: FieldValueSelected }
                }
            });


            obj.fldNmFldVal  = obj.fldNmFldVal .filter(function( element ) {
                         return element !== undefined;
            });

            obj.fldNmFldVal  =  obj.fldNmFldVal .length> 0 ?  obj.fldNmFldVal : undefined;


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
                                        <NavLink to={rcnorcni.RCNO_RCNI_FIELD_SUMMARY_DETAILS_URL}>
                                            <span property="name">Field Search</span>
                                        </NavLink>
                                        <meta property="position" content="3" />
                                    </li>
                                </ol>
                            </div>
                        </Column>
                        <Column medium={3}>
                            <RcnoRcniSideBar activeKey={'2'} />
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
                            <ListViewSummaryPageData
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
        let url = tabName=="RCNO" ?rcnorcni.GET_FIELD_NAME_INPUT_URL :rcnorcni.GET_FIELD_NAME_INPUT_URL;
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

            let dataKey = tabName== "RCNO" ? "fieldNameMapRCNO": "fieldNameMapRCNI"    ;

            data= response[dataKey];
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
        // Get Field Name
        this.setState({ fieldNameOptions: fieldNameOptions });
        fetch(rcnorcni.GET_FIELD_NAME_INPUT_URL, { method: 'GET', credentials: "same-origin" }).then((response) => {
            if (!response.ok) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((response) => {
            console.log(response);
            let data = response.rcnoFieldNameList;
            data = data.map((d, index) => {
                return { value: index, label: d }
            });
            this.setState({ fieldNameOptions: data, fieldNameAvdCustomOptions: data }, () => {
                let fN = response.rcnoFieldNameList;
                this.getResultSummary({
                    frmDate: this.state.fromDate,
                    cvgYear: this.state.covYear,
                    tpId: 'all',
                    rcdFlag: 'E,P,N',
                    fldFlag: 'I,L,J,K',
                    fldName: fN[0] + ',' + fN[1] + ',' + fN[2] + ',' + fN[3] + ',' + fN[4]
                })
            });
        }).catch((error) => {
            console.log(error);
        })
        // Get Record Flags
        fetch(rcnorcni.GET_RECORD_FLAG_INPUT_URL, { method: 'GET', credentials: "same-origin" }).then((response) => {
            if (!response.ok) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((response) => {
            console.log(response);
            let data = response.recordLvlList;
            data = data.map((d, index) => {
                return { value: index, label: d }
            });

            this.setState({ recordFlagOptions: data });
        }).catch((error) => {
            console.log(error);
        })
        // Get Field Flags
        fetch(rcnorcni.GET_FIELD_FLAG_INPUT_URL, { method: 'GET', credentials: "same-origin" }).then((response) => {
            if (!response.ok) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((response) => {
            console.log(response);
            let data = response.fieldLvlList;
            data = data.map((d, index) => {
                return { value: index, label: d }
            });
            this.setState({ fieldFlagOptions: data });
        }).catch((error) => {
            console.log(error);
        })

        // Get SummeryTab data
        fetch(rcnorcni.GET_LIST_VIEW_SUMMARY_URL, { method: 'POST', credentials: "same-origin" }).then((response) => {
            if (!response.ok) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((response) => {
            console.log(response);
            let data = response.rcnoListViewRes;
            this.setState({ summaryTableData: data });
        }).catch((error) => {
            console.log(error);
        })
    }

}
ListViewSummaryPage.propTypes = {};
export default ListViewSummaryPage;



