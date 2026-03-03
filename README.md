# Centre Dentaire Polo — Website

Professional landing page for **Centre Dentaire Polo**, Casablanca.

Built with **React + Vite**, deployable on **Vercel** in minutes.

---

## 🚀 Quick Deploy to Vercel

### Option A — One-click (Vercel Dashboard)
1. Push this repo to GitHub (see below)
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repo
4. Vercel auto-detects Vite — click **Deploy**
5. Done! Live in ~60 seconds ✓

### Option B — Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
centre-dentaire-polo/
├── public/
│   ├── images/           ← Your clinic photos
│   │   ├── reception.jpg
│   │   ├── salle1.jpg    (Salle Implantologie)
│   │   ├── salle2.jpg
│   │   ├── salle3.jpg
│   │   ├── salle4.jpg
│   │   ├── sterilisation.jpg
│   │   ├── radio.jpg     (Carestream)
│   │   ├── couloir.jpg
│   │   ├── equipe.jpg
│   │   └── hall.jpg
│   └── favicon.svg
├── src/
│   ├── App.jsx           ← Main component (all sections)
│   ├── App.css           ← All styles
│   ├── main.jsx          ← React entry point
│   └── index.css         ← Global reset + animations
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```

---

## ✏️ Customization

### Update contact info
Edit `src/App.jsx` — search for `+212 5XX XX XX XX` and replace with your real phone number.
Also update `Quartier Polo, Casablanca, Maroc` with your full address.

### Update hours
Find the `Horaires` section in `App.jsx` and change the schedule as needed.

### Add Google Maps
In the Contact section of `App.jsx`, you can embed a Google Maps iframe by replacing the contact-details div with an `<iframe>` from [maps.google.com](https://maps.google.com) → Share → Embed a map.

### Connect a form backend
The contact form currently shows a success state. To send real emails:
- **Option 1**: Use [Formspree](https://formspree.io) — replace the `handleSubmit` function with a `fetch` POST to your Formspree endpoint
- **Option 2**: Use [EmailJS](https://emailjs.com) — add the `emailjs-com` package
- **Option 3**: Create a Vercel serverless function in `/api/contact.js`

### Change colors
All colors are CSS variables in `src/index.css`:
```css
--green-500: #5CB85C;  /* Primary brand green */
--slate-900: #0f172a;  /* Dark text */
```

---

## 📋 Tech Stack
- **React 18** — UI framework
- **Vite 5** — Build tool
- **Playfair Display** — Display font (Google Fonts)
- **DM Sans** — Body font (Google Fonts)
- No UI library dependencies — pure CSS

---

## 🌐 GitHub Setup

```bash
cd centre-dentaire-polo
git init
git add .
git commit -m "Initial commit — Centre Dentaire Polo"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/centre-dentaire-polo.git
git push -u origin main
```

Then connect the repo on [vercel.com](https://vercel.com) → automatic deployments on every push.

---

© 2024 Centre Dentaire Polo · Casablanca
