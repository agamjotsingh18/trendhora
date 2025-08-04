# Contributing to [TrendHora](https://github.com/agamjotsingh18/trendhora-api)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square&logo=git&logoColor=fff)](https://github.com/agamjotsingh18/trendhora-api/pulls)
[![GitHub Issues](https://img.shields.io/github/issues/agamjotsingh18/trendhora-api?style=flat-square&logo=github&color=f00)](https://github.com/agamjotsingh18/trendhora-api/issues)
[![GitHub PRs](https://img.shields.io/github/issues-pr/agamjotsingh18/trendhora-api?style=flat-square&color=0A66C2&logo=github)](https://github.com/agamjotsingh18/trendhora-api/pulls)

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

-   Reporting a bug
-   Submitting a fix
-   Proposing new features

---

> **New to Open Source?** No worries! This guide is beginner-friendly. If you’re stuck at any point, feel free to open an issue or ask for help.

## 📚 Table of Contents

1. [📜 Code of Conduct](#-code-of-conduct)
2. [🚀 Getting Started: Your First Contribution](#-getting-started-your-first-contribution)
    - [Step 1: System Prerequisites](#step-1-system-prerequisites)
    - [Step 2: Fork & Clone the Repository](#step-2-fork--clone-the-repository)
    - [Step 3: Create a New Branch](#step-3-create-a-new-branch)
    - [Step 4: Set Up the Local Environment](#step-4-set-up-the-local-environment)
3. [💻 Making Your Changes](#-making-your-changes)
4. [✅ Submitting a Pull Request (PR)](#-submitting-a-pull-request-pr)

---
## 📜 Code of Conduct

Before contributing, please read our [**Code of Conduct**](./CODE_OF_CONDUCT.md). We are committed to creating a harassment-free, inclusive environment for everyone.

---

## 🚀 Getting Started: Your First Contribution

Want to get your hands dirty with some code? Awesome! Follow these steps to get TrendHora running locally and make your first contribution.

### Step 1: System Prerequisites

Ensure your development environment has the following installed:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

> You can verify versions with:
> ```bash
> node -v
> npm -v
> git --version
> ```

---

### Step 2: Fork & Clone the Repository

1. **Fork the Repository**  
   Navigate to the [TrendHora GitHub repo](https://github.com/agamjotsingh18/trendhora) and click the **"Fork"** button on the top right to create your own copy.

2. **Clone the Fork Locally**  
   Replace `your-username` in the URL below with your GitHub username:

   ```bash
   git clone https://github.com/your-username/trendhora.git
   cd trendhora

---

### Step 3: Create a New Branch

Before making any changes, create a new branch. This keeps your work separate from the main codebase and makes collaboration easier.

🚫 **Do not work directly on the `main` branch.**  
✅ Always create a new branch for each feature or fix.

#### 👉 Naming Convention

Use clear and consistent names:

- For new features:
  ```bash
  git checkout -b feat/your-feature-name

---

### Step 4: Set Up the Local Environment

With your branch created, it's time to run the project on your local machine.

#### 1. 🧩 Install Dependencies

Navigate to the root of your project folder and install all required packages:

    npm install

#### 2. ⚙️ Configure Environment Variables

If the project includes a .env.sample file, copy it to create your own .env:

    cp .env.sample .env

#### 3. 🚀 Start the Development Server

Run the project locally (at http://localhost:3000) with:

    npm run dev

---

## 💻 Making Your Changes

Now that TrendHora is running locally, you can start building, fixing, or improving things. Here are a few important guidelines to follow while making your changes:

---

### ✅ Follow Code Style & Best Practices

To keep the codebase clean and maintainable:

- Stick to the existing code structure.
- Use proper formatting and indentation.
- Use meaningful variable and function names.

> Tip: You can often run `npm run lint` or `npm run format` to check for issues.

---

### ✍️ Write Clear Commit Messages

Use [Conventional Commit](https://www.conventionalcommits.org/) style to keep commit history clean and informative.
>This helps make everyone's task easier and more efficient!
Examples:

- For a new feature:
  ```bash
  git commit -m "feat: add trending topics filter to homepage"
- For bug fixes:
  ```bash
  git commit -m "fix: resolve navbar overflow on mobile view"
- For UI changes:
  ```bash
  git commit -m "style: adjust card spacing and layout"

---

## ✅ Submitting a Pull Request (PR)

Once you're confident with your changes and have committed them locally, it’s time to open a Pull Request (PR) so we can review and merge them into the main project.

---

### 1. 📤 Push Your Branch to GitHub

Use the following command to push your branch to your forked repository:

    git push origin your-branch-name

___

#### 2. 📬 Create a Pull Request

Once your branch has been pushed to GitHub, follow these steps to open a Pull Request:

1. Navigate to your **forked repository** on GitHub.
2. You’ll see a prompt to **“Compare & pull request”**. Click it.
3. Make sure the following options are set correctly:
    - **Base repository**: `agamjotsingh18/trendhora`
    - **Base branch**: `main`
    - **Compare**: your branch (e.g., `feat/add-sidebar-filter`)
4. Fill out the PR form:
    - **Title**: Be concise but descriptive (e.g., `feat: add filter for trending categories`)
    - **Description**:
        - What changes were made?
        - Why were they needed?
        - Reference related issues with keywords like `Closes #issue-number`
        - Include screenshots or screen recordings (especially for UI/UX changes)

> ✅ Visuals are highly recommended! They help reviewers quickly understand what you've done, especially for frontend updates.

Once you’ve filled everything out, click **“Create Pull Request”**. Your PR is now live and ready for review!

___

#### 3. 💬 Engage in Review

Once your PR is submitted, a project maintainer will review your changes. During this phase:

- 🔍 **Be responsive**: Monitor your PR for any comments or requested changes.
- 🛠️ **Make revisions if needed**:
  If changes are requested, make them locally, then add and commit the changes:

  ```bash
  git add .
  git commit -m "fix: update UI spacing on trending cards"
  git push origin your-branch-name

___

#### 4. 🎉 Celebrate!

Once your Pull Request is reviewed and merged:

- 🥳 Congratulations — you're now an official contributor to **TrendHora**!
- 💬 Feel free to share your contribution to social media or your portfolio.
- 🌱 Look through other issues labeled `good first issue` or `enhancement` if you’d like to keep contributing.

> Thank you for making TrendHora better. Your contributions mean a lot to us and the open-source community! 💖

---

## Add Your Contributing Details Here:

### Mentor: [Agamjot Singh ](https://github.com/agamjotsingh18)

### Mentee:

1.  [Krishna Jhanwar](https://github.com/krishnaj01)
2.  [Ananya RK](https://github.com/ARK36910)