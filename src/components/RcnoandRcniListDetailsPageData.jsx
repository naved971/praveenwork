import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Column, Grid } from 'react-foundation'
import { countsFetchData } from '../actions/dashboardActions';
import { connect } from 'react-redux';
//import rcnoandRcniListDetailsPageData from './src/nebert/css/rcnoandRcniListDetailsPageData.css';

import BSTable from '../components/BSTable';




class RcnoandRcniListDetailsPageData extends Component {

  constructor(props) {
    super(props);
  }

  isExpandableRow(row) {
    if (row.id < 3) return true;
    else return false;
  }

  expandComponent(row) {
    return (
      <BSTable data={row.expand} />
    );
  }

  expandColumnComponent({ isExpandableRow, isExpanded }) {
    let content = '';

    if (isExpandableRow) {
      content = (isExpanded ? '(-)' : '(+)');
    } else {
      content = ' ';
    }
    return (
      <div> {content} </div>
    );
  }

  render() {
    const options = {
      expandRowBgColor: 'rgb(242, 255, 163)'
    };
    return (
      <div>

        <BootstrapTable data={this.props.gridInfo}
          options={options}
          expandableRow={this.isExpandableRow}
          expandComponent={this.expandComponent}
          expandColumnOptions={{
            expandColumnVisible: true,
            expandColumnComponent: this.expandColumnComponent,
            columnWidth: 50
          }}>
          <TableHeaderColumn dataField='id' isKey={true}>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
        </BootstrapTable>

      </div>

    );
  }
}


RcnoandRcniListDetailsPageData.propTypes = {

};



export default RcnoandRcniListDetailsPageData;