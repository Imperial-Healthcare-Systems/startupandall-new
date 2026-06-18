import Link from "next/link";
import Image from "next/image";
import RawSvg from "./RawSvg";

const WA_LINK =
  "https://wa.me/919028697373?text=Hi%20Startup%20And%20All,%0A%0AI%20visited%20your%20website%20and%20would%20like%20to%20discuss%20my%20business%20requirements.%0A%0APlease%20guide%20me%20on%20the%20next%20steps.%0A%0AThanks!";

const ic = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  calc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="12" x2="8.01" y2="12"/><line x1="12" y1="12" x2="12.01" y2="12"/><line x1="16" y1="12" x2="16.01" y2="12"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="12" y1="16" x2="12.01" y2="16"/><line x1="16" y1="16" x2="16.01" y2="16"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>',
  building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="7" x2="9.01" y2="7"/><line x1="15" y1="7" x2="15.01" y2="7"/><line x1="9" y1="11" x2="9.01" y2="11"/><line x1="15" y1="11" x2="15.01" y2="11"/><path d="M9 22v-4h6v4"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  badge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="11" r="2"/><path d="M5 17c.5-1.5 1.8-2 3-2s2.5.5 3 2"/><line x1="14" y1="9" x2="19" y2="9"/><line x1="14" y1="13" x2="19" y2="13"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  fb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  li: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4v2"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l16 16"/><path d="M20 4L4 20"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
};

const quickLinks = [
  { href: "/", label: "Home", icon: ic.home },
  { href: "/about", label: "About Us", icon: ic.user },
  { href: "/services", label: "Services & Pricing", icon: ic.tag },
  { href: "/service/gst-registration", label: "Tax & Compliance", icon: ic.doc },
  { href: "/faqs", label: "FAQs", icon: ic.help },
  { href: "/cost-calculator", label: "Cost Calculator", icon: ic.calc },
  { href: "/contact", label: "Contact Us", icon: ic.mail },
];

const ourServices = [
  { href: "/service/private-limited-company", label: "Private Limited Company", icon: ic.building },
  { href: "/service/gst-registration", label: "GST Registration", icon: ic.doc },
  { href: "/service/trademark-registration", label: "Trademark Registration", icon: ic.shield },
  { href: "/service/msme-registration", label: "MSME Registration", icon: ic.badge },
  { href: "/service/income-tax-return-filing", label: "Income Tax Return", icon: ic.calc },
  { href: "/service/import-export-code-iec", label: "Import Export Code", icon: ic.globe },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="ft-watermark" aria-hidden="true">
        STARTUP&nbsp;AND&nbsp;ALL
      </div>
      <div className="wrap">
        <div className="ft-grid">
          <div className="ft-brand">
            <span className="ft-logo">
              <Image src="/img/f4fe665155.png" alt="StartupAndAll — start, protect and run your business" width={170} height={40} />
            </span>
            <p className="ft-tag">Start, protect, and run your business &mdash; without the paperwork headache.</p>
            <span className="ft-div" aria-hidden="true" />
            <p className="ft-brandof">A brand of</p>
            <p className="ft-llp">Sachin Gadekar Advisory LLP</p>
            <div className="ft-social">
              <a href="#" aria-label="Facebook"><RawSvg html={ic.fb} /></a>
              <a href="#" aria-label="LinkedIn"><RawSvg html={ic.li} /></a>
              <a href="#" aria-label="X (Twitter)"><RawSvg html={ic.x} /></a>
              <a href="#" aria-label="Instagram"><RawSvg html={ic.ig} /></a>
            </div>
          </div>

          <div>
            <h4 className="ft-h">Quick Links</h4>
            <ul className="ft-links">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>
                    <span className="ft-li-ic"><RawSvg html={l.icon} /></span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="ft-h">Our Services</h4>
            <ul className="ft-links">
              {ourServices.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>
                    <span className="ft-li-ic"><RawSvg html={l.icon} /></span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="ft-h">Reach Us</h4>
            <ul className="ft-contact">
              <li>
                <span className="ft-li-ic"><RawSvg html={ic.phone} /></span>
                <span>
                  <a href="tel:+919028697373">+91 90286 97373</a>
                  <br />
                  <a className="ft-wa-link" href={WA_LINK} target="_blank" rel="noopener">
                    WhatsApp
                  </a>
                </span>
              </li>
              <li>
                <span className="ft-li-ic"><RawSvg html={ic.mail} /></span>
                <span>
                  <a href="mailto:contact@startupandall.com">contact@startupandall.com</a>
                </span>
              </li>
              <li>
                <span className="ft-li-ic"><RawSvg html={ic.pin} /></span>
                <span>Allianze House, Office No.&nbsp;205, Shahunagar, Chinchwad, Pune 411019, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="ft-bottom">
          <span>&copy; 2026 Startup And All. All rights reserved.</span>
          <nav className="ft-policy" aria-label="Legal pages">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <i />
            <Link href="/terms-of-use">Terms of Use</Link>
            <i />
            <Link href="/refund-policy">Refund Policy</Link>
          </nav>
          <span className="ft-made">
            Built with &#10084;&#65039; in India &#127470;&#127475; by{" "}
            <a href="https://www.imperialtechinnovations.com/" target="_blank" rel="noopener" className="ft-credit">
              Imperial Tech Innovations
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
