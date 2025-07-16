# TrackOpz Operator Portal

## Overview

This project is a Next.js-based operator/manager portal for TrackOpz, featuring secure authentication, real-time user profile display, and a modern UI. It uses Prisma, JWT-based authentication, and a PostgreSQL (or compatible) database.

---

## Authentication & Session Flow

- **Login/OTP:**

  - Operators/managers log in using phone/email and OTP.
  - On successful OTP verification, a JWT is generated and set as an HTTP-only cookie (`token`).

- **Session:**

  - The JWT cookie is used for session management and persists across page reloads.

- **Operator Setup:**
  - After first login, operators complete their profile (username, profile image).
  - This info is saved in the database and associated with their account.

---

## User Profile Info Handling

- **Backend:**

  - User info (username, profileImage) is stored in the `operator` table.
  - The `/api/me` endpoint reads the JWT from the cookie, verifies it, and returns the current operator's profile info.

- **Frontend:**
  - On every page load (e.g., `/home`), the frontend fetches `/api/me` to get the current user's info.
  - The username and profile image are passed as props to UI components (`HomeClient`, `Sidebar`, etc.), which display them in the header and sidebar.

---

## Key Files & Endpoints

- **API Endpoints:**

  - `/api/verify-operator-otp` — Verifies OTP, sets JWT cookie.
  - `/api/operator-setup` — Saves operator's username and profile image.
  - `/api/me` — Returns current user's username and profile image (requires valid JWT cookie).

- **Frontend Components:**
  - `app/home/page.tsx` — Fetches user info from `/api/me` and passes to `HomeClient`.
  - `app/home/HomeClient.tsx` — Displays user info in header and passes to `Sidebar`.
  - `components/sidebar.tsx` — Displays user info in sidebar.

---

## Setup & Usage

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Configure environment variables:**
   - Create a `.env` file with:
     - `DATABASE_URL` (your database connection string)
     - `JWT_SECRET` (a strong secret for JWT signing)
     - Any other required variables (see `.env.example` if present)
3. **Run database migrations:**
   ```sh
   npx prisma migrate deploy
   # or for development
   npx prisma migrate dev
   ```
4. **Start the development server:**
   ```sh
   npm run dev
   ```
5. **Access Prisma Studio (optional, for DB management):**
   ```sh
   npx prisma studio
   ```

---

## How to Add/Update User Profile

- After login and OTP verification, if the operator has not set up their profile, they are redirected to the setup page.
- On the setup page, the operator enters their username and profile image URL, which are saved to the database.
- On subsequent logins, their profile info is fetched and displayed automatically.

---

## Security Notes

- JWT tokens are stored as HTTP-only cookies for security.
- All sensitive endpoints require a valid JWT.
- Passwords (if used) are hashed with bcrypt.

---

## Troubleshooting

- If user info does not display, ensure:
  - The `/api/me` endpoint is working and returns the correct info.
  - The JWT cookie is present in your browser.
  - The database contains the correct operator info.
- Use browser dev tools and console logs to debug data flow.

---

## Contributing

Pull requests and issues are welcome! Please follow best practices for code, security, and documentation.
