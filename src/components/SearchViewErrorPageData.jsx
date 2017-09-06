import React, { Component } from "react";
import _ from "lodash";
import { Field, reduxForm } from "redux-form";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Row, Column, Grid, Button } from "react-foundation";
import { connect } from "react-redux";
import "../nebert/css/rc-collapse.css";
import Collapse, { Panel } from "rc-collapse";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "rc-checkbox/assets/index.css";
import Checkbox from "rc-checkbox";
import Select, { Async } from "react-select";
import "react-select/dist/react-select.css";
import MultiSelect from "@khanacademy/react-multi-select";
import ReactDOM from "react-dom";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Spinner from "react-spinner-material";
import ReactHover from "react-hover";
// import FieldFlagsHelp from './FieldFlagsHelp'
// import RecordFlagsFeildSummaryHelp from './RecordFlagsFeildSummaryHelp'
import { Tabs, TabLink, TabContent } from "react-tabs-redux";
const styles = {
  tabs: {
    width: "100%",
    display: "inline-block",
    marginRight: "30px",
    verticalAlign: "top"
  },
  links: {
    margin: "0 auto",
    padding: "0 10em"
  },
  tabLink: {
    height: "30px",
    lineHeight: "30px",
    padding: "0 15px",
    cursor: "pointer",
    borderBottom: "2px solid transparent",
    display: "inline-block"
  },
  tabContent: {
    width: "100%"
  },
  activeLinkStyle: {
    borderBottom: "2px solid #333"
  },
  visibleTabStyle: {
    display: "inline-block"
  },
  content: {
    width: "100%",
    padding: "1em"
  }
};
var isSearchable = false;
var isClearable = false;
let advFields = {};
let initialState = undefined;
const recordFlagHelpHoverOptions = {
  followCursor: false
};
// this context
let cxt;

function dynamicHeaderSortFunc(a, b, order, sortField) {
  // order is desc or asc
  let a1 = a[sortField] === undefined ? "0" : a[sortField].split("%")[0];
  let b1 = b[sortField] === undefined ? "0" : b[sortField].split("%")[0];
  //console.log(a1 + ' ' + b1);
  if (order === "desc") {
    if (a.flag == "-") return 1;
    else if (b.flag == "-") return -1;
    return parseFloat(a1) - parseFloat(b1);
  } else {
    if (a.flag == "-") return 1;
    else if (b.flag == "-") return -1;
    return parseFloat(b1) - parseFloat(a1);
  }
}
function flagSortFunc(a, b, order) {
  // order is desc or asc
  if (order === "desc") {
    if (a.flag == "-") return 1;
    else if (b.flag == "-") return -1;
    return a.flag > b.flag;
  } else {
    if (a.flag == "-") return 1;
    else if (b.flag == "-") return -1;
    return b.flag > a.flag;
  }
}
function flagFormatter(cell, row) {
  if (cell == "-") {
    return "";
  }
  return `${cell}`;
}
function emptyDataFormatter(cell, row) {
  if (cell == undefined || cell == "") {
    return "-";
  }
  return `${cell}`;
}
function trClassFormat(row, rIndex) {
  return row.flag == "-" ? "grand-total-highlight" : "";
}
//https://jsfiddle.net/mayankshukla5031/qq7qv8es/
class SearchViewErrorPageData extends Component {
  constructor(props) {
    super(props);
    cxt = this;
    this.state = this.getInitialState();
    [
      "onChange",
      "getInitialState",
      "handleDateChange" ,
      "onExportToCSV",
      "handleExport",
      "handleTradPartChange" ,
      "handleCovYearChange",
      "handleDOBChange" ,
      "handleMultiSelectRenderer"

    ].map(fn => (this[fn] = this[fn].bind(this)));
    //this.addAdvRows();
  }
  getInitialState() {

    let initialState = {
      accordion: true,
      activeKey: ["1"],
      // startDate: moment(),
      startDate: moment().subtract(1, "month"),
      inventoryTypeSelected: this.props.defaultInventoryType,
      // errorCodeSelected: this.props.defaultErrorCode,
      errorCategorySelected: this.props.defaultErrorCategory,
      errorTypeSelected: this.props.defaultErrorType,
      submissionTypeSelected: this.props.defaultSubmissionType,
      errorCodeDescSelected: this.props.defaultErrorCodeDesc,
      RCNI_DOB: null,
      RCNO_DOB: null,
      covYear: this.props.defaultCovYear,
      tradSelected: this.props.defaultTradingPartners,
      advFields: {

      },
      selectRowProp: {
        mode: "checkbox",
        clickToSelect: true,
        selected: []
      },
      tableOptions: {
        onExportToCSV: this.onExportToCSV
      },
      summaryTableData: this.props.summaryTableData,
      tableHeaders: [],
      showTable: false,
      showSpinner: true,
      lastDataReceived: this.props.lastDataReceived,
      errStr: []
    };
    return initialState;
  }
  onChange(activeKey) {
    this.setState({ activeKey });
  }
  handleDateChange(date) {
    this.state.startDate = date;
    this.setState({ startDate: this.state.startDate }, () =>
      this.checkValidation()
    );
  }



  onExportToCSV() {
    const selectedRows = cxt.refs.table.state.selectedRowKeys;
    //console.log(selectedRows);
    //console.log(cxt.state.summaryTable);
    return cxt.state.summaryTable.filter(d => {
      if (selectedRows.indexOf(d.flag) > -1) {
        return d;
      }
    });
  }
  handleExport() {
    this.refs.table.handleExportCSV();
  }
  handleTradPartChange(selected) {
    this.state.tradSelected = selected;
    this.setState({ tradSelected: this.state.tradSelected }, () =>
      this.checkValidation()
    );
  }
  handleCovYearChange(val) {
    this.state.covYear = val.label || null;
    this.setState({ covYear: this.state.covYear }, () =>
      this.checkValidation()
    );
  }
  handleAdvSearch(e, date) {
    if (typeof e == "string") {
      this.state.advFields[e] = moment(
        date
      ).format("YYYY");
    } else {

      this.state.advFields[e.target.name] =
        e.target.value;
    }
    this.setState({ advFields: this.state.advFields });
  }
  handleDOBChange(e, date) {

    this.setState({ [e]: moment(date).format("YYYY/MM/DD") });
  }

  handleMultiSelectRenderer(selected, options) {
    if (selected.length === 0) {
      return "Select";
    }
    if (selected.length === options.length) {
      return "All";
    }
    return `Selected (${selected.length})`;
  }


  handleInventoryTypeChange(selected) {
    this.setState({ inventoryTypeSelected: selected });
  }
  // handleErrorCodeChange(selected) {
  //   this.setState({ errorCodeSelected: selected });
  // }
  handleErrorCategoryChange(selected) {
    this.setState({ errorCategorySelected: selected });
  }
  handleErrorTypeChange(selected) {
    this.setState({ errorTypeSelected: selected });
  }
  handleSubmissionTypeChange(selected) {
    this.setState({ submissionTypeSelected: selected });
  }
  handleErrorCodeDescChange(selected) {
    this.setState({ errorCodeDescSelected: selected });
  }
  checkValidation() {
    let state = Object.assign({}, this.state);
    let pass = true;
    let errStr = []
    // validate covYear
    if (
      !state.covYear ||
      parseInt(state.covYear) !==
      state.covYear ||
      String(state.covYear).indexOf(".") !== -1
    ) {
      pass = false;
      errStr[4] = "Field Required";
    }
    // validate moment object
    let currentRef = "fileRunDPicker";
    const startDate = this.refs[currentRef].refs.input.defaultValue;
    if (!startDate || startDate.length !== 7) {
      pass = false;
      errStr[0] = "Field Required";
    } else {
      let range = moment(startDate, "MM/YYYY").add(6, "month");
      if (!moment(range).isSameOrAfter(moment())) {
        pass = false;
        errStr[0] = "Error : Date more than 6 months old";
      }
    }
    // validate trad partners
    if (
      !state.tradSelected ||
      state.tradSelected.length < 1
    ) {
      pass = false;
      errStr[1] = "Field Required";
    }

    this.setState({ errStr: errStr });
    return pass;
  }
  handleSubmitButton() {
    let state = Object.assign({}, this.state); //JSON.parse(JSON.stringify(this.state));
    let isValidForm = this.checkValidation();
    if (isValidForm) {
      this.props.handleSubmit({ state });
      this.setState({ activeKey: ["1"], showSpinner: true, showTable: false });
    }
  }
  handleResetButton() {



    var resetFields = {
      startDate: moment().subtract(1, "month"),
      covYear: JSON.parse(JSON.stringify(initialState.covYear)),
      tradSelected: JSON.parse(JSON.stringify(initialState.tradSelected)),
      inventoryTypeSelected: JSON.parse(
        JSON.stringify(initialState.inventoryTypeSelected)
      ),
      // errorCodeSelected: JSON.parse(JSON.stringify(initialState.errorCodeSelected)),
      errorCategorySelected: JSON.parse(
        JSON.stringify(initialState.errorCategorySelected)
      ),
      errorTypeSelected: JSON.parse(
        JSON.stringify(initialState.errorTypeSelected)
      ),
      submissionTypeSelected: JSON.parse(
        JSON.stringify(initialState.submissionTypeSelected)
      ),
      errorCodeDescSelected: JSON.parse(
        JSON.stringify(initialState.errorCodeDescSelected)
      )
    };

    this.refs.advFfmFstNm.value = "";
    this.refs.advFfmLstNm.value = "";
    this.refs.advFfmIsurExchSubId.value = "";
    this.refs.advFfmExchPlcyId.value = "";
    this.refs.advFfmAscnRcTcNum.value = "";
    this.refs.advFfmDob.refs.input.value = "";
    this.setState({ RCNI_DOB: null });

    this.state.advFields = {};
    resetFields.errStr = [];
    this.setState({
      advFields: this.state.advFields,

    });

    this.setState(resetFields, () => {
      let currentRef = "fileRunDPicker";
      if (
        cxt.refs[currentRef].refs.input.value !=
        cxt.state.startDate.format("MM/YYYY")
      ) {
        cxt.refs[currentRef].refs.input.defaultValue = cxt.state.startDate.format("MM/YYYY");
        cxt.refs[currentRef].refs.input.value = cxt.state.startDate.format("MM/YYYY");
        cxt.refs[currentRef].setState({ inputValue: cxt.state.startDate.format("MM/YYYY") });
      }

      console.log("Resetting State");
      console.log(this.state);
    });
  }

  getItems() {
    const items = [];
    items.push(
      <Panel header={`Search and View Error`} key={"0"}>
        <Row>
          <div>
            <div style={styles.content}>
              <Row className="display">
                <div style={{ marginLeft: "0%" }}>
                  <Column medium={3}>
                    <div
                      style={{
                        fontFamily: "Verdana, Arial, sans-serif",
                        fontSize: "0.8rem",
                        display: "inline",
                        fontWeight: "bold",
                        color: "#3498db"
                      }}
                    >
                      File Run Month/Year:*
                      <DatePicker
                        ref="fileRunDPicker_RCNI"
                        selected={
                          this.state.startDate
                        }
                        onChange={this.handleDateChange}
                        dateFormat="MM/YYYY"
                        showMonthDropdown
                        showYearDropdown
                        scrollableYearDropdown
                      />
                      <span className="error date-picker-error">
                        {this.state.errStr[0]}
                      </span>
                    </div>
                  </Column>
                </div>
                <Column medium={3} className="multi-select">
                  <label
                    className="formLabel"
                    style={{
                      display: "inline",
                      fontWeight: "bold",
                      color: "#3498db"
                    }}
                  >
                    Trading Partner ID:*
                    <MultiSelect
                      options={this.props.tradingPartnerOptions}
                      onSelectedChanged={this.handleTradPartChange}
                      selected={
                        this.state.tradSelected
                      }
                      valueRenderer={this.handleMultiSelectRenderer}
                      selectAllLabel={"All"}
                    />
                    <span className="error">
                      {this.state.errStr[1]}
                    </span>
                  </label>
                </Column>

                <Column medium={3} className="coverage-year">
                  <label
                    className="formLabel"
                    style={{
                      display: "inline",
                      fontWeight: "bold",
                      color: "#3498db"
                    }}
                  >
                    Coverage Year:*
                    <Select
                      value={this.state.covYear}
                      options={this.props.covYearOptions}
                      onChange={this.handleCovYearChange}
                    />
                    <span className="error">{this.state.errStr[4]}</span>
                  </label>
                </Column>


                <Column medium={3} className="multi-select">
                  <label
                    className="formLabel"
                    style={{
                      display: "inline",
                      fontWeight: "bold",
                      color: "#3498db"
                    }}
                  >
                    Inventory Type:
                    <Select
                      value={this.state.inventoryTypeSelected}
                      options={this.props.inventoryTypeOptions}
                      onChange={this.handleInventoryTypeChange}
                    />
                    <span className="error">{this.state.errStr[1]}</span>
                  </label>
                </Column>
              </Row>
              <Row>
                <Column medium={3} className="multi-select">
                  <label
                    className="formLabel"
                    style={{
                      display: "inline",
                      fontWeight: "bold",
                      color: "#3498db"
                    }}
                  >
                    Error Type:
                    <MultiSelect
                      options={this.props.errorTypeOptions}
                      onSelectedChanged={this.handleErrorTypeChange}
                      selected={this.state.errorTypeSelected}
                      valueRenderer={this.handleMultiSelectRenderer}
                      selectAllLabel={"All"}
                    />
                    <span className="error">{this.state.errStr[1]}</span>
                  </label>
                </Column>
                <Column medium={3} className="multi-select">
                  <label
                    className="formLabel"
                    style={{
                      display: "inline",
                      fontWeight: "bold",
                      color: "#3498db"
                    }}
                  >
                    Submission Type:
                    <MultiSelect
                      options={this.props.submissionTypeOptions}
                      onSelectedChanged={this.handleSubmissionTypeChange}
                      selected={this.state.submissionTypeSelected}
                      valueRenderer={this.handleMultiSelectRenderer}
                      selectAllLabel={"All"}
                    />
                    <span className="error">{this.state.errStr[1]}</span>
                  </label>
                </Column>
                <Column medium={6} className="multi-select">
                  <label
                    className="formLabel"
                    style={{
                      display: "inline",
                      fontWeight: "bold",
                      color: "#3498db"
                    }}
                  >
                    Error Category:
                    <MultiSelect
                      options={this.props.errorCategoryOptions}
                      onSelectedChanged={this.handleErrorCategoryChange}
                      selected={this.state.errorCategorySelected}
                      valueRenderer={this.handleMultiSelectRenderer}
                      selectAllLabel={"All"}
                    />
                    <span className="error">{this.state.errStr[1]}</span>
                  </label>
                </Column>
              </Row>
              <br />
              <Row>
                <Column medium={12} className="multi-select">
                  <label
                    className="formLabel"
                    style={{
                      display: "inline",
                      fontWeight: "bold",
                      color: "#3498db"
                    }}
                  >
                    Error Code Description:
                    <MultiSelect
                      options={this.props.errorCodeDescOptions}
                      onSelectedChanged={this.handleErrorCodeDescChange}
                      selected={this.state.errorCodeDescSelected}
                      valueRenderer={this.handleMultiSelectRenderer}
                      selectAllLabel={"All"}
                    />
                    <span className="error">{this.state.errStr[1]}</span>
                  </label>
                </Column>
              </Row>
              <Row>
                <br />
                <br />
                <label
                  className="formLabel"
                  style={{
                    display: "inline",
                    fontWeight: "bold",
                    color: "#3498db",
                    fontSize: "1.0rem",
                    paddingLeft: "20px"
                  }}
                >
                  Advanced Search
                </label>
                <br />
              </Row>
              <Row>
                <div style={{ marginLeft: "3%" }}>
                  <Column medium={4}>
                    <label
                      className="formLabel"
                      style={{
                        display: "inline",
                        fontWeight: "500",
                        color: "#3498db"
                      }}
                    >
                      First Name:
                      <input
                        type="text"
                        ref="advFfmFstNm"
                        name="advFfmFstNm"
                        value={this.state.advFfmFstNm}
                        onChange={this.handleAdvSearch}
                        placeholder="First Name"
                      />
                    </label>
                  </Column>
                </div>
                <Column medium={4}>
                  <label
                    className="formLabel"
                    style={{
                      display: "inline",
                      fontWeight: "500",
                      color: "#3498db"
                    }}
                  >
                    Last Name:
                    <input
                      type="text"
                      ref="advFfmLstNm"
                      name="advFfmLstNm"
                      value={this.state.advFfmLstNm}
                      onChange={this.handleAdvSearch}
                      placeholder="Last Name"
                    />
                  </label>
                </Column>
                <Column medium={3}>
                  <label
                    className="formLabel"
                    style={{
                      display: "inline",
                      fontWeight: "500",
                      color: "#3498db"
                    }}
                  >
                    Issuer DOB:
                    <DatePicker
                      placeholderText="YYYY/MM/DD"
                      scrollableYearDropdown
                      dateFormat="YYYY/MM/DD"
                      showMonthDropdown
                      showYearDropdown
                      scrollableYearDropdown
                      ref="advFfmDob"
                      selected={this.state.RCNI_DOB}
                      onChange={e => {
                        this.setState({ RCNI_DOB: e });
                      }}
                    />
                  </label>
                </Column>
              </Row>
              <Row>
                <div style={{ marginLeft: "3%" }}>
                  <Column medium={4}>
                    <label
                      className="formLabel"
                      style={{
                        display: "inline",
                        fontWeight: "500",
                        color: "#3498db"
                      }}
                    >
                      Issuer Ex Subscriber Id:
                      <input
                        type="text"
                        ref="advFfmIsurExchSubId"
                        name="advFfmIsurExchSubId"
                        value={this.state.advFfmIsurExchSubId}
                        onChange={this.handleAdvSearch}
                        placeholder="Ex Subscriber Id"
                      />
                    </label>
                  </Column>
                </div>
                <Column medium={4}>
                  <label
                    className="formLabel"
                    style={{
                      display: "inline",
                      fontWeight: "500",
                      color: "#3498db"
                    }}
                  >
                    Issuer Assigned Ex Policy ID:
                    <input
                      type="text"
                      ref="advFfmExchPlcyId"
                      name="advFfmExchPlcyId"
                      value={this.state.advFfmIsurExchSubId}
                      onChange={this.handleAdvSearch}
                      placeholder="Ex Policy ID"
                    />
                  </label>
                </Column>
                <Column medium={3}>
                  <label
                    className="formLabel"
                    style={{
                      display: "inline",
                      fontWeight: "500",
                      color: "#3498db"
                    }}
                  >
                    Issuer Record Trace Number:
                    <input
                      type="text"
                      ref="advFfmAscnRcTcNum"
                      name="advFfmAscnRcTcNum"
                      value={this.state.advFfmIsurExchSubId}
                      onChange={this.handleAdvSearch}
                      placeholder="Record Trace Number"
                    />
                  </label>
                </Column>
              </Row>

              <Row>
                <div className="modal-footer">
                  <div
                    style={{
                      display: "inline",
                      float: "right",
                      paddingRight: "0em",
                      paddingTop: "2em",
                      marginRight: "20px"
                    }}
                  >
                    <button
                      className="button primary  btn-lg btn-color formButton"
                      type="button"
                      onClick={this.handleResetButton}
                    >
                      {" "}
                      Reset{" "}
                    </button>
                  </div>
                  <div
                    style={{
                      display: "inline",
                      float: "right",
                      paddingRight: "1em",
                      paddingTop: "2em"
                    }}
                  >
                    <button
                      className="button primary  btn-lg btn-color formButton"
                      type="button"
                      style={{ backgroundColor: "green" }}
                      onClick={this.handleSubmitButton}
                    >
                      {" "}
                      Submit{" "}
                    </button>
                  </div>
                </div>
              </Row>
              <Row>
                <br />
                <div className="vh40" />
              </Row>
            </div>
          </div>
        </Row>
      </Panel>
    );
    items.push(
      <Panel header={`Search Result `} key={"1"}>
        <div
          className={"display-" + !this.state.showTable}
          style={{
            textAlign: "center",
            color: "darkgoldenrod",
            fontWeight: "bolder",
            fontStyle: "italic",
            fontFamily: "serif",
            fontSize: "26px"
          }}
        >
          <p className={"display-" + !this.state.showSpinner}>
            No Data Available for selected Range
          </p>
          <Spinner
            className="record-summary-spinner"
            spinnerColor={"#5dade2"}
            spinnerWidth={2}
            visible={this.state.showSpinner && !this.state.showTable}
          />
        </div>
        <div className={"display-" + this.state.showTable}>
          <br />
          <br />
          <br />
          <br />
          <BootstrapTable
            data={this.state.summaryTableData}
            className="record-summary-details-result-table"
            height="300"
            scrollTop={"Top"}
            ref="table"
            selectRow={this.state.selectRowProp}
            options={this.state.tableOptions}
            pagination={true}
          >
            <TableHeaderColumn dataField="recordIdentifier">
              recordIdentifier
            </TableHeaderColumn>
            <TableHeaderColumn dataField="firstName">
              rcnoFirstName
            </TableHeaderColumn>
            <TableHeaderColumn dataField="lastName">
              rcnoLastName
            </TableHeaderColumn>
            <TableHeaderColumn dataField="exchSubId">
              rcnoExchSubId
            </TableHeaderColumn>
            <TableHeaderColumn dataField="socSecNum">
              rcnoSocSecNum
            </TableHeaderColumn>
            <TableHeaderColumn dataField="contractId" isKey={true}>
              rcnoContractId
            </TableHeaderColumn>
            <TableHeaderColumn dataField="ffmPolicyId">
              rcnoFFMPolicyId
            </TableHeaderColumn>

          </BootstrapTable>
          <br />
          <Row>
            {/* <Column medium={1} offsetOnMedium={10}> */}
            <div className="modal-footer">
              <div
                style={{
                  display: "inline",
                  float: "right",
                  paddingRight: "0em",
                  paddingTop: "2em",
                  paddingLeft: "1em"
                }}
              >
                <button
                  className="button primary  btn-lg btn-color formButton"
                  style={{
                    backgroundColor: "green",
                    paddingTop: "0em",
                    height: "2.5em",
                    marginRight: "20px"
                  }}
                  onClick={this.handleExport}
                >
                  Export To Excel
                </button>
              </div>
              <div
                style={{
                  display: "inline",
                  float: "right",
                  paddingRight: "0em",
                  paddingTop: "2em"
                }}
              >
                <button
                  className="button primary  btn-lg btn-color formButton"
                  type="button"
                >
                  Compare
                </button>
              </div>
            </div>
            {/*<Button color={Colors.SUCCESS}>Export</Button>*/}
            {/* </Column> */}
          </Row>
        </div>
      </Panel>
    );
    return items;
  }
  render() {
    return (
      <div className="list-view-summary-page-data">
        <div>
          <Collapse
            accordion={this.state.accordion}
            onChange={this.onChange}
            activeKey={this.state.activeKey}
          >
            {this.getItems()}
          </Collapse>
        </div>
      </div>
    );
  }
  componentWillReceiveProps(nextProps) {

    if (this.state.lastDataReceived < nextProps.lastDataReceived) {
      if (
        nextProps.summaryTableData == undefined ||
        Object.keys(nextProps.summaryTableData).length === 0
      ) {
        console.log("No Table Data");
        this.setState({
          showSpinner: false,
          showTable: false,
          lastDataReceived: nextProps.lastDataReceived
        });
      } else {
        this.setState({
          showSpinner: false,
          showTable: true,
          lastDataReceived: nextProps.lastDataReceived,
          summaryTableData: nextProps.summaryTableData
        });

      }
    }
  }
  componentDidMount() {
    console.log("componentDidMount()");
    if (initialState === undefined) {

      initialState = {
        covYear: JSON.parse(JSON.stringify(this.state.covYear)),
        tradSelected: JSON.parse(
          JSON.stringify(this.state.tradSelected)
        )
      };
      //console.log(initialState);
      //console.log(this.state);
    }
  }
}

SearchViewErrorPageData.propTypes = {};
export default SearchViewErrorPageData;
