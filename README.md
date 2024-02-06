Another [Next.js](https://nextjs.org/) project with [Prisma ORM](https://www.prisma.io/) and Postgres, [NextAuth.js](https://next-auth.js.org/) for authentication, few of [Radix UI Primitives](https://www.radix-ui.com/primitives/docs/primitives/overview) components.

https://github.com/rezahedi/streakup/assets/1499349/0bcad31b-fbdc-4cdf-9b81-5c8551c25674

## Features
- Used Next.js Intercepting Route
- Used Radix UI dialog and dropdown menu components
- Created an inline editing component
- Learned how to lazy loading components using react's lazy and Suspense, that are not affecting the UI for performance
- Used Prisma ORM for database
- Used NextAuth.js for authentication
- After spending hours debuging learned to not forgot to import react-loading-skeleton's style whenever the component used
- Build a custom page for NextAuth.js signin

## Next steps to improve or fix issues
- Refactor Habits list page, it's a mess
- Don't need using intercepting route for /new, just load the new component inside a dialog
- Don't need to separate `broken` and `finished` habits to separate pages, just use a filter option
- Sending push notifications and enable/disable push notifications in user settings
- Using TinyBird for realtime analytic data
- Dialog, modal and dropdown menu handle as drawer in mobile (check dub.co for example)
- Animate list items update (add new, check-in, delete, activate, start over or breaking)
- Gamification, like a streak, badges, points, etc
- Use sonner toast
- Use react-email component for email template (https://react.email/docs/getting-started/manual-setup)
- handle error in signin page, error passed as search param `error` https://next-auth.js.org/configuration/pages#sign-in-page
- create custom error page for auth
- Build CRUD admin panel using shadcn
- Profile update page: auto save changes, profile picture upload, timezone setting