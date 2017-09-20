import React, { Component } from "react";
import PropTypes from "prop-types";
//import SideBar from './SideBarDashboard';
//import RcnoandRcniSideBar from './RcnoandRcniSideBar';
import App from "../components/App";
import RcnoandRcniListDetailsPageData from "../components/RcnoandRcniListDetailsPageData";
import * as dashboardConstValues from "../utils/DashboardConstants";
import RcnoRcniSideBar from "./RcnoRcniSideBar";
import Spinner from "react-spinner-material";
import moment from "moment";
import { Row, Column } from "react-foundation";
import { NavLink } from "react-router-dom";
import * as rcnorcni from "../utils/RcnoRcni";

const gridHeader = {
    "recordName":"Record Name",
    "rcnoIsurMbrData": "RCNO Issuer Data",
    "rcnoFfmData": "Rcno Ffm Data",
    "rcnoFtiFlag": "Rcno Fti Flag",
    "rcniData": "Rcni Data",
    }
const gridInfo = {
  rcnoIsurData: [
    {
      rcnoIsurMbrData: [
        {
          isurMbrFstNme: "ERIN",
          IsurMbrMdlNme: "",
          isurMbrLstNme: "Hill",
          IsurMbrDob: "2005-06-06",
          isurMbrGender: "F",
          IsurMbrSsn: "77404680",
          isurMbrSubInd: "Y",
          IsurMbrRltptoSubIn: "18"
        }
      ],
      rcnoIsurCovgData: [
        {
          IsurTbcoSttCd: "2",
          isurQhpId: "301254789561325",
          isurBenEffDt: "2017-01-31",
          isurBenExpDt: "2017-12-31",
          IsurHiosId: "30015",
          isurEtrDt: "2017-06-20",
          isurCovgYrNb: "2017",
          isurPaidThruDt: "2017-06-30",
          IsurEndofYrTermInd: ""
        }
      ],
      rcnoIsurAptcData: [
        {
          IsurAptcApldAmt: "0",
          isurAptcApldEffdt: "",
          isurAptcApldExpDt: "",
          isurCsrAmt: "0",
          IsurCsrEffDt: "",
          IsurCsrExpDt: "",
          isurTtlPreAmt: "21.55",
          isurTtlPreEffDt: "2017-06-30",
          isurTtlPreExpDt: "2017-06-30",
          isurMbrPreAmt: "21.55",
          isurMbrPreEffDt: "2017-06-30",
          isurMbrPreExpDt: "2017-06-30",
          isurMbrPrePaidStusIn: "Y"
        }
      ],
      rcnoIsurOtherData: [
        {
          IsurTbcoSttCd: "2",
          isurQhpId: "301254789561325",
          isurBenEffDt: "2017-01-31",
          isurBenExpDt: "2017-12-31",
          IsurHiosId: "30015",
          isurEtrDt: "2017-06-20",
          isurCovgYrNb: "2017",
          isurPaidThruDt: "2017-06-30",
          IsurEndofYrTermInd: ""
        }
      ]
    }
  ],
  rcnoFfmData: [
    {
      rcnoFfmMbrData: [
        {
          FfmMbrFstNme: "ERIN",
          FfmMbrMdlNme: "",
          FfmMbrLstNme: "Hill",
          FfmMbrDob: "2005-06-06",
          FfmMbrGender: "F",
          FfmMbrSsn: "77404680",
          FfmMbrSubInd: "Y",
          FfmMbrRltptoSubIn: "18"
        }
      ],
      rcnoFfmCovgData: [
        {
          FfmTbcoSttCd: "2",
          FfmQhpId: "301254789561325",
          FfmBenEffDt: "2017-01-31",
          FfmBenExpDt: "2017-12-31",
          FfmHiosId: "30015",
          FfmEtrDt: "2017-06-20",
          FfmCovgYrNb: "2017",
          FfmPaidThruDt: "2017-06-30",
          FfmEndofYrTermInd: ""
        }
      ],
      rcnoFfmAptcData: [
        {
          FfmTbcoSttCd: "2",
          FfmQhpId: "301254789561325",
          FfmBenEffDt: "2017-01-31",
          FfmBenExpDt: "2017-12-31",
          FfmHiosId: "30015",
          FfmEtrDt: "2017-06-20",
          FfmCovgYrNb: "2017",
          FfmPaidThruDt: "2017-06-30",
          FfmEndofYrTermInd: ""
        }
      ],
      rcnoFfmOtherData: [
        {
          FfmTbcoSttCd: "2",
          FfmQhpId: "301254789561325",
          FfmBenEffDt: "2017-01-31",
          FfmBenExpDt: "2017-12-31",
          FfmHiosId: "30015",
          FfmEtrDt: "2017-06-20",
          FfmCovgYrNb: "2017",
          FfmPaidThruDt: "2017-06-30",
          FfmEndofYrTermInd: ""
        }
      ]
    }
  ],
  rcnoFtiFlag: [
    {
      rcnoFtiMbrData: [
        {
          FtiMbrFstNme: "ERIN",
          FtiMbrMdlNme: "",
          FtiMbrLstNme: "Hill",
          FtiMbrDob: "2005-06-06",
          FtiMbrGender: "F",
          FtiMbrSsn: "77404680",
          FtiMbrSubInd: "Y",
          FtiMbrRltptoSubIn: "18"
        }
      ],
      rcnoFtiCovgData: [
        {
          FtiTbcoSttCd: "2",
          FtiQhpId: "301254789561325",
          FtiBenEffDt: "2017-01-31",
          FtiBenExpDt: "2017-12-31",
          FtiHiosId: "30015",
          FtiEtrDt: "2017-06-20",
          FtiCovgYrNb: "2017",
          FtiPaidThruDt: "2017-06-30",
          FtiEndofYrTermInd: ""
        }
      ],
      rcnoFtiAptcData: [
        {
          FtiTbcoSttCd: "2",
          FtiQhpId: "301254789561325",
          FtiBenEffDt: "2017-01-31",
          FtiBenExpDt: "2017-12-31",
          FtiHiosId: "30015",
          FtiEtrDt: "2017-06-20",
          FtiCovgYrNb: "2017",
          FtiPaidThruDt: "2017-06-30",
          FtiEndofYrTermInd: ""
        }
      ],
      rcnoFtiOtherData: [
        {
          FtiTbcoSttCd: "2",
          FtiQhpId: "301254789561325",
          FtiBenEffDt: "2017-01-31",
          FtiBenExpDt: "2017-12-31",
          FtiHiosId: "30015",
          FtiEtrDt: "2017-06-20",
          FtiCovgYrNb: "2017",
          FtiPaidThruDt: "2017-06-30",
          FtiEndofYrTermInd: ""
        }
      ]
    }
  ],
  rcniData: [
    {
      rcniMbrData: [
        {
          rcniMbrFstNme: "ERIN",
          rcniMbrMdlNme: "",
          rcniMbrLstNme: "Hill",
          rcniMbrDob: "2005-06-06",
          rcniMbrGender: "F",
          rcniMbrSsn: "77404680",
          rcniMbrSubInd: "Y",
          rcniMbrRltptoSubIn: "18"
        }
      ],
      rcniCovgData: [
        {
          rcniTbcoSttCd: "2",
          rcniQhpId: "301254789561325",
          rcniBenEffDt: "2017-01-31",
          rcniBenExpDt: "2017-12-31",
          rcniHiosId: "30015",
          rcniEtrDt: "2017-06-20",
          rcniCovgYrNb: "2017",
          rcniPaidThruDt: "2017-06-30",
          rcniEndofYrTermInd: ""
        }
      ],
      rcniAptcData: [
        {
          rcniTbcoSttCd: "2",
          rcniQhpId: "301254789561325",
          rcniBenEffDt: "2017-01-31",
          rcniBenExpDt: "2017-12-31",
          rcniHiosId: "30015",
          rcniEtrDt: "2017-06-20",
          rcniCovgYrNb: "2017",
          rcniPaidThruDt: "2017-06-30",
          rcniEndofYrTermInd: ""
        }
      ],
      rcniOtherData: [
        {
          rcniTbcoSttCd: "2",
          rcniQhpId: "301254789561325",
          rcniBenEffDt: "2017-01-31",
          rcniBenExpDt: "2017-12-31",
          rcniHiosId: "30015",
          rcniEtrDt: "2017-06-20",
          rcniCovgYrNb: "2017",
          rcniPaidThruDt: "2017-06-30",
          rcniEndofYrTermInd: ""
        }
      ]
    }
  ]
};

const products = [];
function addProducts(quantity) {
    const startId = products.length;
    for (let i = 0; i < quantity; i++) {
      const id = startId + i;
      if (i < 3) {
        products.push({
          id: id,
          name: 'Item name ' + id,
          price: 2100 + i,
          expand: [ {
            fieldA: 'test1',
            fieldB: (i + 1) * 99,
            fieldC: (i + 1) * Math.random() * 100,
            fieldD: '123eedd' + i
          }, {
            fieldA: 'test2',
            fieldB: i * 99,
            fieldC: i * Math.random() * 100,
            fieldD: '123eedd' + i
          } ]
        });
      } else {
        products.push({
          id: id,
          name: 'Item name ' + id,
          price: 2100 + i
        });
      }
    }
  }
  addProducts(5);

  class RcnoandRcniDetailsPage extends Component {
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
                    <NavLink to={rcnorcni.RCNO_RCNI_FIELD_SUMMARY_DETAILS_URL}>
                      <span property="name">Field Search</span>
                    </NavLink>
                    <meta property="position" content="3" />
                  </li>
                </ol>
              </div>
            </Column>
            <Column medium={3}>
              <RcnoRcniSideBar />
            </Column>
            <Column medium={9} className="record-summary-container">
              <RcnoandRcniListDetailsPageData gridInfo={productss} />
            </Column>
          </Row>
        </Row>
      </App>
    );
  }

}

RcnoandRcniDetailsPage.propTypes = {};

export default RcnoandRcniDetailsPage;
