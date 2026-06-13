---
slug: "/posts/the-unofficial-react-auth/"
date: "2024-06-29"
title: "The unofficial `react-auth`"
description: "The unofficial `react-auth` Authentication is a crucial aspect of any modern web application, ensuring that only authorized users have access to specific resources and functionalities. With the rise …"
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
  - "asgardeo"
  - "react-auth"
  - "react-authentication"
  - "idaas"
  - "auth0"
bannerImage: "https://cdn-images-1.medium.com/max/2600/1*XwKN2NbK_OMJEKXJG6-qZg.png"
ogImage: "https://cdn-images-1.medium.com/max/2600/1*XwKN2NbK_OMJEKXJG6-qZg.png"
images:
  - "https://cdn-images-1.medium.com/max/2600/1*XwKN2NbK_OMJEKXJG6-qZg.png"

---

# The unofficial \`react-auth\`

![](https://cdn-images-1.medium.com/max/800/1*XwKN2NbK_OMJEKXJG6-qZg.png)

Authentication is a crucial aspect of any modern web application, ensuring that only authorized users have access to specific resources and functionalities. With the rise of React as a dominant front-end library, developers building client-side React applications would be interested in reliable and efficient authentication solutions to secure their applications.

Different frameworks have dedicated authentication solutions that streamline the process of adding authentication to web applications:

*   **Next.js**: `next-auth` is a powerful and flexible library specifically designed for authentication in Next.js applications.
*   **Remix**: `remix-auth` provides a seamless authentication experience for Remix developers.
*   **Vue.js**: Libraries like `vue-auth` and `vue-router-auth` are popular choices for handling authentication in Vue applications.

### 🤔 Is there a ``react-auth``?

If you search for `react-auth`, you might come across a package on npm ([https://www.npmjs.com/package/react-auth](https://www.npmjs.com/package/react-auth)) that was created 9 years ago. However, this package does not contain any code and is not actively maintained or used by the community.

Due to this developers may have to choose solutions that are bound to a certain vendor. While these solutions will work as expected, they can also introduce vendor lock-in, limiting flexibility and increasing dependency on a single provider.

### ❓What is ``@asgardeo/auth-react``?

`@asgardeo/auth-react` is a standard SDK and written following OAuth and OpenID Connect (OIDC) best practices, offering a robust and user-friendly authentication solution tailored specifically for React applications. It fills the gap and provides developers with a standardized approach to managing authentication without the risk of vendor lock-in.

### 🔑 Key benefits of using ``@asgardeo/auth-react``?

#### 1\. Vendor Agnostic

`@asgardeo/auth-react` is designed to be vendor-agnostic, meaning you are not tied to any specific provider. You can use any vendor such as [**Auth0**](https://auth0.com/), [**Zitadel**](https://zitadel.com/), [**Asgardeo**](https://wso2.com/asgardeo), [**Okta**](https://www.okta.com/) and others, giving you the flexibility to switch providers if needed without major changes to your authentication logic.

#### 2\. Standards-Based

Built following OAuth and OIDC best practices, ensuring a secure and standardized approach to authentication.

#### 3\. Seamless Integration:

Easy to integrate into any React project with just few lines of code.

#### 4\. Enhanced Security

Incorporates security best practices, reducing the risk of common vulnerabilities and attacks.

It also implements an opt-in `web worker storage` for a secure way of storing tokens, providing a more secure option compared to traditional methods, further enhancing the security of your application.

#### 5\. User-Friendly API

Provides a simple and intuitive natively-React API, making it easy for developers to implement authentication without extensive knowledge of authentication protocols.

### 🚀 Getting Started with ``@asgardeo/auth-react``?

Here is a step-by-step guide to integrating Asgardeo into your React project:

#### 1\. Installation

To get started with <a href="https://www.npmjs.com/package/@asgardeo/auth-react" class="fenced-link">@asgardeo/auth-react</a>, you first need to install the package from the npm registry.

Open your terminal and run the following command:

```js
npm install @asgardeo/auth-react
```

#### 2\. Configuration

After installing, the next step is to configure it in your React application. This involves setting up the `AuthProvider` with the necessary configuration options. Here’s how you can do it:

> 💡 In this example, I’m using [**Zitadel**](https://zitadel.com/) as the authentication provider. However, you can replace this with the well-known endpoint of any other Open ID Connect provider you prefer.

```js
import {AuthProvider} from "@asgardeo/auth-react";  
  
const config = {  
  clientID: "<your-client-id>",  
  wellKnownEndpoint: "https://<your-tenant>.zitadel.cloud/.well-known/openid-configuration",  
  scope: ["openid","profile"],  
  signInRedirectURL: "http://localhost:5173",  
  signOutRedirectURL: "http://localhost:5173"  
};  
  
function App() {  
  return (  
    <AuthProvider config={config}>  
      <YourApp />  
    </AuthProvider>  
  );  
}  
  
export default App;
```

#### 3\. Using the API

To integrate authentication functionalities into your React components using `@asgardeo/auth-react`, you can utilize the provided hooks and context API. Here’s a simple example:

```js
import {useAuthContext} from "@asgardeo/auth-react";  
  
function YourComponent() {  
  const {state, signIn, signOut} = useAuthContext();  
  
  if (state.isLoading) {  
    return <div>Loading...</div>;  
  }  
  
  return (  
    <div>  
      {state.isAuthenticated ? (  
        <button onClick={signOut}>Sign Out</button>  
      ) : (  
        <button onClick={signIn}>Sign In</button>  
      )}  
    </div>  
  );  
}  
  
export default YourComponent;
```

> 💡 For more features and detailed usage, check out the <a href="https://github.com/asgardeo/asgardeo-auth-react-sdk/blob/main/API.md" class="fenced-link">API.md</a> file. Note that the current version is `v5.0.0` at the time of writing, but this may change in future releases, and the usage could also be different. 👉

By leveraging `@asgardeo/auth-react`, you can enhance the security and user experience of your React applications without being tied down to a single vendor. This flexibility, combined with adherence to industry standards, makes it an excellent choice for developers looking to implement robust authentication mechanisms. Whether you are building a small project or a large-scale application, `@asgardeo/auth-react` provides the tools and features you need to manage authentication efficiently and securely.

Let’s make `@asgardeo/auth-react` the unofficial `react-auth`! 💪

If you have any queries, feel free to start a discussion on [GitHub](https://github.com/asgardeo/asgardeo-auth-react-sdk/issues). Don’t forget to star ⭐️ the repository and share it with your friends.

Signing off… ✌️❤️
