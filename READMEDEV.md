# Visiflow

## Guide for Developers

### Global

---

#### Initialization

1. Pull the latest from master branch
2. Create a .env based on .env.example

### Front-end

---

#### Foundational Libraries/Frameworks

1. Yarn
2. Typescript
3. Vite
4. React
5. SASS
6. SCSS
7. Tailwind
8. DaisyUI

#### Initialization

1. Run `yarn install`

#### Folder Structure

- Public: contains static assets that do not require processing, such as HTML files
- Assets: contains static assets like images, icons, fonts, etc.
- Components: contains reusable components like navigation bar, buttons, forms, etc.
- Layouts: contains the page base useede in each page
- Pages: contains the larger components that represent the various pages of the application
- Services: holds any services or API-related files
- Stores: contains files to manage local storage
- Utils: contains utilities, helpers, constants files

#### Colors

- Primary: ![#f03c15](https://placehold.co/15x15/0db284/0db284.png)
- Accent: ![#f03c15](https://placehold.co/15x15/2C4C32/2C4C32.png)
- Neutral: ![#f03c15](https://placehold.co/15x15/D0D2CC/D0D2CC.png)
- Base: ![#f03c15](https://placehold.co/15x15/DFEAEF/DFEAEF.png)
- Success: ![#f03c15](https://placehold.co/15x15/0db284/0db284.png)
- Warning: ![#f03c15](https://placehold.co/15x15/ffce0a/ffce0a.png)
- Error: ![#f03c15](https://placehold.co/15x15/FD4A4A/FD4A4A.png)

### Back-end

---

#### Foundational Libraries/Frameworks

1. Composer
2. PHP
3. Laravel
4. PostCSS
5. Vite

#### Initialization

1. Run `composer install`

### Running the application

1. Run `yarn vite build`
2. Run `yarn vite`
3. Run `php artisan serve`
   For those running the application for the first time (It's important to have a .env)
4. Click on generate APP_KEY
