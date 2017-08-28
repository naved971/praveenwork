var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.json())

app.get('/rcno/getFieldInfo', (req, res) => {


    let responseData = {};


    //M->Field Name Response: 
    responseData["rcnoFieldNameList"] = ["Praveen/Broker-NPN","Naved/Broker-NPN","Agent/Broker-NPN", "Agent/Broker-Name", "Applied-APTC-Amount", "Applied-APTC-Effective-Date", "Applied-APTC-End-Date", "Benefit-End-Date", "Benefit-Start-Date", "CSR-AMT", "CSR-Effective-Date", "CSR-End-Date", "Coverage-Year", "DOB", "End-of-Year-Termination-Indicator", "Enrollment-Group-Member-Count", "Exchange-Assigned-Member-ID", "Exchange-Assigned-Policy-ID", "Exchange-Assigned-Subscriber-ID", "Gender", "Initial-Premium-Paid-Status", "Issuer-Assigned Member-ID", "Issuer-Assigned-Policy-ID", "Issuer-Assigned-Subscriber-ID", "Mailing-Address-City", "Mailing-Address-State", "Mailing-Address-Street", "Mailing-Address-Street-Line-2", "Mailing-Address-Zip-Code", "Member-First-Name", "Member-Last-Name", "Member-Middle-Name", "Member-Premium-Amount", "Member-Premium-Effective-Date", "Member-Premium-End-Date", "Paid-Through-Date", "QHPID-Identifier", "Rating-Area", "Relationship-to-Subscriber-Indicator", "Residential-City", "Residential-County-Code", "Residential-State", "Residential-Street-Address", "Residential-Street-Address-Line-2", "Residential-Zip-Code", "SSN", "Subscriber-Indicator", "Telephone-Number", "Tobacco-Status", "Total-Premium-Amount", "Total-Premium-Effective-Date", "Total-Premium-End-Date"];
    responseData["fieldLvlList"] = ["C121", "D", "F", "G", "I", "J", "K", "L", "M", "NA", "U"];
    responseData["recordLvlList"] = ["B", "C", "D", "E", "F", "G", "I", "L", "M", "N", "P", "R", "U", "W", "Z"];

    res.status(200).send(responseData);


});

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var rcnoListViewRes = [
    {
        "recordIdentifier": "RCNI170630115000005",
        "rcnoFirstName": "ERIN",
        "rcnoLastName": "HILL",
        "rcnoExchSubId": "0001567297",
        "rcnoSocSecNum": "770404680",
        "rcnoContractId": "RCNI17063",
        "rcnoFFMPolicyId": "H10162144",
        "overallInd": "M"
    }
    /*,
       {
       "recordIdentifier": "RCNI170630115000006",
       "rcnoFirstName": "TOMMY",
       "rcnoLastName": "PIIRA",
       "rcnoExchSubId": "0001798469",
       "rcnoSocSecNum": "594957396",
       "rcnoContractId": "RCNI17063",
       "rcnoFFMPolicyId": "H10166177",
       "overallInd": "M"
    },
       {
       "recordIdentifier": "RCNI170630115000015",
       "rcnoFirstName": "JACK",
       "rcnoLastName": "SHANHOLTZ",
       "rcnoExchSubId": "0002417445",
       "rcnoSocSecNum": "356940018",
       "rcnoContractId": "RCNI17063",
       "rcnoFFMPolicyId": "H10202275",
       "overallInd": "C"
    }*/
]


app.post('/save/ListView', (req, res) => {
    var randomNo = randomIntFromInterval();
    var resultData = { "rcnoListViewRes": rcnoListViewRes }
    var year = req.body.coverageYear;
    res.sendStatus(200).send(resultData);
})

app.listen(3000, function () {
    console.log("Server running port localhost:3000");
})