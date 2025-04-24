# Hayden's Hub Website

**Hayden’s Hub** is a community-driven organization supporting youth with special needs and their caregivers in Ottawa. It provides access to resources, promotes advocacy, and builds connections through a visually engaging, responsive design.

---

## Project Overview

This website was built using **[Astro](https://astro.build)** for its component-based static site architecture, paired with **TailwindCSS** for a utility-first design system. It features:

- A modern, accessible UI with smooth scrolling
- Componentized layout (`Layout.astro`) for reusability
- Hero, About, Team, Contact, and FAQ sections
- External scripts for interaction (like FAQ toggles)
- All images and static files served from the `/public` directory

---

## Project Structure

```
haydens-hub-website/
├── haydens-hub/                # Astro project root
│   ├── public/                 # Static assets (images, scripts)
│   │   ├── assets/
│   │   └── scripts/script.js
│   ├── src/
│   │   ├── components/         # Header, Footer, etc.
│   │   ├── layouts/Layout.astro
│   │   ├── pages/index.astro   # Main page content
│   │   └── styles/global.css   # Tailwind config + custom styles
│   ├── astro.config.mjs
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── package-lock.json
│   ├── package.json
│   ├── ASTRO-README.md
│   └── .gitignore
└── README.md

```

---

## 🛠 Tech Stack

- **Astro**: for component-based static site generation
- **TailwindCSS v3**: for styling (manually downgraded from v4 to resolve conflicts)
- **Vite**: used under the hood by Astro for fast builds
- **PostCSS**: required for Tailwind processing

---

## Key Configurations

### Tailwind Setup

Installed using:

```bash
npm uninstall tailwindcss
npm install -D tailwindcss@^3.3.0
npm install @astrojs/tailwind
npx astro add tailwind
```

### Tailwind Configuration

Custom theme colors and fonts are defined inside `tailwind.config.js`. Global styling and base Tailwind imports are in `src/styles/global.css`.

### Scripts

Scripts are served from the `/public` directory and manually linked in Astro components.
The custom JavaScript for FAQ toggles is included inside `public/scripts/script.js`. You reference it in the `Layout.astro` using:

```astro
<script src="/scripts/script.js" is:inline></script>
```

---

## Development

To run the site locally:

```bash
cd deeply-debris
npm install
npm run dev
```

---

## Deployment

Not done yet

## 📌 Notes

- `tailwind.config.js` must include `content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"]`
- Static images are referenced from `/assets/` inside the `public/` folder
- All components (like Header and Footer) are modular and reusable

---

## Author

**Designed & Developed with ❤️ by [Anjali Patel](https://www.linkedin.com/in/anjali-patel)**

---

## License

Not licensed yet
