# 🔮 Tarot Reading Web App

A modern, interactive Tarot Reading web application built with Next.js. Explore tarot spreads, receive AI-powered interpretations, and discover insights about love, career, finance, and health through an immersive mystical experience.

---

## ✨ Features

* 🎴 Interactive tarot card selection and animations
* 🤖 AI-generated tarot interpretations
* 💖 Specialized readings for Love, Career, Finance, and Health
* 🌌 Beautiful mystical UI with smooth transitions
* 📱 Fully responsive design for desktop, tablet, and mobile
* ⚡ Built with high performance and SEO optimization in mind

---

## 🚀 Tech Stack

* **Framework:** Next.js 16
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Animation:** Framer Motion
* **Authentication:** NextAuth.js
* **Database:** Supabase
* **AI Integration:** OpenAI API
* **State Management:** Zustand

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/LeNguyenTatThang/tarot.git
cd tarot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root and add the required environment variables:

```env
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
OPENAI_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Run ESLint
```

---

## 🌐 Project Structure

```text
src/
├── app/                # Next.js App Router
├── components/         # Reusable UI components
├── modules/            # Feature-based modules
├── lib/                # Utilities and configurations
├── store/              # Zustand state management
├── types/              # TypeScript type definitions
└── hooks/              # Custom React hooks
```

---

## 🔐 Environment Variables

Make sure the following services are configured:

* Supabase project credentials
* OpenAI API key
* Google OAuth credentials (optional)
* NextAuth secret

---

## 🚀 Deployment

This project is optimized for deployment on Vercel.

```bash
npm run build
```

Then deploy using:

* Vercel (recommended)
* Docker
* Any Node.js hosting platform

---

## 📸 Highlights

* Immersive tarot reading experience
* Dynamic card animations
* Personalized AI insights
* Elegant mystical design system

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 💫 Acknowledgements

* Next.js Team
* Vercel
* OpenAI
* Supabase
* Framer Motion

Built with passion for tarot, technology, and meaningful experiences.
