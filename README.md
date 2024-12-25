# NextJs 14.x + MUI 5.x + React Hook Form + TypeScript Starter and Boilerplate

<div align="center">
  <h2>2024/2025: 🔋 NextJs 14.x + MUI 5.x + TypeScript Starter</h2>
  <p>The scaffold for NextJs 14.x (App Router), React Hook Form, Material UI(MUI 5.x),Typescript and ESLint, and TypeScript with Absolute Import, Seo, Link component, pre-configured with Husky.</p>

  <p>With simple example of NextJs API, React-hook-form with zod, fetch remote api, 404/500 error pages, MUI SSR usage, Styled component, MUI AlertBar, MUI confirmation dialog, Loading button, Client-side component & React Context update hook</p>

🚘🚘🚘 [**Click here to see an online demo**](https://mui-nextjs-ts.vercel.app) 🚘🚘🚘

If you prefer Tailwind css, check this: [Tailwind-CSS-Version](https://github.com/theodorusclarence/ts-nextjs-tailwind-starter)

</div>

## Demo

[<img src="https://alexstack.github.io/reactStarter/asset/NextJs14-mui5.gif">](https://mui-nextjs-ts.vercel.app)

🚘🚘🚘 [**Click here to see an online demo**](https://mui-nextjs-ts.vercel.app) 🚘🚘🚘

## Features

This repository is 🔋 battery packed with:

- ⚡️ Next.js 14.x with App Router
- ⚛️ React 18.x
- ✨ TypeScript
- 💨 Material UI — Ready to use Material Design components [check here for the usage](https://mui.com/material-ui/getting-started/usage/)
- 🎨 React Hook Form — Performant, flexible and extensible forms with easy-to-use validation
- ⏰ Day.js — A modern day JavaScript Date Library
- 🔥 Utils: getApiResponse - consoleLog
- 🃏 Jest — Configured for unit testing
- 📈 Absolute Import and Path Alias — Import components using `@/` prefix
- 📏 ESLint — Find and fix problems in your code, also will **auto sort** your imports
- 💖 Prettier — Format your code consistently
- 🐶 Husky & Lint Staged — Run scripts on your staged files before they are committed
- 🤖 Conventional Commit Lint — Make sure you & your teammates follow conventional commit
- ⏰ Release Please — Generate your changelog by activating the `release-please` workflow
- 👷 Github Actions — Lint your code on PR
- 🚘 Automatic Branch and Issue Autolink — Branch will be automatically created on issue **assign**, and auto linked on PR
- 🔥 Snippets — A collection of useful snippets
- 👀 Open Graph Helper Function — Awesome open graph generated using [og](https://github.com/theodorusclarence/og), fork it and deploy!
- 🗺 Site Map — Automatically generate sitemap.xml
- 📦 Expansion Pack — Easily install common libraries, additional components, and configs.

## Tailwind CSS Version

This starter is original from theodorusclarence/ts-nextjs-tailwind-starter, thank you theodorusclarence! If you prefer Tailwind css, check this: [Tailwind-CSS-Version](https://github.com/theodorusclarence/ts-nextjs-tailwind-starter)

## Getting Started

### 1. Clone this template using one of a few ways

1. Test locally: Using `create-next-app`

   ```bash
   npx create-next-app -e https://github.com/AlexStack/nextjs-materia-mui-typescript-hook-form-scaffold-boilerplate-starter new-project-name
   ```

2. Test online: Deploy to Vercel by one click

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?s=https%3A%2F%2Fgithub.com%2FAlexStack%2Fnextjs-materia-mui-typescript-hook-form-scaffold-boilerplate-starter&showOptionalTeamCreation=false)

### 2. Install dependencies

It is encouraged to use **yarn** so the husky hooks can work properly.

```bash
yarn install
```

### 3. Run the development server

You can start the server using this command:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `src/pages/index.tsx`.

### 4. Change defaults

There are some things you need to change including title, urls, favicons, etc.

Find all comments with !STARTERCONF, then follow the guide.

Don't forget to change the package name in package.json

### 5. Commit Message Convention

This starter is using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), it is mandatory to use it to commit changes.

### Format

`<type>(optional scope): <description>`
Example: `feat(pre-event): add speakers section`

### 1. Type

Available types are:

- feat → Changes about addition or removal of a feature. Ex: `feat: add table on landing page`, `feat: remove table from landing page`
- fix → Bug fixing, followed by the bug. Ex: `fix: illustration overflows in mobile view`
- docs → Update documentation (README.md)
- style → Updating style, and not changing any logic in the code (reorder imports, fix whitespace, remove comments)
- chore → Installing new dependencies, or bumping deps
- refactor → Changes in code, same output, but different approach
- ci → Update github workflows, husky
- test → Update testing suite, cypress files
- revert → when reverting commits
- perf → Fixing something regarding performance (deriving state, using memo, callback)
- vercel → Blank commit to trigger vercel deployment. Ex: `vercel: trigger deployment`

### 2. Optional Scope

Labels per page Ex: `feat(pre-event): add date label`

\*If there is no scope needed, you don't need to write it

### 3. Description

Description must fully explain what is being done.

Add BREAKING CHANGE in the description if there is a significant change.

**If there are multiple changes, then commit one by one**

- After colon, there are a single space Ex: `feat: add something`
- When using `fix` type, state the issue Ex: `fix: file size limiter not working`
- Use imperative, and present tense: "change" not "changed" or "changes"
- Don't use capitals in front of the sentence
- Don't add full stop (.) at the end of the sentence

## Projects using this starter

<!--
TEMPLATE
- [sitename](https://sitelink.com) ([Source](https://github.com/githublink))
- [sitename](https://sitelink.com)
-->

- [HiHB](https://hihb.com/)

Are you using this starter? Please add your page (and repo) to the end of the list via a [Pull Request](https://github.com/AlexStack/nextjs-materia-mui-typescript-hook-form-scaffold-boilerplate-starter/edit/main/README.md). 😃

## Folder structure

![image of folder structure](https://raw.githubusercontent.com/AlexStack/nextjs-materia-mui-typescript-hook-form-scaffold-boilerplate-starter/main/public/images/next-mui-folders.png)

## app/page.tsx code example

🚘🚘🚘 [**Click here to see an online demo of below code**](https://mui-nextjs-ts.vercel.app) 🚘🚘🚘

![app/page.tsx code example](https://raw.githubusercontent.com/AlexStack/nextjs-materia-mui-typescript-hook-form-scaffold-boilerplate-starter/main/public/images/app-page-tsx.png)

## License

- MIT
