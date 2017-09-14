import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Column, Grid, Button } from 'react-foundation'
import { countsFetchData } from '../actions/dashboardActions';
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
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import CapsuleBarChart from './CapsuleBarChart';
import ReactDOM from 'react-dom';
import Spinner from 'react-spinner-material';
import ReactHover from 'react-hover';
//import RecordFlagsHelp from '.test
import { updateRSDStartDate, updateRSDCovYear, resetRSDState, updateRSDTradSelected, updateRSDCheckBoxFlags, updateRSDSelectAllCheckBox, updateRSDTableData } from '../actions/recordSummaryDetailsActions';
import isEqual from 'lodash.isequal';
import { withRouter } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage'; 
const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true
};
// const Colors = {   PRIMARY: 'primary',   SUCCESS: 'success' }
let initialState = undefined;
let cxt;
let bsTable;
const recordFlagHelpHoverOptions = {
  followCursor: false
}
function countSortFunc(a, b, order) { // order is desc or asc
  if (order === 'desc') {
    if (a.flag == '-') {
      return 1;
    } else if (b.flag == '-') {
      return -1;
    }
    console.log(a.flag + " " + b.flag);
    return parseInt(a.count) - parseInt(b.count);
  } else {
    if (a.flag == '-') {
      return 1;
    } else if (b.flag == '-') {
      return -1;
    }
    return parseInt(b.count) - parseInt(a.count);
  }
}
function percSortFunc(a, b, order) { // order is desc or asc
  if (order === 'desc') {
    if (a.flag == '-')
      return 1;
    else if (b.flag == '-')
      return -1;
    return parseFloat(a.percentage.slice(0, -1)) - parseFloat(b.percentage.slice(0, -1));
  } else {
    if (a.flag == '-')
      return 1;
    else if (b.flag == '-')
      return -1;
    return parseFloat(b.percentage.slice(0, -1)) - parseFloat(a.percentage.slice(0, -1));
  }
}
function flagSortFunc(a, b, order) { // order is desc or asc
  let x = a.flag == '-' ? (order === 'desc' ? 1000 : -1000) : a.flag.charCodeAt(0);
  let y = b.flag == '-' ? (order === 'desc' ? 1000 : -1000) : b.flag.charCodeAt(0);
  if (order === 'desc') {
    return x - y;
  } else {
    return y - x;
  }
}
function flagFormatter(cell, row) {
  if (cell == "-") {
    return "";
  }
  return `${cell}`;
}
function trClassFormat(row, rIndex) {
  return row.flag == '-'
    ? 'grand-total-highlight' : '';
  // ? 'grand-total-highlight reactTablefontSize'
  // : 'reactTablefontSize';
}
class RecordSummaryDetailsData extends Component {
  constructor(props) {
    super(props);
    console.log(isEqual);
    cxt = this;
    this.state = this.getInitialState();
    // ['getItems', 'onChange', 'handleDateChange', 'handleCheckBoxChange',
    // 'handleTradPartChange', 'handleCovYearChange', 'handleMultiSelectRenderer',
    // 'handleSubmitButton', 'handleResetButton'].map(fn => this[fn] =
    // this[fn].bind(this));
    [
      'getItems',
      'onChange',
      'handleDateChange',
      'handleCheckBoxChange',
      'handleTradPartChange',
      'handleCovYearChange',
      'handleMultiSelectRenderer',
      'handleSubmitButton',
      'handleResetButton',
      'getCapsuleGraphData',
      'onTableRowSelect',
      'handleExport',
      'handleSelectAllCheckBox',
      'handleTableDataChange',
      'handleCapsuleChartFlagClick',
      'checkValidation'
    ].map(fn => this[fn] = this[fn].bind(this));
    window.praveen = this;
  }
  handleCapsuleChartFlagClick(flag) {
    console.log(flag);
    reactLocalStorage.setObject('toFieldSummaryDetails', {
      'time': Date.now(),
      'flags': [flag],
      'startDate': this.state.startDate,
      'tradSelected': this.state.tradSelected,
      'covYear': this.state.covYear
    });
    this
      .props
      .history
      .push('/nebert/fieldsummarydetails');
  }
  getInitialState() {
    // let tableRowSelected = ['A', 'B', 'D', 'E'];
    return {
      accordion: true,
      checkBoxFlags: this.props.checkBoxFlags,
      tradSelected: [],
      activeKey: ['1'],
      chartData: this.getCapsuleGraphData(this.props.summaryTableData),
      selectRowProp: {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: this.onTableRowSelect,
        selected: []
      },
      tableOptions: {
        onExportToCSV: this.onExportToCSV,
        defaultSortName: 'flag'
      },
      summaryTableData: this.props.summaryTableData,
      showTable: false,
      showSpinner: true,
      lastDataReceived: this.props.lastDataReceived,
      errStr: [],
      tableDataChanged: false
    };
  }
  onChange(activeKey) {
    this.setState({ activeKey });
  }
  handleTableDataChange(data) {
    this.setState({
      tableDataChanged: true
    }, () => {
      console.log(data);
      this.props.updateTableData(data);
    })
  }
  handleDateChange(date) {
    this
      .props
      .updateStartDate(date);
    this.setState({ startDate: date }, () => this.checkValidation());
    //this.setState({startDate: date});
  }
  onExportToCSV() {
    const selectedRows = cxt.refs.table.state.selectedRowKeys;
    if (selectedRows.length == 0) {
      return cxt
        .state
        .summaryTableData
    }
    console.log(selectedRows);
    console.log(cxt.state.summaryTableData);
    return cxt
      .state
      .summaryTableData
      .filter(d => {
        if (selectedRows.indexOf(d.flag) > -1) {
          return d;
        }
      });
  }
  handleExport() {
    this
      .refs
      .table
      .handleExportCSV();
  }
  onTableRowSelect(row, isSelected, e) { }
  getCapsuleGraphData(data) {
    let chartData = [];
    data.forEach((d) => {
      let item = {
        label: d.flag,
        weight: parseInt(d.count)
      }
      chartData.push(item);
    })
    //console.log(this.state.checkBoxFlags);
    chartData.pop();
    console.log(chartData);
    return chartData;
  }
  handleCheckBoxChange(e) {
    let checkBoxFlags = JSON.parse(JSON.stringify(this.state.checkBoxFlags));
    let checked = 0;
    this
      .props
      .recordFlags
      .forEach((f, index) => {
        if (f.value == e.target.name) {
          checkBoxFlags[index] = e.target.checked;
        }
        if (checkBoxFlags[index] === true) {
          checked++;
        }
      });
    let selectAllCheckBox = this.state.selectAllCheckBox;
    if (this.state.selectAllCheckBox && checked !== checkBoxFlags.length) {
      selectAllCheckBox = false;
    }
    if (!this.state.selectAllCheckBox && checked === checkBoxFlags.length) {
      selectAllCheckBox = true;
    }
    this.props.updateCheckBoxFlags(checkBoxFlags);
    this.props.updateSelectAllCheckBox(selectAllCheckBox);
    //this.setState({checkBoxFlags, selectAllCheckBox});
  }
  handleSelectAllCheckBox(e) {
    let checkBoxFlags = this.state.checkBoxFlags;
    checkBoxFlags = checkBoxFlags.map((k) => {
      return e.target.checked;
    })
    this.props.updateCheckBoxFlags(checkBoxFlags);
    this.props.updateSelectAllCheckBox(e.target.checked);
    //this.setState({checkBoxFlags, selectAllCheckBox: e.target.checked})
  }
  handleTradPartChange(selected) {
    this
      .props
      .updateTradSelected(selected);
    this.setState({ tradSelected: selected }, () => this.checkValidation());
    //this.setState({tradSelected: selected});
  }
  handleCovYearChange(val) {
    this
      .props
      .updateCovYear(val.label);
    this.setState({ covYear: val.label }, () => this.checkValidation())
    //this.setState({covYear: val.label});
  }
  handleMultiSelectRenderer(selected, options) {
    if (selected.length === 0) {
      return "Select Partners";
    }
    if (selected.length === options.length) {
      return "All";
    }
    return `Selected (${selected.length})`;
  }
  checkValidation() {
    let state = Object.assign({}, this.state);
    let pass = true;
    let errStr = [];
    // validate covYear
    console.log(state.covYear);
    if (!state.covYear || parseInt(state.covYear) !== state.covYear || String(state.covYear).indexOf('.') !== -1) {
      console.log("dummy");
      pass = false;
      errStr[2] = "Field Required";
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
    // if (!state.recordFlagSelected || state.recordFlagSelected.length < 1) {
    //   pass = false;
    //   errStr[3] = "Field Required";
    // }
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
    //   console.log(String(state.covYear).indexOf('.') + "  " + parseInt(state.covYear) !== state.covYear + " " + typeof (state.covYear));
    //   pass = false;
    //   // errStr += " No Coverage Year selected";
    //   errStr[2] = "Field Required";
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
    //   console.log(state.tradSelected + " " + state.tradSelected.length);
    //   pass = false;
    //   errStr[1] = "Field Required";
    // }
    // if (state.checkBoxFlags) {
    //   let found = false;
    //   for (let i = 0; i < state.checkBoxFlags.length; i++) {
    //     if (state.checkBoxFlags[i] === true) {
    //       found = true;
    //     }
    //   }
    //   if (!found) {
    //     pass = false;
    //     errStr[3] = "Field Required";
    //   }
    // } else {
    //   pass = false;
    //   errStr[3] = "Field Required";
    // }
    // if (pass) {
    //   errStr = '';
    //   this.setState({
    //     tableDataChanged : false
    //   });
    let isValidForm = this.checkValidation();
    if (isValidForm) {
      this
        .props
        .handleSubmit({ state }, this.handleTableDataChange)
      this.setState({ activeKey: ['1'], showSpinner: true, showTable: false });
    }
    this.setState({ errStr })
  }
  handleResetButton() {
    console.log(initialState);
    this
      .props
      .resetState();
    this.setState({
      errStr: []
    }, () => {
      if (cxt.refs.fileRunDPicker.refs.input.value != cxt.state.startDate.format('MM/YYYY')) {
        cxt.refs.fileRunDPicker.refs.input.defaultValue = cxt.state.startDate.format('MM/YYYY');
        cxt.refs.fileRunDPicker.refs.input.value = cxt.state.startDate.format('MM/YYYY');
        cxt.refs.fileRunDPicker.setState({ inputValue: cxt.state.startDate.format('MM/YYYY') });
        errStr: []
      }
    });
  }
  getItems() {
    const items = [];
    items.push(
      <Panel header={`Record Search`} key={'0'}>
        <Row className='display'>
          <div style={{ "marginLeft": "5%" }} >
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
          <Column
            medium={3}
            className="multi-select"
            style={{
              "marginLeft": "5%",
              "paddingRight": "0px"
            }}>
            <label
              className='formLabel'
              style={{
                "display": "inline",
                "fontWeight": "bold",
                "color": "#3498db"
              }}>
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
          <Column
            medium={3}
            className='coverage-year'
            style={{
              "marginLeft": "5%"
            }}>
            <label
              className='formLabel'
              style={{
                "display": "inline",
                "fontWeight": "bold",
                "color": "#3498db"
              }}>
              Coverage Year:*
              <Select
                value={this.state.covYear}
                options={this.props.covYearOptions}
                onChange={this.handleCovYearChange} />
              <span className="error">{this.state.errStr[2]}</span>
            </label>
          </Column>
        </Row>
        <br /> {/* <br /> */}
        <Row>
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
          <Column medium={4}>
            <label
              className='formLabel'
              style={{
                "display": "inline",
                "fontWeight": "bold",
                "color": "#3498db"
              }}>
              Record Flag:
            </label>
          </Column>
        </Row>
        <br />
        <Row>
          <Column medium={1}>
            <label>
              <Checkbox
                checked={this.state.selectAllCheckBox}
                name='All'
                onChange={this.handleSelectAllCheckBox} />&nbsp; {'All'}
            </label>
            &nbsp;&nbsp;
          </Column>
          {this
            .props
            .recordFlags
            .map((a, key) => {
              if (key > 6) {
                return ' ';
              }
              let ret = (
                <Column medium={1}>
                  <label>
                    <Checkbox
                      key={key}
                      checked={this.state.checkBoxFlags[key]}
                      name={a.value}
                      onChange={this.handleCheckBoxChange} />&nbsp; {a.value}
                  </label>
                  &nbsp;&nbsp;
                </Column>
              );
              return ret;
            })
          }
        </Row>
        <Row>
          {this
            .props
            .recordFlags
            .map((a, key) => {
              if (key < 7) {
                return ' ';
              }
              let ret = (
                <Column medium={1}>
                  <label>
                    <Checkbox
                      key={key}
                      checked={this.state.checkBoxFlags[key]}
                      name={a.value}
                      onChange={this.handleCheckBoxChange} />&nbsp; {a.value}
                  </label>
                  &nbsp;&nbsp;
                </Column>
              );
              return ret;
            })
          }
        </Row>
        <Row>
          <Column medium={12}>
            <span className="error">{this.state.errStr[3]}</span>
          </Column>
        </Row>
        <Row>
          <div className="modal-footer">
            <div
              style={{
                "display": "inline",
                "float": "right",
                "paddingRight": "0em",
                "paddingTop": "2em"
              }}>
              <button
                className='button primary  btn-lg btn-color formButton'
                type="button"
                onClick={this.handleResetButton}>
                Reset
              </button>
            </div>
            <div
              style={{
                "display": "inline",
                "float": "right",
                "paddingRight": "1em",
                "paddingTop": "2em"
              }}>
              <button
                className='button primary  btn-lg btn-color formButton'
                type="button"
                style={{
                  "backgroundColor": "green"
                }}
                onClick={this.handleSubmitButton}>
                Submit
              </button>
            </div>
          </div>
          {/*<Column medium={3} offsetOnMedium={9}>
            <Button color={Colors.PRIMARY} onClick={this.handleResetButton} isHollow>Reset</Button>
            &nbsp; &nbsp;
            <Button color={Colors.SUCCESS} onClick={this.handleSubmitButton}>Submit</Button>
          </Column>*/}
        </Row>
      </Panel>
    );
    items.push(
      <Panel header={`Search Results`} key={'1'}>
        <div
          className={'display-' + !this.state.showTable}
          style={{
            "textAlign": "center",
            "color": "darkgoldenrod",
            "fontWeight": "bolder",
            "fontStyle": "italic",
            "fontFamily": "serif",
            "fontSize": "26px"
          }}>
          <p className={'display-' + !this.state.showSpinner}>No Data Available for selected Range</p>
          <Spinner
            className="record-summary-spinner"
            spinnerColor={"#5dade2"}
            spinnerWidth={2}
            visible={this.state.showSpinner && !this.state.showTable} />
        </div>
        <div className={'display-' + this.state.showTable}>
          <br />
          <label
            className='formLabel'
            style={{
              "display": "inline",
              "fontWeight": "bold",
              "color": "#076baf",
              "fontSize": "1.0rem"
            }}>
            Flag Distribution:
          </label>
          <Row>
            <Column medium={12}>
              <CapsuleBarChart chartData={this.state.chartData} flagClick={this.handleCapsuleChartFlagClick} />
            </Column>
          </Row>
          <br /><br />
          <BootstrapTable
            data={this.state.summaryTableData}
            className="record-summary-details-result-table"
            //style={{"fontSize":"15px","color":"black","fontFamily":"verdana, san-serif"}}
            trClassName={trClassFormat}
            // trClassName='reactTablefontSize'
            height='200'
            scrollTop={'Top'}
            ref='table'
            bordered={true}
            selectRow={this.state.selectRowProp}
            options={this.state.tableOptions}
            headerStyle={{ background: '#d3ded3' }}>
            <TableHeaderColumn width={'400'} dataField='flagDescription'>Flag Description</TableHeaderColumn>
            <TableHeaderColumn
              dataField='flag'
              dataFormat={flagFormatter}
              sortFunc={flagSortFunc}
              isKey={true}
              className="table-count-sortable"
              dataSort={true}>Flag
              <i className="fa fa-sort" aria-hidden="true"></i>
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField='count'
              className="table-count-sortable"
              sortFunc={countSortFunc}
              dataSort={true}>Count
              <i className="fa fa-sort" aria-hidden="true"></i>
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField='percentage'
              className="table-count-sortable"
              dataSort={true}
              sortFunc={percSortFunc}>Percentage
              <i className="fa fa-sort" aria-hidden="true"></i>
            </TableHeaderColumn>
          </BootstrapTable>
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
                <button
                  className="button primary  btn-lg btn-color formButton"
                  style={{
                    "backgroundColor": "green",
                    'paddingTop': '0em',
                    'height': '2.5em',
                    'marginRight': '20px'
                  }}
                  onClick={this.handleExport} title="In order to export entire search results please click here without any selection">Export To Excel
                </button>
              </div>
              <div
                style={{
                  "display": "inline",
                  "float": "right",
                  "paddingRight": "0em",
                  "paddingTop": "2em"
                }}>
                <button className='button primary  btn-lg btn-color formButton' type="button">
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
    const accordion = this.state.accordion;
    const activeKey = this.state.activeKey;
    return (
      <div>
        <div>
          <Collapse accordion={accordion} onChange={this.onChange} activeKey={activeKey}>
            {this.getItems()}
          </Collapse>
        </div>
      </div>
    );
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    if (!isEqual(this.props.startDate, nextProps.startDate)) {
      console.log("changing date");
      this.setState({ startDate: nextProps.startDate });
      cxt
        .refs
        .fileRunDPicker
        .setState({
          open: false
        }, () => {
          cxt.refs.fileRunDPicker.setOpen(0);
          console.log(cxt.refs.fileRunDPicker.state);
        });
    }
    if (!isEqual(this.props.covYear, nextProps.covYear)) {
      this.setState({ covYear: nextProps.covYear });
    }
    if (!isEqual(this.props.tradSelected, nextProps.tradSelected)) {
      console.log("TradeSelected Changed");
      this.setState({ tradSelected: nextProps.tradSelected });
    }
    if (!isEqual(this.props.selectAllCheckBox, nextProps.selectAllCheckBox)) {
      this.setState({ selectAllCheckBox: nextProps.selectAllCheckBox });
    }
    if (!isEqual(this.props.checkBoxFlags, nextProps.checkBoxFlags)) {
      console.log("update checkBoxes");
      this.setState({ checkBoxFlags: nextProps.checkBoxFlags });
    }
    if (!isEqual(this.props.summaryTableData, nextProps.summaryTableData) || this.state.tableDataChanged) {
      this.setState({ showSpinner: false, tableDataChanged: false });
      if (nextProps.summaryTableData.length < 2) {
        this.setState({ showTable: false });
      }
      else {
        let selectRowProp = this.state.selectRowProp;
        let selected = [];
        //-----To select all checkbox in table by default-----
        // nextProps
        //   .summaryTableData
        //   .forEach((t) => {
        //     if (t.flag && t.flag !== "") {
        //       selected.push(t.flag);
        //     }
        //   })
        console.log(selected);
        selectRowProp.selected = selected;
        this.setState({
          // showTable: true
          selectRowProp,
        }, () => {
          this.setState({
            showTable: true
          }, () => {
            this.setState({
              summaryTableData: nextProps.summaryTableData,
              chartData: this.getCapsuleGraphData(nextProps.summaryTableData)
            })
          })
        })
      }
    }
  }
  componentDidMount() {
    console.log("componentDidMount()");
    this.setState({
      startDate: this.props.startDate,
      covYear: this.props.covYear,
      tradSelected: this.props.tradSelected,
      checkBoxFlags: this.props.checkBoxFlags,
      selectAllCheckBox: this.props.selectAllCheckBox,
      chartData: this.getCapsuleGraphData(this.props.summaryTableData),
      summaryTableData: this.props.summaryTableData,
    }, () => {
      let state = JSON.parse(JSON.stringify(this.state));
      if (this.state.showSpinner == true && this.state.summaryTableData.length > 0) {
        this.setState({
          showSpinner: false,
          showTable: true
        })
      }
      this
        .props
        .handleSubmit({ state }, this.handleTableDataChange);
      console.log(this.state);
    })
  }
}
RecordSummaryDetailsData.propTypes = {};
const mapStateToProps = (state) => {
  return {
      startDate: state.rsdStartDate,
      covYear: state.rsdCovYear, 
      tradSelected: state.rsdTradSelected, 
      selectAllCheckBox: state.rsdSelectAllCheckBox, 
      checkBoxFlags: state.rsdCheckBoxFlags, 
      summaryTableData: state.rsdTableData 
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateStartDate: (startDate) => dispatch(updateRSDStartDate(startDate)),
    updateCovYear: (covYear) => dispatch(updateRSDCovYear(covYear)),
    updateTradSelected: (tradSelected) => dispatch(updateRSDTradSelected(tradSelected)),
    updateSelectAllCheckBox: (selectAllCheckBox) => dispatch(updateRSDSelectAllCheckBox(selectAllCheckBox)),
    updateCheckBoxFlags: (checkBoxFlags) => dispatch(updateRSDCheckBoxFlags(checkBoxFlags)),
    resetState: () => dispatch(resetRSDState()),
    updateTableData: (data) => dispatch(updateRSDTableData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RecordSummaryDetailsData));


