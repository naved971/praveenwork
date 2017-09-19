import React, {Component} from 'react';
import PropTypes from 'prop-types';
import HomeLogo from '../Images/EMBDashboard_logo.png';
import {Link} from 'react-router-dom'
import * as constValues from '../utils/DashboardConstants'
import {Row, Column} from 'react-foundation';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { BSTable } from './BSTable';

class ExpandRow extends Component {
    constructor(props) {
        super(props);
      }
    
      isExpandableRow(row) {
       // if (row.id < 3) return true;
        //else return false;

        return true;
      }
    
      expandComponent(row) {
        return (
          <BSTable data={ row.expand } />
        );
      }
    
      render() {
        const options = {
          expandRowBgColor: 'rgb(242, 255, 163)',
          expandBy: 'column'  // Currently, available value is row and column, default is row
        };
        return (
          <BootstrapTable data={ products }
            options={ options }
            expandableRow={ this.isExpandableRow }
            expandComponent={ this.expandComponent }
            search>
            <TableHeaderColumn dataField='id' isKey={ true }>Product ID</TableHeaderColumn>
            <TableHeaderColumn dataField='name' expandable={ false }>Product Name</TableHeaderColumn>
            <TableHeaderColumn dataField='price' expandable={ false }>Product Price</TableHeaderColumn>
          </BootstrapTable>
        );
      }
}
Header.propTypes = {
    userName: PropTypes.string
};
export default Header;
