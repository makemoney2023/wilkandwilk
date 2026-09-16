# Site map — Wilk & Wilk Orthodontics

Canonical host: `https://www.wilkandwilk.com`

Redirects:
- `http://wilkandwilk.com` → `https://www.wilkandwilk.com/`
- `https://wilkandwilk.com` → `https://www.wilkandwilk.com/` (apex)

## Tech stack (rebuild context — do not migrate platform malware/cruft)
- Sesame Communications / Sesamehub dental CMS (srwd.sesamehub.com global CSS/JS v5.0)
- Local theme: `/assets/css/local.css`, `/assets/js/local.js`
- Fonts: Google Fonts Roboto; Font Awesome Pro 5.14 via Sesame CDN
- Analytics: Google Analytics `UA-192868371-1`
- Forms: Sesame contact forms + external Jotform patient medical history
- Patient portal: Sesame Communications patient portal cluster

## Rebuild header (current)

Logo home · **Welcome** · **New Patients** · **Treatments** · **Referrals** · **Contact** · Patient Login · **Consultation**

- **Welcome** → `/meet-the-doctors` — doctors, team, technology, community, culture
- **New Patients** → `/what-sets-us-apart` — what sets us apart, first visit, payment, forms, office tour, smile gallery
- **Treatments** → `/early-orthodontic-treatment` — nine treatment URLs
- **Referrals** → `/dentist-referral` — dentist and self referral
- **Contact** → `/contact-us` — contact and emergency care
- **Consultation** → `/request-a-consultation`
- Patient Login → Sesame portal (external)
- Aliases: `/home` → `/`, `/meet-dr-brian-wilk` → `/meet-the-doctors`, `/cambridge-office` → `/contact-us`

## Original navigation hierarchy (legacy)

Observed top-level: **Home · Welcome · New Patients · Smile Gallery · Treatments · Emergency Care · Let's Talk · Request a Consultation**

- **Home** → `/` (also `/home`)
- **Welcome** → `/meet-the-doctors`
  - Meet The Doctors → `/meet-the-doctors`
  - Meet the Team → `/meet-the-team`
  - Our Technology → `/our-technology`
  - Our Community → `/our-community`
  - Our Culture → `/our-culture`
- **New Patients** → `/what-sets-us-apart`
  - What Sets Us Apart → `/what-sets-us-apart`
  - First Visit → `/first-visit`
  - Payment Information → `/payment-information`
  - Patient Forms → `/patient-forms`
  - Office Tour → `/office-tour`
- **Smile Gallery** → `/smile-gallery` *(top-level)*
- **Treatments** → `/early-orthodontic-treatment`
  - Early Orthodontic Treatment → `/early-orthodontic-treatment`
  - For Teens → `/for-teens`
  - For Adults → `/for-adults`
  - Surgical Orthodontics → `/surgical-orthodontics`
  - Types of Braces → `/types-of-braces`
  - Types of Appliances → `/types-of-appliances`
  - Invisalign® Info → `/invisalign-info`
  - Wisdom Teeth → `/wisdom-teeth`
  - Patient Instructions → `/patient-instructions`
- **Emergency Care** → `/emergency-care` *(top-level)*
- **Let's Talk** → `/contact-us`
  - Contact Us → `/contact-us`
- **Request a Consultation** → `/request-a-consultation` *(top-level CTA)*

### Utility / chrome
- Patient Login → Sesame patient portal (external)
- Phone → `tel:519-624-9455`
- Social icons: Facebook, Google Maps, YouTube, Instagram, Blog RSS icon → `/blog`
- Logo home → `/`

## Footer / other public pages
- Cambridge office detail → `/cambridge-office`
- Dentist referral → `/dentist-referral`
- Self referral → `/self-referral`
- HTML Site Map → `/sitemap`
- Blog index → `/blog`
- Blog post → `/blog/2021/04/welcome-to-our-blog`
- Doctor deep-link → `/meet-dr-brian-wilk` (content overlaps meet-the-doctors)

## Full URL inventory

| Path | Title | Status | Copy file |
|------|-------|--------|-----------|
| `/blog` | Our Blog - Wilk & Wilk Orthodontics / Cambridge ON | 200 | `legacy-pages/blog.md` |
| `/blog/2021/04/welcome-to-our-blog` | Welcome to Our Blog! | 200 | `legacy-pages/blog-2021-04-welcome-to-our-blog.md` |
| `/cambridge-office` | Contact Us | redirect to `/contact-us` | `legacy-pages/cambridge-office.md` |
| `/contact-us` | Contact Wilk & Wilk | rebuilt | `legacy-pages/contact-us.md` |
| `/dentist-referral` | Dentist Referral | rebuilt | `legacy-pages/dentist-referral.md` |
| `/early-orthodontic-treatment` | Early Orthodontic Treatment | rebuilt | `legacy-pages/early-orthodontic-treatment.md` |
| `/emergency-care` | Emergency Care | rebuilt | `legacy-pages/emergency-care.md` |
| `/first-visit` | First Visit | rebuilt | `legacy-pages/first-visit.md` |
| `/for-adults` | For Adults | rebuilt | `legacy-pages/for-adults.md` |
| `/for-teens` | For Teens | rebuilt | `legacy-pages/for-teens.md` |
| `/` | Wilk & Wilk Orthodontics | rebuilt | `legacy-pages/home.md` |
| `/invisalign-info` | Invisalign Info | rebuilt | `legacy-pages/invisalign-info.md` |
| `/meet-dr-brian-wilk` | Meet The Doctors | redirect to `/meet-the-doctors` | `legacy-pages/meet-dr-brian-wilk.md` |
| `/meet-the-doctors` | Meet The Doctors | rebuilt | `legacy-pages/meet-the-doctors.md` |
| `/meet-the-team` | Meet the Team | rebuilt | `legacy-pages/meet-the-team.md` |
| `/office-tour` | Office Tour | rebuilt | `legacy-pages/office-tour.md` |
| `/our-community` | Our Community | rebuilt | `legacy-pages/our-community.md` |
| `/our-culture` | Our Culture | rebuilt | `legacy-pages/our-culture.md` |
| `/our-technology` | Our Technology | rebuilt | `legacy-pages/our-technology.md` |
| `/patient-forms` | Patient Forms | rebuilt | `legacy-pages/patient-forms.md` |
| `/patient-instructions` | Patient Instructions | rebuilt | `legacy-pages/patient-instructions.md` |
| `/payment-information` | Payment Information | rebuilt | `legacy-pages/payment-information.md` |
| `/request-a-consultation` | Request a Consultation | rebuilt | `legacy-pages/request-a-consultation.md` |
| `/self-referral` | Self Referral | rebuilt | `legacy-pages/self-referral.md` |
| `/sitemap` | Site Map | rebuilt | `legacy-pages/sitemap.md` |
| `/smile-gallery` | Smile Gallery | rebuilt scroll rail | `legacy-pages/smile-gallery.md` |
| `/surgical-orthodontics` | Surgical Orthodontics | rebuilt | `legacy-pages/surgical-orthodontics.md` |
| `/types-of-appliances` | Types of Appliances | rebuilt | `legacy-pages/types-of-appliances.md` |
| `/types-of-braces` | Types of Braces | rebuilt | `legacy-pages/types-of-braces.md` |
| `/what-sets-us-apart` | What Sets Us Apart | rebuilt | `legacy-pages/what-sets-us-apart.md` |
| `/wisdom-teeth` | Wisdom Teeth | rebuilt | `legacy-pages/wisdom-teeth.md` |

## sitemap.xml URLs (26)
All listed in XML were fetched successfully, plus extras: `/cambridge-office`, `/sitemap`, `/home`, `/blog`, `/blog/2021/04/welcome-to-our-blog`, `/meet-dr-brian-wilk`.

## robots.txt
```
User-agent: *
disallow: /ckeditor
disallow: /ckfinder
disallow: /domains
disallow: /site_template
```

## Blockers
- Blog tag/category URLs linked from the blog post return **404**: `/blog/tag/welcome/`, `/blog/tag/blog/`, `/blog/tag/orthodontics/`, `/blog/tag/cambridge/`, `/blog/tag/oakville/`, `/blog/category/about-our-office/`
- Scraper host needed TLS `-k` (incomplete local CA chain for site cert); site itself serves content on www over HTTPS
- HEAD requests to www sometimes returned 404 while GET returned 200 (method quirk)
- No public email plaintext (obfuscated); reconstructed from `rel`/`title`
- Individual `/meet-dr-kevin-wilk` → 404 (only Brian deep page + joint doctors page)
- Office tour images 09+ → 404; 01–08 exist
