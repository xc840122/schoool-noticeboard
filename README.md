/app
/api
/user
route.ts # API route (calls service layer)
/dashboard # (Client components)
layout.tsx
page.tsx

/components # Reusable UI components
/hooks # Custom React hooks (e.g., useAuth.ts)

/lib
prisma.ts # Prisma DB connection
validation.ts # Zod validation schemas

/services
user-service.ts # Business logic for users
auth-service.ts # Authentication logic

/data
user-repository.ts # Database queries for users
task-repository.ts # Database queries for tasks

/utils
helpers.ts # General helper functions
constants.ts # Shared constants

/types
user.ts # TypeScript interfaces
task.ts # TypeScript interfaces

/public # Static assets
/styles # Global styles

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
