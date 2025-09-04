# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# AI Career Simulator

A comprehensive AI-powered roleplay simulator designed for new tech company hires to practice real-world scenarios in a safe, educational environment.

## 🚀 Features

- **AI-Powered Mentoring**: Interactive chat interface with intelligent responses
- **Multi-Role Scenarios**: Frontend, Backend, DevOps, QA, Code Review, and more
- **Progress Tracking**: XP system, levels, achievements, and completion tracking
- **Task-Based Learning**: Structured scenarios with specific learning objectives
- **Responsive Design**: Beautiful, accessible UI that works on all devices
- **Dark/Light Mode**: Full theme support with system preference detection
- **Real-time Feedback**: Instant AI responses and helpful hints for tasks

## 🛠 Tech Stack

### Core Framework

- **React 18** with TypeScript
- **Vite** for fast development and building
- **TanStack Router** for type-safe routing
- **Zustand** for state management with persistence

### UI & Styling

- **shadcn/ui** for beautiful, accessible components
- **Tailwind CSS** for utility-first styling
- **Radix UI** primitives for robust component foundations
- **Lucide React** for consistent iconography

### Data & APIs

- **TanStack Query** for server state management
- **Mock AI Service** (easily replaceable with real AI)

### Development Tools

- **TypeScript** for type safety
- **Prettier** for code formatting
- **Oxlint** for fast linting
- **PostCSS** with Autoprefixer

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run Oxlint
- `npm run format` - Format code with Prettier

## 📋 Available Scenarios

1. **Frontend Developer Onboarding** (Beginner)
2. **API Design Best Practices** (Intermediate)
3. **Application Deployment Pipeline** (Advanced)
4. **Quality Assurance Testing Strategy** (Intermediate)
5. **Code Review Best Practices** (Intermediate)

## 🎯 Key Features

- **Progress System**: XP points, levels, and achievements
- **AI Mentor**: Context-aware responses and task guidance
- **Responsive Design**: Mobile-first, accessible interface
- **Theme Support**: Dark/light mode switching

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
