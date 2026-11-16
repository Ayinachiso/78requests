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
├── pages/                  # Page-level components
└── styles/                 # Shared JavaScript style objects
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
