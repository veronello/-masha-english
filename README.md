# Masha’s English

A simple website designed to make learning English approachable and motivating, with short exercises, reading activities, grammar in context, jokes, and pictures. New materials are added gradually. A white background, green accents, and a mobile-friendly layout keep the focus on the content.

**[Visit the website](https://veronello.github.io/-masha-english/)**

## What’s on the website

| Section | Content |
| --- | --- |
| Home | A welcome message, an illustration, and a button leading to the exercises. |
| Matching Headings | Exercise 1: The History of Everyday Things — five texts about inventions, seven headings to choose from, and answers that can be revealed. |
| Word Formation | Exercises on DEVELOP, EMPLOY, and HELP: 17 sentences in total, with answers. |
| Grammar in Context | Comparative Adjectives — Mauritania: a continuous reading passage with five gaps, A–C answer choices, and an answer key. |
| Random Stuff | Chuck Norris Jokes, Blonde Jokes, Dad Jokes, and Some funny pics. |

Each of the three learning sections has a dropdown menu and a **Random** option for choosing an available exercise at random. Words in Word Formation are listed alphabetically. Answers are revealed using the **View Answers** button.

Random Stuff uses a submenu to switch between collections. Some funny pics currently contains two images, each displayed in a separate blue-grey frame with generous spacing between them.

## Adding content

Open the relevant HTML file in the `dist/` folder. Use the existing exercises as examples.

| Section | File | How to add content |
| --- | --- | --- |
| Home | `dist/index.html` | Edit the welcome message and links. |
| Matching Headings | `dist/matching-headings.html` | Add a `section.matching-exercise` with a unique `data-exercise` value and an `h2` heading. |
| Word Formation | `dist/word-formation.html` | Add a `section.word-exercise` with a unique `data-word` value. |
| Grammar in Context | `dist/grammar-in-context.html` | Add a `section.grammar-exercise` with a unique `data-topic` value and a title in `data-label`. |
| Random Stuff | `dist/random-stuff.html` | Add jokes to the relevant collection and images inside `div.funny-gallery`. |

New learning activities are automatically included in the relevant dropdown and Random selection. When copying an exercise, also update its HTML `id` attributes and the corresponding `aria-labelledby` references so that the IDs remain unique.

Images are stored in `dist/assets/`. To add a picture, insert an `img` tag with the file path and a description in `alt`. Gallery frames and spacing are applied automatically, and image proportions are preserved.

## How the site works

The site uses HTML, CSS, and JavaScript. No build step or dependency installation is required: download the repository and open `dist/index.html` in a browser.

- `dist/style.css` — shared styles and responsive layout; section-specific styles are included in the HTML files.
- `dist/assets/reference.webp` — the original mockup: CSS displays the logo and illustration areas. The welcome message and navigation are editable HTML.
- `dist/favicon.svg` — the browser tab icon: a white letter “m” with cat ears and eyes.
- `dist/manifest.webmanifest` and `dist/icons/` — the name, standalone display settings, and icons for the online PWA.
- `dist/online-app.js` — checks for updates when the PWA starts, returns from the background, or regains connectivity.
- `dist/about.html` — redirects to the homepage; the previously empty About page has been merged into Home.
- The root `index.html` — redirects to `dist/index.html`.
- `.nojekyll` — enables static publishing without Jekyll processing.

The main navigation is repeated in the section HTML files. Changes to navigation labels and links should be applied to all of these pages.

## Publishing

The site is hosted on **GitHub Pages**, using the `main` branch and the `/ (root)` folder.

Changes saved to `main` are published automatically by GitHub Pages. Deployment may take a few minutes; check its status in the repository’s Actions tab.

**[Live website](https://veronello.github.io/-masha-english/)** · **[Repository](https://github.com/veronello/-masha-english)**

## Adding the site to your phone’s home screen

On iPhone, open the site in Safari, choose **Share → Add to Home Screen**, and enable **Open as Web App** if that toggle is shown. On Android, use the install or add-to-home-screen option in your browser’s menu. The exact wording depends on the browser.

The online PWA opens in a standalone window with the cat icon. It does not include a service worker, offline storage, or saved answers; an internet connection is required to load content. Normal browser HTTP caching still applies.

When the PWA starts or returns to the foreground, the script compares the published page’s date with the date of the open document using the Last-Modified header provided by GitHub Pages. If a newer version is available, the page reloads automatically; no manual date update is needed. If a network error occurs, the current page stays open. If another host does not provide a date, a one-time reload is used without a reload loop. Updates become available after deployment completes and the changes propagate through the CDN.

Save new photos with new filenames. When replacing an image, CSS file, or JavaScript file under the same name, change the version in its URL (for example, `style.css?v=2`) so that normal HTTP caching does not delay the update. New HTML pages should include the same links to the manifest, apple-touch-icon, and online-app.js as the existing sections.
