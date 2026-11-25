# Procurement Workspace Frontend

This repository contains the React frontend prototype for the 78 Requests procurement product. It includes role-based screen flows for Super Admin, Employee, Approver, and Finance Officer, plus invitation-based sign-in, first-time account setup, password creation, and two-step verification. Dashboard records and actions are still prototype data; authentication has a configurable API adapter and development-only demo flows.

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

### Connect to the local API

The backend API runs at `http://localhost:8080` when started with Docker. After you have access to the backend repo, clone it and follow its “Run it with Docker” instructions. You need Docker Desktop and Git; you do not need to install .NET or PostgreSQL separately. Copy this frontend repo's `.env.example` to `.env.local` and keep `VITE_API_BASE_URL=http://localhost:8080`. In the backend repo's own `.env`, set `FRONTEND_ORIGIN` to the exact frontend origin Vite prints (for example `http://localhost:5173`). These settings belong in separate repositories. Restart Vite after changing `.env.local`, and never commit `.env` or `.env.local` files.

## Useful commands

```sh
npm run dev      # Start the local development server
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Run Oxlint
```

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
└── favicon.svg            # Static favicon
src/
├── App.jsx                # Application-level component
├── main.jsx               # React entry point
├── assets/
│   ├── images/             # Images imported by the app
│   ├── icons/              # SVG and other icon assets
│   └── videos/             # Video assets imported by the app
├── components/             # Reusable UI components
├── data/                   # Temporary sample content and navigation config
├── pages/
│   ├── auth/                # Sign-in and invitation setup flow
│   ├── superadmin_dashboard/ # Super Admin pages
│   ├── employee/            # Employee dashboard and request flow
│   ├── approver/            # Approval queue and decision flow
│   ├── finance/             # Payment, payout, and reconciliation views
│   └── shared/              # Page building blocks shared by role pages
├── services/                # Shared API client and endpoint adapter
└── styles/                  # Shared JavaScript style objects and responsive rules
docs/
└── backend-handoff.md       # Product-wide API and ASP.NET Core integration guide
.env.example                 # Public API origin placeholder
```

The screens are grouped by product phase/role under `src/pages/`. Reusable controls and the responsive workspace shell live in `src/components/`; cross-page role widgets live in `src/pages/shared/`. Choose a preview role from the “View as” menu in the desktop header. Role routes use hash URLs, for example `#/employee/make-request` and `#/finance/payments`. Authentication begins at `#/auth/sign-in`; invitation, password, and verification steps follow from the sign-in response.

The workspace includes a persisted light/dark theme switch, collapsible desktop navigation, a first-visit Super Admin guide, mobile bottom navigation, and screen-level sample flows. A persistent prototype notice explains that dashboard values are not live and payment actions do not transfer funds. Backend notes cover the product-wide UI, C# DTO considerations, security rules, and outstanding PRD decisions in [`docs/backend-handoff.md`](docs/backend-handoff.md). Authentication requests are in `src/services/authApi.js`; dashboard integration scaffolds are also in `src/services/`. The auth paths in `.env.example` are defaults only and must be confirmed against the backend team's Swagger/OpenAPI contract.

### Authentication preview

The shared authentication flow lives in `src/pages/auth/`, with the API adapter at `src/services/authApi.js` and endpoint settings in `.env.example`. It supports invitation account setup, password rules, authenticator enrollment and sign-in verification, password reset requests, and sign-out. The backend should issue an HTTP-only session cookie; the frontend does not persist production passwords or tokens. `npm run dev` enables demo-only local flows; these are excluded from production builds. Demo names and behavior are sample content, not real credentials or working production accounts.

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
- Keep dashboard styling in shared inline styles and JavaScript style objects under `src/styles/`. The authentication pages share one `src/styles/auth.css` stylesheet; do not create a separate stylesheet for each JSX page.
- Store app images, icons, and videos under the corresponding `src/assets/` folders. Import them into JSX so Vite can include and process them in the build. For example:

  ```jsx
  import logo from '../assets/images/logo.png'

  function Brand() {
    return <img src={logo} alt="Company name" />
  }
  ```

- Keep `public/` for files that need a fixed public URL and should be copied as-is, such as the favicon. The favicon can be referenced from `index.html` as `/favicon.svg`.
- Use clear, descriptive component and file names so both contributors can find and reuse the same UI.

## Current prototype pieces

- `src/pages/superadmin_dashboard/` contains the five current dashboard views.
- `src/components/` holds shared controls and the dashboard layout/tour.
- `src/data/superAdminDemoData.js` contains mock records only; it is not an API cache or source of truth.
- `src/services/` contains unconnected integration scaffolding. Do not wire production behavior until the backend publishes the reviewed OpenAPI contract.

The role screens are interaction prototypes. Before production, connect them to the reviewed API contract and replace every sample record with loading, empty, error/retry, and success states. Authentication, uploads, approvals, notifications, payouts, and audit data must use backend-authoritative flows described in the handoff guide.
