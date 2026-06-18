export const FINDER = {
  "steps": [
    {
      "key": "stage",
      "q": "Where are you right now?",
      "options": [
        {
          "v": "idea",
          "label": "Just an idea",
          "sub": "Not registered yet"
        },
        {
          "v": "registering",
          "label": "Ready to register",
          "sub": "Picking a structure"
        },
        {
          "v": "running",
          "label": "Already running",
          "sub": "Need compliance / filings"
        },
        {
          "v": "protect",
          "label": "Protecting my brand",
          "sub": "Trademark / IP"
        }
      ]
    },
    {
      "key": "entity",
      "q": "How do you want to operate?",
      "options": [
        {
          "v": "pvt",
          "label": "Private Limited",
          "sub": "Most common for startups"
        },
        {
          "v": "llp",
          "label": "LLP",
          "sub": "Lighter compliance"
        },
        {
          "v": "solo",
          "label": "Solo / Proprietor",
          "sub": "Just me, for now"
        },
        {
          "v": "unsure",
          "label": "Not sure yet",
          "sub": "Help me decide"
        }
      ]
    },
    {
      "key": "need",
      "q": "What matters most to you?",
      "options": [
        {
          "v": "fast",
          "label": "Speed",
          "sub": "Get live quickly"
        },
        {
          "v": "cost",
          "label": "Lowest cost",
          "sub": "Tight budget"
        },
        {
          "v": "compliant",
          "label": "Staying compliant",
          "sub": "No penalties, ever"
        },
        {
          "v": "all",
          "label": "All of it",
          "sub": "Done-for-me"
        }
      ]
    }
  ],
  "results": {
    "idea": {
      "title": "Start clean from day one",
      "services": [
        "Private Limited Company",
        "MSME / Udyam Registration",
        "GST Registration"
      ],
      "pkg": null,
      "note": "We'll help you pick the right structure before you spend a rupee."
    },
    "registering_pvt": {
      "title": "Private Limited — bank-ready",
      "services": [
        "Private Limited Company",
        "GST Registration",
        "Digital Signature (DSC)"
      ],
      "pkg": "mca-pvt",
      "note": "Incorporation plus the filings you'll need right after."
    },
    "registering_llp": {
      "title": "LLP — limited liability, lighter load",
      "services": [
        "LLP Registration",
        "GST Registration",
        "Digital Signature (DSC)"
      ],
      "pkg": "mca-llp",
      "note": "The lean structure, set up properly."
    },
    "registering_solo": {
      "title": "Start solo, stay legit",
      "services": [
        "MSME / Udyam Registration",
        "GST Registration",
        "Income Tax Return Filing"
      ],
      "pkg": null,
      "note": "Formalise without heavy compliance — upgrade later."
    },
    "running_pvt": {
      "title": "Keep your Pvt Ltd penalty-free",
      "services": [
        "AOC-4 Annual Return Filing",
        "MGT-7A Annual Return Filing",
        "GST Registration"
      ],
      "pkg": "complete-pvt",
      "note": "One engagement covers MCA, GST and TDS."
    },
    "running_llp": {
      "title": "Keep your LLP penalty-free",
      "services": [
        "Form 8 (Annual Return)",
        "Form 11 (Annual Return)",
        "GST Registration"
      ],
      "pkg": "complete-llp",
      "note": "Everything an LLP must file, bundled."
    },
    "protect": {
      "title": "Lock down your brand",
      "services": [
        "Trademark Registration",
        "Copyright Logo",
        "Copyright of Website"
      ],
      "pkg": null,
      "note": "Protect the name, logo and content that make you, you."
    },
    "default": {
      "title": "A setup tailored to you",
      "services": [
        "CA Consultation",
        "GST Registration",
        "Income Tax Return Filing"
      ],
      "pkg": "gst",
      "note": "Tell us a little more and we'll fine-tune this."
    }
  }
} as const;

export const PKG_MAP = {
  "mca-pvt": {
    "name": "MCA Compliance — Private Limited",
    "fee": "₹14,999",
    "save": 11
  },
  "mca-llp": {
    "name": "MCA Compliance — LLP",
    "fee": "₹9,999",
    "save": 15
  },
  "gst": {
    "name": "GST Compliance Package",
    "fee": "₹11,999",
    "save": 20
  },
  "mca-gst-pvt": {
    "name": "MCA + GST — Private Limited",
    "fee": "₹23,999",
    "save": 25
  },
  "mca-gst-llp": {
    "name": "MCA + GST — LLP",
    "fee": "₹21,499",
    "save": 20
  },
  "complete-pvt": {
    "name": "Complete Suite — MCA + GST + TDS (Pvt Ltd)",
    "fee": "₹29,999",
    "save": 30
  },
  "complete-llp": {
    "name": "Complete Suite — MCA + GST + TDS (LLP)",
    "fee": "₹26,999",
    "save": 25
  }
} as const;
