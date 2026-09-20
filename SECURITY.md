# MarketGrid Security & Responsible Disclosure Policy

At MarketGrid, the security of our multi-tenant e-commerce platform, customer data, and vendor partner ecosystems is a top priority. We welcome security researchers, ethical hackers, and community members to inspect our systems responsibly and report any potential vulnerabilities.

---

## 🛡️ Scope of Security Testing

### In-Scope Targets
- Public Storefront (`/`, `/products`, `/categories`, `/vendors`)
- Customer Authentication & Account Security (`/login`, `/register`, `/customer/*`)
- Vendor Studio Portal & Onboarding (`/vendor/*`, `/register?role=vendor`)
- Admin Governance Desk (`/admin/*`)
- REST APIs & OTP Verification endpoints (`/api/auth/*`, `/api/vendors/*`)

### Out-of-Scope Activities
- Denial of Service (DoS/DDoS) attacks against MarketGrid infrastructure
- Social engineering or phishing of MarketGrid employees or sellers
- Spamming or automated brute-force attempts without rate-limiting testing controls
- Destruction or corruption of live customer/vendor data

---

## 🐞 Bug Bounty Severity & Tiers

Vulnerabilities are evaluated using CVSS v3.1 standards:

| Severity Level | CVSS Score Range | Examples |
| :--- | :--- | :--- |
| **Critical** | 9.0 - 10.0 | Remote Code Execution (RCE), Authentication Bypass into Admin Governance, Unauthenticated KYC Data Exfiltration |
| **High** | 7.0 - 8.9 | Broken Object Level Authorization (BOLA), Unauthorized Vendor Catalog Alteration, OTP Bypass |
| **Medium** | 4.0 - 6.9 | Stored/Reflected Cross-Site Scripting (XSS), CSRF on state-changing actions, IDOR in vendor accounts |
| **Low** | 0.1 - 3.9 | Minor Information Disclosure, missing non-critical security headers |

---

## 📩 Reporting a Vulnerability

If you discover a security flaw or vulnerability in MarketGrid, please report it via our security protocol:

1. **Security Email**: Contact `security@marketgrid.io`
2. **Details Required**:
   - Detailed description of the vulnerability and potential impact.
   - Step-by-step reproduction steps or Proof of Concept (PoC).
   - Affected URLs, endpoints, or components.
3. **Response SLA**:
   - **Triage Acknowledgment**: Within 24 business hours.
   - **Fix & Patch Deployment**: Within 3-7 business days depending on severity.

---

## 🔒 Responsible Disclosure Guidelines

- Do not disclose the vulnerability publicly until MarketGrid has verified, patched, and released a fix.
- Do not exploit a vulnerability beyond the minimal proof necessary to demonstrate impact.
- Act in good faith to avoid privacy violations, data destruction, and service degradation.
