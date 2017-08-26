
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinkButton from './LinkButton';
import { Link } from 'react-router-dom';
import { Row, Column, Grid } from 'react-foundation'
import { countsFetchData } from '../actions/dashboardActions';
import FromDatePicker from './FromDatePicker';
import * as constValues from '../utils/DashboardConstants';
import * as ReconConstants from '../utils/ReconConstants';
import { connect } from 'react-redux';
import SelectInput from './MultiSelect';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import Spinner from 'react-spinner-material';
import DataTable from '../components/DataTable';
import { reactLocalStorage } from 'reactjs-localstorage';

 
 
class SysToSysReconViewDataCipDiamond extends Component {
     
     
        constructor(props) {
        super(props);
             
                           this.state = {
            fromDateCip: moment().subtract(12, 'days').format('MM/DD/YYYY'),
            thruDateCip: moment().format('MM/DD/YYYY'),
         reconfromdataerrormsgcip: "",
         reconthroughdateerrormsgcip: "",
         spinnerShowCip: true,
         spinnerShowDisplayCip: true,
            SystoSysViewdataFoundcip:true,
                    parametersCip: []
         
       
 
    };
     
        this.ReconCipDiamond = this.ReconCipDiamond.bind(this);
        this.ApidataCipDiamond = this.ApidataCipDiamond.bind(this);
        this.ModelBox = this.ModelBox.bind(this);
             
   
    
          
         
         }
    
    ModelBox()
    {
        
        alert("h1")
    }
      
    
    
    
        componentWillMount() {
            var previousdata = reactLocalStorage.getObject('setDataListCip');
            if(previousdata.ReconTypeCip== "CIP Diamond Recon")
                {
                    this.ApidataCipDiamond(previousdata);
                    
                    
                }
            else{
                                  this.reconDataForApiCip = {
      ReconTypeCip: "CIP Diamond Recon",
      ReconFromDateCip: moment().subtract(12, 'days').format('MM/DD/YYYY'),
      ReconthroughDataCip: moment().format('MM/DD/YYYY')
    }
                
                this.ApidataCipDiamond(this.reconDataForApiCip);
                
                
                }
          
        
            
            
            
        }
     
     
             ApidataCipDiamond(apirequirements)
     
 
                {   
                    console.log("Recon Type:"+ apirequirements.ReconTypeCip)
                    console.log("Recon From Date:"+ apirequirements.ReconFromDateCip)
                    console.log("Recon Through Date:"+ apirequirements.ReconthroughDataCip)
                     
                     var Url = '/nebert/ui/reconview/getreconcounts?fromDate=' + apirequirements.ReconFromDateCip + '&thruDate=' + apirequirements.ReconthroughDataCip + '&reconType=' + apirequirements.ReconTypeCip;
                    //  var Url = 'http://localhost:9080/nebert/ui/reconview/getreconcounts?fromDate=' + apirequirements.ReconFromDateCip + '&thruDate=' + apirequirements.ReconthroughDataCip + '&reconType=' + apirequirements.ReconTypeCip;
                     var Url2='https://blj8082.github.io/ApiData/ReconData.json';
                  fetch(Url2,{ credentials: "same-origin"})
                  .then(result => result.json())
                  .then(params => {
                reactLocalStorage.setObject('setDataListCip', apirequirements);
                var apircondatalist= params.reconRecords;
                this.setState({ parametersCip: apircondatalist });
                this.setState({ spinnerShowCip: false });
                this.setState({ spinnerShowDisplayCip: false });
                      
                             if(apircondatalist.length>0)
                    {   
                        
                         this.setState({ SystoSysViewdataFoundCip: true });
                        
                    }
            else
                {
                     this.setState({ SystoSysViewdataFoundcip: false });

                }
        
                  
 
            })
         
 
 
 
 
                }
     
        ReconCipDiamond(reconCipData)
            {
                 
                     if(reconCipData.reconfromdatacip == undefined)
                        {
                             
                            this.setState({ reconfromdataerrormsgcip: "please select From date" });
                             
                        }
                    else{
                               this.setState({ reconfromdataerrormsgcip: "" });
                            if(reconCipData.reconthroughdatecip == undefined)
                                {
                                     
                                     
                                     this.setState({ reconthroughdateerrormsgcip: "please select Through date" });
                                     
                                     
                                }
                         
                                else
                                {
                                     
                                    this.setState({ reconthroughdateerrormsgcip: "" });
                                    var ReconMeList={
                                    ReconTypeCip: "CIP Diamond Recon",
                                    ReconFromDateCip:reconCipData.reconfromdatacip,
                                    ReconthroughDataCip: reconCipData.reconthroughdatecip
                                    }
                                     
                                    this.ApidataCipDiamond(ReconMeList)
                                    this.setState({ spinnerShowCip: true });
                                    this.setState({ spinnerShowDisplayCip: true });
                                     
                                }
                         
                        }
                 
 
            }
     
     
  render() {
        const { error, handleSubmit, pristine, reset, submitting, receiveFilteredValues } = this.props
         const { enrollmentFromDate, enrollmentthroughDate, transactionType,
            contractEffDate, contractExpDate, marketSegment, productType, sourceSystem, transactionStatus, pageNo } = this.props
        const required = value => ( value ? undefined : 'Field required.') 
    return (
    <form onSubmit={handleSubmit(this.ReconCipDiamond)}>
             
               <div className="modal-header" style={{ 'backgroundColor': '#1779ba' }}>
              <h4 className="modal-title"><p className="modal-title-header">CIP Diamond Results</p></h4>
            </div>
             
                  <div style={{
                        'border': '1px solid #5dade2',
                        'borderLeft': '4px solid #5dade2',
                        'padding': '10px 16px',
                        'marginBottom': '30px',
                        'borderRadius': '3px 6px 6px 3px'
                    }}>
                        <Row className="fieldLabel">
                         
 
 
                                   <Column small={12} medium={4}>
                <label style={{"fontWeight":"400"}} className="formLabel"> From Date :
                <Field name="reconfromdatacip" component={FromDatePicker}  type='text' className="formInput" style={{ "borderRadius": "0.4rem" }} selected={this.state.ReconFromDateCipdata} />
                </label>
              <p style={{ "color": "red", "fontSize": "18px", "display": "inline" }}>{this.state.reconfromdataerrormsgcip}</p>
              </Column>
              <Column small={12} medium={4}>
                <label style={{"fontWeight":"400"}} className="formLabel"> Through Date :
                 <Field name="reconthroughdatecip" component={FromDatePicker}  type='text' className="formInput"   value={this.state.fromDateCip} defaultValue={this.state.fromDateCip} />
                </label>
               <p style={{ "color": "red", "fontSize": "18px", "display": "inline" }}>{this.state.reconthroughdateerrormsgcip}</p>
              </Column>
                             <Row className="paddingTop10">
                             <Column small={12} medium={4}>
                                <div className="modal-footer">
                <div style={{ "display": "inline", "float": "right","marginTop":"-9px" , "paddingRight": "2em", "paddingTop": "1em" }}>
                  <button className='button primary  btn-lg btn-color formButton' type="button"  disabled={pristine || submitting} onClick={reset} > Clear Values</button>
                </div>
                <div style={{ "display": "inline", "float": "right", "marginTop":"-9px" , "paddingRight": "1em", "paddingTop": "1em" }}>
                  <button className='button primary  btn-lg btn-color formButton' type="submit" style={{ "backgroundColor": "green" }} disabled={submitting}> Update View </button>
                </div>
              </div>
              
                            </Column>
                            </Row>
                        </Row>
                    </div>
          <center>
 
           <div className="mask" style={{ display: this.state.spinnerShowDisplayCip ? 'block' : 'none' }}>
              <Spinner style={{"position":"relative", "top":"34%"}} width={100}
                  height={120}
                  spinnerColor={"#5dade2"}
                  spinnerWidth={2}
                  show={this.state.spinnerShowCip} />
           </div>
         </center>
            
            <div className="" style={{ display: this.state.SystoSysViewdataFoundCip ? 'none' : 'block' }}> No Data Available</div>
            <div style={{ display: this.state.SystoSysViewdataFoundCip ? 'block' : 'none' }}>
         <DataTable data={this.state.parametersCip} limit={25} totalCounts={3} rowHeight={30} headerHeight={40} width={952} height={300}  onClick={this.ModelBox}
           headerFields={[
              { id: 'reconRundate', header: 'Recon Run Date and Time', width: 317, height: 30, link: false },
              { id: 'reconType', header: 'Recon Type', width: 318, height: 334, link: true },
              { id: 'totalError', header: 'Total Errors', width: 317, height: 332, link: false },
          ]}
           pageCount={1} />
                </div>
        </form>
    );
  }
}
 
 
SysToSysReconViewDataCipDiamond.propTypes = {
 
};
 
 // Decorate with redux-form
SysToSysReconViewDataCipDiamond = reduxForm({
  form: 'SysToSysReconViewDataCipDiamond'
// a unique identifier for this form
})(SysToSysReconViewDataCipDiamond)

SysToSysReconViewDataCipDiamond = connect(
    state => ({
        initialValues: {
            
            reconfromdatacip: moment().subtract(12, 'days').format('MM/DD/YYYY'),
            reconthroughdatecip: moment().format('MM/DD/YYYY')
        }
    })
)(SysToSysReconViewDataCipDiamond)

 
export default (SysToSysReconViewDataCipDiamond);


