export const DUMMY_USER_NAME = 'Anandhan,Arunagiri';
export const SUBMENU_DASHBOARD_VIEW = ['Dashboard View', 'End To End View', 'List View', 'Event Detail View'];
export const DASHBOARD_VIEW_LABEL_TEXT = 'Track enrollment received from all applicable source systems';
export const SYS_TO_SYS_RECON_LABEL_TEXT = 'View reconciliation reports for discrepancies between source systems';
export const EXTERNAL_LINKS_LABEL_TEXT = 'Access portals and reports external to the EM&B Dashboard';
export const ERROR_EXCEPTIONS_LABEL_TEXT = 'View errors from applicable source systems and Siebel Work Queue Exceptions';
export const USER_ADMIN_LABEL_TEXT = 'Perform Administration actions on users';
export const DASHBOARD_VIEW_BUTTON_NAME = 'Dashboard View';
export const SYS_TO_SYS_RECON_BUTTON_NAME = 'System Reconciliation';
export const EXTERNAL_LINKS_BUTTON_NAME = 'External Links';
export const ERROR_EXCEPTIONS_BUTTON_NAME = 'Error/Exceptions';
export const USER_ADMIN_BUTTON_NAME = 'User Administration';
export const END_TO_END_PAGE_URL = '/nebert/dashboard';
export const SYSTEM_TO_SYSTEM_RECON_PAGE_URL = '/nebert/systemReconciliation';
export const EXTERNAL_LINKS_PAGE_URL = '/nebert/externalLinks';
export const ERROR_EXCEPTIONS_PAGE_URL = '/nebert/exceptions';
export const TECHNICAL_EXCEPTIONS_PAGE_URL = '/nebert/technicalExceptions';
export const USER_ADMIN_PAGE_URL = '/nebert/userAdministration';
export const EVENT_DETAIL_VIEW_URL = '/nebert/eventView/:transactionId';
export const TRANSACTION_STATUS_OPTIONS = [
    { label: 'ALL', value: 'ALL' },
    { label: 'Error', value: 'Error' },
    { label: 'Reconciled', value: 'Reconciled' },
    { label: 'Successful', value: 'Successful' }];


export const TRANSACTION_TYPE_OPTIONS = [
    { label: 'ALL', value: 'ALL' },
    { label: 'New Enrollment', value: 'NewEnrollment' }
];
export const MARKET_SEGMENT_OPTIONS = [
    { label: 'ALL', value: 'ALL' },
    { label: 'On Exchange', value: 'OnExchange' },
    { label: 'Off Exchange', value: 'OffExchange' },
    { label: 'Pre-ACA', value: 'PreACA' }
];
export const PRODUCT_TYPE_OPTIONS = [
    { label: 'ALL', value: 'ALL' },
    { label: 'Health', value: 'Health' },
    { label: 'Dental', value: 'Dental' }
];
export const SOURCE_SYSTEM_OPTIONS = [{ label: 'ALL', value: 'ALL' },
{ label: 'Edifecs', value: 'Edifecs' },
{ label: 'PSP-Paper', value: 'PSP-Paper' },
{ label: 'Sales Connect', value: 'Sales Connect' }];
export const TARGET_SOURCE_SYSTEM_OPTIONS = [
    { label: 'Edifecs', value: 'Edifecs' },
    { label: 'PSP-Paper', value: 'PSP-Paper' },
    { label: 'PSP', value: 'PSP' },
    { label: 'Sales Connect', value: 'Sales Connect' },
    { label: 'NASCO', value: 'NASCO' },
    { label: 'CIP', value: 'CIP' },
    { label: 'Diamond', value: 'Diamond' },
    { label: 'DIS UCD', value: 'DIS UCD' },
    { label: 'DIS Davis', value: 'DIS Davis' },
    { label: 'DIS Prime', value: 'DIS Prime' },
    { label: 'UCD', value: 'UCD' }
];
export const LIST_VIEW_URL = '/nebert/listView';
//Errors/Exceptions
export const SUBMENU_EXCEPTIONS_VIEW = ['Errors/Exceptions', 'Business Exceptions', 'Technical Exceptions'];
export const EXCEPTION_SOURCES = {
    "CIP": "CIP",
    "DAVIS": "DAVIS",
    "DISDAVIS": "DIS DAVIS",
    "DISPRIME": "DIS PRIME",
    "DISUCD": "DIS UCD",
    "DMD": "DMD",
    "EGW": "EGW",
    "NASCO": "NASCO",
    "NASCOBAR0001": "NASCO BAR0001",
    "NASCOBAR0405": "NASCO BAR0405",
    "NASCOBAR0425-01": "NASCO BAR0425-01",
    "NASCOBAR4101": "NASCO BAR4101",
    "NASCOBAR4350": "NASCO BAR4350",
    "NASCOBAR4501": "NASCO BAR4501",
    "NASCOBAR5015": "NASCO BAR5015",
    "NASCOBAR9400": "NASCO BAR9400",
    "NASCOBAS-245": "NASCO BAS-245",
    "NASCOBILLTRUSTCRRR": "NASCO BILLTRUSTCRRR",
    "NASCOBMI": "NASCO BMI",
    "NASCOCRIBAS180": "NASCO CRIBAS180",
    "NASCOEMM381": "NASCO EMM381",
    "NASCOMANUALCRRR": "NASCO MANUALCRRR",
    "NASCOMELLONLOCKBOX": "NASCO MELLONLOCKBOX",
    "NASCOMEMERN2400": "NASCO MEMERN2400",
    "NASCOMEMERN491": "NASCO MEMERN491",
    "NASCOMER0800": "NASCO MER0800",
    "NASCOMER1000": "NASCO MER1000",
    "NASCOMER1100": "NASCO MER1100",
    "NASCOMER2600": "NASCO MER2600",
    "NASCOMER4100": "NASCO MER4100",
    "NASCOMERN2500-01": "NASCO MERN2500-01",
    "NASCOMERN2500-02": "NASCO MERN2500-02",
    "NASCORETROADJUSTMNT": "NASCO RETROADJUSTMNT",
    "ONEIL": "ONEIL",
    "ONEILBADADDRESS": "ONEIL BAD ADDRESS",
    "ONEILBADEMAIL": "ONEIL BAD EMAIL",
    "ONEILBENEFITSUMMARY": "ONEIL BENEFIT SUMMARY",
    "ONEILCORRESPONDENCE": "ONEIL CORRESPONDENCE",
    "ONEILIDCARD": "ONEILI DCARD",
    "ONEILINVOICE": "ONEIL INVOICE",
    "PEOPLESOFT": "PEOPLE SOFT",
    "PEP": "PEP",
    "PSP": "PSP",
    "PSP-PAPER": "PSP-PAPER",
    "RCNI": "RCNI",
    "RCNO": "RCNO",
    "SALESCONNECT": "SALES CONNECT",
    "UCD": "UCD",
    "EDIFECS": "EDIFECS",
    "NASCOCORRESEXTRACT": "NASCO CORRESEXTRACT",
    "PCP": "PCP"
}
export const EXCEPTION_TYPES = {
    "BillingReconDentalOffExch": "Billing Recon Dental Off Exch",
    "BillingReconDentalOnExch": "Billing Recon Dental On Exch",
    "BillingReconDentalPreACA": "Billing Recon Dental Pre ACA",
    "BillingReconDentalpreACA": "Billing Recon Dental pre ACA",
    "BillingReconHLTHOffExch": "Billing Recon HLTH Off Exch",
    "BillingReconHLTHOnExch": "Billing Recon HLTH On Exch",
    "Dishonors": "Dishonors",
    "EnrollDentalOffExch": "Enroll Dental Off Exch",
    "EnrollDentalOnExch": "Enroll Dental On Exch",
    "EnrollHLTHOffExch": "Enroll HLTH Off Exch",
    "EnrollHLTHOnExch": "Enroll HLTH On Exch",
    "EnrollmentResponseCorrection": "EnrollmentResponseCorrection",
    "CIPDiamondRecon": "CIP Diamond Recon",
    "EnrollDentalpreACA": "Enroll Dental pre ACA",
    "EnrollmentUpdateCorrection": "EnrollmentUpdateCorrection",
    "PreAuditRecon": "Pre Audit Recon",
    "RetroactivityAdjDental": "Retroactivity Adj Dental",
    "Fulfillment": "Fulfillment",
    "MECIPRecon": "ME CIP Recon",
    "Payment": "Payment",
    "PCPException": "PCP Exception",
    "PriorUpdatePending": "PriorUpdatePending",
    "RateMismatchDental": "Rate Mismatch Dental",
    "RateMismatchHealth": "Rate Mismatch Health",
    "RetroactivityAdjHealth": "Retroactivity Adj Health",
    "SuspenseBinder": "Suspense Binder",
    "SuspensePremium": "Suspense Premium"


}
export const EXCEPTION_STATUS = {
    "Submitted": "SUBMITTED",
    "Successful": "SUCCESSFUL",
    "Error": "ERROR",
    "Duplicate": "DUPLICATE"
}
export const MKT_OPTIONS = {
    "OnExchange": "On Exchange",
    "OffExchange": "Off Exchange",
    "PreACA": "Pre-ACA",
}
export const TRANS_TYPE = {
    "NewEnrollment": "New Enrollment",
}
export const PRODUCT_TYPE = {
    "Health": "Health",
    "Dental": "Dental",
}
export const SOURCE_SYSTEM = {
    'Edifecs': 'Edifecs',
    'PSP-Paper': 'PSP-Paper',
    'PSP': 'PSP',
    'Sales Connect': 'Sales Connect',
    'NASCO': 'NASCO',
    'CIP': 'CIP',
    'Diamond': 'Diamond',
    'DIS UCD': 'DIS UCD',
    'DIS Davis': 'DIS Davis',
    'DIS Prime': 'DIS Prime',
    'UCD': 'UCD'
}


export const SUBMENU_USER_ADMIN_VIEW = ['User Administration', 'Maintain Errors'];


export const ERROR_TYPES = {
    'Business': 'Business',
    'Technical': 'Technical',
    'Informational': 'Informational',
    'Business/Technical': 'Business/Technical'
}
// export const HOME_PAGE_URL = '/nebert/LoadDatabaseServlet';
// export const GET_TXN_COUNTS_URL = '/nebert/ui/endtoendview/gettransactioncounts';
// export const GET_LIST_VIEW_URL = '/nebert/ui/listview/gettransactionslist';
// export const GET_EVENT_VIEW_URL = '/nebert/ui/detailview/geteventdetails';
// export const EXCEPTIONS_SERVICE_URL = "/nebert/ui/exceptionreconview/getexceptiondetails";
// export const TECHNICAL_EXCEPTION_SERVICE_URL = "/nebert/ui/technicalerrorsview/gettecherrlist";
// export const MAINTAIN_ERROR_PAGE_URL = "/nebert/ui/maintainerrorview/getmtnerrlist";
export const HOME_PAGE_URL = '/';
export const GET_TXN_COUNTS_URL = 'http://localhost:9080/nebert/ui/endtoendview/gettransactioncounts';
export const GET_LIST_VIEW_URL = 'http://localhost:9080/nebert/ui/listview/gettransactionslist';
export const GET_EVENT_VIEW_URL = 'http://localhost:9080/nebert/ui/detailview/geteventdetails';
export const EXCEPTIONS_SERVICE_URL = "http://localhost:9080/nebert/ui/exceptionreconview/getexceptiondetails";
export const TECHNICAL_EXCEPTION_SERVICE_URL = "http://localhost:9080/nebert/ui/technicalerrorsview/gettecherrlist";
export const MAINTAIN_ERROR_PAGE_URL = "http://localhost:9080/nebert/ui/maintainerrorview/getmtnerrlist";






