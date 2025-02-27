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

Create A Project in next.js using these technologies:

Typescript, Prettier

Clerk Authentication:

Convex:

ShadCN UI:

React Hook Form:

The app needs two role-based authentication—one for someone signing in as a teacher and another for a student.

A teacher can post a task and display it to the users registered in the class.

When a teacher or student signs up, they must add their classroom code and put in a 6-digit alphanumerical ID.

Add functionality that users don’t have to refresh the screen to see new tasks (leverage convex)

Please use React Hook Form and Zod to validate user input.

Please also use Git/GitHub along the way, making commits as if you were working alongside a team.

Please also use a data & business layer when doing complex functions.

The user must need to be logged in.

Please deploy your application and email in your deployed link and GitHub repository.
