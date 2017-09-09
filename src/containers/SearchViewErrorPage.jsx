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
    isSubmitInventoryDisabled: true
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
    [
      "handleSubmit",
      "getInputFields",
      "getResultSummary",
      "buildUrl",
    ].map(fn => {
      this[fn] = this[fn].bind(this);
    });
    //this.dummy();
  }

  buildUrl(parameters) {
    let url = rcnorcni.GET_SEARCH_VIEW_ERROR_PAGE_URL;
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
     fetch(url, {method: 'GET'}).then((response) => {
        if (!response.ok) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(response => {
        let data = response.errorCodeSearchResult;
        /*  data = response.errorCodeSearchResult.map((errorStatus, index, arry) => {
                errorStatus.submitInventory = (<input type="button" name="submitInventory" value="Submit Inventory" onClick={(e) => this.handleSubmitInventory(e, errorStatus)} />);
                errorStatus.submitERE = (<input type="button" name="submitERE" value="Submit ER & E" onClick={(e) => this.handleSubmitERE(e, errorStatus)} />);
                return errorStatus;

            });*/
        this.setState({
          lastDataReceived: Date.now(),
          summaryTableData: data
        });
      })
      .catch(error => {
        let data = errorCodeSearchResult;

        this.setState({
          lastDataReceived: Date.now(),
          summaryTableData: data
        });

        console.log(error);
      });
  }

  handleSubmitInventory(e, selectedInventory) {
    debugger;
  }

  handleSubmitERE(e, selectedERE) {
    debugger;
  }

  getInitialState() {
    const defaultTradingPartners = [0, 1, 2];
    const defaultInventoryType = { label: "RCNO", value: 0 };
    const defaultErrorCategory = [];
    const defaultErrorType = [0, 1];
    const defaultSubmissionType = [0, 1];
    const defaultErrorCodeDesc = [];
    
    return {
      // fromDate: moment().format('MM/YYYY'),
      fromDate: moment()
        .subtract(1, "month")
        .format("MM/YYYY"),
      covYear: parseInt(moment().format("YYYY")),
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
    
    let tradSelected =
      item.state.tradSelected.length == tradingPartnerOptions.length
        ? "ALL"
        : undefined;
    if (tradSelected === undefined) {
      tradSelected = "";
      item.state.tradSelected.forEach(t => {
        tradSelected += tradingPartnerOptions[t].id + ",";
      });
      tradSelected = tradSelected.slice(0, -1);
    }

//Error Code
let errorCategory =
      item.state.errorCategorySelected.length === this.state.defaultErrorCategory .length ? "ALL" : undefined;

    if (errorCategory === undefined) {
      errorCategory = "";
      item.state.errorCategorySelected.forEach(t => {
        errorCategory += t + ",";
      });
      errorCategory = errorCategory.slice(0, -1);
    }
    //Error Code Description
    let errorCodeDescSelected =
    item.state.errorCodeDescSelected.length ===this.state.defaultErrorCodeDesc.length  ? "ALL" : undefined;

  if (errorCodeDescSelected === undefined) {
    errorCodeDescSelected = "";
    item.state.errorCodeDescSelected.forEach(t => {
      
      errorCodeDescSelected +=t + ",";
    });
    errorCodeDescSelected = errorCodeDescSelected.slice(0, -1);
  }
  
    //---Inventory Type
    let invTypCd =
      Object.keys(item.state.inventoryTypeSelected).length === 0
        ? "ALL"
        : undefined;

    if (invTypCd === undefined) {
      invTypCd = "";
      Object.keys(item.state.inventoryTypeSelected).forEach(t => {
            if(t== "label"){
            invTypCd += item.state.inventoryTypeSelected[t]+ ",";
            }
      });
      invTypCd = invTypCd.slice(0, -1);
    }


    var obj = {
      fromDate: moment(item.state.startDate).format("MM/YYYY"),
      coverageYear: item.state.covYear,
      tradingPartnerId: tradSelected,
      errorCodeDesc: errorCodeDescSelected,
      errCategory: errorCategory,
      invTypCd: invTypCd,
      errType:item.state.errType,
      subType: item.state.subType
    };




    if (item.state.advFields && Object.keys(item.state.advFields).length > 0) {
      let advFieldsItems = item.state.advFields;

      Object.keys(advFieldsItems).forEach(key => {
        advFieldsItems[key] =
          advFieldsItems[key] == "" || advFieldsItems[key] == undefined
            ? undefined
            : advFieldsItems[key];
      });

      obj = Object.assign(obj, advFieldsItems);
    }
    obj.isurDob= item.state.isurDob!=null && item.state.isurDob != "" ? item.state.isurDob.format('YYYY/MM/DD').toString() :undefined;
    
    this.getResultSummary(obj);
  }
  render() {
    return (
      <App>
        <Row
          style={{
            maxWidth: "78rem"
          }}
        >
          <Row
            className="record-summary-details"
            style={{
              maxWidth: "80rem"
            }}
          >
            <Column medium={12}>
              <div className="record-summary-breadcrumb">
                <ol
                  className="gwos-breadcrumbs"
                  vocab="http://schema.org/"
                  typeof="BreadcrumbList"
                >
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
              <RcnoRcniSideBar activeKey={"4"} />
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
  
  getInputFields() {
    this.getResultSummary({
        fromDate: this.state.fromDate,
        coverageYear: this.state.covYear,
        tradingPartnerId: "All"
    });

    // Get Error Code Description
    fetch(rcnorcni.GET_RECORD_FLAG_INPUT_URL, {
      method: "GET",
      credentials: "same-origin"
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(response => {
        let SearchErrorDesc = response.getSearchErrorDesc;
        let defaultErrorCodeDesc =Object.keys(SearchErrorDesc).map((k) => SearchErrorDesc[k])

        
        let errorCodeDesc = Object.keys(SearchErrorDesc).map((err, index) => ({
          index: index,
          value: SearchErrorDesc[err],
          label: err
        }));
        this.setState({ defaultErrorCodeDesc: defaultErrorCodeDesc, errorCodeDescOptions: errorCodeDesc });
      })
      .catch(error => {
        console.log(error);
      });

    fetch(rcnorcni.GET_FIELD_FLAG_INPUT_URL, {
      method: "GET",
      credentials: "same-origin"
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(response => {
        let errorCategoryOptions = response.errCategoryList.map(
          (err, index) => ({
            value: err,
            label: err
          })
        );
        this.setState({ defaultErrorCategory:response.errCategoryList, errorCategoryOptions: errorCategoryOptions });
      })
      .catch(error => {
        console.log(error);
      });
  }
}
SearchViewErrorPage.propTypes = {};
export default SearchViewErrorPage;
