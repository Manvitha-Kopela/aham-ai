# Aham.ai v3 — Full React Codebase

A fully functional, production-ready website built with React + Vite + Framer Motion.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build
```

Open http://localhost:5173

---

## 📁 File Structure

```
src/
├── components/
│   ├── Cursor.jsx          # Custom neon cursor (desktop)
│   ├── Navbar.jsx          # Sticky nav, lang switcher, mobile menu
│   ├── Hero.jsx            # Hero section
│   ├── Sections.jsx        # Ticker, Stats, Services bento, Portfolio, Process
│   ├── Pricing.jsx         # Pricing cards with monthly/annual toggle
│   ├── OtherSections.jsx   # Team, FAQ accordion, Blog, Instagram grid
│   ├── Contact.jsx         # Contact form with validation + EmailJS
│   ├── Footer.jsx          # Footer with admin link
│   └── Functional.jsx      # WhatsApp FAB, Admin Dashboard, Client Portal
├── context/
│   └── LanguageContext.jsx # i18n state (EN/HI/TE/ES)
├── data/
│   ├── i18n.js             # All translations
│   └── content.js          # Team, portfolio, pricing, FAQ, blog data
├── hooks/
│   └── useHooks.js         # useActiveSection, useScrollReveal, useCursor
├── styles/
│   └── globals.css         # CSS variables, reset, base styles
├── App.jsx                 # Root component, view router
└── main.jsx                # Entry point
```

---

## ⚙️ Configuration Guide

### 1. Replace Team Photos
In `src/components/OtherSections.jsx`, find each `TeamCard` and replace the avatar div with a real image:

```jsx
// BEFORE (initials placeholder):
<div style={{ width: 72, height: 72, borderRadius: '50%', background: m.gradient ... }}>
  {m.initials}
</div>

// AFTER (real photo):
<img
  src="/photos/arun-kumar.jpg"
  alt={m.name}
  style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover' }}
/>
```

Put your photos in the `/public/photos/` folder.

---

### 2. Update Team & Portfolio Data
Edit `src/data/content.js`:

```js
export const TEAM = [
  {
    id: 1,
    name: 'Your Real Name',      // ← Change this
    role: 'Your Real Role',      // ← Change this
    bio: 'Your real bio...',     // ← Change this
    photoUrl: '/photos/name.jpg', // ← Add this field and use in component
    // ...
  }
]
```

---

### 3. Connect Email (Contact Form)
The form is ready — just add your EmailJS credentials in `src/components/Contact.jsx`:

```js
// Step 1: npm install @emailjs/browser
// Step 2: Sign up at https://emailjs.com (free tier works)
// Step 3: Replace these:
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

// Step 4: Uncomment the emailjs block in handleSubmit()
```

**EmailJS Template Variables** to use in your template:
- `{{from_name}}` — sender's name
- `{{from_email}}` — sender's email
- `{{service}}` — selected service
- `{{message}}` — project brief

---

### 4. Connect WhatsApp
In `src/components/Functional.jsx`:

```js
// Replace with your actual WhatsApp number (with country code, no +):
const WA_NUMBER = '919876543210'  // ← Your number here
```

---

### 5. Connect Real Instagram Feed
Replace the mock grid in `src/components/OtherSections.jsx` with the real Instagram Basic Display API:

```js
// 1. Get token: https://developers.facebook.com/docs/instagram-basic-display-api
// 2. Replace the Instagram component with:

const [posts, setPosts] = useState([])
useEffect(() => {
  const TOKEN = 'YOUR_INSTAGRAM_TOKEN'
  fetch(`https://graph.instagram.com/me/media?fields=id,media_url,permalink,like_count,comments_count&access_token=${TOKEN}`)
    .then(r => r.json())
    .then(d => setPosts(d.data?.slice(0, 12) || []))
}, [])
```

---

### 6. Update Translations
Edit `src/data/i18n.js` to add or modify any text in all 4 languages.

---

### 7. Admin Access
Click **"Admin ⚙"** in the footer. In production, protect this with a password or move it to a separate `/admin` route using React Router.

---

### 8. Client Portal
Demo credentials: `client@nexora.com` / `nexora123`

For real clients, connect to a backend (Supabase, Firebase, or your own API). Each client should have:
- Unique login credentials
- Their own project data stored in a database
- Real-time messaging via WebSockets or polling

---

## 🌐 Deployment

### Vercel (Recommended — Free)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag the /dist folder to app.netlify.com/drop
```

### Custom Server
```bash
npm run build
# Upload the /dist folder to your hosting
# Set the server to redirect all routes to index.html
```

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `react` | UI framework |
| `react-dom` | DOM rendering |
| `framer-motion` | Animations (accordion, modals, hover effects) |
| `@emailjs/browser` | Contact form email sending |
| `vite` | Build tool |

---

## 🎨 Customisation

### Change Brand Colors
Edit the CSS variables in `src/styles/globals.css`:

```css
:root {
  --coral: #FF4D2E;   /* Primary accent — change to your brand color */
  --lime: #C5F135;    /* Secondary accent */
  --bg: #0E0C0A;      /* Page background */
  --tx: #F2EDE6;      /* Primary text */
}
```

### Change Fonts
In `index.html`, replace the Google Fonts link. Then update in `globals.css`:

```css
:root {
  --font-display: 'Your Display Font', sans-serif;
  --font-body: 'Your Body Font', sans-serif;
}
```

---

## 📞 Support
Made by Aham.ai — ahamaidigitalworks@gmail.com
