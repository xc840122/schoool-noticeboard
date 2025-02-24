my-nextjs-app/
├── .github/
│ └── workflows/ # GitHub Actions for CI/CD
├── .husky/ # Git hooks (optional)
├── .vscode/ # VSCode settings (optional)
├── public/ # Static assets
├── src/
│ ├── app/ # App router (Next.js 13+)
│ │ ├── (auth)/ # Auth-related routes
│ │ ├── (dashboard)/ # Protected routes
│ │ │ ├── teacher/ # Teacher-specific routes
│ │ │ └── student/ # Student-specific routes
│ │ ├── api/ # API routes
│ │ ├── layout.tsx # Root layout
│ │ └── page.tsx # Home page
│ ├── components/ # Reusable UI components
│ │ ├── ui/ # ShadCN UI components
│ │ └── auth/ # Auth-related components
│ ├── hooks/ # Custom React hooks
│ ├── lib/ # Utility functions
│ ├── data/ # Data layer (Convex queries/mutations)
│ ├── business/ # Business logic layer
│ ├── schemas/ # Zod validation schemas
│ ├── styles/ # Global styles
│ └── types/ # TypeScript types
├── .env.local # Environment variables
├── .eslintrc.js # ESLint config
├── .prettierrc.js # Prettier config
├── next.config.js # Next.js config
├── tsconfig.json # TypeScript config
├── convex.json # Convex config
├── package.json # Project dependencies
└── README.md # Project documentation
