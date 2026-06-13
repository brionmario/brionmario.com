---
slug: "/posts/the-facelift-begins-unveiling-the-transformation-of-the-wso2-identity-servers-frontend/"
date: "2024-04-13"
title: "Unveiling the Transformation of the WSO2 Identity Server’s Frontend"
description: "Unveiling the Transformation of the WSO2 Identity Server’s Frontend The journey of WSO2 Identity Server’s modern frontend traces back to 2019, marked by the initial commit. At that time, the …"
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
  - "architecture"
  - "wso2-identity-server"
  - "front-end-development"
  - "frontend-architecture"
  - "re-architecture"
bannerImage: "https://cdn-images-1.medium.com/max/2600/1*tjDyHycSz4GBa_bGmaVPjg.png"
ogImage: "https://cdn-images-1.medium.com/max/2600/1*tjDyHycSz4GBa_bGmaVPjg.png"
images:
  - "https://cdn-images-1.medium.com/max/2600/1*tjDyHycSz4GBa_bGmaVPjg.png"
  - "https://cdn-images-1.medium.com/max/2600/1*4o0YGJkk_0F_3Rhab4Um-A.png"
  - "https://cdn-images-1.medium.com/max/2600/1*elDVkGbfrs6jiJvC6_EVCw.png"
  - "https://cdn-images-1.medium.com/max/2600/1*SYFG4GbSL7vF6rqf4a6RbA.png"
  - "https://cdn-images-1.medium.com/max/2600/1*Og1I5s8tshdL6KfC1tyRyw.png"
  - "https://cdn-images-1.medium.com/max/2600/1*HQx3i6r7mbg0rnpEgSPa1Q.png"
  - "https://cdn-images-1.medium.com/max/2600/1*JywJ8nXGUGc89gsdmtRnqA.png"
  - "https://cdn-images-1.medium.com/max/2600/1*JdOV8ohK-aroK6x8MULVRA.png"
  - "https://cdn-images-1.medium.com/max/2600/1*FjBRNQouZ7G1LSij5BNPhw.png"
  - "https://cdn-images-1.medium.com/max/2600/1*2VQhbHYdb9W7Ok8a9Z5kHA.png"
  - "https://cdn-images-1.medium.com/max/2600/1*siYMYZTjG61_lR22b5iVRw.png"

---

# Unveiling the Transformation of the WSO2 Identity Server’s Frontend

![](https://cdn-images-1.medium.com/max/800/1*tjDyHycSz4GBa_bGmaVPjg.png)

The journey of WSO2 Identity Server’s modern frontend traces back to 2019, marked by the initial [commit](https://github.com/wso2/identity-apps/commit/8b9c45fede5b2ea34bf9dd55d168c94aedf39787). At that time, the vision was clear: to start the slow and steady process of rewriting the JSP-based [Management Console](https://is.docs.wso2.com/en/6.0.0/deploy/get-started/get-started-with-the-management-console/), Login portals, and [Jaggery](https://wso2.com/library/articles/2012/10/introducing-jaggery-the-newer-easier-way-of-writing-web-apps/)-based [end-user dashboard](https://is.docs.wso2.com/en/5.9.0/learn/associating-user-accounts/#using-the-dashboard), paving the way for a more modern and efficient frontend architecture.

In this post, I’ll dive into the challenges encountered and the solutions devised during this transformative journey. Let’s explore how the WSO2 Identity Server’s frontend underwent a remarkable evolution, shaping its future for years to come.

### **Humble beginnings**

The project commenced with the Jaggery dashboard being the first component to undergo transformation. At its inception, the codebase was relatively simple. The development environment was structured around the following key dependencies:

*   Lerna: Mono-repo management tool
*   npm: Dependency Management
*   React `v16.5.2` : UI Library
*   TypeScript `v3.1.1` : Coding Language
*   Semantic UI React `v0.82.5` : UI Framework
*   Axios `v0.18.0` : REST API Client

### **Trouble in paradise**

As the codebase expanded over time, we encountered significant challenges, affecting both development efficiency and experience.

#### 🐢 Slow dependency installs

The once swift npm installs became sluggish as the project expanded, making development setup and iteration cycles take longer.

#### 🐌 Unbearable build times

With the growth of the monorepo and the increasing number of packages and apps over time, the build process encountered inefficiencies. Despite a module having been previously built and no changes being made to it, the system would unnecessarily initiate a build for it again.

#### ⏳ Even slower CI

Continuous integration (CI) processes suffered from delays as well. PR builders and release builds took ages to complete which resulted in developer frustrations.

#### 🪣 Pitfalls in Semantic UI

The inability to theme Semantic UI components at runtime posed challenges in customizing and branding the product. This was especially bad because it directly hindered the delivery of a much-requested product feature.

#### 🌊 UI usability impacted by frequent API calls

The usability of the user interface was significantly affected by frequent API calls. Despite some of the API calls fetching identical datasets, the UI often remained in a state of suspense, causing delays in rendering and hindering the user experience.

#### 🤯 The forms dilemma

I believe every frontend engineering team has encountered this dilemma: whether to use an existing forms library or create their own. Unfortunately, we made the wrong choice twice.

**Attempt 01**: Initially, we chose to develop a forms module from scratch, implementing every feature ourselves. However, this decision quickly proved to be a mistake as the complexity of maintaining the module escalated over time. The steep learning curve and lack of documentation meant that whenever a bug arose, we had to rely heavily on the individual who originally implemented the package, creating a bottleneck in our development process.

**Attempt 02**: Learning from the above bad experience, we attempted to improve our approach by adopting `react-final-form`, wrapping it to suit our needs. However, a ton of external requirements we brought in to the plate, such as enforcing validations and styles across different contexts, further complicated matters. For instance, consider a field type like `resource-name`, necessitating specific validations for elements used in applications and identity provider names, such as minimum length and allowed characters. To address this, we resorted to wrapping react-final-form render props and dynamically injecting validation props to ease up the developer experience. But despite our efforts, the complexity of our custom wrapper added unnecessary overhead and made it challenging for developers to understand and maintain. The abstraction created a barrier for new developers, as they couldn’t easily refer to `react-final-form` documentation. As a result, we spent considerable time explaining concepts and troubleshooting issues.

#### 🤷‍♂️ Redux fiasco

When we started this project, many people, including myself, swore by <a href="https://redux.js.org/" class="fenced-link">Redux</a>. At the time, the `React Context API` was not as popular for state management. Although Redux served its purposes, it led to a significant accumulation of boilerplate code in the codebase, resulting in a steep learning curve for new developers joining the project. The React ecosystem quickly adopted the `React Context API`, and at a later time, [Dan Abramov](https://twitter.com/dan_abramov2?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor) wrote his famous [You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367) blog post backing up the industry trend.

#### 🚫 Redundant releases

We were using Lerna to manage our versioning, and a release process was triggered every time a change was merged into the `master` branch. All the modules and apps had the same version.

However, this approach posed challenges as it led to unnecessary releases for all apps or modules, even when they didn’t require updates.

#### 📐 Scalability in the code base structure

We had most of the app features embeded inside the respective application’s code. Admin related features were inside the `Console` & selfcare related features were inside the `My Account` source.

If we are to build a new app, we’ll have to duplicate certain features which is not ideal. Also, WSO2 Identity Server is an opensource offering and users may wish to write their own applications utilizing the features. Right now, the only solution they have is to fork the repo and do the modifications.

### Our efforts to reclaim control

We were working under tight release schedules, with only a handful of engineers dedicated to the project. Despite the limitations, we understood the urgency to enhance the codebase. Consequently, we embarked on several initiatives to gradually tackle the issues one by one.

#### Addressing slow dependency installs

![](https://cdn-images-1.medium.com/max/800/1*4o0YGJkk_0F_3Rhab4Um-A.png)

We evaluated <a href="https://classic.yarnpkg.com/en/" class="fenced-link">Yarn Classic</a>, <a href="https://yarnpkg.com/features/pnp" class="fenced-link">Yarn Plug’n’Play</a>, and <a href="https://pnpm.io/" class="fenced-link">pnpm</a> and decided to go ahead with `pnpm`**.**

`pnpm` uses an efficient package linking mechanism and preserves disk space by sharing dependencies across projects. Moreover, pnpm’s support for caching and parallel execution further enhances its performance both locally and on the CI.

For further insights into our decision-making process, you can read my blog post [here](https://medium.com/@brionmario/why-we-migrated-to-pnpm-2d9d00a69ca9).

#### Addressing unbearable build times

![](https://cdn-images-1.medium.com/max/800/1*elDVkGbfrs6jiJvC6_EVCw.png)

We desperately needed to build caching hence we benchmarked the two hyped solutions at the time, <a href="https://nx.dev/" class="fenced-link">Nx</a> & <a href="https://turbo.build/" class="fenced-link">Turbo Repo</a>. Lerna was not under the `Nx` team at the time hence we completely got rid of it.

Based on our benchmarks, we opted for `Nx` as our mono-repo management tool. We were able to reduce our build times by quite a lot thanks to the power of `Nx`.

#### Addressing slower CI

![](https://cdn-images-1.medium.com/max/800/1*SYFG4GbSL7vF6rqf4a6RbA.png)

Starting with `Nx` was working wonders in the CI with its <a href="https://nx.dev/ci/features/affected" class="fenced-link">affected</a> command, which allowed us to selectively build and test only the projects affected by recent changes, significantly reducing the overall CI build times.

Leveraging `pnpm` as our package manager further contributed to the efficiency of our CI processes. The efficient package linking mechanism of `pnpm` and caching capabilities helped minimize redundant downloads and accelerate dependency resolution during CI builds.

#### **Addressing pitfalls in Semantic UI**

![](https://cdn-images-1.medium.com/max/800/1*Og1I5s8tshdL6KfC1tyRyw.png)

To address the runtime theming issues, we were monitoring the ongoing <a href="https://github.com/Semantic-Org/Semantic-UI-React/issues/1009" class="fenced-link">RFC</a> issue in <a href="https://github.com/Semantic-Org/Semantic-UI-React" class="fenced-link">Semantic UI React</a> repository for a while. We even attempted to make the library runtime themable ourselves. However, we encountered significant challenges, particularly regarding performance, when attempting to switch themes at runtime, especially while working with <a href="https://lesscss.org/" class="fenced-link">Less.js</a>.

Ditching Semantic UI was inevitable and we ultimately decided to write our own wrapper around <a href="https://mui.com/" class="fenced-link">Material UI</a> called <a href="https://github.com/wso2/oxygen-ui" class="fenced-link">Oxygen UI</a>. This process alone deserves a write-up on its own and I’ll be writing one soon.

#### Addressing UI usability impacted by frequent API calls

![](https://cdn-images-1.medium.com/max/800/1*HQx3i6r7mbg0rnpEgSPa1Q.png)

Although <a href="https://axios-http.com/docs/intro" class="fenced-link">Axios</a> is great out of the box, but it lacks critical features like caching, which is essential for optimizing data fetching in client-side web applications. Lucky for us, the JavaScript eco-system had evolved and there were numerous alternative solutions available to address this limitation.

We explored both <a href="https://react-query.tanstack.com/" class="fenced-link">React Query</a> and <a href="https://swr.vercel.app/" class="fenced-link">SWR (Stale-While-Revalidate)</a> as potential solutions to optimize data fetching and went ahead with `SWR` due to its simplicity and ease of integration with our existing codebase. Also, `SWR` is backed by the industry giant [Vercel](https://vercel.com/) which instills confidence in its reliability and future development.

#### Addressing the forms dilemma

![](https://cdn-images-1.medium.com/max/800/1*JywJ8nXGUGc89gsdmtRnqA.png)

Deprecate the exitsing form stategies and use the `react-final-form` components out of the box without any wrappers. This way, developers could fully leverage the `react-final-form` documenationa and other official help channels to troubleshoot things.

#### Addressing the Redux fiasco

![](https://cdn-images-1.medium.com/max/800/1*JdOV8ohK-aroK6x8MULVRA.png)

We simply deprecated the Redux store and adviced developers to use `React Context API` going forward. Simple 😉

In the future, we’ll be completely refactoring the app to use the `Context API` and completely retire `Redux`.

#### Addressing the redundant releases

![](https://cdn-images-1.medium.com/max/800/1*FjBRNQouZ7G1LSij5BNPhw.png)

We discovered the magical world of [Changesets 🦋](https://github.com/changesets/changesets) to address our concerns. Changesets has the ability to selectively release packages which suited us perfectly.

I’ve written a [blog](https://medium.com/@brionmario/changesets-is-a-game-changer-fe752af6a8cc) on `Changesets` and how it changes the game. Have a read!

#### Addressing the scalability in the code base structure

![](https://cdn-images-1.medium.com/max/800/1*2VQhbHYdb9W7Ok8a9Z5kHA.png)

To make the code base more scalable and futureproof, we decided to move the features out to the root and make them publishable packages. They could be versioned and categorized as `commons`, `admin` & `selfcare`.This task is being curretly undertaken by [Thivaharan](https://medium.com/u/dce4d7d7b371) & [Jathushan Raveendra](https://medium.com/u/92ede6a0ef49).

![Features before and after](https://cdn-images-1.medium.com/max/800/1*siYMYZTjG61_lR22b5iVRw.png)

### Conclusion

In essence, our quest to improve the WSO2 Identity Server’s frontend never stops. We’re driven by our passion for excellence and our commitment to giving users the best experience possible.

I hope that our experiences and insights shared here can inspire and guide you all in your own endeavors to improve frontend architectures. Together, let’s continue pushing the boundaries of what’s possible in the world of software development.

Signing off… ✌️❤️
