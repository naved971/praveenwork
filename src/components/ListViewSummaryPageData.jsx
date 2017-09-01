import React, { Component } from 'react';
import _ from 'lodash'


import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Column, Grid, Button } from 'react-foundation'
import { connect } from 'react-redux';
import '../nebert/css/rc-collapse.css';
import Collapse, { Panel } from 'rc-collapse';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-checkbox/assets/index.css';
import Checkbox from 'rc-checkbox'
import Select,{Async}  from 'react-select';
import 'react-select/dist/react-select.css';
import MultiSelect from '@khanacademy/react-multi-select';
import ReactDOM from 'react-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Spinner from 'react-spinner-material';
import ReactHover from 'react-hover'
// import FieldFlagsHelp from './FieldFlagsHelp'
// import RecordFlagsFeildSummaryHelp from './RecordFlagsFeildSummaryHelp'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
const styles = {
  tabs: {
    width: '100%',
    display: 'inline-block',
    marginRight: '30px',
    verticalAlign: 'top'
  },
  links: {
    margin: '0 auto',
    padding: '0 10em'
  },
  tabLink: {
    height: '30px',
    lineHeight: '30px',
    padding: '0 15px',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
    display: 'inline-block'
  },
  tabContent: {
    width: '100%'
  },
  activeLinkStyle: {
    borderBottom: '2px solid #333'
  },
  visibleTabStyle: {
    display: 'inline-block'
  },
  content: {
    width: '100%',
    padding: '1em'
  }
};

var isSearchable = false;
var isClearable =false;

let advFields = {};
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
    if (a.flag == '-')
      return 1;
    else if (b.flag == '-')
      return -1;
    return parseFloat(a1) - parseFloat(b1);
  } else {
    if (a.flag == '-')
      return 1;
    else if (b.flag == '-')
      return -1;
    return parseFloat(b1) - parseFloat(a1);
  }
}
function flagSortFunc(a, b, order) { // order is desc or asc
  if (order === 'desc') {
    if (a.flag == '-')
      return 1;
    else if (b.flag == '-')
      return -1;
    return a.flag > b.flag;
  } else {
    if (a.flag == '-')
      return 1;
    else if (b.flag == '-')
      return -1;
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
  return row.flag == '-'
    ? 'grand-total-highlight'
    : '';
}
//https://jsfiddle.net/mayankshukla5031/qq7qv8es/
class ListViewSummaryPageData extends Component {
  constructor(props) {
    super(props);
    cxt = this;

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
      'handleAdvSearch',
      "addAdvRows",
      'handleAdvFieldNameChange',

      'handleSelectedTab',


      "handleChange", "addClick", "removeClick","checkValidation"

    ].map(fn => this[fn] = this[fn].bind(this));
    //this.addAdvRows();
  }

  getInitialState() {
    let selectedTab = { currentIndex: 0, TabName: "RCNO" };
    let TabName = selectedTab.TabName;
    let initialState= {
      accordion: true,
      activeKey: ['1'],
            // startDate: moment(),
      startDate:{[TabName] : moment().subtract(1, 'month')}
      ,
      RCNI_DOB:null,
      RCNO_DOB:null,

      //{ [selectedTab.TabName]:moment() },
      covYear:{ [TabName]:   this.props.defaultCovYear  },
      tradSelected:{
        [TabName]:  this.props.defaultTradingPartners
      },
      fieldFlagSelected: {
        [TabName]:  this.props.defaultFieldFlags
      },

      recordFlagSelected:{
        [TabName]:  this.props.defaultRecordFlags
      },
      fieldNameSelected:{
        [TabName]:  this.props.defaultFieldNames

      },
      fieldNameOptions: this.props.fieldNameOptions,
      fieldNameAvdCustomOptions: this.props.fieldNameAvdCustomOptions,
      recordFlagOptions: this.props.recordFlagOptions,
      fieldFlagOptions: this.props.fieldFlagOptions,
      advCustomFiltersRows:  {
        [TabName]: []

      },

      fieldAvdNameSelected: {
        [TabName]:{ value: [ { field:{ label:"", value:""} , fieldValue:"" } ], count: 1}
      },
      selectedTab: selectedTab,
      advFields: {
        [TabName]: {}
      },
      selectRowProp: {
        mode: 'checkbox',
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
      errStr: {
        [TabName]:[]

      }
    };

    return initialState;
  }
  onChange(activeKey) {
    this.setState({ activeKey });
  }
  handleDateChange(date) {
    let TabName = this.state.selectedTab.TabName;
    this.state.startDate[TabName]= date;
    this.setState({ startDate:  this.state.startDate },()=> this.checkValidation()  );
  }

  handleChange(i, event) {

    let TabName = this.state.selectedTab.TabName;
    this.state.fieldAvdNameSelected[TabName].value[i].fieldValue = event.target.value;
    this.setState({fieldAvdNameSelected: this.state.fieldAvdNameSelected});
 }


  addClick(){
        let TabName = this.state.selectedTab.TabName;
    this.state.fieldAvdNameSelected[TabName].count= this.state.fieldAvdNameSelected[TabName].count+1
    this.setState({fieldAvdNameSelected: this.state.fieldAvdNameSelected});
  }
  removeClick(i){
        let TabName = this.state.selectedTab.TabName;

          this.state.fieldAvdNameSelected[TabName].value.splice(i,1)
          this.state.fieldAvdNameSelected[TabName].count= this.state.fieldAvdNameSelected[TabName].count - 1,
          this.setState({fieldAvdNameSelected: this.state.fieldAvdNameSelected})
    }



  onExportToCSV() {
    const selectedRows = cxt.refs.table.state.selectedRowKeys;
    //console.log(selectedRows);
    //console.log(cxt.state.summaryTable);
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
    this
      .refs
      .table
      .handleExportCSV();
  }
  handleTradPartChange(selected) {

    this.state.tradSelected[this.state.selectedTab.TabName]= selected;
    this.setState({ tradSelected:   this.state.tradSelected },()=> this.checkValidation() );
  }
  handleCovYearChange(val) {
    let TabName = this.state.selectedTab.TabName;
        this.state.covYear[TabName] = val.label || null;
    this.setState({ covYear:  this.state.covYear },()=> this.checkValidation());
  }
  handleAdvSearch(e, date) {

    if (typeof e == "string") {
      this.state.advFields[this.state.selectedTab.TabName][e] = moment(date).format('YYYY');
    } else {
      ///advFields[this.state.selectedTab.TabName] ={};
      this.state.advFields[this.state.selectedTab.TabName][e.target.name] = e.target.value;
    }
    this.setState({ advFields: this.state.advFields });

  }
  handleDOBChange(e,date){
    let Tabname = this.state.selectedTab.TabName;

      // var Obj = { };
      // if(Tabname=="RCNO"){
      //   Obj.RCNO_DOB =  moment(date).format('YYYY/MM/DD');


      // }
      //  if(Tabname=="RCNI"){
      //   Obj.RCNI_DOB =  moment(date).format('YYYY/MM/DD');
      // }
      this.setState({ [e] :moment(date).format('YYYY/MM/DD') });
      }



  handleAdvFieldNameChange(inputFields, i,selected={ label:"", value:""}) {
    let TabName = this.state.selectedTab.TabName;
      if(this.state.fieldAvdNameSelected[TabName].value[i] == undefined){
          this.state.fieldAvdNameSelected[TabName].value[i]={ field:selected, fieldValue:"" }
      }else{
        this.state.fieldAvdNameSelected[TabName].value[i].field= selected ;
      }



    this.setState({ fieldAvdNameSelected: this.state.fieldAvdNameSelected });
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
    this.state.fieldFlagSelected[this.state.selectedTab.TabName]= selected;

    this.setState({ fieldFlagSelected: this.state.fieldFlagSelected },()=> this.checkValidation());
  }
  handleRecordFlagChange(selected) {
    this.state.recordFlagSelected[this.state.selectedTab.TabName]= selected;
    this.setState({ recordFlagSelected:  this.state.recordFlagSelected },()=> this.checkValidation());
  }
  handleFieldNameChange(selected) {
    this.state.fieldNameSelected[this.state.selectedTab.TabName]= selected;
    this.setState({ fieldNameSelected:  this.state.fieldNameSelected },()=> this.checkValidation());
  }

  handleSelectedTab(selectedTab) {

      if (this.state.advCustomFiltersRows[selectedTab.TabName] == undefined) {
        this.state.advCustomFiltersRows[selectedTab.TabName]=[];
        this.setState({ advCustomFiltersRows: this.state.advCustomFiltersRows });

      }
      if (this.state.errStr[selectedTab.TabName] == undefined) {
        this.state.errStr[selectedTab.TabName]={[selectedTab.TabName]:[] }
        this.setState({ errStr: this.state.errStr });

      }







    if (this.state.advFields[selectedTab.TabName] == undefined) {
      this.state.advFields[selectedTab.TabName] = {};
      this.setState({ advFields: this.state.advFields });
    }
    if (this.state.fieldAvdNameSelected[selectedTab.TabName] == undefined) {

      this.state.fieldAvdNameSelected[selectedTab.TabName] ={ value: [ { field:{}, fieldValue:"" } ], count: 1};
      this.setState({fieldAvdNameSelected:this.state.fieldAvdNameSelected });
      //this.setState({ fieldAvdNameSelected: this.state.fieldAvdNameSelected });
    }




    if (this.state.tradSelected[selectedTab.TabName] == undefined) {
      this.state.tradSelected[selectedTab.TabName] =  this.props.defaultTradingPartners;
      this.setState({ tradSelected: this.state.tradSelected });
    }
    if (this.state.fieldFlagSelected[selectedTab.TabName] == undefined) {
      this.state.fieldFlagSelected[selectedTab.TabName] =this.props.defaultFieldFlags;
      this.setState({ fieldFlagSelected: this.state.fieldFlagSelected });
    }
    if (this.state.recordFlagSelected[selectedTab.TabName] == undefined) {
      this.state.recordFlagSelected[selectedTab.TabName] =this.props.defaultRecordFlags;
      this.setState({ recordFlagSelected: this.state.recordFlagSelected });
    }
    if (this.state.fieldNameSelected[selectedTab.TabName] == undefined) {
      this.state.fieldNameSelected[selectedTab.TabName] =this.props.defaultFieldNames;
      this.setState({ fieldNameSelected: this.state.fieldNameSelected });
    }

    if (typeof this.state.startDate[selectedTab.TabName] == "undefined") {
      this.state.startDate[selectedTab.TabName] = moment().subtract(1, 'month');
      this.setState({ startDate: this.state.startDate });
    }
    if (typeof this.state.covYear[selectedTab.TabName] == "undefined") {
      this.state.covYear[selectedTab.TabName] =this.props.defaultCovYear;
      this.setState({ covYear: this.state.covYear });
    }

    this.setState({ selectedTab: selectedTab },()=>this.checkValidation());

  }
 checkValidation(){
  let currentTabName = this.state.selectedTab.TabName;
  let state = Object.assign({}, this.state);

  let pass= {
    [currentTabName]:true
  }
  let errStr ={
    [currentTabName]:[]

  } ;
  // validate covYear
  if (!state.covYear[currentTabName] || parseInt(state.covYear[currentTabName]) !== state.covYear[currentTabName] || String(state.covYear[currentTabName]).indexOf('.') !== -1) {
    pass[currentTabName] = false;
    errStr[currentTabName][4] = "Field Required";
  }
  // validate moment object

  let currentRef = "fileRunDPicker"+"_"+ currentTabName;
  const startDate = this.refs[currentRef].refs.input.defaultValue;
  if (!startDate || startDate.length !== 7) {
    pass[currentTabName] = false;
    errStr[currentTabName][0] = "Field Required";
  }
  else {
    let range = moment(startDate, 'MM/YYYY').add(6, 'month');
    if (!moment(range).isSameOrAfter(moment())) {
      pass[currentTabName] = false;
      errStr[currentTabName][0] = "Error : Date more than 6 months old";
    }
  }
  // validate trad partners
  if (!state.tradSelected[currentTabName] || state.tradSelected[currentTabName].length < 1) {
    pass[currentTabName] = false;
    errStr[currentTabName][1] = "Field Required";
  }
  // validate record flags
  if (!state.recordFlagSelected[currentTabName] || state.recordFlagSelected[currentTabName].length < 1) {
    pass[currentTabName]= false;
    errStr[currentTabName][3] = "Field Required";
  }
  // validate field flags
  if (!state.fieldFlagSelected[currentTabName] || state.fieldFlagSelected[currentTabName].length < 1) {
    pass[currentTabName] = false;
    errStr[currentTabName][2] = "Field Required";
  }
  // validate record flags
  if (!state.fieldNameSelected[currentTabName] || state.fieldNameSelected[currentTabName].length < 1) {
    pass[currentTabName] = false;
    errStr[currentTabName][5] = "Field Required";
  }

  this.setState({ errStr :errStr});
  return   pass[currentTabName] ;
 }
  handleSubmitButton() {
    let currentTabName = this.state.selectedTab.TabName;
    let state = Object.assign({}, this.state); //JSON.parse(JSON.stringify(this.state));

    let isValidForm = this.checkValidation();
    if (isValidForm) {
      this
        .props
        .handleSubmit({ state })
      this.setState({ activeKey: ['1'], showSpinner: true, showTable: false });
    }
  }
  handleResetButton() {

    let TabName = this.state.selectedTab.TabName;
    this.state.advCustomFiltersRows[this.state.selectedTab.TabName].length = 1;



    var resetFields = {
      startDate:{ [TabName] : moment().subtract(1, 'month') } ,
      covYear: {[TabName] : JSON.parse(JSON.stringify(initialState.covYear   )) } ,
      tradSelected: {[TabName] :  JSON.parse(JSON.stringify(initialState.tradSelected))}
    }

    if(TabName == "RCNO"){
      resetFields.fieldFlagSelected= {[TabName] : JSON.parse(JSON.stringify(initialState.fieldFlagSelected)) } ;
      resetFields.recordFlagSelected= {[TabName] :  JSON.parse(JSON.stringify(initialState.recordFlagSelected)) };
      resetFields.fieldNameSelected={[TabName] :  JSON.parse(JSON.stringify(initialState.fieldNameSelected)) };
          this.refs.advIsrRcTcNum.value="";
          this.refs.advIsrPlcyId.value="";
          this.refs.advIsrExchSubId.value="";
          this.refs.advIsrExchSubId.value="";
          this.refs.advIsrFstNm.value="";
          this.refs.advIsrLstNm.value="";
          this.refs.advIsrDob.refs.input.value =""
          this.setState({ RCNO_DOB: null });

    }else if( TabName== "RCNI"){
          this.refs.advFfmFstNm.value="";
          this.refs.advFfmLstNm.value="";
          this.refs.advFfmIsurExchSubId.value="";
          this.refs.advFfmExchPlcyId.value="";
          this.refs.advFfmAscnRcTcNum.value="";
          this.refs.advFfmDob.refs.input.value =""
          this.setState({ RCNI_DOB: null });
    }


    this.state.fieldAvdNameSelected[TabName] = { value: [ { field:{ label:"", value:""} , fieldValue:"" } ], count: 1};

    this.state.advFields[TabName] = {};

    resetFields.errStr={[TabName]:[] }
    this.setState({

      advFields:this.state.advFields, fieldAvdNameSelected:this.state.fieldAvdNameSelected ,advCustomFiltersRows:this.state.advCustomFiltersRows

    });







              this.setState(resetFields, () => {

                    let currentRef = "fileRunDPicker"+"_"+ TabName;
                  if (cxt.refs[currentRef].refs.input.value != cxt.state.startDate[TabName].format('MM/YYYY')){
                      cxt.refs[currentRef].refs.input.defaultValue = cxt.state.startDate[TabName].format('MM/YYYY');
                      cxt.refs[currentRef].refs.input.value = cxt.state.startDate[TabName].format('MM/YYYY');
                      cxt.refs[currentRef].setState({ inputValue:    cxt.state.startDate[TabName].format('MM/YYYY') });;
                  }




                console.log("Resetting State");
                console.log(this.state);
             });

  }

  addAdvRows() {

    let uiItems = [];

    let TabName = this.state.selectedTab.TabName;
    let faMinusCircle = null;
    let faPlusCircle = null;



    for(let i = 0; i < this.state.fieldAvdNameSelected[TabName].count; i++){


        if(i==5) break;


        if(this.state.fieldAvdNameSelected[TabName].value[i] == undefined){
          this.state.fieldAvdNameSelected[TabName].value[i]={ field:{ label:"", value:""} , fieldValue:"" }
        }



        let inputFieldName = "advCustomerFilterFields" + "_"+ TabName  + "_"+  i ;
        if(i==4){
            faPlusCircle = null;
        }else{
        faPlusCircle =(<label  onClick={this.addClick.bind(this)} className="formLabel" style={{ "display": "inline", "fontWeight": "500", "color": "#3498db" }}>
                <i className='fa fa-plus-circle fa-3x' style={{ "cursor": "pointer" }} aria-hidden="true"></i>
              </label> )
        }


         if(i>0){
              faMinusCircle =(
                <label  onClick={this.removeClick.bind(this,i)} className="formLabel" style={ { "display": "inline", "fontWeight": "500", "color": "#3498db" ,"marginLeft":i==4 ? undefined: "10px"}}>

                <i className='fa fa-minus-circle fa-3x' style={{ "cursor": "pointer" }} aria-hidden="true"></i>
                </label>
              )
         }
let rcnoFieldDDL = null;
let rcniFieldDDL = null;
         if(this.state.selectedTab.TabName =="RCNO"){
                      rcnoFieldDDL= (<Select.Async
                      value={this.state.fieldAvdNameSelected[TabName].value[i].field.value}
                      searchable={isSearchable}
                      clearable={isClearable}
                      onChange={  (e)=>this.handleAdvFieldNameChange(inputFieldName, i,e === null ? undefined : e)}
                      loadOptions={ this.props.getAvdInputFields.bind(this,this.state.selectedTab.TabName)}
                      />)
         }else{
                 rcniFieldDDL= (<Select.Async
                      value={this.state.fieldAvdNameSelected[TabName].value[i].field.value}
                      searchable={isSearchable}
                      clearable={isClearable}
                      onChange={  (e)=>this.handleAdvFieldNameChange(inputFieldName, i,e === null ? undefined : e)}
                      loadOptions={ this.props.getAvdInputFields.bind(this,this.state.selectedTab.TabName)}
                      />)
         }


        uiItems.push(

              <div key={i}>
<Row >
          <div style={{ "marginLeft": "3%" }} >
            <Column medium={4}>
              <label className='formLabel' style={{ "display": "inline", "fontWeight": "500", "color": "#3498db" }}>
                Field Name:
                {rcnoFieldDDL}
                {rcniFieldDDL}
              </label>
            </Column>
          </div>
          <Column medium={3}>
            <label className="formLabel" style={{ "display": "inline", "fontWeight": "500", "color": "#3498db" }}>
              Field Value:


            <input type="text" ref={inputFieldName} value={this.state.fieldAvdNameSelected[TabName].value[i].fieldValue || ''} onChange={(e)=>this.handleChange(i,e)} />


            </label>
          </Column>
          <div style={{ "paddingTop": "22px" }}>
            <Column medium={3}>



              {faPlusCircle}
              {faMinusCircle}



            </Column>
          </div>
        </Row>



              </div>


        )



    }
    return uiItems || null;

  }
  getItems() {
    const items = [];
    items.push(
      <Panel header={`List View Search`} key={'0'}>
        <Row>
          <div>
            <Tabs activeLinkStyle={styles.activeLinkStyle} visibleTabStyle={styles.visibleTabStyle} style={styles.tabs}>
              <div style={styles.links}>
                <TabLink to="tab1" default style={styles.tabLink} onClick={this.handleSelectedTab.bind(this, { currentIndex: 0, TabName: "RCNO" })}>RCNO</TabLink>
                <TabLink to="tab2" style={styles.tabLink} onClick={this.handleSelectedTab.bind(this, { currentIndex: 1, TabName: "RCNI" })} >RCNI</TabLink>
              </div>

              <div style={styles.content}>
                <TabContent style={styles.tabContent} for="tab1">
                  <Row className='display'>
                    <div style={{ "marginLeft": "3%" }} >
                      <Column medium={3}>
                        <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db" }}>
                        File Run Month/Year:*
                                <DatePicker
                            ref='fileRunDPicker_RCNO'
                            id="fileRunDPicker_RCNO"
                            selected={ this.state.startDate[this.state.selectedTab.TabName] ||  moment().subtract(1, 'month')  }
                            onChange={this.handleDateChange}
                            dateFormat="MM/YYYY"
                            showMonthDropdown
                            showYearDropdown
                            scrollableYearDropdown
                          />
                          <span className="error date-picker-error">{this.state.errStr[this.state.selectedTab.TabName][0]}</span>
                        </label>
                      </Column>
                    </div>
                    <Column medium={3} className="multi-select">
                      <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db" }}>
                        Trading Partner ID:*
                            <MultiSelect
                          options={this.props.tradingPartnerOptions}
                          onSelectedChanged={this.handleTradPartChange}
                          selected={this.state.tradSelected[this.state.selectedTab.TabName]}
                          valueRenderer={this.handleMultiSelectRenderer}
                          selectAllLabel={"All"} />
                        <span className="error">{this.state.errStr[this.state.selectedTab.TabName][1]}</span>
                      </label>
                    </Column>
                    <div style={{ "marginLeft": "2%" }} >
                      <Column medium={1} className="record-summary-help-icon">
                        <ReactHover options={recordFlagHelpHoverOptions}>
                          <ReactHover.Trigger>
                            <i className="fa fa-question-circle" aria-hidden="true"></i>
                          </ReactHover.Trigger>
                          <ReactHover.Hover>
                            <h1> hello </h1>
                          </ReactHover.Hover>
                        </ReactHover>
                      </Column>
                    </div>
                    <Column medium={2} className="multi-select">
                      <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db" }}>
                        Field Flag:*
                             <MultiSelect
                          options={this.props.fieldFlagOptions}
                          onSelectedChanged={this.handleFieldFlagChange}
                          selected={this.state.fieldFlagSelected[this.state.selectedTab.TabName]}
                          valueRenderer={this.handleMultiSelectRenderer}
                          selectAllLabel={"All"} />
                        <span className="error">{this.state.errStr[this.state.selectedTab.TabName][2]}</span>
                      </label>
                    </Column>
                    <div style={{ "marginLeft": "2%" }} >
                      <Column medium={1} className="record-summary-help-icon">
                        <ReactHover options={recordFlagHelpHoverOptions}>
                          <ReactHover.Trigger>
                            <i className="fa fa-question-circle" aria-hidden="true"></i>
                          </ReactHover.Trigger>
                          <ReactHover.Hover>
                            <div>hello2</div>
                          </ReactHover.Hover>
                        </ReactHover>
                      </Column>
                    </div>
                    <Column medium={2} className="multi-select">
                      <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db" }}>
                        Record Flag:*
                             <MultiSelect
                          options={this.props.recordFlagOptions}
                          onSelectedChanged={this.handleRecordFlagChange}
                          selected={this.state.recordFlagSelected[this.state.selectedTab.TabName]}
                          valueRenderer={this.handleMultiSelectRenderer}
                          selectAllLabel={"All"} />
                        <span className="error">{this.state.errStr[this.state.selectedTab.TabName][3]}</span>
                      </label>
                    </Column>
                  </Row>
                  <Row>
                    <div style={{ "marginLeft": "3%" }} >
                      <Column medium={3} className='coverage-year'>
                        <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db" }}>
                          Coverage Year:*
                           <Select
                            value={this.state.covYear[this.state.selectedTab.TabName]}
                            options={this.props.covYearOptions}
                            onChange={this.handleCovYearChange} />
                          <span className="error">{this.state.errStr[this.state.selectedTab.TabName][4]}</span>
                        </label>
                      </Column>
                    </div>
                    <Column medium={4} className="multi-select">
                      <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db" }}>
                        Field Name:*
                          <MultiSelect
                          options={this.props.fieldNameOptions}
                          onSelectedChanged={this.handleFieldNameChange}
                          selected={this.state.fieldNameSelected[this.state.selectedTab.TabName]}
                          valueRenderer={this.handleMultiSelectRenderer}
                          selectAllLabel={"All"} />
                        <span className="error">{this.state.errStr[this.state.selectedTab.TabName][5]}</span>
                      </label>
                    </Column>
                  </Row>
                  <Row>
                    <br />
                    <br />
                    <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db", "fontSize": "1.0rem", "paddingLeft": "20px" }}>
                      Advanced Search
              </label>
                    <br />
                  </Row>
                  <Row>
                    <div style={{ "marginLeft": "3%" }} >
                      <Column medium={4}>
                        <label className="formLabel" style={{ "display": "inline", "fontWeight": "500", "color": "#3498db" }}>
                          Issuer First Name:
                  <input type="text" ref="advIsrFstNm" name="advIsrFstNm" value={this.state.advIsrFstNm} onChange={this.handleAdvSearch} />
                        </label>
                      </Column>
                    </div>
                    <Column medium={4}>
                      <label className="formLabel" style={{ "display": "inline", "fontWeight": "500", "color": "#3498db" }}>
                        Issuer Last Name:
                  <input ref="advIsrLstNm" type="text" name="advIsrLstNm" value={this.state.advIsrLstNm} onChange={this.handleAdvSearch} />
                      </label>
                    </Column>
                    <Column medium={3}>
                      <label className='formLabel' style={{ "display": "inline", "fontWeight": "500", "color": "#3498db" }}>
                        Issuer DOB:
                  <DatePicker
                            ref                        = "advIsrDob"
                            placeholderText           = "YYYY/MM/DD"
                            showMonthDropdown
                            showYearDropdown
                            scrollableYearDropdown

                            dateFormat                 = "YYYY/MM/DD"
                            selected                   = {this.state.RCNO_DOB}
                            onChange                   = {(e) => {
                            this.setState({RCNO_DOB: e})
                  }}
                  />

{/*
                        <DatePicker
                          name="advIsrDob"
                          selected={this.state.RCNO_DOB}
                          onChange={this.handleDOBChange.bind(this,"RCNO_DOB")}
                          value={this.state.RCNO_DOB}
                          ref="advIsrDob"
                          dateFormat="YYYY/MM/DD"
                          placeholderText="YYYY/MM/DD"
                          scrollableYearDropdown />*/}

                      </label>
                    </Column>
                  </Row>
                  <Row>
                    <div style={{ "marginLeft": "3%" }} >
                      <Column medium={4}>
                        <label className="formLabel"
                          style={{ "display": "inline", "fontWeight": "500", "color": "#3498db" }}>
                          Issuer Ex Sub ID:
                  <input  ref="advIsrExchSubId"  type="text" name="advIsrExchSubId" value={this.state.advIsrExchSubId} onChange={this.handleAdvSearch} />
                        </label>
                      </Column>
                    </div>
                    <Column medium={4}>
                      <label className="formLabel"
                        style={{ "display": "inline", "fontWeight": "500", "color": "#3498db" }}>
                        Issuer FFM Policy ID:
                  <input type="text"  ref="advIsrPlcyId"  name="advIsrPlcyId" value={this.state.advIsrPlcyId} onChange={this.handleAdvSearch} />
                      </label>
                    </Column>
                    <Column medium={3}>
                      <label className="formLabel"
                        style={{ "display": "inline", "fontWeight": "500", "color": "#3498db", "width": "101%" }}>
                        Issuer Record Trace <span>Number:</span>
                        <input ref="advIsrRcTcNum"  type="text" name="advIsrRcTcNum" value={this.state.advIsrRcTcNum} onChange={this.handleAdvSearch} />
                      </label>
                    </Column>
                  </Row>
                  <Row>
                    <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db", "fontSize": "1.0rem", "paddingLeft": "20px" }}>
                      Advanced Custom Filter
              </label>
                    <br />
                  </Row>
                  {/*----ADVANCE ROW ------*/}

{

  this.addAdvRows()
}




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
                </TabContent>
                {/*---------------- TAB2 -------------------*/}

                <TabContent style={styles.tabContent} for="tab2">
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
                            ref='fileRunDPicker_RCNI'
                            selected={this.state.startDate[this.state.selectedTab.TabName]}
                            onChange={this.handleDateChange}
                            dateFormat="MM/YYYY"
                            showMonthDropdown
                            showYearDropdown
                            scrollableYearDropdown />
                          <span className="error date-picker-error">{this.state.errStr[this.state.selectedTab.TabName][0]}</span>
                        </div>
                      </Column>
                    </div>
                    <Column medium={3} className="multi-select">
                      <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db" }}>
                        Trading Partner ID:*
                                         <MultiSelect
                          options={this.props.tradingPartnerOptions}
                          onSelectedChanged={this.handleTradPartChange}
                          selected={this.state.tradSelected[this.state.selectedTab.TabName]}
                          valueRenderer={this.handleMultiSelectRenderer}
                          selectAllLabel={"All"} />
                        <span className="error">{this.state.errStr[this.state.selectedTab.TabName][1]}</span>
                      </label>
                    </Column>
                    <div style={{ "marginLeft": "2%" }} >
                      <Column medium={3} className='coverage-year'>
                        <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db" }}>
                          Coverage Year:*
                                             <Select
                            value={this.state.covYear[this.state.selectedTab.TabName]}
                            options={this.props.covYearOptions}
                            onChange={this.handleCovYearChange} />
                          <span className="error">{this.state.errStr[this.state.selectedTab.TabName][4]}</span>
                        </label>
                      </Column>
                    </div>
                  </Row>
                  <Row>
                    <br />
                    <br />
                    <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db", "fontSize": "1.0rem", "paddingLeft": "20px" }}>
                      Advanced Search
                                </label>
                    <br />
                  </Row>
                  <Row>
                    <div style={{ "marginLeft": "3%" }} >
                      <Column medium={4}>
                        <label className="formLabel" style={{ "display": "inline", "fontWeight": "500", "color": "#3498db" }}>
                          First Name:
          <input type="text" ref="advFfmFstNm" name="advFfmFstNm" value={this.state.advFfmFstNm} onChange={this.handleAdvSearch} placeholder="First Name" />
                        </label>
                      </Column>
                    </div>
                    <Column medium={4}>
                      <label className="formLabel" style={{ "display": "inline", "fontWeight": "500", "color": "#3498db" }}>
                        Last Name:
          <input type="text" ref="advFfmLstNm" name="advFfmLstNm" value={this.state.advFfmLstNm} onChange={this.handleAdvSearch} placeholder="Last Name" />
                      </label>
                    </Column>
                    <Column medium={3}>
                      <label className='formLabel' style={{ "display": "inline", "fontWeight": "500", "color": "#3498db" }}>
                      Issuer DOB:

                        <DatePicker
                                  placeholderText           = "YYYY/MM/DD"
                                  scrollableYearDropdown
                                  dateFormat                 = "YYYY/MM/DD"
                                  showMonthDropdown
                                  showYearDropdown
                                  scrollableYearDropdown
                                  ref                        = "advFfmDob"
                                  selected                   = {this.state.RCNI_DOB}
                                  onChange                   = {(e) => {
                                  this.setState({RCNI_DOB: e})
                  }}
                  />



{/*
                     <DatePicker
                          ref='advFfmDob'
                          name="advFfmDob"
                          selected={this.state.RCNI_DOB}
                          value={this.state.RCNI_DOB}
                          onChange={this.handleDOBChange.bind(this,"RCNI_DOB")}
                          dateFormat="YYYY/MM/DD"
                          placeholderText="YYYY/MM/DD"
                          showMonthDropdown
                          showYearDropdown
                          scrollableYearDropdown />*/}
                      </label>
                    </Column>
                  </Row>
                  <Row>
                    <div style={{ "marginLeft": "3%" }} >
                      <Column medium={4}>
                        <label className="formLabel"
                          style={{ "display": "inline", "fontWeight": "500", "color": "#3498db" }}>
                          Issuer Ex Subscriber Id:
          <input type="text" ref="advFfmIsurExchSubId" name="advFfmIsurExchSubId" value={this.state.advFfmIsurExchSubId} onChange={this.handleAdvSearch} placeholder="Ex Subscriber Id" />
                        </label>
                      </Column>
                    </div>
                    <Column medium={4}>
                      <label className="formLabel"
                        style={{ "display": "inline", "fontWeight": "500", "color": "#3498db" }}>
                        Issuer Assigned Ex Policy ID:
          <input type="text" ref="advFfmExchPlcyId" name="advFfmExchPlcyId" value={this.state.advFfmIsurExchSubId} onChange={this.handleAdvSearch} placeholder="Ex Policy ID" />
                      </label>
                    </Column>
                    <Column medium={3}>
                      <label className="formLabel"
                        style={{ "display": "inline", "fontWeight": "500", "color": "#3498db" }}>
                        Issuer Record Trace Number:
          <input type="text" ref="advFfmAscnRcTcNum" name="advFfmAscnRcTcNum" value={this.state.advFfmIsurExchSubId} onChange={this.handleAdvSearch} placeholder="Record Trace Number" />
                      </label>
                    </Column>
                  </Row>
                  <Row>
                    <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db", "fontSize": "1.0rem", "paddingLeft": "20px" }}>
                      Advanced Custom Filter
      </label>
                    <br />
                  </Row>


                    {/*----ADVANCE ROW ------*/}


                    {
                              this.addAdvRows()
                    }



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
                    <div className="vh40"></div>
                  </Row>
                </TabContent>


                {/*---------------- TAB 2 -------------------*/}

              </div>
            </Tabs>
          </div>
        </Row>

      </Panel>
    );

    items.push(
      <Panel header={`Search Result `} key={'1'}>
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
          <br /><br />

          <br /><br />
          <BootstrapTable
            data={this.state.summaryTableData}
            className="record-summary-details-result-table"
            height='300'
            scrollTop={'Top'}
            ref='table'
            selectRow={this.state.selectRowProp}
            options={this.state.tableOptions}
            pagination={true}

          >
            <TableHeaderColumn dataField='recordIdentifier'>recordIdentifier</TableHeaderColumn>
            <TableHeaderColumn dataField='firstName'>rcnoFirstName</TableHeaderColumn>
            <TableHeaderColumn dataField='lastName'>rcnoLastName</TableHeaderColumn>
            <TableHeaderColumn dataField='exchSubId'>rcnoExchSubId</TableHeaderColumn>
            <TableHeaderColumn dataField='socSecNum'>rcnoSocSecNum</TableHeaderColumn>
            <TableHeaderColumn dataField='contractId' isKey={true}>rcnoContractId</TableHeaderColumn>
            <TableHeaderColumn dataField='ffmPolicyId'>rcnoFFMPolicyId</TableHeaderColumn>
            {
              (this.state.selectedTab.TabName=="RCNO") ? (<TableHeaderColumn dataField='overallInd'>overallInd</TableHeaderColumn>) : null
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
                <button
                  className="button primary  btn-lg btn-color formButton"
                  style={{
                    "backgroundColor": "green",
                    'paddingTop': '0em',
                    'height': '2.5em',
                    'marginRight': '20px'
                  }}
                  onClick={this.handleExport}>Export To Excel
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
    return (
      <div className="list-view-summary-page-data">
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
    //console.log("props"); console.log(this.state.fieldNameOptions); console.log(this.props.fieldNameOptions)
    if (this.state.fieldNameOptions.length == 0 && nextProps.fieldNameOptions.length > 0) {
      this.setState({ fieldNameOptions: nextProps.fieldNameOptions });
    }
    if (this.state.recordFlagOptions.length == 0 && nextProps.recordFlagOptions.length > 0) {
      this.setState({ recordFlagOptions: nextProps.recordFlagOptions });
    }
    if (this.state.fieldFlagOptions.length == 0 && nextProps.fieldFlagOptions.length > 0) {
      this.setState({ fieldFlagOptions: nextProps.fieldFlagOptions });
    }
    this.setState({ fieldNameAvdCustomOptions: nextProps.fieldNameAvdCustomOptions });


    // this.setState({ fieldNameOptions: nextProps.fieldNameOptions })


    if (this.state.lastDataReceived < nextProps.lastDataReceived) {
      if (nextProps.summaryTableData == undefined || Object.keys(nextProps.summaryTableData).length === 0) {
        console.log("No Table Data");
        this.setState({ showSpinner: false, showTable: false, lastDataReceived: nextProps.lastDataReceived })
      } else {


        this.setState({
          showSpinner: false,
          showTable: true,
          lastDataReceived: nextProps.lastDataReceived,
          summaryTableData: nextProps.summaryTableData
        });

        /*
        let tableData = nextProps.summaryTable;
        let tableHeaders = tableData.headerSet;
        let summaryTableData = [];
        let rMap = tableData.responseMap;
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
        console.log(summaryTableData);
        this.setState({
          showSpinner: false,
          showTable: true,
          lastDataReceived: nextProps.lastDataReceived
        }, () => {
          this.setState({tableHeaders, summaryTableData})
        })

      */
      }
    }
  }

  componentDidMount() {
    console.log("componentDidMount()");
    if (initialState === undefined) {
      let TabName = this.state.selectedTab.TabName;
      initialState = {
        covYear: JSON.parse(JSON.stringify(this.state.covYear[TabName] )),
        tradSelected: JSON.parse(JSON.stringify(this.state.tradSelected[TabName] )),
        fieldFlagSelected: JSON.parse(JSON.stringify(this.state.fieldFlagSelected[TabName] )),
        recordFlagSelected: JSON.parse(JSON.stringify(this.state.recordFlagSelected[TabName] )),
        fieldNameSelected: JSON.parse(JSON.stringify(this.state.fieldNameSelected[TabName] ))
      };
      //console.log(initialState);
      //console.log(this.state);
    }
  }
}






ListViewSummaryPageData.propTypes = {};
export default ListViewSummaryPageData;



