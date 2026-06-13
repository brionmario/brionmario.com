---
slug: "/posts/why-do-we-rewrite-front-ends/"
date: "2023-04-16"
title: "Why do we rewrite front-ends?"
description: "Why do we rewrite front-ends? It’s a widely recognized truth that perfect software is impossible to achieve. Even with the best intentions, developers must make trade-offs between different …"
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
  - "front-end-development"
  - "rewrite"
  - "frontend-architecture"
bannerImage: "https://cdn-images-1.medium.com/max/2600/1*ZzCD4-lZMtVU0WZyKxrqHA.png"
ogImage: "https://cdn-images-1.medium.com/max/2600/1*ZzCD4-lZMtVU0WZyKxrqHA.png"
images:
  - "https://cdn-images-1.medium.com/max/2600/1*ZzCD4-lZMtVU0WZyKxrqHA.png"

---

# Why do we rewrite front-ends?

![](https://cdn-images-1.medium.com/max/800/1*ZzCD4-lZMtVU0WZyKxrqHA.png)

It’s a widely recognized truth that perfect software is impossible to achieve. Even with the best intentions, developers must make trade-offs between different priorities such as maintainability, scalability, and performance to meet business and user needs. Front-end development, in particular, where I specialize, is an ever-changing landscape where frequent updates and changes are commonplace. This can lead to challenges in maintaining a codebase that remains performant and scalable over time. In such cases, rewriting the software from scratch may be necessary to address these challenges and improve its maintainability, performance, and compatibility with changing technology and user needs.

### Conventional Reasons

There are several reasons why software rewriting is sometimes necessary.

1.  **Technical debt**
2.  **Legacy technology**
3.  **Poor architecture**
4.  **Changing business needs**
5.  **Performance issues**
6.  **Security concerns**

Let’s take a closer look at each of these reasons to understand why they might require a complete software rewrite.

#### Technical debt

Over time, software programs can accumulate technical debt as they are modified and updated. This can make it harder to maintain the codebase, leading to poor performance and other issues that may require a complete rewrite.

This is particularly true for front-end development. As an example, moving to the latest version of a front-end framework or library is often necessary to keep the software up-to-date with the latest features and performance improvements. However, these updates can also introduce breaking changes to the APIs and require significant changes to the codebase, adding to technical debt. Failing to update to the latest version can also lead to security vulnerabilities if the older version is no longer supported with security fixes.

As a personal example, in a project I worked on, we were using `Semantic UI v0.80.x` and `React v16.x`. When `React v17` was released, we couldn’t migrate initially because `Semantic UI` was still using class components and hadn’t released a compatible version. As a result, it took us nearly two years to complete the migration to the latest React version. You can find the corresponding pull request 👉 [here](https://github.com/wso2/identity-apps/pull/3440).

#### Legacy technology

As technology advances, older codebases may become outdated and incompatible with newer systems. In such cases, rewriting the software from scratch using more modern technologies may be necessary to ensure it remains relevant.

For instance, we faced challenges with runtime theming using `Semantic UI`. We needed to update the look and feel of the UI based on user preferences, but the Semantic UI was not actively worked on and they still have the feature we needed as an [RFC](https://github.com/Semantic-Org/Semantic-UI-React/issues/1009). As a result, we had to look for alternative solutions and we are in the process of rewriting the code bases.

#### Poor architecture

If the original software was not built with a well-designed architecture, it may become increasingly difficult to maintain and expand the codebase as the application grows. In such cases, a rewrite may be necessary to establish a more robust and scalable architecture.

#### Changing business needs

As businesses evolve, so do their needs and requirements. Software that was once suitable may no longer be able to meet new demands, and it may no longer provide a competitive edge. A rewrite may be necessary to ensure the software remains relevant and able to meet the new needs and requirements of the business and its users.

Let’s say you have a web application that was originally designed for desktop users, but as mobile devices become more prevalent, you realize that you need to provide a mobile-friendly version of the app. However, the original codebase was not designed with mobile devices in mind, and retrofitting it for mobile would require significant effort and potentially compromise the user experience. In this case, a rewrite of the front-end code may be necessary to create a responsive and mobile-friendly version of the app that meets the evolving business needs and user requirements.

#### **Performance issues**

If a software program is struggling to keep up with performance demands, rewriting it from scratch may be necessary to ensure it remains performant and scalable.

At WSO2 Identity Server [front-end apps repository](https://github.com/wso2/identity-apps), we were using Lerna for our builds, but we found that the build process was slow, which caused our continuous integration (CI) to be slow as well. Also, this was causing the local builds to lag affecting the developer experience as well.

To speed up the build process, we decided to move to [Nx](https://nx.dev/), a powerful build tool that provides several features, including caching and incremental builds. The PR can be found 👉 [here](https://github.com/wso2/identity-apps/pull/3048).

With Nx, we were able to improve our build process significantly. The caching feature helped to speed up the build by caching results for commonly used tasks, which reduced the build time. Additionally, we used the <a href="https://nx.dev/concepts/affected" class="fenced-link">affected</a> commands feature, which allows us to build only the projects that have been affected by changes, instead of rebuilding everything. This feature helped us to reduce the time it took for our CI builds to complete, making the process faster and more efficient.

#### **Security concerns**

Security vulnerabilities in a software program can pose a significant risk to the organization and its users. In such cases, rewriting the software from scratch may be necessary to ensure that it is secure and compliant with any relevant security standards. This can include updating outdated libraries or removing deprecated code that may pose a security risk.

### Unconventional Reasons

There are also some unconventional reasons for rewrites as well, such as:

#### **Developer Inexperience**

Sometimes, the original developers may have lacked the experience or expertise necessary to build a robust and scalable software solution. In such cases, a rewrite may be necessary to address any underlying design or architecture flaws.

One really bad thing I’ve personally seen is that inexperienced developers may find it easier to rewrite code rather than trying to understand it. This can lead to unnecessary rewrites and can waste time and resources.

#### **Fun**

Some developers enjoy the challenge of rewriting code and find it a fun exercise. While this may not be a valid reason on its own, it can sometimes be a motivator for developers to improve their skills and create better software.

It’s important to note that these should be avoided as much as possible. Rewriting code due to developer inexperience may result in unnecessary rewrites, leading to a waste of time, and resources, and the potential loss of valuable business data. It’s always better to focus on improving the existing codebase and addressing underlying design and architecture flaws instead of starting from scratch.

Similarly, rewriting code for the sake of fun can be a risky proposition, as it can divert focus from more important tasks and potentially result in a loss of productivity. While a certain level of challenge and motivation is important for developers, it should be balanced with practical considerations such as the needs of the business and the value of the software to end-users. In general, software rewrites should be approached with caution and should only be undertaken when necessary to address critical issues such as security vulnerabilities or performance bottlenecks.

### Concluding Remarks 🔚

In conclusion, software rewrites can be a necessary step to address a variety of issues such as technical debt, changing business needs, and performance concerns. However, they should not be taken lightly, as they can be time-consuming, costly, and risky.

It’s important to note that the unconventional reasons mentioned above should be avoided as much as possible. It is important to carefully evaluate the reasons for a rewrite and consider alternatives before committing to such a major undertaking.

Additionally, it is crucial to have a clear plan and strategy in place, along with a solid team and resources to ensure a successful outcome. Ultimately, the decision to rewrite software should be based on a well-informed assessment of the risks and benefits, with a focus on creating a more robust, scalable, and maintainable software solution.
