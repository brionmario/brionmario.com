---
slug: "/posts/thanks-andrea/"
date: "2024-07-08"
title: "Thanks Andrea."
description: "Thanks Andrea. Personally, I don't recommend changesets for all the projects. For example, we recently wrote a wrapper around `material-ui` called `oxygen-ui`(https://github.com/wso2/oxygen-ui). In …"
authors:
  - bio: "Software Engineer working at WSO2."
    id: "ca410be341b9"
    image: "https://miro.medium.com/fit/c/176/176/1*VyzrTxkrThOJKKnvx20UTg.png"
    name: "Brion Mario"
    twitterScreenName: "brion_mario"
    username: "brionmario"
readingTime: ""
draft: false
tags: []
bannerImage: ""
ogImage: ""
images: []

---

Thanks Andrea.

Personally, I don't recommend changesets for all the projects. For example, we recently wrote a wrapper around \`material-ui\` called \`oxygen-ui\`([https://github.com/wso2/oxygen-ui](https://github.com/wso2/oxygen-ui)).

In there, we need to release all the packages simultaneously and aggregate the GitHub release and changelog. So, \`Changesets\` didn't work out for us in that scenario.

But for projects with multiple packages that doesn't need to be released together and have packages that are not frequently changed, \`Changesets\` is a good option.

To answer your question regarding the changelogs, doesn't the following solve it?

[https://miro.medium.com/v2/resize:fit:4800/format:webp/1*ioihuCnH\_gG\_u5Pgr-2U7A.png](https://miro.medium.com/v2/resize:fit:4800/format:webp/1*ioihuCnH_gG_u5Pgr-2U7A.png)
