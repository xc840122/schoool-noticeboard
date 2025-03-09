# School Noticeboard

A Next.js project for managing classroom noticeboard with role-based authentication (Teacher and Student). Teachers can post tasks, and students can view them in real-time without refreshing the page. Built with modern technologies like TypeScript, Convex, Clerk Authentication, ShadCN UI, React Hook Form, and Zod.

## Features

- **Role-Based Authentication**: Two roles—Teacher and Student.
- **Real-Time Task Updates**: Leverages Convex for real-time updates.
- **Classroom Code**: Users must provide a 6-digit alphanumeric classroom code during sign-up.
- **Form Validation**: React Hook Form and Zod for robust form validation.
- **Modern UI**: ShadCN UI components for a sleek and responsive design.
- **Data & Business Layer**: Separation of concerns for complex functions.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **TypeScript**: Strongly typed JavaScript for better developer experience.
- **Clerk Authentication**: Easy-to-integrate authentication solution.
- **Convex**: Real-time database and backend functions.
- **ShadCN UI**: Beautiful and customizable UI components.
- **React Hook Form**: Efficient form management with validation.
- **Zod**: Schema validation for form inputs.
- **Prettier**: Code formatting for consistent style.

## Getting Started

### Testing data

- visit https://schoool-noticeboard.vercel.app/sign-in
- test account: teacher/11111111, student/11111111
- Verification code and related class for testing purpose: (each code can use just once,u can email me to reset)

OtHUuL (Role:teacher, class 3A)
3V5kd4 (Role:student, class 3A)

fISHkz (Role:teacher, class 6B)
Y2xmKI (Role:student, class 6B)

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Convex account
- Clerk account

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/xc840122/schoool-noticeboard.git
   cd schoool-noticeboard
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

**Set up environment variables:**

Create a `.env.local` file in the root directory and add the following:

```
CONVEX_DEPLOYMENT
NEXT_PUBLIC_CONVEX_URL
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

**Deployment used by `npx convex dev`:**

- CONVEX_DEPLOYMENT
- NEXT_PUBLIC_CONVEX_URL

**Clerk configuration:**

- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- CLERK_SECRET_KEY
- NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
- NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

4. **Run the development server:**

```bash
npm run dev
# or
yarn dev
```

5. **Open the app:**

- Visit `http://localhost:3000` in your browser.

## Project Structure

```
school-noticeboard
├── convex                          # Backend logic and database models for Convex
│   ├── _generated                  # Auto-generated files by Convex (e.g., types, queries, mutations)
│   └── models                      # Defines data models and schemas for the database
├── public                          # Stores static assets like images, fonts, and icons
└── src                             # Main source code directory for the application
    ├── actions                     # Reusable server actions or functions for handling business logic
    ├── app                         # Next.js App Router structure for organizing routes and pages
    │   ├── (dashboard)             # Group route for dashboard-related pages
    │   │   └── notice              # Notice-related functionality
    │   │       ├── @modal          # Intercepting routes for modals
    │   │       │   └── (.)[id]     # Modal route for a specific notice ID
    │   │       └── [id]            # Dynamic route for a specific notice ID
    │   ├── sign-in                 # Sign-in functionality
    │   │   └── [[...sign-in]]      # Catch-all route for sign-in pages
    │   ├── sign-up                 # Sign-up functionality
    │   │   └── [[...sign-up]]      # Catch-all route for sign-up pages
    │   └── user-profile            # User profile functionality
    │       └── [[...user-profile]] # Catch-all route for user profile pages
    ├── components                  # Reusable UI components
    │   ├── forms                   # Form-related components
    │   └── ui                      # UI components (e.g., buttons, cards, modals)
    ├── constants                   # Application-wide constants
    │   └── messages                # Constants for messages or notifications
    ├── helper                      # Helper functions and utilities
    ├── hooks                       # Custom React hooks
    ├── lib                         # Library or utility functions
    ├── repositories                # Data access layer for interacting with the database
    ├── services                    # Business logic and service layer
    ├── types                       # TypeScript type definitions
    ├── utils                       # Utility functions and helpers
    └── validators                  # Validation logic (e.g., Zod schemas)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```
