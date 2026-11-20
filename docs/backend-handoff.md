# 78 Requests frontend and ASP.NET Core handoff

This guide covers the complete 78 Requests product so the frontend and backend teams can agree on integration boundaries before implementing endpoints. The current React app contains a Super Admin dashboard prototype only. Sign-in/sign-up are being handled separately, and employee, approver, and Finance screens have not been built yet. Do not interpret a missing screen as a missing backend requirement.

## Current frontend status

| Product area | Frontend status |
| --- | --- |
| Super Admin overview, users, roles/workflow, audit log, and requests | Prototype pages exist under `src/pages/superadmin_dashboard/`. They use sample records and local interactions. |
| Authentication and invitation acceptance | Not included in this app build yet; frontend work is being handled separately. |
| Employee request dashboard and request form | Not built yet. |
| Approver queue and approve/reject/return screens | Not built yet. |
| Finance payment, reconciliation, and refund screens | Not built yet. |
| Notifications, accessibility controls, PWA installation/offline | Not integrated yet. |

The dashboard displays a prototype notice so sample names, counts, states, and actions are not mistaken for live system data. Current action buttons that require server changes are placeholders. The feature tour's completion and sidebar/theme preferences are stored in this browser only; once auth exists, onboarding completion should be keyed to the authenticated user or stored as a backend preference if desired.

## Current integration files

- `src/services/apiClient.js` is a shared JSON request helper. It reads the public API origin from `VITE_API_BASE_URL`, accepts caller-provided headers, and surfaces ASP.NET Core `ProblemDetails` messages.
- `src/services/superAdminDashboardApi.js` is an unconnected Super Admin read adapter. It accepts confirmed route paths rather than inventing endpoint URLs.
- `src/data/superAdminDemoData.js` and `src/data/superAdminNavigation.js` contain prototype fixtures and navigation labels. Replace fixture imports with API-backed loading states once routes and response DTOs are agreed.
- `.env.example` documents the `VITE_API_BASE_URL` setting. Values prefixed with `VITE_` are included in browser code and must never contain secrets.

The API adapter is scaffolding only; it is not currently called by dashboard pages. No routes, auth transport, server DTOs, pagination rules, or mutation contracts have been agreed. Do not wire mock URLs or sample thresholds as if they were production API behavior.

## Endpoint and screen inventory to agree

These are product operations for the teams to map to actual ASP.NET Core routes in Swagger/OpenAPI. They are not proposed route paths.

| Product area | Operations the UI will need |
| --- | --- |
| Authentication and access provisioning | Admin creates a user record, assigns scope/roles, sends/resends/revokes an invite; invitee verifies identity, sets credentials/MFA, and activates; sign-in/out and current-user context. |
| User and organization management | List/search/filter people; create/update/suspend/reactivate/deactivate accounts; departments, roles, permissions, reporting lines, delegation, availability, and security settings. |
| Employee procurement | Create/save/submit a draft; list and view own requests; upload a receipt; report unused funds/refunds; track request and reconciliation status. |
| Approval workflow | Show the current user's approval queue and request history; approve, reject with required reason, or return for revision; show the route, current decision, and comments; set availability and authorized delegation. |
| Finance | List fully approved requests; filter by department; record payment status/transaction; reconcile receipts; review outstanding refunds. Any actual payment action needs a separately reviewed financial workflow and must not be simulated by a UI-only status change. |
| Notifications | List unread/read in-app notifications, mark read, and receive server-produced reminders. |
| Audit and history | List/filter audit events and request history. The server creates immutable audit records for security, access, approval, payment, reconciliation, and refund actions. |

Agree which operations can be batched, paged, sorted, filtered, and searched on the server. The UI should not be the source of truth for authorization, route selection, payment state, or audit history.

## Data contract recommendations

Field names below describe what the current or planned UI needs. They are an integration checklist, not a final C# DTO specification.

| Record | Fields to agree |
| --- | --- |
| Current user/session | Stable user ID, display name, company email, role/scope claims, permissions, MFA state, and session expiry/refresh behavior. Never infer authorization from the React route. |
| Person | Stable ID, full name, company email, department, job position, assigned role/scope, account status, availability, and timestamps. |
| Procurement request | Stable ticket ID (for example `PR-ENG-0001`), requester, category, item/specification, amount and currency, justification, attachments, current status, approver route/history, comments/rejection reason, and timestamps. |
| Approval decision | Request ID, actor, decision, reason/comment, step/order, any required verification result, and server timestamp. |
| Payment/reconciliation/refund | Request ID, authorized actor, amount/currency, transaction reference/status, receipt reference, reconciliation result/difference, refund amount/status, and timestamps. |
| Audit event | Event ID, timestamp, actor, action, target record, result, and any permitted context. Define field-level redaction for sensitive data. |
| Notification | ID, recipient, type, message/reference, read state, created time, and related request/user ID. |
| Organization configuration | Department/role IDs, permission grants, hierarchy, approved categories/thresholds, delegates, bypass/mandatory steps, and effective dates. |

Use timezone-aware ISO 8601 timestamps. Agree whether monetary values are serialized as decimal strings or JSON numbers, the currency field, and rounding rules before wiring payment data. Define pagination and a consistent JSON property casing in the OpenAPI document; map C# DTOs to the UI's camelCase names in the adapter if necessary.

## Business rules recorded in the PRD

- Access is internal and invitation-based by default. Public self-registration is disabled unless the organisation approves it.
- The backend must enforce role-based access plus department/request-level scope on every operation. A hidden button or client-side check is not an authorization boundary.
- User lifecycle: Created → Invited → Active; later states include Suspended and Deactivated. Invitation links are one-time and expire after 72 hours. Suspension signs the user out on all devices. Every access/role action is audited.
- Request states: Draft, Pending approval, Returned for revision, Rejected, Approved, Awaiting Payment, Paid, Awaiting Reconciliation, and Completed. Agree enum/wire values with the frontend before implementation; display labels can be mapped separately.
- The server derives the approver route from the approved category, hierarchy, amount threshold, and availability/delegation rules. A rejection requires a reason, stops later approval steps, notifies the requester, and is recorded in the audit history.
- A mandatory final approver cannot be skipped solely due to unavailability. Only formally authorised delegates and approved bypass rules can change the route.
- The final category list, thresholds, exact bypass rules, and some mandatory-approver details are still undecided. Treat any values in the prototype as examples only; do not seed them as production policy.
- Five-day reminder timing and device-based biometric/passkey verification for final approval are proposed PRD requirements. Confirm their precise behavior, security policy, and rollout phase with the product owners.

## Error, authentication, and security agreement

- Publish the ASP.NET Core OpenAPI specification as the source of truth for paths, verbs, request/response DTOs, and status codes.
- Agree whether browser authentication uses secure cookies or bearer tokens before connecting the client. The request helper accepts headers, but currently has no token storage, cookie policy, refresh flow, or login behavior.
- Return clear validation errors and agree behavior for unauthorized, forbidden, conflict, rate-limit, and server errors. ASP.NET Core `ProblemDetails` is supported by the shared helper for JSON failures.
- Keep secrets server-side. Never put database credentials, signing keys, privileged API tokens, or payment credentials in frontend environment variables.
- Re-check permissions server-side for reads and writes; avoid returning sensitive fields outside the user's scope. Make state-changing operations safe against retries/double submission where appropriate.
- Define upload limits, accepted receipt types, storage location, malware scanning, and access checks before implementing document upload.

## Integration sequence

1. Backend publishes a reviewed OpenAPI contract and example responses for auth, people/organization, requests/approvals, finance, notifications, and audit.
2. Frontend and backend agree status wire values, DTO casing, amounts/currency, timestamps, pagination, validation/error behavior, and auth transport.
3. Backend provides non-production API access and seeded test accounts/data for each role and scope.
4. Frontend configures `VITE_API_BASE_URL`, maps only confirmed routes in `src/services/`, and replaces fixtures with loading, empty, error/retry, and success states.
5. Implement the remaining role-specific screens against the same reviewed contract; do not assume all users can call every API because they share a dashboard shell.
6. Verify role/scope restrictions and workflow transitions with direct API requests as well as the UI. Keep credentials, real financial transactions, and production user data out of mock fixtures.
