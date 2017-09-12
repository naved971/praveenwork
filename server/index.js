var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.json());
const errorCategoryOptions = [
  {
    label: "QI Info",
    value: 0
  },
  {
    label: "Identifying Info",
    value: 1
  },
  {
    label: "Res Address Info ",
    value: 2
  },
  {
    label: "Mail Address Info ",
    value: 4
  },
  {
    label: "Other Demographic Info",
    value: 5
  },
  {
    label: "Benefit Covg & Financial Info",
    value: 6
  },
  {
    label: "Record Level Error",
    value: 7
  }
];

const errorCodeDescOptions = [
  {
    label: "RCNO_R_D_ER001 - Duplicate Issuer Record ",
    value: 0
  },
  {
    label:
      "RCNO_R_E_ER002 - Non-Match with Issuer Action, No FFM Action Due to Uneven Record Match",
    value: 1
  },
  {
    label: "RCNO_R_F_ER003 - FFM Orphans",
    value: 2
  },
  {
    label: "RCNO_R_G_ER004 - “Leftover” FFM Orphans",
    value: 3
  },
  {
    label: "RCNO_R_I_ER005 - Issuer Orphans",
    value: 4
  }
];

const errorCodeSearchResult = [
  {
    recordIdentifier: "111-1111-1111",
    firstName: "A1",
    lastName: "A1_LastName",
    exSubId: 2020,
    contractId: 1001,
    errorCode: 201,
    errorDesc: "Missing Fields",
    indicator: "AUTO"
  },
  {
    recordIdentifier: "111-1111-1112",
    firstName: "A2",
    lastName: "A2_LastName",
    exSubId: 2021,
    contractId: 1002,
    errorCode: 201,
    errorDesc: "Missing Fields",
    indicator: "AUTO"
  },
  {
    recordIdentifier: "111-1111-1113",
    firstName: "A3",
    lastName: "A3_LastName",
    exSubId: 2023,
    contractId: 1003,
    errorCode: 203,
    errorDesc: "Missing Fields",
    indicator: "MANUAL"
  },
  {
    recordIdentifier: "111-1111-1114",
    firstName: "A4",
    lastName: "A4_LastName",
    exSubId: 2024,
    contractId: 1004,
    errorCode: 204,
    errorDesc: "Missing Fields",
    indicator: "MANUAL"
  },
  {
    recordIdentifier: "111-1111-1115",
    firstName: "A5",
    lastName: "A5_LastName",
    exSubId: 2025,
    contractId: 1005,
    errorCode: 205,
    errorDesc: "Missing Fields",
    indicator: "MANUAL"
  },
  {
    recordIdentifier: "111-1111-1116",
    firstName: "A6",
    lastName: "A6_LastName",
    exSubId: 2026,
    contractId: 1006,
    errorCode: 206,
    errorDesc: "Missing Fields",
    indicator: "AUTO"
  }
];

var errCategoryList = [
  "ADM_INFO",
  "BENF_FIN_INFO",
  "IDEN_INFO",
  "MAIL_ADDR_INFO",
  "OTHER_DEMO_INFO",
  "QI_INFO",
  "RES_ADDR_INFO",
  "ROW_LEVEL"
];
var getSearchErrorDesc = {
  "RCNO_F_I_ERR020 -  Mailing Address Street Mismatch, Issuer to update to FFM value":
    "RCNO_F_I_ERR020",
  "RCNO_F_L_ERR040 -  Total Premium End Date Mismatch, FFM and Issuer to update to value listed in the FFM field based on automated business rule":
    "RCNO_F_L_ERR040",
  "RCNO_F_K_ERR029 -  QHPID Identifier Mismatch, both FFM and Issuer to update to value listed in the FFM field based on ER&R determination":
    "RCNO_F_K_ERR029",
  "RCNO_R_U_ER001 - Unprocessable Record": "RCNO_R_U_ER001",
  "RCNO_F_L_ERR033 -  Applied APTC Effective Date Mismatch, FFM and Issuer to update to value listed in the FFM field based on automated business rule":
    "RCNO_F_L_ERR033"
};
var rcnoFieldNameList = [
  "RCNO/Broker-NPN",
  "Naved/Broker-NPN",
  "Agent/Broker-NPN",
  "Agent/Broker-Name",
  "Applied-APTC-Amount",
  "Applied-APTC-Effective-Date",
  "Applied-APTC-End-Date",
  "Benefit-End-Date",
  "Benefit-Start-Date",
  "CSR-AMT",
  "CSR-Effective-Date",
  "CSR-End-Date",
  "Coverage-Year",
  "DOB",
  "End-of-Year-Termination-Indicator",
  "Enrollment-Group-Member-Count",
  "Exchange-Assigned-Member-ID",
  "Exchange-Assigned-Policy-ID",
  "Exchange-Assigned-Subscriber-ID",
  "Gender",
  "Initial-Premium-Paid-Status",
  "Issuer-Assigned Member-ID",
  "Issuer-Assigned-Policy-ID",
  "Issuer-Assigned-Subscriber-ID",
  "Mailing-Address-City",
  "Mailing-Address-State",
  "Mailing-Address-Street",
  "Mailing-Address-Street-Line-2",
  "Mailing-Address-Zip-Code",
  "Member-First-Name",
  "Member-Last-Name",
  "Member-Middle-Name",
  "Member-Premium-Amount",
  "Member-Premium-Effective-Date",
  "Member-Premium-End-Date",
  "Paid-Through-Date",
  "QHPID-Identifier",
  "Rating-Area",
  "Relationship-to-Subscriber-Indicator",
  "Residential-City",
  "Residential-County-Code",
  "Residential-State",
  "Residential-Street-Address",
  "Residential-Street-Address-Line-2",
  "Residential-Zip-Code",
  "SSN",
  "Subscriber-Indicator",
  "Telephone-Number",
  "Tobacco-Status",
  "Total-Premium-Amount",
  "Total-Premium-Effective-Date",
  "Total-Premium-End-Date"
];
var rcniFieldNameList = [
  "RCNI/Broker-NPN",
  "Naved/Broker-NPN",
  "Agent/Broker-NPN",
  "Agent/Broker-Name",
  "Applied-APTC-Amount",
  "Applied-APTC-Effective-Date",
  "Applied-APTC-End-Date",
  "Benefit-End-Date",
  "Benefit-Start-Date",
  "CSR-AMT",
  "CSR-Effective-Date",
  "CSR-End-Date",
  "Coverage-Year",
  "DOB",
  "End-of-Year-Termination-Indicator",
  "Enrollment-Group-Member-Count",
  "Exchange-Assigned-Member-ID",
  "Exchange-Assigned-Policy-ID",
  "Exchange-Assigned-Subscriber-ID",
  "Gender",
  "Initial-Premium-Paid-Status",
  "Issuer-Assigned Member-ID",
  "Issuer-Assigned-Policy-ID",
  "Issuer-Assigned-Subscriber-ID",
  "Mailing-Address-City",
  "Mailing-Address-State",
  "Mailing-Address-Street",
  "Mailing-Address-Street-Line-2",
  "Mailing-Address-Zip-Code",
  "Member-First-Name",
  "Member-Last-Name",
  "Member-Middle-Name",
  "Member-Premium-Amount",
  "Member-Premium-Effective-Date",
  "Member-Premium-End-Date",
  "Paid-Through-Date",
  "QHPID-Identifier",
  "Rating-Area",
  "Relationship-to-Subscriber-Indicator",
  "Residential-City",
  "Residential-County-Code",
  "Residential-State",
  "Residential-Street-Address",
  "Residential-Street-Address-Line-2",
  "Residential-Zip-Code",
  "SSN",
  "Subscriber-Indicator",
  "Telephone-Number",
  "Tobacco-Status",
  "Total-Premium-Amount",
  "Total-Premium-Effective-Date",
  "Total-Premium-End-Date"
];

var fieldNameMapRCNO = {
  "RCNO KEY": "RCNO_VAL",
  "FFM Member Middle Name": "FFM_MBR_MIDL_NM",
  "FFM DOB": "FFM_BTH_DT",
  "Issuer Exchange Assigned Member ID": "ISUR_EXCH_ASGD_MBR_ID",
  "FFM Issuer Assigned Policy ID": "FFM_ISUR_PLCY_ID",
  "FFM Member First Name": "FFM_MBR_1ST_NM",
  "Issuer DOB": "ISUR_BTH_DT",
  "FFM Issuer Assigned Subscriber ID": "FFM_ISUR_ASGD_SUBR_ID",
  "Issuer Member Last Name": "ISUR_MBR_LAST_NM",
  "Issuer Issuer Assigned Policy ID": "ISUR_ISUR_PLCY_ID",
  "Issuer Member First Name": "ISUR_MBR_1ST_NM",
  "FFM SSN": "FFM_SSN_NB",
  "Issuer QHPID Identifier": "ISUR_QHP_ID",
  "FFM Exchange Assigned Policy ID": "FFM_EXCH_ASGD_PLCY_ID",
  "Issuer Issuer Assigned Subscriber ID": "ISUR_ISUR_ASGD_SUBR_ID",
  "FFM Coverage Year": "FFM_COVA_YR_NB",
  "FFM Issuer Assigned Member ID": "FFM_ISUR_ASGD_MBR_ID",
  "FTI Issuer Overall Record Flag": "FTI_ISUR_OVAL_REC_IN",
  "Issuer SSN": "ISUR_SSN_NB",
  "FFM QHPID Identifier": "FFM_QHP_ID",
  "FFM Exchange Assigned Subscriber ID": "FFM_EXCH_ASGD_SUBR_ID",
  "Issuer Exchange Assigned Policy ID": "ISUR_EXCH_ASGD_PLCY_ID",
  "Issuer Coverage Year": "ISUR_COVA_YR_NB",
  "Issuer Assigned Trace Number": "FTI_ISUR_ASGD_REC_TRAC_NB",
  "Issuer Issuer Assigned Member ID": "ISUR_ISUR_ASGD_MBR_ID",
  "Issuer Member Middle Name": "ISUR_MBR_MIDL_NM",
  "Issuer Exchange Assigned Subscriber ID": "ISUR_EXCH_ASGD_SUBSR_ID",
  "FFM Exchange Assigned Member ID": "FFM_EXCH_ASGD_MBR_ID"
};
var fieldNameMapRCNI = {
  "RCNI KEY": "RCNI_VAL",
  "FFM Member Middle Name": "FFM_MBR_MIDL_NM",
  "FFM DOB": "FFM_BTH_DT",
  "Issuer Exchange Assigned Member ID": "ISUR_EXCH_ASGD_MBR_ID",
  "FFM Issuer Assigned Policy ID": "FFM_ISUR_PLCY_ID",
  "FFM Member First Name": "FFM_MBR_1ST_NM",
  "Issuer DOB": "ISUR_BTH_DT",
  "FFM Issuer Assigned Subscriber ID": "FFM_ISUR_ASGD_SUBR_ID",
  "Issuer Member Last Name": "ISUR_MBR_LAST_NM",
  "Issuer Issuer Assigned Policy ID": "ISUR_ISUR_PLCY_ID",
  "Issuer Member First Name": "ISUR_MBR_1ST_NM",
  "FFM SSN": "FFM_SSN_NB",
  "Issuer QHPID Identifier": "ISUR_QHP_ID",
  "FFM Exchange Assigned Policy ID": "FFM_EXCH_ASGD_PLCY_ID",
  "Issuer Issuer Assigned Subscriber ID": "ISUR_ISUR_ASGD_SUBR_ID",
  "FFM Coverage Year": "FFM_COVA_YR_NB",
  "FFM Issuer Assigned Member ID": "FFM_ISUR_ASGD_MBR_ID",
  "FTI Issuer Overall Record Flag": "FTI_ISUR_OVAL_REC_IN",
  "Issuer SSN": "ISUR_SSN_NB",
  "FFM QHPID Identifier": "FFM_QHP_ID",
  "FFM Exchange Assigned Subscriber ID": "FFM_EXCH_ASGD_SUBR_ID",
  "Issuer Exchange Assigned Policy ID": "ISUR_EXCH_ASGD_PLCY_ID",
  "Issuer Coverage Year": "ISUR_COVA_YR_NB",
  "Issuer Assigned Trace Number": "FTI_ISUR_ASGD_REC_TRAC_NB",
  "Issuer Issuer Assigned Member ID": "ISUR_ISUR_ASGD_MBR_ID",
  "Issuer Member Middle Name": "ISUR_MBR_MIDL_NM",
  "Issuer Exchange Assigned Subscriber ID": "ISUR_EXCH_ASGD_SUBSR_ID",
  "FFM Exchange Assigned Member ID": "FFM_EXCH_ASGD_MBR_ID"
};
var fieldLvlList = ["C121", "D", "F", "G", "I", "J", "K", "L", "M", "NA", "U"];
var recordLvlList = [
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "I",
  "L",
  "M",
  "N",
  "P",
  "R",
  "U",
  "W",
  "Z"
];

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var rcnoListViewRes = [
  {
    recordIdentifier: "RCNI170630115000005",
    rcnoFirstName: "ERIN",
    rcnoLastName: "HILL",
    rcnoExchSubId: "0001567297",
    rcnoSocSecNum: "770404680",
    rcnoContractId: "RCNI17063",
    rcnoFFMPolicyId: "H10162144",
    overallInd: "M"
  }
];

app.post("/save/ListView", (req, res) => {
  var randomNo = randomIntFromInterval();
  var body = req.body;
  var resultData = {
    body: body,
    rcnoListViewRes: rcnoListViewRes,
    errorCodeSearchResult: errorCodeSearchResult
  };
  //  res.sendStatus(200).send(resultData);
  res.json(200, resultData);
});
var rcnoSearchRecords = {
  rcnoSearchRecords: [
    {
      flagDescription:
        "Non-Match with Issuer Action, No FFM Action Due to Uneven Record Match",
      flag: "E",
      count: "95",
      percentage: "9.26%"
    },
    {
      flagDescription: "Non-Match with Issuer Action Required",
      flag: "N",
      count: "329",
      percentage: "32.09%"
    },
    {
      flagDescription:
        "Non-Match with No Issuer Action, No FFM Action Due   to Uneven Record Match",
      flag: "P",
      count: "601",
      percentage: "58.63%"
    }
  ],
  flagTotalDesc: "Grand Total(Selected Records/Total Records in Files)",
  totalCount: "1025",
  totalPercentage: "100.00%"
};

//?errCategory=QI_INFO
app.get("/rcno/getFieldInfo", (req, res) => {
  let responseData = {};

  //M->Field Name Response:
  responseData["rcnoSearchRecords"] = rcnoSearchRecords;
  responseData["rcnoFieldNameList"] = rcnoFieldNameList;
  responseData["rcniFieldNameList"] = rcniFieldNameList;
  responseData["fieldNameMapRCNO"] = fieldNameMapRCNO;
  responseData["fieldNameMapRCNI"] = fieldNameMapRCNI;

  responseData["fieldLvlList"] = fieldLvlList;
  responseData["recordLvlList"] = recordLvlList;

  responseData["errorCategoryOptions"] = errorCategoryOptions;
  responseData["errorCodeDescOptions"] = errorCodeDescOptions;
  responseData["errCategoryList"] = errCategoryList;
  responseData["getSearchErrorDesc"] = getSearchErrorDesc;

  res.status(200).send(responseData);
});

app.get("/geterrorcodedescusgerrctg", (req, res) => {
  var data = req.query.errCategory;
  var resultData = {
    rcnoListViewRes: rcnoListViewRes,
    errorCodeSearchResult: errorCodeSearchResult
  };
  res.status(200).send(resultData);
});

app.listen(3000, function() {
  console.log("Server running port localhost:3000");
});
