# Mimic Landing Page

This is a Nuxt.js project for the Mimic landing page. It is a single-page application with multiple sections, showcasing the features and vision of the Mimic brand.

## Key Technologies

*   **Nuxt.js:** A Vue.js framework for building server-side rendered (SSR) and static websites.
*   **Vue.js:** A progressive JavaScript framework for building user interfaces.
*   **GSAP (GreenSock Animation Platform):** A JavaScript library for creating high-performance animations.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.

## Project Structure

*   **`/` (root directory):**
    *   `nuxt.config.ts`: Nuxt.js configuration file. This is where you can configure modules, plugins, and other settings.
    *   `package.json`: Contains project metadata and a list of dependencies.
    *   `tsconfig.json`: TypeScript configuration file.
*   **`/app`:**
    *   `app.vue`: The main application component. It contains the layout and routing for the different sections of the landing page.
    *   **`/app/assets`:**
        *   **`/app/assets/fonts`:** Contains custom fonts used in the project.
        *   **`/app/assets/images`:** Contains images and other static assets.
    *   **`/app/components`:** Contains reusable Vue components.
        *   `MainPage.vue` to `NinthPage.vue`: Each component represents a section of the landing page.
        *   `Navigation.vue`: The navigation component.
        *   `ThirdTextAnimation.vue`: A component for text animation.
*   **`/public`:**
    *   `favicon.ico`: The favicon for the website.
    *   `robots.txt`: A file to instruct web crawlers on how to crawl the website.

## How to Run

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Start the development server:**
    ```bash
    npm run dev
    ```
3.  **Build for production:**
    ```bash
    npm run build
    ```
4.  **Preview the production build:**
    ```bash
    npm run preview
    ```
5.  **Deploy to GitHub Pages:**
    ```bash
    npm run deploy
    ```