import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Column, Grid, Button } from 'react-foundation'
import { connect } from 'react-redux';
import Collapse, { Panel } from 'rc-collapse';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-checkbox/assets/index.css';
import Checkbox from 'rc-checkbox'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import MultiSelect from '@khanacademy/react-multi-select';
import ReactDOM from 'react-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Spinner from 'react-spinner-material';
import ReactHover from 'react-hover'
//import FieldFlagsHelp from '.test/import RecordFlagsFeildSummaryHelp from './RecordFlagsFeildSummaryHelp'
import * as rcnorcni from '../utils/RcnoRcni';
import { NavLink } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';
import { withRouter } from 'react-router-dom';
import isEqual from 'lodash.isequal';
import { updateFSDStartDate, updateFSDCovYear, updateFSDTradSelected, updateFSDFieldFlagSelected, updateFSDRecordFlagSelected, updateFSDFieldNameSelected, updateFSDTableData, resetFSDState, updateFSDTableHeaders } from '../actions/fieldSummaryDetailsActions'


// const Colors = {
//   PRIMARY: 'primary',
//   SUCCESS: 'success'
// }
let initialState = undefined;
const recordFlagHelpHoverOptions = {
  followCursor: false
}
// this context
let cxt;


function dynamicHeaderSortFunc(a, b, order, sortField) { // order is desc or asc
  let a1 = a[sortField] === undefined ? '0' : a[sortField].split('%')[0];
  let b1 = b[sortField] === undefined ? '0' : b[sortField].split('%')[0];
  //console.log(a1 + ' ' + b1);
  if (order === 'desc') {
    if (a.flag == 'Total')
      return 1;
    else if (b.flag == 'Total')
      return -1;
    return parseFloat(a1) - parseFloat(b1);
  } else {
    if (a.flag == 'Total')
      return 1;
    else if (b.flag == 'Total')
      return -1;
    return parseFloat(b1) - parseFloat(a1);
  }
}
function flagSortFunc(a, b, order) { // order is desc or asc
  let x = a.flag == 'Total' ? (order === 'desc' ? 1000 : -1000) : a.flag.charCodeAt(0);
  let y = b.flag == 'Total' ? (order === 'desc' ? 1000 : -1000) : b.flag.charCodeAt(0);
  if (order === 'desc') {
    return x - y;
  } else {
    return y - x;
  }
}
function flagFormatter(cell, row) {
  if (cell == "Total") {
    return <div style={{ textAlign: 'center' }}>{cell}</div>;
  }
  return <div onClick={cxt.handleFlagClick.bind(this, cell)} className='hyperlink-flag'>{cell}</div>;
}
function emptyDataFormatter(cell, row) {
  if (cell == undefined || cell == "") {
    return "-";
  }
  return `${cell}`;
}
function trClassFormat(row, rIndex) {
  return row.flag == 'Total'
    ? 'grand-total-highlight' : '';
  // ? 'grand-total-highlight reactTablefontSize'
  // : 'reactTablefontSize';
}
class FieldSummaryDetailPageData extends Component {
  constructor(props) {
    super(props);
    cxt = this;
    window.fsdp = this;
    this.state = this.getInitialState();
    [
      'getItems',
      'onChange',
      'handleDateChange',
      'handleTradPartChange',
      'handleCovYearChange',
      'handleFieldFlagChange',
      'handleRecordFlagChange',
      'handleFieldNameChange',
      'handleMultiSelectRenderer',
      'handleSubmitButton',
      'handleResetButton',
      'handleExport',
      'handleListView',
      'callBackAfterInputFields',
      'parseTableDataToCSV',
      'checkValidation'
    ].map(fn => this[fn] = this[fn].bind(this));
  }
  getInitialState() {
    return {
      accordion: true,
      activeKey: ['1'],
      startDate: this.props.startDate,
      covYear: this.props.covYear,
      //covYear: '2000', //this.props.covYear,
      //tradSelected: [],//this.props.tradSelected,
      //fieldFlagSelected: this.props.fieldFlagSelected,
      //fieldFlagSelected: [],
      //recordFlagSelected: this.props.recordFlagSelected,
      //recordFlagSelected: [],
      //fieldNameSelected: this.props.fieldNameSelected,
      //fieldNameSelected: [],
      tradSelected: this.props.tradSelected,
      fieldFlagSelected: this.props.fieldFlagSelected,
      recordFlagSelected: this.props.recordFlagSelected,
      fieldNameSelected: this.props.fieldNameSelected,
      fieldNameOptions: this.props.fieldNameOptions,
      recordFlagOptions: this.props.recordFlagOptions,
      fieldFlagOptions: this.props.fieldFlagOptions,
      selectRowProp: {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: this.onTableRowSelect,
        selected: []
      },
      tableOptions: {
        onExportToCSV: this.onExportToCSV
      },
      summaryTableData: this.props.summaryTableData,
      tableHeaders: this.props.tableHeaders,
      showTable: false,
      showSpinner: true,
      lastDataReceived: this.props.lastDataReceived,
      errStr: [],
      dataAccessId: 0,
      csvData: []
    };
  }
  parseTableDataToCSV(headers, data) {
    console.log('-------');
    console.log(data);
    let csvData = [];
    let thRow = [];
    thRow.push('flag');
    headers.forEach((h) => {
      thRow.push(h);
    });
    csvData.push(thRow);
    for (let key in data) {
      let row = [];
      let flagData = data[key];
      for (let i = 0; i < thRow.length; i++) {
        if (flagData[thRow[i]] !== undefined) {
          row.push(flagData[thRow[i]])
        }
        else {
          row.push('-');
        }
      }
      csvData.push(row);
    }
    console.log(csvData);
    this.setState({
      csvData
    })
  }
  callBackAfterInputFields() {
    if (this.state.fieldFlagOptions.length > 0 && this.state.recordFlagOptions.length > 0 && this.state.fieldNameOptions.length > 0) {
      this.setState({
        startDate: this.props.startDate,
        covYear: this.props.covYear,
        tradSelected: this.props.tradSelected,
        fieldFlagSelected: this.props.fieldFlagSelected,
        recordFlagSelected: this.props.recordFlagSelected,
        fieldNameSelected: this.props.fieldNameSelected,
        //summaryTableData: this.props.summaryTableData,
        summaryTableData: this.props.summaryTableData,
        tableHeaders: this.props.tableHeaders
      }, () => {
        let state = JSON.parse(JSON.stringify(this.state));
        let toFSD = reactLocalStorage.getObject('toFieldSummaryDetails');
        if (Date.now() - toFSD.time < 30000) {
          let recordFlagOptions = this.state.recordFlagOptions;
          let recordFlagSelected = [];
          recordFlagOptions.forEach((r, index) => {
            if (r.label == toFSD.flags[0]) {
              recordFlagSelected.push(index);
            }
          })
          this.props.updateRecordFlagSelected(recordFlagSelected);
          this.props.updateStartDate(moment(toFSD.startDate));
          this.props.updateCovYear(toFSD.covYear);
          this.props.updateTradSelected(toFSD.tradSelected);
          this.setState({
            recordFlagSelected,
            startDate: moment(toFSD.startDate),
            covYear: toFSD.covYear,
            tradSelected: toFSD.tradSelected
          }, () => {
            console.log(recordFlagOptions);
            console.log(recordFlagSelected);
            let state = JSON.parse(JSON.stringify(this.state));
            this.props.handleSubmit({ state });
          })
        }
        else {
          let state = JSON.parse(JSON.stringify(this.state));
          this.props.handleSubmit({ state });
        }
      });
    }
  }
  handleFlagClick(cell, e) {
    console.log(cell);
  }
  onChange(activeKey) {
    this.setState({ activeKey });
  }
  handleDateChange(date) {
    this
      .props
      .updateStartDate(date);
    this.setState({ startDate: date }, () => this.checkValidation());
  }
  onExportToCSV() {
    const selectedRows = cxt.refs.table.state.selectedRowKeys;
    console.log(selectedRows);
    console.log(cxt.state.summaryTable);
    return cxt
      .state
      .summaryTable
      .filter(d => {
        if (selectedRows.indexOf(d.flag) > -1) {
          return d;
        }
      });
  }
  handleExport() {
    const joiner = ((data, separator = ',') =>
      data.map((row, index) => row.map((element) => "\"" + element + "\"").join(separator)).join(`\n`)
    );
    const arrays2csv = ((data, headers, separator) =>
      joiner(headers ? [headers, ...data] : data, separator)
    );
    const buildURI = ((data, headers, separator) => encodeURI(
      `data:text/csv;charset=utf-8,\uFEFF${arrays2csv(data, headers, separator)}`
    )
    );
    const selectedRows = cxt.refs.table.state.selectedRowKeys;
    console.log(selectedRows);
    console.log(this.state.csvData);
    let data = this.state.csvData;
    if (selectedRows.length != this.state.csvData.length - 1 && selectedRows.length != 0) {
      data = this.state.csvData.filter((d, index) => {
        if (index == 0) return d;
        if (selectedRows.indexOf(d[0]) > -1) {
          return d;
        }
      });
    }
    const downloadLink = document.createElement("a");
    downloadLink.href = buildURI(data);
    downloadLink.download = "data.csv";
    downloadLink.click();
  }
  handleTradPartChange(selected) {
    this
      .props
      .updateTradSelected(selected);
    this.setState({ tradSelected: selected }, () => this.checkValidation());
  }
  handleCovYearChange(val) {
    console.log(val);
    this
      .props
      .updateCovYear(val.label);
    this.setState({ covYear: val.label }, () => this.checkValidation())
    //this.setState({ covYear: val.label }, () => this.checkValidation());
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
  handleFieldFlagChange(selected) {
    this
      .props
      .updateFieldFlagSelected(selected);
    this.setState({ fieldFlagSelected: selected }, () => this.checkValidation());
  }
  handleRecordFlagChange(selected) {
    this
      .props
      .updateRecordFlagSelected(selected);
    this.setState({ recordFlagSelected: selected }, () => this.checkValidation());
  }
  handleFieldNameChange(selected) {
    this
      .props
      .updateFieldNameSelected(selected);
    this.setState({ fieldNameSelected: selected }, () => this.checkValidation());
  }
  checkValidation() {
    let state = Object.assign({}, this.state);
    let pass = true;
    let errStr = [];
    // validate covYear
    if (!state.covYear || parseInt(state.covYear) !== state.covYear || String(state.covYear).indexOf('.') !== -1) {
      pass = false;
      errStr[4] = "Field Required";
    }
    // validate moment object
    const startDate = this.refs.fileRunDPicker.refs.input.defaultValue;
    if (!startDate || startDate.length !== 7) {
      pass = false;
      errStr[0] = "Field Required";
    }
    else {
      let range = moment(startDate, 'MM/YYYY').add(6, 'month');
      if (!moment(range).isSameOrAfter(moment())) {
        pass = false;
        errStr[0] = "Error : Date more than 6 months old";
      }
    }
    // validate trad partners
    if (!state.tradSelected || state.tradSelected.length < 1) {
      pass = false;
      errStr[1] = "Field Required";
    }
    // validate record flags
    if (!state.recordFlagSelected || state.recordFlagSelected.length < 1) {
      pass = false;
      errStr[3] = "Field Required";
    }
    // validate field flags
    if (!state.fieldFlagSelected || state.fieldFlagSelected.length < 1) {
      pass = false;
      errStr[2] = "Field Required";
    }
    // validate record flags
    if (!state.fieldNameSelected || state.fieldNameSelected.length < 1) {
      pass = false;
      errStr[5] = "Field Required";
    }
    this.setState({ errStr: errStr });
    return pass;
  }
  handleSubmitButton() {
    console.log('handleSubmitButton()');
    let state = Object.assign({}, this.state);
    console.log(state);
    // let pass = true;
    // let errStr = [];
    // // validate covYear
    // if (!state.covYear || parseInt(state.covYear) !== state.covYear || String(state.covYear).indexOf('.') !== -1) {
    //   pass = false;
    //   errStr[4] = "Field Required";
    // }
    // // validate moment object
    // const startDate = this.refs.fileRunDPicker.refs.input.defaultValue;
    // if (!startDate || startDate.length !== 7) {
    //   pass = false;
    //   errStr[0] = "Field Required";
    // }
    // else {
    //   let range = moment(startDate, 'MM/YYYY').add(6, 'month');
    //   if (!moment(range).isSameOrAfter(moment())) {
    //     pass = false;
    //     errStr[0] = "Error : Date more than 6 months old";
    //   }
    // }
    // // validate trad partners
    // if (!state.tradSelected || state.tradSelected.length < 1) {
    //   pass = false;
    //   errStr[1] = "Field Required";
    // }
    // // validate record flags
    // if (!state.recordFlagSelected || state.recordFlagSelected.length < 1) {
    //   pass = false;
    //   errStr[3] = "Field Required";
    // }
    // // validate field flags
    // if (!state.fieldFlagSelected || state.fieldFlagSelected.length < 1) {
    //   pass = false;
    //   errStr[2] = "Field Required";
    // }
    // // validate record flags
    // if (!state.fieldNameSelected || state.fieldNameSelected.length < 1) {
    //   pass = false;
    //   errStr[5] = "Field Required";
    // }
    let isValidForm = this.checkValidation();
    if (isValidForm) {
      this
        .props
        .handleSubmit({ state })
      this.setState({ activeKey: ['1'], showSpinner: true, showTable: false });
    }
    this.setState({ errStr });
  }
  handleResetButton() {
    this.props.resetState();
    this.setState({
      errStr: []
    }, () => {
      if (cxt.refs.fileRunDPicker.refs.input.value != cxt.state.startDate.format('MM/YYYY')) {
        cxt.refs.fileRunDPicker.refs.input.defaultValue = cxt.state.startDate.format('MM/YYYY');
        cxt.refs.fileRunDPicker.refs.input.value = cxt.state.startDate.format('MM/YYYY');
        cxt.refs.fileRunDPicker.setState({ inputValue: cxt.state.startDate.format('MM/YYYY') });;
      }
    });
  }
  handleListView() {
    this
      .props
      .history
      .push('/nebert/rcnorcniviewpage');
  }
  getItems() {
    const items = [];
    items.push(
      <Panel header={`Field Search`} key={'0'}>
        <br />
        <Row className='display'>
          <div style={{ "marginLeft": "3%" }} >
            <Column medium={3}>
              <div style={{
                "fontFamily": "Verdana, Arial, sans-serif",
                "fontSize": "0.8rem",
                "display": "inline",
                "fontWeight": "bold",
                "color": "#3498db"
              }}>
                File Run Month/Year:*
            <DatePicker
                  ref='fileRunDPicker'
                  selected={this.state.startDate}
                  onChange={this.handleDateChange}
                  dateFormat="MM/YYYY"
                  placeholderText="MM/YYYY"
                //showMonthDropdown
                //showYearDropdown
                //scrollableYearDropdown 
                />
                <span className="error date-picker-error">{this.state.errStr[0]}</span>
              </div>
            </Column>
          </div>
          <div style={{ "marginLeft": "3%", "paddingRight": "0px" }} >
            <Column medium={3} className="multi-select" >
              <label className='formLabel'
                style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db","whiteSpace":"nowrap" }}>
                Trading Partner ID:*
            <MultiSelect
                  options={this.props.tradingPartnerOptions}
                  onSelectedChanged={this.handleTradPartChange}
                  selected={this.state.tradSelected}
                  valueRenderer={this.handleMultiSelectRenderer}
                  selectAllLabel={"All"} />
                <span className="error">{this.state.errStr[1]}</span>
              </label>
            </Column>
          </div>
          <div style={{ "marginLeft": "2%" }} >
            <Column medium={1} className="record-summary-help-icon">
              <ReactHover options={recordFlagHelpHoverOptions}>
                <ReactHover.Trigger>
                  <i className="fa fa-question-circle" aria-hidden="true"></i>
                </ReactHover.Trigger>
                <ReactHover.Hover>
                  test
                </ReactHover.Hover>
              </ReactHover>
            </Column>
          </div>
          <Column medium={2} className="multi-select">
            <label className='formLabel'
              style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db" }}>
              Field Flag:*
            <MultiSelect
                options={this.state.fieldFlagOptions}
                onSelectedChanged={this.handleFieldFlagChange}
                selected={this.state.fieldFlagSelected}
                valueRenderer={this.handleMultiSelectRenderer}
                selectAllLabel={"All"} />
              <span className="error">{this.state.errStr[2]}</span>
            </label>
          </Column>
          <div style={{ "marginLeft": "2%" }} >
            <Column medium={1} className="record-summary-help-icon">
              <ReactHover options={recordFlagHelpHoverOptions}>
                <ReactHover.Trigger>
                  <i className="fa fa-question-circle" aria-hidden="true"></i>
                </ReactHover.Trigger>
                <ReactHover.Hover>
                  test
                </ReactHover.Hover>
              </ReactHover>
            </Column>
          </div>
          <Column medium={2} className="multi-select">
            <label className='formLabel'
              style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db" }}>
              Record Flag:*
            <MultiSelect
                options={this.state.recordFlagOptions}
                onSelectedChanged={this.handleRecordFlagChange}
                selected={this.state.recordFlagSelected}
                valueRenderer={this.handleMultiSelectRenderer}
                selectAllLabel={"All"} />
              <span className="error">{this.state.errStr[3]}</span>
            </label>
          </Column>
        </Row>
        <br />
        <Row>
          <div style={{ "marginLeft": "3%" }} >
            <Column medium={3} className='coverage-year'>
              <label className='formLabel'
                style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db" }}>
                Coverage Year:*
            <Select
                  value={this.state.covYear}
                  options={this.props.covYearOptions}
                  onChange={this.handleCovYearChange} />
                <span className="error">{this.state.errStr[4]}</span>
              </label>
            </Column>
          </div>
          <div style={{ "marginLeft": "3%", "paddingRight": "0px" }} >
            <Column medium={4} className="multi-select">
              <label className='formLabel'
                style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db","whiteSpace":"nowrap" }}>
                Field Name:*
            <MultiSelect
                  options={this.state.fieldNameOptions}
                  onSelectedChanged={this.handleFieldNameChange}
                  selected={this.state.fieldNameSelected}
                  valueRenderer={this.handleMultiSelectRenderer}
                  selectAllLabel={"All"} />
                <span className="error">{this.state.errStr[5]}</span>
              </label>
            </Column>
          </div>
        </Row>
        <Row>
          <div className="modal-footer">
            <div style={{ "display": "inline", "float": "right", "paddingRight": "0em", "paddingTop": "2em", "marginRight": "20px" }}>
              <button className='button primary  btn-lg btn-color formButton' type="button" onClick={this.handleResetButton}> Reset </button>
            </div>
            <div style={{ "display": "inline", "float": "right", "paddingRight": "1em", "paddingTop": "2em" }}>
              <button className='button primary  btn-lg btn-color formButton' type="button" style={{ "backgroundColor": "green" }} onClick={this.handleSubmitButton}> Submit </button>
            </div>
          </div>
        </Row>
        <Row>
          <br />
          <div className="vh150"></div>
        </Row>
        {/* <Row>
          <div className="vh200"></div>
          <Column medium={3} offsetOnMedium={9}>
            <Button color={Colors.PRIMARY} onClick={this.handleResetButton} isHollow>Reset</Button>
            &nbsp; &nbsp;
            <Button color={Colors.SUCCESS} onClick={this.handleSubmitButton}>Submit</Button>
          </Column>
          <br/>
          <div className="vh150"></div>
        </Row> */}
      </Panel>
    );
    items.push(
      <Panel header={`Search Result`} key={'1'}>
        <br />
        <div className={'field-summary-result-rf-text display-' + (this.state.recordFlagSelected.length > 0 && this.state.showTable)}> Selected Record Flags :
          {
            this.state.recordFlagSelected.map((r, index) => {
              if (this.state.recordFlagOptions.length === this.state.recordFlagSelected.length) {
                return index == 0 ? "All" : '';
              }
              else if (this.state.recordFlagOptions[r] !== undefined) {
                return this.state.recordFlagOptions[r].label + (index != this.state.recordFlagSelected.length - 1 ? ", " : "");
              }
              else {
                return '-';
              }
            })
          }
        </div>
        <div className={'display-' + !this.state.showTable}
          style={{ "textAlign": "center", "color": "darkgoldenrod", "fontWeight": "bolder", "fontStyle": "italic", "fontFamily": "serif", "fontSize": "26px" }}>
          <p className={'display-' + !this.state.showSpinner}>No Data Available for selected Range</p>
          <Spinner
            className="record-summary-spinner"
            spinnerColor={"#5dade2"}
            spinnerWidth={2}
            visible={this.state.showSpinner && !this.state.showTable} />
        </div>
        <div className={'display-' + this.state.showTable}>
          <br />
          <br />
          <BootstrapTable
            data={this.state.summaryTableData}
            height='300'
            scrollTop={'Top'}
            ref='table'
            bordered={true}
            trClassName={trClassFormat}
            className="record-summary-details-result-table"
            selectRow={this.state.selectRowProp}
            options={this.state.tableOptions}
            //keyField='flag' 
            //exportCSV
            headerStyle={{ background: '#d3ded3' }}>
            <TableHeaderColumn
              width={'100'}
              dataField='flag'
              dataFormat={flagFormatter}
              className='rsdp-table-header'
              isKey={true}
              sortFunc={flagSortFunc}
              dataSort={true}>Flag  <i className="fa fa-sort" aria-hidden="true"></i></TableHeaderColumn>
            {this
              .state
              .tableHeaders
              .map((h) => {
                //.map((h,index) => {
                return (
                  <TableHeaderColumn
                    className='rsdp-table-header'
                    dataField={h}
                    dataFormat={emptyDataFormatter}
                    width={'200'}
                    sortFunc={dynamicHeaderSortFunc}
                    dataSort={true}>{h}  <i className="fa fa-sort" aria-hidden="true"></i></TableHeaderColumn>
                )
              })
            }
          </BootstrapTable>
          <br />
          <Row>
            {/* <Column medium={1} offsetOnMedium={10}> */}
            <div className="modal-footer">
              <div
                style={{
                  "display": "inline",
                  'float': 'right',
                  'paddingRight': '0em',
                  "paddingTop": "2em",
                  "paddingLeft": "1em"
                }}>
                <button className="button primary  btn-lg btn-color formButton" onClick={this.handleExport} title="In order to export entire search results please click here without any selection"
                  style={{
                    "backgroundColor": "green",
                    'paddingTop': '0em',
                    'height': '2.5em'
                  }} >
                  Export CSV </button></div>
              <div
                style={{
                  "display": "inline",
                  "float": "right",
                  "paddingRight": "0em",
                  "paddingTop": "2em",
                  "paddingLeft": "1em"
                }}>
                <button className='button primary  btn-lg btn-color formButton' type="button">
                  Compare
                </button>
              </div>
              <div
                style={{
                  "display": "inline",
                  "float": "right",
                  "paddingRight": "0em",
                  "paddingTop": "2em"
                }}>
                <button
                  className='button primary  btn-lg btn-color formButton' type="button"
                  onClick={this.handleListView}
                  style={{
                    // "backgroundColor": "#9E9E9E",
                    'paddingTop': '0em',
                    'height': '2.5em',
                  }}>
                  List View
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
      <div>
        <div>
          <Collapse
            accordion={this.state.accordion}
            onChange={this.onChange}
            activeKey={this.state.activeKey}>
            {this.getItems()}
          </Collapse>
        </div>
      </div>
    );
  }
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.startDate, nextProps.startDate)) {
      console.log("changing date");
      this.setState({ startDate: nextProps.startDate });
      if (cxt.refs.fileRunDPicker) {
        cxt
          .refs
          .fileRunDPicker
          .setState({
            open: false
          }, () => {
            console.log(cxt.refs.fileRunDPicker.state);
          });
      }
    }
    if (!isEqual(this.props.covYear, nextProps.covYear)) {
      this.setState({ covYear: nextProps.covYear });
    }
    if (!isEqual(this.props.tradSelected, nextProps.tradSelected)) {
      this.setState({ tradSelected: nextProps.tradSelected });
    }
    if (!isEqual(this.props.fieldFlagSelected, nextProps.fieldFlagSelected)) {
      this.setState({ fieldFlagSelected: nextProps.fieldFlagSelected });
    }
    if (!isEqual(this.props.recordFlagSelected, nextProps.recordFlagSelected)) {
      this.setState({ recordFlagSelected: nextProps.recordFlagSelected });
    }
    if (!isEqual(this.props.fieldNameSelected, nextProps.fieldNameSelected)) {
      this.setState({ fieldNameSelected: nextProps.fieldNameSelected });
    }
    if (!isEqual(this.props.tableHeaders, nextProps.tableHeaders)) {
      this.setState({ tableHeaders: nextProps.tableHeaders });
    }
    if (!isEqual(this.props.summaryTableData, nextProps.summaryTableData)) {
      this.setState({ summaryTableData: nextProps.summaryTableData });
    }
    if (this.state.fieldNameOptions.length == 0 && nextProps.fieldNameOptions.length > 0) {
      this.setState({ fieldNameOptions: nextProps.fieldNameOptions }, () => {
        this.callBackAfterInputFields();
      });
    }
    if (this.state.recordFlagOptions.length == 0 && nextProps.recordFlagOptions.length > 0) {
      this.setState({ recordFlagOptions: nextProps.recordFlagOptions }, () => {
        this.callBackAfterInputFields();
      });
    }
    if (this.state.fieldFlagOptions.length == 0 && nextProps.fieldFlagOptions.length > 0) {
      this.setState({ fieldFlagOptions: nextProps.fieldFlagOptions }, () => {
        this.callBackAfterInputFields();
      });
    }
    if (this.state.lastDataReceived < nextProps.lastDataReceived) {
      if (nextProps.summaryTable.responseMap == undefined || Object.keys(nextProps.summaryTable.responseMap).length === 0) {
        console.log("No Table Data");
        this.setState({ showSpinner: false, showTable: false, lastDataReceived: nextProps.lastDataReceived })
      } else {
        let tableData = nextProps.summaryTable;
        let tableHeaders = tableData.headerSet;
        let summaryTableData = [];
        let rMap = tableData.responseMap;
        let fTotal = {};
        let total = tableData.total;
        console.log("check total data", total)


        // for (let key in total) {
        //   let tempKey = key.replace("Total ", "");
        //   fTotal[tempKey] = total[key];
        // }
        for (var i = 0; i < total.length; i++) {
          for (let key in total[i]) {
            let tempKey = key.replace("Total ", "");
            fTotal[tempKey] = total[i][key];
          }
        }
        rMap['Total'] = fTotal;
        //debugger;
        console.log("rmap " + JSON.stringify(rMap));
        for (let key in rMap) {
          let row = {
            flag: key
          };
          let rowData = rMap[key];
          for (let i in rowData) {
            row[i] = rowData[i];
          }
          summaryTableData.push(row);
        }
        console.log("summary" + JSON.stringify(summaryTableData));
        console.log("componentDidMount()");
        // if (initialState === undefined) {
        this.parseTableDataToCSV(tableHeaders, summaryTableData);
        this.setState({
          showSpinner: false,
          showTable: true,
          lastDataReceived: nextProps.lastDataReceived
        }, () => {
          this.props.updateTableData(summaryTableData);
          this.props.updateTableHeaders(tableHeaders);
          this.setState({ tableHeaders, summaryTableData })
        })
      }
    }
  }
  componentDidMount() {
    //   initialState = {
    //     covYear: JSON.parse(JSON.stringify(this.state.covYear)),
    //     tradSelected: JSON.parse(JSON.stringify(this.state.tradSelected)),
    //     fieldFlagSelected: JSON.parse(JSON.stringify(this.state.fieldFlagSelected)),
    //     recordFlagSelected: JSON.parse(JSON.stringify(this.state.recordFlagSelected)),
    //     fieldNameSelected: JSON.parse(JSON.stringify(this.state.fieldNameSelected))
    //   };
    //   console.log(initialState);
    // }
  }
}




FieldSummaryDetailPageData.propTypes = {};
//export default FieldSummaryDetailPageData;
const mapStateToProps = (state) => {
  return {
    startDate: state.fsdStartDate,
    covYear: state.fsdCovYear,
    tradSelected: state.fsdTradSelected,
    fieldFlagSelected: state.fsdFieldFlagSelected,
    recordFlagSelected: state.fsdRecordFlagSelected,
    fieldNameSelected: state.fsdFieldNameSelected,
    summaryTableData: state.fsdTableData,
    tableHeaders: state.fsdTableHeaders
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateStartDate: (startDate) => dispatch(updateFSDStartDate(startDate)),
    updateCovYear: (covYear) => dispatch(updateFSDCovYear(covYear)),
    updateTradSelected: (tradSelected) => dispatch(updateFSDTradSelected(tradSelected)),
    updateFieldFlagSelected: (fieldFlagSelected) => dispatch(updateFSDFieldFlagSelected(fieldFlagSelected)),
    updateFieldNameSelected: (fieldNameSelected) => dispatch(updateFSDFieldNameSelected(fieldNameSelected)),
    updateRecordFlagSelected: (recordFlagSelected) => dispatch(updateFSDRecordFlagSelected(recordFlagSelected)),
    resetState: () => dispatch(resetFSDState()),
    updateTableData: (data) => dispatch(updateFSDTableData(data)),
    updateTableHeaders: (data) => dispatch(updateFSDTableHeaders(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FieldSummaryDetailPageData));


