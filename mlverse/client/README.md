<div align="center">

# 🧠 ML VERSE

### _27 Projects. One Universe._

[![Netlify Status](https://api.netlify.com/api/v1/badges/placeholder/deploy-status)](https://mlverse.netlify.app)
[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Powered by GSAP](https://img.shields.io/badge/Powered%20by-GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Streamlit](https://img.shields.io/badge/Deployed%20on-Streamlit-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white)](https://streamlit.io)

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![Lenis](https://img.shields.io/badge/Smooth%20Scroll-Lenis-000?style=flat-square)](https://lenis.darkroom.engineering/)

<br />

> **A sprawling digital ecosystem of 27 specialized Machine Learning projects**, each built with precision and deployed to solve real-world problems. From deep neural networks to advanced clustering algorithms, this universe represents the pinnacle of AI innovation at **SIN School of AI**.

<br />

<img src="screenshots/01_hero.png" width="100%" alt="MLVerse Hero — Cinematic 3D Brain Animation" />

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎬 **Cinematic 3D Brain Animation** | 40-frame scroll-synced canvas animation with lerp-based crossfade interpolation |
| 🌊 **Butter-Smooth Scrolling** | Lenis smooth scroll integrated with GSAP ScrollTrigger |
| 🎨 **Glassmorphism UI** | Frosted glass cards with backdrop blur and gradient borders |
| 📊 **27 Live ML Projects** | Real deployed Streamlit applications with search & filter |
| 🧩 **Interactive Builders Grid** | Click any builder to explore their projects |
| ⚡ **GSAP-Powered Animations** | Character-by-character reveals, parallax, counter animations |
| 🖱️ **Custom Cursor** | Cyan-glowing custom cursor with ring follower |
| 📱 **Fully Responsive** | Optimized for desktop, tablet, and mobile |
| 🔗 **Neural Network Background** | Animated particle system with neural connections |

---

## 📸 Screenshots

<div align="center">

### 🏠 Hero Section
<img src="screenshots/01_hero.png" width="90%" alt="Hero Section" />
<br /><br />

### 📖 About — What is MLVerse?
<img src="screenshots/02_about.png" width="90%" alt="About Section" />
<br /><br />

### 🚀 Projects Gallery
<img src="screenshots/03_projects.png" width="90%" alt="Projects Section" />
<br /><br />

### 📊 Stats & Team
<img src="screenshots/04_stats_team.png" width="90%" alt="Stats Section" />
<br /><br />

### 👥 The Builders
<img src="screenshots/05_team.png" width="90%" alt="Team Section" />
<br /><br />

### 🤝 Connect — Built at SIN School of AI
<img src="screenshots/06_connect.png" width="90%" alt="Connect Section" />
<br /><br />

### 🏛️ Our Officials
<img src="screenshots/07_officials.png" width="90%" alt="Officials Section" />

</div>

---

## 🏛️ Officials & Authorities

<table align="center">
  <tr>
    <td align="center" colspan="2">
      <h3>⭐ Er Harshvardhan Purohit</h3>
      <b>Lead Instructor & Lead Mentor</b><br />
      Founder & CEO, SIN Technologies<br />
      <a href="https://in.linkedin.com/in/harshvardhan1609">LinkedIn</a> · <a href="https://www.instagram.com/ceo.harsh/">Instagram</a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <h4>🏅 Dr Manish Bafna</h4>
      <b>Director & Registrar</b><br />
      Registrar, JIET Universe<br />
      Chief Patron
    </td>
    <td align="center">
      <h4>📋 Sanjay Bhandari</h4>
      <b>TPO</b><br />
      Training & Placement Officer
    </td>
  </tr>
  <tr>
    <td align="center" colspan="2">
      <h4>📘 Laxmi Choudhary</h4>
      <b>Coordinator</b><br />
      ML Course Coordinator
    </td>
  </tr>
</table>

---

## 🛠️ Tech Stack

```
Frontend          React 18 + Vite
Animations        GSAP (ScrollTrigger) + Lenis Smooth Scroll
3D Animation      Canvas API with 40-frame lerp interpolation
Styling           Vanilla CSS with CSS Variables + Glassmorphism
Fonts             Google Fonts (Rajdhani + Space Mono)
ML Projects       Streamlit (Python)
Deployment        Netlify
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ 
- **npm** v8+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/mlverse.git
cd mlverse/mlverse/client

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Deploy to Netlify

```bash
# Option 1: Drag & Drop
# Build → drag the dist/ folder to app.netlify.com/drop

# Option 2: CLI
npm install -g netlify-cli
netlify deploy --prod --dir=dist

# Option 3: Git-based (Auto-deploys)
# Connect your GitHub repo on app.netlify.com
# Base directory: mlverse/client
# Build command: npm run build
# Publish directory: mlverse/client/dist
```

---

## 📁 Project Structure

```
mlverse/client/
├── public/
│   ├── frames/              # 40 brain animation frames (JPG)
│   ├── logo/                # SIN School of AI & JIET logos
│   ├── brain.gif            # Ambient brain decoration
│   └── _redirects           # Netlify SPA routing
├── src/
│   ├── components/
│   │   ├── BrainAnimation.jsx    # Cinematic scroll-synced canvas
│   │   ├── Navbar.jsx            # Smart scroll-tracking navbar
│   │   ├── NeuralBackground.jsx  # Particle neural network
│   │   ├── ProjectCard.jsx       # Glass-morphic project cards
│   │   └── ...
│   ├── sections/
│   │   ├── Hero.jsx         # Landing with 3D title animation
│   │   ├── About.jsx        # Mission & stats
│   │   ├── Projects.jsx     # Filterable project gallery
│   │   ├── Team.jsx         # Interactive builders grid
│   │   ├── Connect.jsx      # Officials & social links
│   │   └── Stats.jsx        # Animated counters
│   ├── data/
│   │   └── projectsData.js  # All 27 project entries
│   ├── App.jsx              # Root with Lenis smooth scroll
│   └── index.css            # Design system & global styles
├── screenshots/             # Application screenshots
└── README.md
```

---

## 🎓 ML Domains Covered

| Domain | Count | Examples |
|--------|-------|---------|
| 🔵 **Clustering** | 8 | TrendCluster AI, ClusterVibe, ClusterVerse |
| 🟢 **Classification** | 4 | Random Forest, Classification |
| 🟡 **Neural Networks** | 7 | Activation Model, NeuralOrbit |
| 🔴 **AI Applications** | 5 | GhostedAI, VibeCheck ML, AIGoverse |
| 🟣 **ML Apps** | 3 | Machine Learning App, Stock Market AI |

---

## 👥 The 27 Builders

<div align="center">

| # | Builder | Project |
|---|---------|---------|
| 01 | Suryapal Singh Rathore | TrendCluster AI |
| 02 | Lalit Kanwar | Random Forest |
| 03 | Khwahish Bhati | Clustering Analysis |
| 04 | Tanishq | Random Forest |
| 05 | Satyam Mall | GhostedAI |
| 06 | Satyam Deora | GhostedAI |
| 07 | Shreyanshi Jangid | ClusterVibe: AI Segmenter |
| 08 | Mansi Soni | Machine Learning App |
| 09 | Ridhima Agarwal | VibeCheck ML |
| 10 | Kritesh Singh Chouhan | Activation Model |
| 11 | Himanshu Bhandari | ClusterVerse |
| 12 | Harish | Random Forest |
| 13 | Nikhil Sharma | ML Acti. Pro. |
| 14 | Mayank Solanki | Learn ML Arctic Ultimate |
| 15 | Aniket Daiya | ML Clustering |
| 16 | Kritesh Singh Chouhan | Learn ML Arctic Ultimate v2 |
| 17 | HarshWardhan Singh Jodha | Clustering Analysis |
| 18 | Arvind Bishnoi | Clustering Analysis |
| 19 | Jaswardhan Solanki | Classification |
| 20 | Priyansh Rai | Activation Dashboard |
| 21 | Su_kumawat (Sunil) | Clustering Dashboard |
| 22 | Anonymous | Activation Functions |
| 23 | Udit Jain | Stock Market AI |
| 24 | Shakti Singh | AIGoverse |
| 25 | Khushal Khatri | NeuralOrbit |
| 26 | Neeti Lohiya | Activation Function |
| 27 | Ritesh Mane | OpenRouter Explorer |

</div>

---

## 🙏 Acknowledgments

- **SIN School of AI** × **JIET Universe** — GEN AI Bootcamp
- **SIN Technologies** — [sintechnologies.in](https://sintechnologies.in)
- **Streamlit** — For making ML deployment accessible
- **GSAP** — For world-class web animations
- The **Spiritual Power of the Universe** for guiding this journey of knowledge and innovation

---

<div align="center">

**© 2025 SIN School of AI · SIN Education & Technology Pvt. Ltd.**

[![Website](https://img.shields.io/badge/Website-sintechnologies.in-00F5FF?style=for-the-badge)](https://sintechnologies.in)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-SIN%20India-0A66C2?style=for-the-badge&logo=linkedin)](https://in.linkedin.com/company/sinindia)
[![Instagram](https://img.shields.io/badge/Instagram-sin.edutech-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/sin.edutech/)
[![YouTube](https://img.shields.io/badge/YouTube-CEO%20Harsh-FF0000?style=for-the-badge&logo=youtube)](https://www.youtube.com/@ceoharsh)

<br />

_Machine Learning. Reimagined by Students._ 🚀

</div>
