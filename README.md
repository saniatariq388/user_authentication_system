This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

--------------------------------------

Frontend Overview
The frontend is built using Next.js. The application contains several pages and components related to user authentication: Sign Up, Sign In, Forgot Password, and Reset Password.

------------------

1. Pages in Authentication System

Sign Up Page (signup/page.tsx) 
register a new user

-----------------------

2. Sign In Page (signin/page.tsx)
 allows users to log in

-------------------------------

3. Forgot Password Page (forgot-password/page.tsx)

allows users to request a password reset by entering their email.

---------------

o connect the backend with the frontend

1. Start Your Backend Server
node server.js

3. Frontend: Making API Calls
   through fetch("http://localhost:5000/api/auth/signup")
   with method POST

   if user exist 
   allow user to shop route
