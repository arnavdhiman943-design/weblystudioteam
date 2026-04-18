# Webly Studio — Shadcn & Aurora Integration Guide

This project has been updated with a **Next.js + Shadcn-UI** compatible file structure. Since the current environment doesn't have Node.js available, follow these steps locally to see the components in action.

## 🚀 Local Setup Instructions

### 1. Install Node.js
If you haven't already, download and install Node.js from [nodejs.org](https://nodejs.org/).

### 2. Initialize the Project
Open your terminal in the `webly` directory and run:

```bash
# Install all dependencies
npm install

# (Optional) If you want to use the Shadcn CLI for more components later:
npx shadcn-ui@latest init
```

### 3. Key Files Installed
- **`lib/utils.ts`**: The core utility for merging Tailwind classes.
- **`components/ui/aurora-background.tsx`**: The premium background component.
- **`components/demo.tsx`**: A ready-to-use demo implementation.
- **`tailwind.config.js`**: Updated with custom animations and color variables.
- **`tsconfig.json`**: Configured with `@/*` path aliases.

### 4. How to Use the Component
In your Next.js page (e.g., `app/page.tsx`), simply import the demo:

```tsx
import { AuroraBackgroundDemo } from "@/components/demo";

export default function Page() {
  return (
    <main>
      <AuroraBackgroundDemo />
    </main>
  );
}
```

### 5. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your new Aurora background!

---

> [!NOTE]
> All existing files (`index.html`, `server.js`, etc.) have been preserved. You can continue using the Express backend alongside the new React frontend if you configure Next.js as your primary server or use them as separate services.
