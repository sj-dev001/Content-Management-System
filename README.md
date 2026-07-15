# Basic React Content Management System

This project is a simple React-based content management system with:

- a form to create and edit articles
- a list view for published content
- local storage so content persists in the browser

## Run locally

1. Install Node.js and npm
   - Download from https://nodejs.org/
   - Or with Homebrew: `brew install node`
2. Install dependencies:
   `npm install`
3. Start the development server:
   `npm run dev`
4. Open the local URL shown in the terminal

## Deploy to GitHub Pages

1. Create a GitHub repository and push this project to it.
2. Update the deployment settings in `package.json` and `vite.config.js`:
   - `package.json`: replace `your-username` and `content-management-system` with your GitHub username and repository name
   - `vite.config.js`: change the `base` value to `/your-repo-name/`
3. Install the deployment dependency if needed:
   `npm install`
4. Build and deploy:
   `npm run deploy`
5. In GitHub, open the repository settings and enable GitHub Pages using the `gh-pages` branch.

## Project structure

- `src/App.jsx` – main CMS UI and logic
- `src/index.css` – styling
- `src/main.jsx` – app entry point
- `vite.config.js` – Vite configuration for GitHub Pages
