import React, {Component} from 'react';
import PropTypes from 'prop-types';
import HomeLogo from '../Images/EMBDashboard_logo.png';
import {Link} from 'react-router-dom'
import * as constValues from '../utils/DashboardConstants'
import {Row, Column} from 'react-foundation';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class BSTable extends Component {
    constructor(props) {
        super(props);
      }
    
      render() {
        if (this.props.data) {
          return (
            <BootstrapTable data={ this.props.data }>
              <TableHeaderColumn dataField='fieldA' isKey={ true }>Field A</TableHeaderColumn>
              <TableHeaderColumn dataField='fieldB'>Field B</TableHeaderColumn>
              <TableHeaderColumn dataField='fieldC'>Field C</TableHeaderColumn>
              <TableHeaderColumn dataField='fieldD'>Field D</TableHeaderColumn>
            </BootstrapTable>);
        } else {
          return (<p>?</p>);
        }
      }
}
Header.propTypes = {
    userName: PropTypes.string
};
export default Header;
