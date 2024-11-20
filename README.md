# Next.js Three.js Tailwind Template

A modern, full-featured template for rapidly building web applications. Pre-configured with TypeScript, Three.js, Tailwind CSS, and more to eliminate boilerplate setup and get coding faster.

![image](https://github.com/user-attachments/assets/44ed6c39-7c06-429f-a7d5-30ff9ae525e9)

## Tech Stack

- Next.js 15.0.3 (App Router)
- React 18.2.0
- TypeScript 5
- Three.js 0.170.0
- Tailwind CSS 3.4.1
- Framer Motion 11
- React Three Fiber (r3f) 8

![image](https://github.com/user-attachments/assets/4e86010d-f88a-4e43-a388-ec54746f8fd0)

![image](https://github.com/user-attachments/assets/3acd0a7e-3415-4b07-a16d-e8522874879a)

![image](https://github.com/user-attachments/assets/eb1375a2-0654-4c88-bcfd-2460cdb01e56)

- React Three Fiber 8
- ESLint & Prettier for code quality

## Quick Start

```bash
# Clone the template
git clone https://github.com/JayRichh/next-template

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see your app.

## Features

### 🎨 Styling & UI

- Tailwind CSS with custom utility classes
- Dark mode support
- CSS variables for theming
- Pre-built UI components
- Geist font integration
- Glass morphism utilities

### 🧰 Development Tools

- TypeScript for type safety
- ESLint with strict rules
- Prettier for code formatting
- Import sorting
- Path aliases (@/ for src directory)

### 🎯 Components & Examples

- UI Components
  - Buttons, Cards, Tooltips
  - Form elements
  - Feedback components
  - Layout utilities
- 3D Examples
  - Three.js integration
  - Physics examples
  - Material showcases
  - Morph animations

## Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## Project Structure

```
src/
├── app/             # Next.js app directory
│   ├── examples/    # Example pages and components
│   ├── three/       # Three.js examples
│   └── api/         # API routes
├── components/
│   └── ui/          # Reusable UI components
├── hooks/           # Custom React hooks
├── services/        # API and external services
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Customization

### Styling

1. Modify `tailwind.config.ts` for theme customization
2. Update CSS variables in `src/app/globals.css`
3. Use utility classes like `glass` and `glass-hover`

### Components

1. Add new components in `src/components/ui`
2. Follow existing patterns for consistency
3. Use TypeScript for type safety
4. Include proper documentation

### 3D Content

1. Create new scenes in `src/app/three`
2. Use provided examples as reference
3. Leverage React Three Fiber hooks

## Best Practices

- Use TypeScript for all new files
- Follow ESLint rules
- Run Prettier before committing
- Keep components small and focused
- Use proper semantic HTML
- Follow accessibility guidelines
- Implement proper error handling
- Add appropriate documentation

## License

MIT
