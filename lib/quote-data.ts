export const PKG_QUOTES = {
  "pkg-mca-compliance-private-limited": {
    "name": "MCA Compliance - Private Limited",
    "price": "₹14,999",
    "per": "/ year",
    "note": "All mandatory annual MCA filings for a Pvt Ltd company.",
    "scope": "6 services"
  },
  "pkg-mca-compliance-llp": {
    "name": "MCA Compliance - LLP",
    "price": "₹9,999",
    "per": "/ year",
    "note": "All mandatory annual MCA filings for an LLP.",
    "scope": "4 services"
  },
  "pkg-gst-compliance-package": {
    "name": "GST Compliance Package",
    "price": "₹11,999",
    "per": "/ year",
    "note": "Complete GST return filing — GSTR-1, 3B and 9.",
    "scope": "3 services"
  },
  "pkg-mca-gst-private-limited": {
    "name": "MCA + GST - Private Limited",
    "price": "₹23,999",
    "per": "/ year",
    "note": "MCA and GST compliance for a Pvt Ltd company, combined.",
    "scope": "9 services"
  },
  "pkg-mca-gst-llp": {
    "name": "MCA + GST - LLP",
    "price": "₹21,499",
    "per": "/ year",
    "note": "MCA and GST compliance for an LLP, combined.",
    "scope": "7 services"
  },
  "pkg-complete-suite-mca-gst-tds-pvt-ltd": {
    "name": "Complete Suite - MCA + GST + TDS (Pvt Ltd)",
    "price": "₹29,999",
    "per": "/ year",
    "note": "End-to-end annual compliance for a Pvt Ltd company.",
    "scope": "11 services"
  },
  "pkg-complete-suite-mca-gst-tds-llp": {
    "name": "Complete Suite - MCA + GST + TDS (LLP)",
    "price": "₹26,999",
    "per": "/ year",
    "note": "End-to-end annual compliance for an LLP.",
    "scope": "9 services"
  },
  "pkg-essential": {
    "name": "Essential",
    "price": "₹6,999",
    "per": "",
    "note": "Complete Pvt Ltd incorporation, end-to-end. DSC & government fees at actuals.",
    "scope": "8 deliverables",
    "alaCarte": "",
    "save": "",
    "deliverables": [
      "Digital signature processing — 2 directors",
      "DIN allotment within SPICe+",
      "Company name reservation",
      "MoA & AoA drafting",
      "SPICe+ filing & Certificate of Incorporation",
      "Company PAN & TAN",
      "ESIC & EPF enrolment (via SPICe+)",
      "Bank account opening assistance"
    ],
    "govtLine": "DSC & government fees at actuals — compute yours in the cost calculator",
    "docs": [
      "PAN & Aadhaar of all directors & shareholders",
      "Passport-size photographs of directors",
      "Address proof of directors (bank statement / utility bill, not older than 2 months)",
      "Registered office proof: utility bill + rent agreement / ownership proof",
      "NOC from the property owner",
      "Email IDs & mobile numbers of all directors"
    ]
  },
  "pkg-professional": {
    "name": "Professional",
    "price": "₹18,999",
    "per": "",
    "note": "Incorporation plus GST & MSME registration — invoice-ready from day one. DSC & government fees at actuals.",
    "scope": "10 deliverables",
    "alaCarte": "₹28,501",
    "save": "₹9,502",
    "deliverables": [
      "Digital signature processing — 2 directors",
      "DIN allotment within SPICe+",
      "Company name reservation",
      "MoA & AoA drafting",
      "SPICe+ filing & Certificate of Incorporation",
      "Company PAN & TAN",
      "ESIC & EPF enrolment (via SPICe+)",
      "Bank account opening assistance",
      "GST registration",
      "MSME / Udyam registration"
    ],
    "govtLine": "DSC & government fees at actuals — compute yours in the cost calculator",
    "docs": [
      "PAN & Aadhaar of all directors & shareholders",
      "Passport-size photographs of directors",
      "Address proof of directors (bank statement / utility bill, not older than 2 months)",
      "Registered office proof: utility bill + rent agreement / ownership proof",
      "NOC from the property owner",
      "Email IDs & mobile numbers of all directors",
      "Bank proof & premises proof (for GST registration)"
    ]
  },
  "pkg-elite": {
    "name": "Elite",
    "price": "₹34,999",
    "per": "",
    "note": "Everything in Professional plus all mandatory first-year MCA filings (INC-20A, ADT-1, AOC-4, MGT-7A, DIR-3 KYC). DSC & government fees at actuals.",
    "scope": "14 deliverables",
    "alaCarte": "₹45,502",
    "save": "₹10,503",
    "deliverables": [
      "Digital signature processing — 2 directors",
      "DIN allotment within SPICe+",
      "Company name reservation",
      "MoA & AoA drafting",
      "SPICe+ filing & Certificate of Incorporation",
      "Company PAN & TAN",
      "ESIC & EPF enrolment (via SPICe+)",
      "Bank account opening assistance",
      "GST registration",
      "MSME / Udyam registration",
      "Commencement of business filing (INC-20A)",
      "First auditor appointment (ADT-1)",
      "First annual ROC filings (AOC-4 + MGT-7A)",
      "Director KYC filings (DIR-3 KYC)"
    ],
    "govtLine": "DSC & government fees at actuals — compute yours in the cost calculator",
    "docs": [
      "PAN & Aadhaar of all directors & shareholders",
      "Passport-size photographs of directors",
      "Address proof of directors (bank statement / utility bill, not older than 2 months)",
      "Registered office proof: utility bill + rent agreement / ownership proof",
      "NOC from the property owner",
      "Email IDs & mobile numbers of all directors",
      "Bank proof & premises proof (for GST registration)"
    ]
  }
} as const;

export const QUOTE_ENTITY = {
  "private-limited-company": "pvt",
  "one-person-company-opc": "opc",
  "limited-liability-partnership-llp": "llp",
  "llp-registration": "llp",
  "section-8-company-registration": "sec8"
} as const;
