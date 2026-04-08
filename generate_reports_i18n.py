from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor, white
from reportlab.lib.units import mm
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable
)
from datetime import datetime

PRIMARY = HexColor("#C2267A")
PRIMARY_DARK = HexColor("#9E1D63")
DARK = HexColor("#1a1a1a")
GRAY = HexColor("#6b7280")
LIGHT_GRAY = HexColor("#f3f4f6")
RED = HexColor("#dc2626")
ORANGE = HexColor("#ea580c")
YELLOW = HexColor("#ca8a04")
GREEN = HexColor("#16a34a")

# ── TRANSLATIONS ──

LANG = {
  "no": {
    "file": "EKH_Grafisk_Sikkerhetsrapport_2026.pdf",
    "header_right": "SIKKERHETSRAPPORT - KONFIDENSIELT",
    "footer_left": "Konfidensielt - Kun til intern bruk for EKH Grafisk AS",
    "footer_page": "Side",
    "title": "Sikkerhetsrevisjon",
    "subtitle": "Sarbarhetsanalyse av ekh.no/send-filer og filer.ekh.no",
    "meta": [
        ["Rapportdato:", datetime.now().strftime("9. april 2026")],
        ["Mal:", "https://www.ekh.no/send-filer"],
        ["Omfang:", "Filemail-skjema, server filer.ekh.no, CMS admin"],
        ["Klassifisering:", "KONFIDENSIELT"],
        ["Metode:", "Ikke-invasiv analyse (ingen aktiv utnyttelse)"],
    ],
    "exec_summary": "SAMMENDRAG",
    "toc_title": "Innhold",
    "toc": [
        "1. Sammendrag",
        "2. KRITISK: Filemail-skjema uten beskyttelse",
        "3. KRITISK: CMS-administrasjonspanel eksponert",
        "4. HOY: Personopplysninger om ansatte eksponert",
        "5. HOY: Iframe uten sikkerhetsisolering",
        "6. MIDDELS: Tilgjengelige serverkataloger",
        "7. MIDDELS: Manglende sikkerhetshoder",
        "8. Kjente CVE-er for CMS Made Simple",
        "9. Sok etter e-postlekkasjer",
        "10. Prioriterte anbefalinger",
    ],
    "s1_title": "1. Sammendrag",
    "s1_p1": (
        "Det er gjennomfort en ikke-invasiv sikkerhetsanalyse av siden "
        "<b>ekh.no/send-filer</b> og tilhorende infrastruktur (<b>filer.ekh.no</b>). "
        "Analysen avdekket <b>2 kritiske sarbarheter</b>, <b>2 hoye</b> og "
        "<b>3 med middels/lav alvorlighetsgrad</b> som krever umiddelbar oppmerksomhet."
    ),
    "s1_p2": (
        "Kombinasjonen av et ubeskyttet filopplastingsskjema, offentlig eksponerte "
        "ansattnavn, og et utdatert og internettilgjengelig CMS-administrasjonspanel "
        "skaper en betydelig angrepsvektor som kan resultere i "
        "ekstern kodekjoring, distribusjon av malware rettet mot ansatte, eller "
        "fullstendig kompromittering av filserveren."
    ),
    "s2_title": "2. Filemail-skjema uten Beskyttelse",
    "severity_critical": "ALVORLIGHETSGRAD: KRITISK",
    "severity_high": "ALVORLIGHETSGRAD: HOY",
    "severity_medium": "ALVORLIGHETSGRAD: MIDDELS",
    "cvss_90": "Estimert CVSS: 9.0+",
    "cvss_95": "Estimert CVSS: 9.5+",
    "affected_url": "Pavirket URL:",
    "embedded_in": "Innebygd i:",
    "description": "Beskrivelse:",
    "s2_desc": (
        "Filopplastingsskjemaet bruker en ekstern tjeneste (Filemail) innebygd via en iframe. "
        "Skjemaets URL er offentlig og direkte tilgjengelig uten autentisering. "
        "Skjemaet mangler alle grunnleggende sikkerhetstiltak:"
    ),
    "s2_findings": [
        "Ingen CAPTCHA av noen type (verken reCAPTCHA, hCaptcha eller Turnstile)",
        "E-postfeltet er type 'text' (ikke 'email'), uten formatvalidering",
        "Ingen felt er obligatoriske (required=false pa alle)",
        "Ingen filtype-begrensning (mangler 'accept'-attributt)",
        "Ingen deklarert filstorrelsesgrense",
        "Ingen synlig hastighetsbegrensning (rate limiting)",
        "Avsenders e-post verifiseres ikke (enhver identitet kan forfalskes)",
    ],
    "attack_scenario": "Angrepsscenario:",
    "s2_attack": (
        "En angriper kan sende ondsinnede filer (ransomware, trojanere) direkte til "
        "spesifikke ansatte i EKH Grafisk. Ved a velge en bestemt mottaker fra listen "
        "(f.eks. 'Sondre Krohn'), ankommer filen som en legitim kundeforsendelse. "
        "Den ansatte apner den fordi konteksten (bedriftens plattform, falskt kundenavn) "
        "skaper tillit."
    ),
    "remediation": "Utbedring:",
    "s2_remediation": [
        "Implementer CAPTCHA (reCAPTCHA v3 eller hCaptcha) i skjemaet",
        "Krev e-postverifisering for a tillate sending",
        "Begrens tillatte filtyper (.pdf, .ai, .psd, .indd, .jpg, .png, .tiff)",
        "Sett maksimal filstorrelsesgrense",
        "Implementer hastighetsbegrensning (maks 5 sendinger per IP/time)",
        "Erstatt ansattnavn med generiske avdelinger",
    ],
    "s3_title": "3. CMS-administrasjonspanel Eksponert",
    "software": "Programvare:",
    "server": "Server:",
    "s3_desc": (
        "Filserveren filer.ekh.no kjorer en installasjon av CMS Made Simple med et "
        "administrasjonspanel som er offentlig tilgjengelig fra internett. CMS-versjonen "
        "er gammel og har flere kjente kritiske sarbarheter (CVE-er) som tillater "
        "alt fra SQL-injeksjon til ekstern kodekjoring."
    ),
    "s3_findings": [
        "Innloggingspanel tilgjengelig uten IP-begrensning",
        "Ingen CAPTCHA eller synlig beskyttelse mot brute force",
        "Funksjonaliteten 'Glemt passord' er eksponert (tillater brukeropptelling)",
        "Katalogene /tmp/cache/ og /tmp/templates_c/ er tilgjengelige (HTTP 200)",
        "Serveren avslorer 'Apache' uten a skjule versjon",
        "Meta-tag 'generator' avslorer CMS og eksakt versjon",
        "Usikker HTTP-lenke i selve panelet (http://html5shiv.googlecode.com)",
    ],
    "s3_remediation": [
        "HASTER: Begrens tilgang til /admin/ med IP-hviteliste eller VPN",
        "Oppdater CMS Made Simple til nyeste stabile versjon",
        "Oppdater jQuery til versjon 3.x+",
        "Implementer fail2ban eller lignende mot brute force",
        "Blokker tilgang til /tmp/, /lib/ og interne kataloger",
        "Fjern meta-tag 'generator' som avslorer CMS",
        "Skjul Apache-versjon i HTTP-hodene",
        "Implementer sikkerhetshoder (CSP, X-Content-Type-Options)",
    ],
    "s4_title": "4. Personopplysninger om Ansatte Eksponert",
    "risk_social": "Risiko: Sosial manipulasjon",
    "s4_desc": (
        "Filemail-skjemaet eksponerer fullstendige navn pa 13 ansatte som mottakeralternativer. "
        "Denne informasjonen er tilgjengelig for alle som besoker siden eller "
        "gar direkte til skjemaets URL."
    ),
    "employees_exposed": "Eksponerte ansatte:",
    "emails_exposed": "E-postadresser eksponert pa ekh.no/kontakt:",
    "s4_extra": (
        "I tillegg eksponerer kontaktsiden (ekh.no/kontakt) personlige mobilnumre "
        "og individuelle e-postadresser for 16 ansatte."
    ),
    "s4_remediation": [
        "Erstatt individuelle navn i Filemail med avdelinger (f.eks. 'Prepress', 'Design', 'Salg')",
        "Vurder a bruke et generisk kontaktskjema i stedet for a vise direkte e-poster",
        "Bruk formater som 'navn (krøllalfa) ekh.no' eller kontaktskjemaer",
    ],
    "s5_title": "5. Iframe uten Sikkerhetsisolering",
    "risk_xss": "Risiko: XSS / Kapring",
    "s5_desc": (
        "Iframen som inneholder Filemail-skjemaet pa ekh.no/send-filer mangler "
        "sikkerhetsattributter (sandbox, allow, referrerpolicy). Dette gir iframe-innholdet "
        "full tilgang til nettleserens kontekst."
    ),
    "current_code": "Navarende kode:",
    "recommended_code": "Anbefalt kode:",
    "s6_title": "6. Tilgjengelige Serverkataloger",
    "s7_title": "7. Manglende Sikkerhetshoder",
    "s7_desc": (
        "Hovedsiden (ekh.no) er bak Cloudflare og har noen grunnleggende hoder. "
        "Imidlertid kjorer filer.ekh.no pa Apache uten konfigurerte sikkerhetshoder."
    ),
    "s8_title": "8. Kjente CVE-er for CMS Made Simple",
    "s8_intro": (
        "CMS Made Simple har en omfattende historikk med kritiske sarbarheter. Folgende "
        "pavirker nyere versjoner og er potensielt relevante for serveren filer.ekh.no:"
    ),
    "s8_note": (
        "<b>Merk:</b> Flere av disse sarbarhetene (CVE-2024-1527, CVE-2023-36969) tillater "
        "en autentisert angriper a kjore vilkarlig kode pa serveren. Kombinert med et "
        "brute force-angrep mot det eksponerte innloggingspanelet (uten beskyttelse), er "
        "risikoen for fullstendig serverkompromittering svart hoy."
    ),
    "s9_title": "9. Sok etter E-postlekkasjer",
    "s9_intro": (
        "Det er gjennomfort et sok i offentlige kilder (sokmotorer, offentlige "
        "bruddatabaser) for a fastslå om e-poster fra domenet @ekh.no "
        "forekommer i kjente datalekkasjer."
    ),
    "emails_analyzed": "Analyserte e-poster (15):",
    "no_results": "Ingen resultater i offentlige kilder",
    "s9_result": (
        "<b>Resultat:</b> E-postene @ekh.no ble ikke funnet i offentlige datalekkasjer "
        "indeksert av sokmotorer. Det anbefales likevel a verifisere hver e-post "
        "individuelt pa Have I Been Pwned (haveibeenpwned.com) med en domenekonto "
        "for fullstendige resultater, ettersom domenesoek krever eierverifisering."
    ),
    "s9_risk": (
        "<b>Latent risiko:</b> Selv om ingen lekkasjer ble oppdaget, letter offentlig "
        "eksponering av alle disse e-postene pa nettsiden (ekh.no/kontakt) inkludering "
        "i spam-lister, mâlrettet phishing og credential stuffing-angrep."
    ),
    "s10_title": "10. Prioriterte Anbefalinger",
    "immediate": "UMIDDELBART (denne uken):",
    "immediate_items": [
        "Begrens tilgang til filer.ekh.no/admin/ med IP (kun kontorene i Molde og Hustadvika)",
        "Legg til CAPTCHA i Filemail-skjemaet eller erstatt med egen losning",
        "Erstatt ansattnavn i Filemail med avdelinger",
        "Blokker tilgang til /tmp/cache/ og /tmp/templates_c/",
    ],
    "short_term": "KORT SIKT (denne maneden):",
    "short_items": [
        "Oppdater CMS Made Simple til nyeste versjon",
        "Oppdater jQuery og alle serveravhengigheter",
        "Konfigurer sikkerhetshoder i Apache (CSP, HSTS, X-Content-Type-Options)",
        "Implementer fail2ban mot brute force-angrep pa innlogging",
        "Legg til sandbox-attributt pa Filemail-iframen pa ekh.no",
    ],
    "medium_term": "MELLOMLANG SIKT (neste kvartal):",
    "medium_items": [
        "Vurder migrering av CMS til en moderne og vedlikeholdt plattform",
        "Verifiser alle @ekh.no-e-poster i Have I Been Pwned (domenekonto)",
        "Implementer policy for sterke passord og 2FA for alle admin-tilganger",
        "Gjennomfor en fullstendig sikkerhetsrevisjon av Apache-serveren",
        "Vurder a flytte filer.ekh.no bak Cloudflare som hovedsiden",
    ],
    "disclaimer": (
        "Denne rapporten er utarbeidet gjennom ikke-invasiv analyse. Ingen sarbarheter "
        "er utnyttet og ingen beskyttede data er aksessert. All informasjon er "
        "hentet fra offentlig tilgjengelige kilder."
    ),
    "generated": f"Generert {datetime.now().strftime('%d/%m/%Y klokken %H:%M')}.",
    # Table headers
    "th_path": "Sti", "th_http": "HTTP-status", "th_risk": "Risiko",
    "th_header": "Hode", "th_cve": "CVE", "th_cvss": "CVSS", "th_type": "Type", "th_desc_col": "Beskrivelse",
    "th_email": "E-post", "th_role": "Rolle", "th_result": "Resultat",
    "dir_risks": ["Admin-panel eksponert", "Intern cache tilgjengelig", "Kompilerte maler tilgjengelige", "Filer nedlastbare uten autentisering"],
    "not_configured": "IKKE KONFIGURERT", "not_detected": "Ikke oppdaget",
  },

  "en": {
    "file": "EKH_Grafisk_Security_Audit_2026.pdf",
    "header_right": "SECURITY REPORT - CONFIDENTIAL",
    "footer_left": "Confidential - For internal use by EKH Grafisk AS only",
    "footer_page": "Page",
    "title": "Security Audit Report",
    "subtitle": "Vulnerability analysis of ekh.no/send-filer and filer.ekh.no",
    "meta": [
        ["Report date:", "April 9, 2026"],
        ["Target:", "https://www.ekh.no/send-filer"],
        ["Scope:", "Filemail form, filer.ekh.no server, CMS admin"],
        ["Classification:", "CONFIDENTIAL"],
        ["Methodology:", "Non-intrusive analysis (no active exploitation)"],
    ],
    "exec_summary": "EXECUTIVE SUMMARY",
    "toc_title": "Table of Contents",
    "toc": [
        "1. Executive Summary",
        "2. CRITICAL: Filemail form without protection",
        "3. CRITICAL: CMS admin panel exposed",
        "4. HIGH: Employee personal data exposed",
        "5. HIGH: Iframe without security isolation",
        "6. MEDIUM: Accessible server directories",
        "7. MEDIUM: Missing security headers",
        "8. Known CVEs for CMS Made Simple",
        "9. Email leak search",
        "10. Priority recommendations",
    ],
    "s1_title": "1. Executive Summary",
    "s1_p1": (
        "A non-intrusive security analysis was performed on the page "
        "<b>ekh.no/send-filer</b> and associated infrastructure (<b>filer.ekh.no</b>). "
        "The analysis revealed <b>2 critical vulnerabilities</b>, <b>2 high</b>, and "
        "<b>3 medium/low severity</b> issues requiring immediate attention."
    ),
    "s1_p2": (
        "The combination of an unprotected file upload form, publicly exposed "
        "employee names, and an outdated internet-accessible CMS admin panel "
        "creates a significant attack vector that could result in "
        "remote code execution, targeted malware distribution to staff, or "
        "complete compromise of the file server."
    ),
    "s2_title": "2. Filemail Form Without Protection",
    "severity_critical": "SEVERITY: CRITICAL",
    "severity_high": "SEVERITY: HIGH",
    "severity_medium": "SEVERITY: MEDIUM",
    "cvss_90": "Estimated CVSS: 9.0+",
    "cvss_95": "Estimated CVSS: 9.5+",
    "affected_url": "Affected URL:",
    "embedded_in": "Embedded in:",
    "description": "Description:",
    "s2_desc": (
        "The file upload form uses an external service (Filemail) embedded via an iframe. "
        "The form URL is public and directly accessible without authentication. "
        "The form lacks all basic security protections:"
    ),
    "s2_findings": [
        "No CAPTCHA of any kind (no reCAPTCHA, hCaptcha, or Turnstile)",
        "Email field is type 'text' (not 'email'), with no format validation",
        "No fields are required (required=false on all)",
        "No file type restriction (no 'accept' attribute)",
        "No declared file size limit",
        "No visible rate limiting",
        "Sender email is not verified (any identity can be spoofed)",
    ],
    "attack_scenario": "Attack Scenario:",
    "s2_attack": (
        "An attacker can send malicious files (ransomware, trojans) directly to "
        "specific EKH Grafisk employees. By selecting a specific recipient from the list "
        "(e.g., 'Sondre Krohn'), the file arrives as a legitimate client submission. "
        "The employee opens it because the context (company platform, fake client name) "
        "builds trust."
    ),
    "remediation": "Remediation:",
    "s2_remediation": [
        "Implement CAPTCHA (reCAPTCHA v3 or hCaptcha) on the form",
        "Require email verification before allowing submission",
        "Restrict allowed file types (.pdf, .ai, .psd, .indd, .jpg, .png, .tiff)",
        "Set maximum file size limit",
        "Implement rate limiting (max 5 submissions per IP/hour)",
        "Replace employee names with generic departments",
    ],
    "s3_title": "3. CMS Admin Panel Exposed",
    "software": "Software:",
    "server": "Server:",
    "s3_desc": (
        "The file server filer.ekh.no runs an installation of CMS Made Simple with an "
        "admin panel publicly accessible from the internet. The CMS version "
        "is outdated and has multiple known critical vulnerabilities (CVEs) allowing "
        "everything from SQL injection to remote code execution."
    ),
    "s3_findings": [
        "Login panel accessible without IP restriction",
        "No CAPTCHA or visible brute force protection",
        "'Forgot password' functionality exposed (allows user enumeration)",
        "/tmp/cache/ and /tmp/templates_c/ directories accessible (HTTP 200)",
        "Server reveals 'Apache' without hiding the version",
        "Meta tag 'generator' reveals the CMS and exact version",
        "Insecure HTTP link in the panel itself (http://html5shiv.googlecode.com)",
    ],
    "s3_remediation": [
        "URGENT: Restrict /admin/ access by IP (whitelist) or VPN",
        "Update CMS Made Simple to the latest stable version",
        "Update jQuery to version 3.x+",
        "Implement fail2ban or similar against brute force",
        "Block access to /tmp/, /lib/, and internal directories",
        "Remove 'generator' meta tag that reveals the CMS",
        "Hide Apache version in HTTP headers",
        "Implement security headers (CSP, X-Content-Type-Options)",
    ],
    "s4_title": "4. Employee Personal Data Exposed",
    "risk_social": "Risk: Social engineering",
    "s4_desc": (
        "The Filemail form exposes full names of 13 employees as recipient options. "
        "This information is accessible to anyone who visits the page or "
        "accesses the form URL directly."
    ),
    "employees_exposed": "Exposed employees:",
    "emails_exposed": "Email addresses exposed on ekh.no/kontakt:",
    "s4_extra": (
        "Additionally, the contact page (ekh.no/kontakt) exposes personal mobile "
        "phone numbers and individual email addresses of 16 employees."
    ),
    "s4_remediation": [
        "Replace individual names in Filemail with departments (e.g., 'Prepress', 'Design', 'Sales')",
        "Consider using a generic contact form instead of showing direct emails",
        "Use formats like 'name (at) ekh.no' or contact forms",
    ],
    "s5_title": "5. Iframe Without Security Isolation",
    "risk_xss": "Risk: XSS / Hijacking",
    "s5_desc": (
        "The iframe embedding the Filemail form on ekh.no/send-filer lacks "
        "security attributes (sandbox, allow, referrerpolicy). This gives the iframe content "
        "full access to the browser context."
    ),
    "current_code": "Current code:",
    "recommended_code": "Recommended code:",
    "s6_title": "6. Accessible Server Directories",
    "s7_title": "7. Missing Security Headers",
    "s7_desc": (
        "The main site (ekh.no) is behind Cloudflare and has some basic headers. "
        "However, filer.ekh.no runs on Apache with no security headers configured."
    ),
    "s8_title": "8. Known CVEs for CMS Made Simple",
    "s8_intro": (
        "CMS Made Simple has an extensive history of critical vulnerabilities. The following "
        "affect recent versions and are potentially applicable to the filer.ekh.no server:"
    ),
    "s8_note": (
        "<b>Note:</b> Several of these vulnerabilities (CVE-2024-1527, CVE-2023-36969) allow "
        "an authenticated attacker to execute arbitrary code on the server. Combined with a "
        "brute force attack on the exposed login panel (without protection), the risk of "
        "complete server compromise is very high."
    ),
    "s9_title": "9. Email Leak Search",
    "s9_intro": (
        "A search was conducted in public sources (search engines, public breach "
        "databases) to determine if emails from the @ekh.no domain appear in "
        "known data breaches."
    ),
    "emails_analyzed": "Emails analyzed (15):",
    "no_results": "No results in public sources",
    "s9_result": (
        "<b>Result:</b> The @ekh.no emails were not found in public data breaches "
        "indexed by search engines. However, it is recommended to verify each email "
        "individually on Have I Been Pwned (haveibeenpwned.com) with a domain account "
        "for complete results, as domain searches require ownership verification."
    ),
    "s9_risk": (
        "<b>Latent risk:</b> Although no leaks were detected, the public exposure of "
        "all these emails on the website (ekh.no/kontakt) facilitates their inclusion in "
        "spam lists, targeted phishing, and credential stuffing attacks."
    ),
    "s10_title": "10. Priority Recommendations",
    "immediate": "IMMEDIATE (this week):",
    "immediate_items": [
        "Restrict access to filer.ekh.no/admin/ by IP (Molde and Hustadvika offices only)",
        "Add CAPTCHA to Filemail form or replace with own solution",
        "Replace employee names in Filemail with departments",
        "Block access to /tmp/cache/ and /tmp/templates_c/",
    ],
    "short_term": "SHORT TERM (this month):",
    "short_items": [
        "Update CMS Made Simple to the latest version",
        "Update jQuery and all server dependencies",
        "Configure security headers in Apache (CSP, HSTS, X-Content-Type-Options)",
        "Implement fail2ban against brute force attacks on login",
        "Add sandbox attribute to Filemail iframe on ekh.no",
    ],
    "medium_term": "MEDIUM TERM (next quarter):",
    "medium_items": [
        "Evaluate CMS migration to a modern, maintained platform",
        "Verify all @ekh.no emails on Have I Been Pwned (domain account)",
        "Implement strong password policy and 2FA for all admin access",
        "Conduct a complete security audit of the Apache server",
        "Consider moving filer.ekh.no behind Cloudflare like the main site",
    ],
    "disclaimer": (
        "This report was prepared through non-intrusive analysis. No vulnerabilities "
        "were exploited and no protected data was accessed. All information was "
        "obtained from publicly accessible sources."
    ),
    "generated": f"Generated on {datetime.now().strftime('%d/%m/%Y at %H:%M')}.",
    "th_path": "Path", "th_http": "HTTP Status", "th_risk": "Risk",
    "th_header": "Header", "th_cve": "CVE", "th_cvss": "CVSS", "th_type": "Type", "th_desc_col": "Description",
    "th_email": "Email", "th_role": "Role", "th_result": "Result",
    "dir_risks": ["Admin panel exposed", "Internal cache accessible", "Compiled templates accessible", "Files downloadable without auth"],
    "not_configured": "NOT CONFIGURED", "not_detected": "Not detected",
  },
}

# ── SHARED DATA ──

EMP_NAMES = [
    "Andreas Dahle", "Arnt Jonny Varhaugvik", "Berit Breistrand",
    "Christina S. Nygard", "Eva-Britt Hoem", "Irene H. Skaldebo",
    "Irina Voscoboinic", "Kristine Meek Strand", "Malin Malmedal",
    "Paul Johan Undheim", "Rolf Inge Bjerkeset", "Sondre Krohn",
]

EMAILS = [
    ("kjetil@ekh.no", "CEO"), ("sveinung@ekh.no", "Finans/Admin"),
    ("beritb@ekh.no", "Marketing"), ("arntjv@ekh.no", "Salg"),
    ("irene@ekh.no", "Designer"), ("sondre@ekh.no", "Designer"),
    ("irina@ekh.no", "Web/UX"), ("christina@ekh.no", "Designer"),
    ("evabritt@ekh.no", "Designer"), ("rolf@ekh.no", "Reprografi"),
    ("pju@ekh.no", "Skilt/Kultur"), ("andreas@ekh.no", "Web Developer"),
    ("john@ekh.no", "IT/Installasjon"), ("maxim@ekh.no", "Produksjon"),
    ("mette@frena-trykk.no", "Designer"),
]

CVE_DATA = [
    ("CVE-2024-1527", "8.8", "File Upload / RCE", "Unrestricted file upload allows webshells and remote code execution"),
    ("CVE-2023-36969", "8.8", "RCE", "Remote code execution through file upload functionality (v2.2.17)"),
    ("CVE-2021-28999", "8.8", "SQL Injection / RCE", "SQL injection in News module via m1_sortby parameter"),
    ("CVE-2021-40961", "8.8", "SQL Injection", "SQL injection in modules/News/function.admin_articlestab.php"),
    ("CVE-2022-23906", "7.2", "RCE", "RCE via avatar upload function with crafted images"),
    ("CVE-2021-28998", "7.2", "File Upload / RCE", "Phar file upload allows authenticated attacker webshell"),
    ("CVE-2020-10682", "7.8", "RCE", "File Manager RCE via .php.jpegd files as octet-stream"),
    ("CVE-2026-5203", "4.7", "Path Traversal", "Directory traversal in UserGuide XML import"),
]


def make_styles():
    s = getSampleStyleSheet()
    defs = {
        "ReportTitle": dict(fontName="Helvetica-Bold", fontSize=28, leading=34, textColor=DARK, spaceAfter=6),
        "ReportSubtitle": dict(fontName="Helvetica", fontSize=14, leading=18, textColor=GRAY, spaceAfter=30),
        "SectionTitle": dict(fontName="Helvetica-Bold", fontSize=18, leading=22, textColor=PRIMARY_DARK, spaceBefore=20, spaceAfter=10),
        "SubSection": dict(fontName="Helvetica-Bold", fontSize=13, leading=16, textColor=DARK, spaceBefore=14, spaceAfter=6),
        "Body": dict(fontName="Helvetica", fontSize=10, leading=14, textColor=DARK, alignment=TA_JUSTIFY, spaceAfter=6),
        "BodyBold": dict(fontName="Helvetica-Bold", fontSize=10, leading=14, textColor=DARK, spaceAfter=6),
        "BulletItem": dict(fontName="Helvetica", fontSize=10, leading=14, textColor=DARK, leftIndent=20, spaceAfter=3),
        "SmallGray": dict(fontName="Helvetica", fontSize=8, leading=10, textColor=GRAY),
    }
    for name, kw in defs.items():
        s.add(ParagraphStyle(name=name, **kw))
    return s


def sev_table(label1, label2, color):
    data = [[Paragraph(f'<font color="white"><b>{label1}</b></font>', ParagraphStyle("x", fontName="Helvetica-Bold", fontSize=10, textColor=white, alignment=TA_CENTER)),
             Paragraph(f'<font color="white"><b>{label2}</b></font>', ParagraphStyle("x2", fontName="Helvetica-Bold", fontSize=10, textColor=white, alignment=TA_CENTER))]]
    t = Table(data, colWidths=[85*mm, 85*mm])
    t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),color),("TOPPADDING",(0,0),(-1,-1),8),("BOTTOMPADDING",(0,0),(-1,-1),8)]))
    return t


def build_report(lang_key):
    L = LANG[lang_key]
    styles = make_styles()

    def hf(c, doc):
        c.saveState()
        c.setStrokeColor(PRIMARY); c.setLineWidth(2)
        c.line(20*mm, A4[1]-15*mm, A4[0]-20*mm, A4[1]-15*mm)
        c.setFont("Helvetica-Bold",8); c.setFillColor(PRIMARY)
        c.drawString(20*mm, A4[1]-13*mm, "EKH GRAFISK")
        c.setFont("Helvetica",8); c.setFillColor(GRAY)
        c.drawRightString(A4[0]-20*mm, A4[1]-13*mm, L["header_right"])
        c.setFont("Helvetica",7); c.setFillColor(GRAY)
        c.drawString(20*mm,12*mm, L["footer_left"])
        c.drawRightString(A4[0]-20*mm,12*mm, f'{L["footer_page"]} {doc.page}')
        c.restoreState()

    doc = SimpleDocTemplate(L["file"], pagesize=A4, topMargin=22*mm, bottomMargin=20*mm, leftMargin=20*mm, rightMargin=20*mm)
    story = []

    # Cover
    story.append(Spacer(1,60))
    story.append(Paragraph("EKH GRAFISK", ParagraphStyle("L",fontName="Helvetica-Bold",fontSize=36,textColor=PRIMARY,spaceAfter=4)))
    story.append(HRFlowable(width="100%",thickness=3,color=PRIMARY,spaceAfter=20))
    story.append(Paragraph(L["title"], styles["ReportTitle"]))
    story.append(Paragraph(L["subtitle"], styles["ReportSubtitle"]))
    story.append(Spacer(1,30))

    mt = Table(L["meta"], colWidths=[45*mm,120*mm])
    mt.setStyle(TableStyle([("FONTNAME",(0,0),(0,-1),"Helvetica-Bold"),("FONTNAME",(1,0),(1,-1),"Helvetica"),("FONTSIZE",(0,0),(-1,-1),10),("TEXTCOLOR",(0,0),(0,-1),DARK),("TEXTCOLOR",(1,0),(1,-1),GRAY),("BOTTOMPADDING",(0,0),(-1,-1),8)]))
    story.append(mt)
    story.append(Spacer(1,40))

    sd = [[Paragraph(f'<font color="white"><b>{L["exec_summary"]}</b></font>',styles["BodyBold"]),"","",""],
          [Paragraph('<font color="white"><b>CRITICAL</b></font>',ParagraphStyle("b1",fontName="Helvetica-Bold",fontSize=9,textColor=white,backColor=RED,alignment=TA_CENTER)),Paragraph("<b>2</b>",styles["Body"]),
           Paragraph('<font color="white"><b>HIGH</b></font>',ParagraphStyle("b2",fontName="Helvetica-Bold",fontSize=9,textColor=white,backColor=ORANGE,alignment=TA_CENTER)),Paragraph("<b>2</b>",styles["Body"])],
          [Paragraph('<font color="white"><b>MEDIUM</b></font>',ParagraphStyle("b3",fontName="Helvetica-Bold",fontSize=9,textColor=white,backColor=YELLOW,alignment=TA_CENTER)),Paragraph("<b>2</b>",styles["Body"]),
           Paragraph('<font color="white"><b>LOW</b></font>',ParagraphStyle("b4",fontName="Helvetica-Bold",fontSize=9,textColor=white,backColor=GREEN,alignment=TA_CENTER)),Paragraph("<b>1</b>",styles["Body"])]]
    st2 = Table(sd,colWidths=[30*mm,40*mm,30*mm,40*mm])
    st2.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),PRIMARY_DARK),("SPAN",(0,0),(-1,0)),("TEXTCOLOR",(0,0),(-1,0),white),("BACKGROUND",(0,1),(-1,-1),LIGHT_GRAY),("BOX",(0,0),(-1,-1),1,PRIMARY_DARK),("VALIGN",(0,0),(-1,-1),"MIDDLE"),("TOPPADDING",(0,0),(-1,-1),8),("BOTTOMPADDING",(0,0),(-1,-1),10)]))
    story.append(st2)
    story.append(PageBreak())

    # TOC
    story.append(Paragraph(L["toc_title"], styles["SectionTitle"]))
    for item in L["toc"]:
        story.append(Paragraph(item, styles["Body"]))
    story.append(PageBreak())

    # S1
    story.append(Paragraph(L["s1_title"], styles["SectionTitle"]))
    story.append(Paragraph(L["s1_p1"], styles["Body"]))
    story.append(Paragraph(L["s1_p2"], styles["Body"]))
    story.append(PageBreak())

    # S2
    story.append(Paragraph(L["s2_title"], styles["SectionTitle"]))
    story.append(sev_table(L["severity_critical"], L["cvss_90"], RED))
    story.append(Spacer(1,8))
    story.append(Paragraph(f'<b>{L["affected_url"]}</b> https://www.filemail.com/incoming/9574240876', styles["Body"]))
    story.append(Paragraph(f'<b>{L["embedded_in"]}</b> https://www.ekh.no/send-filer (iframe)', styles["Body"]))
    story.append(Spacer(1,6))
    story.append(Paragraph(f"<b>{L['description']}</b>", styles["BodyBold"]))
    story.append(Paragraph(L["s2_desc"], styles["Body"]))
    for f in L["s2_findings"]:
        story.append(Paragraph(f"&bull; {f}", styles["BulletItem"]))
    story.append(Spacer(1,8))
    story.append(Paragraph(f"<b>{L['attack_scenario']}</b>", styles["BodyBold"]))
    story.append(Paragraph(L["s2_attack"], styles["Body"]))
    story.append(Spacer(1,6))
    story.append(Paragraph(f"<b>{L['remediation']}</b>", styles["BodyBold"]))
    for r in L["s2_remediation"]:
        story.append(Paragraph(f"&bull; {r}", styles["BulletItem"]))
    story.append(PageBreak())

    # S3
    story.append(Paragraph(L["s3_title"], styles["SectionTitle"]))
    story.append(sev_table(L["severity_critical"], L["cvss_95"], RED))
    story.append(Spacer(1,8))
    story.append(Paragraph(f'<b>{L["affected_url"]}</b> https://filer.ekh.no/admin/login.php', styles["Body"]))
    story.append(Paragraph(f'<b>{L["software"]}</b> CMS Made Simple (copyright 2004-2014)', styles["Body"]))
    story.append(Paragraph(f'<b>jQuery:</b> 1.11.1 (2014)', styles["Body"]))
    story.append(Paragraph(f'<b>{L["server"]}</b> Apache', styles["Body"]))
    story.append(Spacer(1,6))
    story.append(Paragraph(f"<b>{L['description']}</b>", styles["BodyBold"]))
    story.append(Paragraph(L["s3_desc"], styles["Body"]))
    for f in L["s3_findings"]:
        story.append(Paragraph(f"&bull; {f}", styles["BulletItem"]))
    story.append(Spacer(1,6))
    story.append(Paragraph(f"<b>{L['remediation']}</b>", styles["BodyBold"]))
    for r in L["s3_remediation"]:
        story.append(Paragraph(f"&bull; {r}", styles["BulletItem"]))
    story.append(PageBreak())

    # S4
    story.append(Paragraph(L["s4_title"], styles["SectionTitle"]))
    story.append(sev_table(L["severity_high"], L["risk_social"], ORANGE))
    story.append(Spacer(1,8))
    story.append(Paragraph(L["s4_desc"], styles["Body"]))
    story.append(Spacer(1,6))
    story.append(Paragraph(f"<b>{L['employees_exposed']}</b>", styles["BodyBold"]))
    for n in EMP_NAMES:
        story.append(Paragraph(f"&bull; {n}", styles["BulletItem"]))
    story.append(Spacer(1,6))
    story.append(Paragraph(L["s4_extra"], styles["Body"]))
    story.append(Paragraph(f"<b>{L['emails_exposed']}</b>", styles["BodyBold"]))
    for email, role in EMAILS:
        label = f"{email} ({role})" if role == "CEO" else email
        story.append(Paragraph(f"&bull; {label}", styles["BulletItem"]))
    story.append(Spacer(1,6))
    story.append(Paragraph(f"<b>{L['remediation']}</b>", styles["BodyBold"]))
    for r in L["s4_remediation"]:
        story.append(Paragraph(f"&bull; {r}", styles["BulletItem"]))
    story.append(PageBreak())

    # S5
    story.append(Paragraph(L["s5_title"], styles["SectionTitle"]))
    story.append(sev_table(L["severity_high"], L["risk_xss"], ORANGE))
    story.append(Spacer(1,8))
    story.append(Paragraph(L["s5_desc"], styles["Body"]))
    story.append(Paragraph(f"<b>{L['current_code']}</b>", styles["BodyBold"]))
    story.append(Paragraph('<font face="Courier" size="9">&lt;iframe src="https://www.filemail.com/incoming/9574240876?integrated" width="100%"&gt;</font>', styles["Body"]))
    story.append(Paragraph(f"<b>{L['recommended_code']}</b>", styles["BodyBold"]))
    story.append(Paragraph('<font face="Courier" size="9">&lt;iframe src="..." sandbox="allow-scripts allow-forms allow-same-origin" referrerpolicy="no-referrer"&gt;</font>', styles["Body"]))
    story.append(PageBreak())

    # S6
    story.append(Paragraph(L["s6_title"], styles["SectionTitle"]))
    story.append(sev_table(L["severity_medium"], "", YELLOW))
    story.append(Spacer(1,8))
    dir_data = [
        [Paragraph(f"<b>{L['th_path']}</b>",styles["Body"]), Paragraph(f"<b>{L['th_http']}</b>",styles["Body"]), Paragraph(f"<b>{L['th_risk']}</b>",styles["Body"])],
        ["/admin/","302 -> login.php",L["dir_risks"][0]],
        ["/tmp/cache/","200 OK",L["dir_risks"][1]],
        ["/tmp/templates_c/","200 OK",L["dir_risks"][2]],
        ["/uploads/EKH/*.zip","200 OK",L["dir_risks"][3]],
    ]
    dt = Table(dir_data,colWidths=[55*mm,45*mm,70*mm])
    dt.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),PRIMARY_DARK),("TEXTCOLOR",(0,0),(-1,0),white),("FONTSIZE",(0,0),(-1,-1),9),("BACKGROUND",(0,1),(-1,-1),LIGHT_GRAY),("GRID",(0,0),(-1,-1),0.5,GRAY),("TOPPADDING",(0,0),(-1,-1),6),("BOTTOMPADDING",(0,0),(-1,-1),6),("LEFTPADDING",(0,0),(-1,-1),8)]))
    story.append(dt)
    story.append(Spacer(1,14))

    # S7
    story.append(Paragraph(L["s7_title"], styles["SectionTitle"]))
    story.append(sev_table(L["severity_medium"], "", YELLOW))
    story.append(Spacer(1,8))
    nc = L["not_configured"]; nd = L["not_detected"]
    hd = [
        [Paragraph(f"<b>{L['th_header']}</b>",styles["Body"]),Paragraph("<b>ekh.no</b>",styles["Body"]),Paragraph("<b>filer.ekh.no</b>",styles["Body"])],
        ["Content-Security-Policy","frame-ancestors 'self'",nc],
        ["X-Frame-Options","SAMEORIGIN","SAMEORIGIN"],
        ["Strict-Transport-Security","max-age=31536000",nc],
        ["X-Content-Type-Options",nd,nc],
        ["Referrer-Policy",nd,nc],
    ]
    ht = Table(hd,colWidths=[55*mm,55*mm,60*mm])
    ht.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),PRIMARY_DARK),("TEXTCOLOR",(0,0),(-1,0),white),("FONTSIZE",(0,0),(-1,-1),9),("BACKGROUND",(0,1),(-1,-1),LIGHT_GRAY),("GRID",(0,0),(-1,-1),0.5,GRAY),("TOPPADDING",(0,0),(-1,-1),6),("BOTTOMPADDING",(0,0),(-1,-1),6),("LEFTPADDING",(0,0),(-1,-1),8)]))
    story.append(ht)
    story.append(Paragraph(L["s7_desc"], styles["Body"]))
    story.append(PageBreak())

    # S8
    story.append(Paragraph(L["s8_title"], styles["SectionTitle"]))
    story.append(Paragraph(L["s8_intro"], styles["Body"]))
    cd = [[Paragraph(f"<b>{L['th_cve']}</b>",styles["Body"]),Paragraph(f"<b>{L['th_cvss']}</b>",styles["Body"]),Paragraph(f"<b>{L['th_type']}</b>",styles["Body"]),Paragraph(f"<b>{L['th_desc_col']}</b>",styles["Body"])]]
    for cve in CVE_DATA:
        cd.append([cve[0],cve[1],cve[2],Paragraph(cve[3],styles["SmallGray"])])
    ct = Table(cd,colWidths=[32*mm,15*mm,35*mm,88*mm])
    ct.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),PRIMARY_DARK),("TEXTCOLOR",(0,0),(-1,0),white),("FONTSIZE",(0,0),(-1,-1),8),("BACKGROUND",(0,1),(-1,-1),LIGHT_GRAY),("GRID",(0,0),(-1,-1),0.5,GRAY),("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5),("LEFTPADDING",(0,0),(-1,-1),6),("VALIGN",(0,0),(-1,-1),"TOP")]))
    story.append(ct)
    story.append(Spacer(1,10))
    story.append(Paragraph(L["s8_note"], styles["Body"]))
    story.append(PageBreak())

    # S9
    story.append(Paragraph(L["s9_title"], styles["SectionTitle"]))
    story.append(Paragraph(L["s9_intro"], styles["Body"]))
    story.append(Spacer(1,6))
    story.append(Paragraph(f"<b>{L['emails_analyzed']}</b>", styles["BodyBold"]))
    ed = [[Paragraph(f"<b>{L['th_email']}</b>",styles["Body"]),Paragraph(f"<b>{L['th_role']}</b>",styles["Body"]),Paragraph(f"<b>{L['th_result']}</b>",styles["Body"])]]
    for email, role in EMAILS:
        ed.append([email, role, L["no_results"]])
    et = Table(ed,colWidths=[55*mm,40*mm,75*mm])
    et.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),PRIMARY_DARK),("TEXTCOLOR",(0,0),(-1,0),white),("FONTSIZE",(0,0),(-1,-1),8),("BACKGROUND",(0,1),(-1,-1),LIGHT_GRAY),("GRID",(0,0),(-1,-1),0.5,GRAY),("TOPPADDING",(0,0),(-1,-1),4),("BOTTOMPADDING",(0,0),(-1,-1),4),("LEFTPADDING",(0,0),(-1,-1),6)]))
    story.append(et)
    story.append(Spacer(1,10))
    story.append(Paragraph(L["s9_result"], styles["Body"]))
    story.append(Paragraph(L["s9_risk"], styles["Body"]))
    story.append(PageBreak())

    # S10
    story.append(Paragraph(L["s10_title"], styles["SectionTitle"]))
    story.append(Paragraph(f"<b>{L['immediate']}</b>", styles["BodyBold"]))
    for i,r in enumerate(L["immediate_items"],1):
        story.append(Paragraph(f"<b>{i}.</b> {r}", styles["BulletItem"]))
    story.append(Spacer(1,10))
    story.append(Paragraph(f"<b>{L['short_term']}</b>", styles["BodyBold"]))
    for i,r in enumerate(L["short_items"],1):
        story.append(Paragraph(f"<b>{i}.</b> {r}", styles["BulletItem"]))
    story.append(Spacer(1,10))
    story.append(Paragraph(f"<b>{L['medium_term']}</b>", styles["BodyBold"]))
    for i,r in enumerate(L["medium_items"],1):
        story.append(Paragraph(f"<b>{i}.</b> {r}", styles["BulletItem"]))

    story.append(Spacer(1,30))
    story.append(HRFlowable(width="100%",thickness=1,color=PRIMARY,spaceAfter=10))
    story.append(Paragraph(L["disclaimer"], styles["SmallGray"]))
    story.append(Paragraph(L["generated"], styles["SmallGray"]))

    doc.build(story, onFirstPage=hf, onLaterPages=hf)
    print(f"OK: {L['file']}")


if __name__ == "__main__":
    build_report("no")
    build_report("en")
