# NewsReader

A React news app that uses the New York Times API to show top stories and search for articles.

## Getting Started

You need Node.js 18 or newer and a free NY Times API key from https://developer.nytimes.com/.

Enable both the Top Stories API and Article Search API when creating your API key.

## Setup

1. Clone this repository.
2. Install the packages:

   ```bash
   npm install
   ```

3. Create a file named `.env` in the project root.
4. Add your API key:

   ```env
   VITE_NY_TIMES_API_KEY=your_api_key_here
   ```

5. Start the app:

   ```bash
   npm run dev
   ```

The `.env` file is ignored by Git. Do not commit your API key.

## Features

- Browse New York Times top stories.
- Search for articles.
- Log in and log out.
- Save articles separately for each username.
- Protect the saved articles page so users must log in.
- Use regular and admin roles.
- Restrict the admin dashboard to admin users.
- View saved articles from all users in the admin dashboard.

## Demo Login

The assignment uses mock login, so any non-empty username and password work. Choose Regular User or Admin to test each role. This is for the class project and is not real account security.

## Deployment

When deploying to Vercel, add an Environment Variable named `VITE_NY_TIMES_API_KEY` and set its value to your NY Times API key. Redeploy after adding or changing the variable.

## Scripts

- `npm run dev` starts the development server.
- `npm run build` creates a production build.
- `npm run lint` runs ESLint.
- `npm run preview` previews the production build.