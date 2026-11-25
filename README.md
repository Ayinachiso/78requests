# Procurement Workspace Frontend

This repository contains the React frontend for a procurement tool. It is currently a starter environment; product screens and backend integration will be added as requirements are defined.

The product is intended to become a Progressive Web App (PWA), so users can install it from a supported browser and launch it from a home screen. PWA support has not been configured yet; this README records the intended direction.

## Tech stack

- React 19 for the UI
- Vite for local development and production builds
- JavaScript with JSX
- Oxlint for linting

## Getting started

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

Vite prints the local development URL in the terminal. The server supports hot updates while you edit files.

## Useful commands

```sh
npm run dev      # Start the local development server
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Run Oxlint
```

## Authentication integration

The authentication screens live in `src/pages/auth/`; API calls are isolated in `src/services/authApi.js`. Copy `.env.example` to `.env.local` and set `VITE_API_BASE_URL` plus any endpoint overrides for the backend environment.

The app selects its auth flow by pathname in `src/App.jsx`:

- `/` opens the existing admin sign-in flow. After authentication, `src/pages/AdminHomePage.jsx` renders the admin workspace. This is the page to extend or replace when connecting the admin dashboard UI.
- `/employee` opens the employee invitation flow. After authentication, `src/pages/HomePage.jsx` renders the employee dashboard.

Both flows use the shared password setup in `src/pages/auth/AccountSetup.jsx`. Auth screens are in `src/pages/auth/`; API requests and endpoint configuration are in `src/services/authApi.js` and `.env.example`.

The frontend expects these backend routes by default:

- `POST /api/auth/sign-in` with `{ "email", "password" }`. Return `{ "requiresAccountSetup": true, "setupToken": "â€¦" }` for first-time setup, `{ "requiresTwoStepVerification": true, "challengeToken": "â€¦" }` for an existing account that needs a code, or success for an authenticated session.
- `POST /api/auth/set-password` with `{ "email", "temporaryPassword", "newPassword" }`. Return `{ "setupToken": "â€¦" }` for two-step enrollment.
- `POST /api/auth/two-step/setup` with `{ "email", "setupToken" }`, returning `{ "qrCodeDataUrl", "secret", "setupToken" }` for authenticator enrollment.
- `POST /api/auth/two-step/verify-setup` with `{ "email", "setupToken", "code" }` to confirm enrollment.
- `POST /api/auth/two-step/skip` to complete an employee invitation when optional phone-code setup is deferred.
- `POST /api/auth/two-step/verify` with `{ "email", "challengeToken", "code" }` to complete a returning userâ€™s sign-in challenge.
- `POST /api/auth/password/forgot` with `{ "email" }` to request a password reset. Return the same generic success response whether or not the email exists.
- `GET /api/auth/session` returning `{ "user": { "email" } }` for a valid session, or HTTP 401 when signed out.
- `POST /api/auth/sign-out` to clear the session.

Use secure HTTP-only session cookies for authenticated responses. The frontend sends requests with credentials enabled and does not store passwords or session tokens in local storage. Set the appropriate CORS and cookie settings when the API is served from a different origin. Endpoint path overrides are available for each auth endpoint in `.env.example`.

For local interface preview only, `npm run dev` enables test authentication flows. These flows are disabled from production builds.

## Git and team workflow

Use `main` as the shared, stable branch. Avoid committing work directly to `main`; each contributor should create a short-lived branch for a task, push it to GitHub, and open a pull request (PR) back to `main`.

Suggested branch names:

```text
feat/request-list
fix/button-disabled-state
chore/project-setup
```

Typical workflow:

1. Update your local `main` from GitHub.
2. Create a branch for one task.
3. Make and commit a focused change, then push the branch.
4. Open a PR to `main`; describe the change and any decisions or follow-up work.
5. Have the other frontend contributor review it. Resolve feedback, then merge the PR.
6. Update local `main` and create a new branch for the next task.

### Step-by-step terminal guide

These Git commands are the same on macOS and Windows. On Windows, use Git Bash or the VS Code terminal with Git installed. The command to change folders can differ by terminal:

```sh
# macOS Terminal or Windows Git Bash (if the project is on your Desktop)
cd ~/Desktop/78requests
```

```powershell
# Windows PowerShell (if the project is on your Desktop)
cd "$HOME\Desktop\78requests"
```

#### First time on a computer

Clone the repository once, then install its dependencies:

```sh
git clone https://github.com/ayinachisonweze/78requests.git
cd 78requests
npm install
```

#### Start work on a page

Before starting a new task, update your local `main` branch, then create a branch for the page or task. Choose a different branch name for each task:

```sh
git switch main
git pull
git switch -c feat/request-list-page
```

Replace `feat/request-list-page` with a clear task name, such as `feat/supplier-page`. Make your changes on that task branch.

#### Save and share work

When you are ready to save a snapshot and share your task branch:

```sh
git add .
git commit -m "feat: add request list page"
git push -u origin feat/request-list-page
```

Use a message that describes your change and use your actual branch name in the push command. The first push of a branch uses `-u`; later pushes to the same branch can use `git push`.

Pushing a branch does not merge it into `main`. On GitHub, open a PR from your task branch into `main`, ask the other frontend contributor to review it, then merge it when it is ready. After the PR is merged, both contributors should update local `main` before starting the next task:

```sh
git switch main
git pull
```

Do not work directly on `main`. If two people need to edit the same page at once, coordinate first to reduce conflicts. Working on different pages in separate task branches is easier to combine.

Example commands (replace the branch name with your task):

```sh
git switch main
git pull origin main
git switch -c feat/request-list
# make changes and commit them
git push -u origin feat/request-list
```

Use GitHub branch protection on `main` to require pull requests and at least one approval before merging. Enable a status check for `npm run build` (and optionally `npm run lint`) once GitHub Actions is configured. Keep task branches focused and merge them promptly so they do not drift.

### Backend handoff

The backend team can work in this repository if both teams agree on a shared repository layout and ownership, or in a separate backend repository. Decide this with the backend team before creating permanent backend branches. In either case, agree on the API contract (for example, endpoint paths, request and response shapes, authentication, and error formats) and keep that contract documented and versioned. Frontend branches should integrate against an agreed API contract or mock data until the backend is available.

Do not use a long-lived branch for each person or team: it makes integration and review harder. Use task branches and PRs. If a dedicated integration or staging branch becomes necessary later for deployment, define its purpose and merge rules separately.

## Project structure

```text
public/
â””â”€â”€ favicon.svg            # Static favicon
src/
â”œâ”€â”€ App.jsx                # Application-level component
â”œâ”€â”€ main.jsx               # React entry point
â”œâ”€â”€ assets/
â”‚   â”œâ”€â”€ images/             # Images imported by the app
â”‚   â”œâ”€â”€ icons/              # SVG and other icon assets
â”‚   â””â”€â”€ videos/             # Video assets imported by the app
â”œâ”€â”€ components/             # Reusable UI components
â”œâ”€â”€ pages/                  # Page-level components
â””â”€â”€ styles/                 # Shared JavaScript style objects
```

Vite's `index.html` at the repository root is the browser document that loads `src/main.jsx` and provides the `#root` element where React renders. App screens and UI are written in JSX.

## PWA direction

The existing React and Vite setup can support a PWA. PWA support will be added as the app's identity and offline needs are defined. It is expected to include:

- A web app manifest with the app name, launch URL, display mode, theme colors, and install icons.
- App icons in the sizes and formats required by supported browsers and devices.
- A service worker to cache selected app files and provide the agreed offline behavior.
- Browser metadata and platform configuration needed for a good install and launch experience.

The manifest, service worker, and platform icons are browser-facing assets/configuration, so they do not need to be JSX. The manifest and icons may be served from `public/` when they need stable URLs; app media imported into the React UI remains under `src/assets/` for Vite to process. PWA installability and offline behavior should be checked against a production build served over HTTPS (localhost is suitable for local development).

## Shared conventions

- Put reusable interface elements, such as buttons, inputs, and navigation, in `src/components/`.
- Put page-level compositions in `src/pages/` and render the active page from `src/App.jsx`.
- Keep styles in JavaScript objects under `src/styles/`. Components and pages can import shared styles; we are not using a separate CSS file for each JSX file.
- Store app images, icons, and videos under the corresponding `src/assets/` folders. Import them into JSX so Vite can include and process them in the build. For example:

  ```jsx
  import logo from '../assets/images/logo.png'

  function Brand() {
    return <img src={logo} alt="Company name" />
  }
  ```

- Keep `public/` for files that need a fixed public URL and should be copied as-is, such as the favicon. The favicon can be referenced from `index.html` as `/favicon.svg`.
- Use clear, descriptive component and file names so both contributors can find and reuse the same UI.

## Current starter UI

- `src/pages/HomePage.jsx` is a placeholder landing page.
- `src/components/Button.jsx` is a reusable button with `primary` and `secondary` variants.
- `src/styles/componentStyles.js` and `src/styles/pageStyles.js` hold shared inline style objects.

Replace the placeholder content as the procurement workflow and visual requirements are agreed.
