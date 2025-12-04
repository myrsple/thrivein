# ThriveIn - Landing Page

A clean, modern landing page for ThriveIn.cz - helping expats settle in Prague/Czechia.

## 🚀 Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid, animations
- **Vanilla JavaScript** - No dependencies
- **Deployment** - GitHub Pages

## 📁 Project Structure

```
thrivein/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles with design system
├── js/
│   └── main.js         # Interactivity & animations
├── assets/             # Images, favicon (to be added)
└── README.md
```

## 🎨 Design System

### Colors
- **Background**: `#050505` (primary), `#0a0a0a` (secondary)
- **Text**: `#ffffff` (primary), `#a3a3a3` (secondary)
- **Accent**: `#a855f7` (purple), `#7c3aed` (secondary purple)
- **Border**: `#1f1f1f` (dark), `#2a2a2a` (light)

### Typography
- **Primary**: Outfit
- **Display**: Space Grotesk

### Spacing
Based on a 0.25rem (4px) scale: xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl

## 🔧 Setup for Contact Form

The contact form uses [Formspree](https://formspree.io) for handling submissions:

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy the form ID
3. Replace `YOUR_FORM_ID` in `index.html`:

```html
<form class="contact__form" id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

## 🌐 Deployment to GitHub Pages

### Option 1: Deploy from main branch

1. Push code to GitHub repository
2. Go to **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Select `main` branch and `/ (root)` folder
5. Click **Save**

Your site will be live at `https://username.github.io/repository-name/`

### Option 2: Custom domain (thrivein.cz)

1. Complete Option 1 first
2. Add a `CNAME` file to the repo root with content: `thrivein.cz`
3. Configure DNS at your domain registrar:
   - A record: `185.199.108.153`
   - A record: `185.199.109.153`
   - A record: `185.199.110.153`
   - A record: `185.199.111.153`
   - CNAME: `www` → `username.github.io`
4. In GitHub Pages settings, add custom domain `thrivein.cz`
5. Enable "Enforce HTTPS"

## ✅ TODO / Placeholders

The following items need to be provided/configured:

- [ ] **Favicon** - Add `assets/favicon.png` and uncomment link in HTML
- [ ] **OG Image** - Add `assets/og-image.png` for social sharing
- [ ] **Team Photo** - Replace placeholder in About section
- [ ] **Contact Email** - Confirm `hello@thrivein.cz` is correct
- [ ] **Formspree ID** - Configure contact form
- [ ] **About Text** - Write personal intro paragraph
- [ ] **Social Links** - Add Instagram/LinkedIn if available
- [ ] **Privacy Policy** - Add if required for GDPR

## 🔮 Future Enhancements

- [ ] FAQ pages for each service (SEO capture)
- [ ] Czech language version
- [ ] Client testimonials section
- [ ] Blog/resources section

## 📄 License

© ThriveIn. All rights reserved.

