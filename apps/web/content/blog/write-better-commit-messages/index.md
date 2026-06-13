---
slug: "/posts/write-better-commit-messages/"
date: "2024-07-06"
title: "Write better commit messages"
description: "Write better commit messages Are you this person? commit 1a2b3c4d5e6f7g8h9i0j Author: John Doe <johndoe@example.com> Date:   Thu Jul 6 10:00:00 2023 +0000      Minor Fixes And then you introduce a …"
authors:
  - bio: "Software Engineer working at WSO2."
    id: "ca410be341b9"
    image: "https://miro.medium.com/fit/c/176/176/1*VyzrTxkrThOJKKnvx20UTg.png"
    name: "Brion Mario"
    twitterScreenName: "brion_mario"
    username: "brionmario"
readingTime: ""
draft: false
tags:
  - "git"
  - "best-practices"
  - "git-commit-messages"
  - "conventional-commits"
  - "tips"
bannerImage: "https://cdn-images-1.medium.com/max/2600/1*88yGNrfJunnxCrAKVyz2xA.png"
ogImage: "https://cdn-images-1.medium.com/max/2600/1*88yGNrfJunnxCrAKVyz2xA.png"
images:
  - "https://cdn-images-1.medium.com/max/2600/1*88yGNrfJunnxCrAKVyz2xA.png"

---

# Write better commit messages

![](https://cdn-images-1.medium.com/max/800/1*88yGNrfJunnxCrAKVyz2xA.png)

### Are you this person?

```js
commit 1a2b3c4d5e6f7g8h9i0j  
Author: John Doe <johndoe@example.com>  
Date:   Thu Jul 6 10:00:00 2023 +0000  
  
    Minor Fixes
```

And then you introduce a **breaking change** that blows up in the face of users when they re-install 💥?

Yikes.

### The Problem with Vague Commit Messages

Let’s face it, we’ve all been there. You’re in a rush, you make some changes, and you commit with a message like “`Update`,” “`Fix`,” or the classic “`Minor Changes.`”. But what happens when your team tries to figure out what actually changed? Or worse, when your users suddenly encounter unexpected issues?

### Enter Conventional Git Commits [🦸](https://emojipedia.org/superhero)

[Conventional Git Commits](https://www.conventionalcommits.org/en/v1.0.0/) to the rescue!

This standardized format helps you write clear, concise, and meaningful commit messages that make sense to everyone, including your future self.

Inspired by the Angular commit message conventions, the Conventional Commits specification aims to improve communication and collaboration within teams.

### The Structure of a Conventional Commit Message

Each commit message consists of a `header`, a `body`, and a `footer` .

```js
<header>  
<BLANK LINE>  
<body> (optional)  
<BLANK LINE>  
<footer> (optional)
```

#### Header (Mandatory)

This is the mandatory section of a conventional commit message. It usually consists of the following sections:

```js
<type>(<scope>): <short summary>  
  │       │             │  
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.  
  │       │  
  │       └─⫸ Commit Scope: primitives|logger|react  
  │  
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|chore|test
```

**Type**

What kind of change is it?

*   `**build**`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
*   `**ci**`: Changes to our CI configuration files and scripts (examples: CircleCi, SauceLabs)
*   `**docs**`: Documentation only changes
*   `**feat**`: A new feature
*   `**fix**`: A bug fix
*   `**perf**`: A code change that improves performance
*   `**refactor**`: A code change that neither fixes a bug nor adds a feature
*   `**test**`: Adding missing tests or correcting existing tests

**Scope**

What part of the codebase does it affect? This can change based on the repository structure. I use the package name here if I’m working on a mono-repo.

Ex: If I’m contributing <a href="https://github.com/wso2/oxygen-ui" class="fenced-link">wso2/oxygen-ui</a> , scopes would be:

*   `**primitives**` \- Changes to the `@oxygen-ui/primitives` package.
*   `**react**` \- Changes to the `@oxygen-ui/react` package.
*   `**logger**` \- Changes to the `@oxygen-ui/logger` package.

**Summary**

Use the summary field to provide a brief description of the change:

*   Use the imperative, present tense: “change” not “changed” nor “changes”.
*   Don’t capitalize the first letter.
*   No dot (.) at the end.

#### Body (Optional)

Just as in the summary, use the imperative, present tense: “fix” not “fixed” nor “fixes”.

Explain the motivation for the change in the commit message body. This commit message should explain _why_ you are making the change. You can include a comparison of the previous behavior with the new behavior in order to illustrate the impact of the change.

#### Footer (Optional)

The footer can contain information about breaking changes and deprecations and is also the place to reference GitHub issues, Jira tickets, and other PRs that this commit closes or is related to.

### Examples of Good Commit Messages

Following are some examples of “good commit messages” (according to my 2 cents) that I usually write:

#### With just the header:

```js
feat(react): add new theme switcher component
```

#### With a detailed body & footer:

```js
feat(react): refactor button component API  
  
BREAKING CHANGE: The Button component API has been refactored to improve flexibility and performance. The 'type' prop has been replaced with 'variant' and 'size'. Ensure to update your codebase to use the new props to avoid compatibility issues.  
  
Fixes #2343
```

### Why Bother?

*   **Clarity**: Understand what changes were made and why.
*   **Consistency**: Easier to read and maintain the project history.
*   **Automation**: Integrate with tools for automated versioning and changelog generation.
*   **Collaboration**: Improve communication within your team.

### Best Practices

*   **Be Descriptive**: Clearly explain what and why.
*   **Keep it Short**: The subject line should be brief and to the point.
*   **Use the Imperative Mood**: Write as if you’re giving commands.
*   **Separate Subject and Body**: If needed, provide additional details in the body.

### Learn More

For more details on Conventional Git Commits, check out the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/). This resource provides comprehensive guidelines on how to write consistent and meaningful commit messages.

Here are some example repositories that extensively uses Conventional Commits:

*   `Angular` : [https://github.com/angular/angular](https://github.com/angular/angular)
*   `Oxygen UI` : [https://github.com/wso2/oxygen-ui](https://github.com/wso2/oxygen-ui)
*   `Medmark` : [https://github.com/brionmario/medmark](https://github.com/brionmario/medmark)

Next time you’re about to type “Update” in your commit message, take a moment to think about the bigger picture. Your team, your users, and your future self will thank you.

Start using Conventional Git Commits today and write commit messages that don’t just inform but truly communicate.

Signing off… ✌️❤️
