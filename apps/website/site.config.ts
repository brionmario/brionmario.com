/* eslint-disable max-len */

interface SiteConfigSchema {
  externalLinks: {
    social: {
      facebook: string;
      github: string;
      instagram: string;
      linkedin: string;
      pinterest: string;
      soundcloud: string;
      tumblr: string;
      twitter: string;
      youtube: string;
    }
  },
  forms: {
    newsletter: {
      mailchimp: {
        subscriptionURL: string;
      }
    }
  },
}

const siteConfig: SiteConfigType = {
  externalLinks: {
    social: {
      facebook: "https://www.facebook.com/brion.mario/",
      github: "https://github.com/brionmario",
      instagram: "https://www.instagram.com/brionmario/",
      linkedin: "https://www.linkedin.com/in/brionmario/",
      pinterest: "https://www.pinterest.com/brionmario",
      soundcloud: "https://soundcloud.com/brionmario",
      tumblr: "https://brionmario.tumblr.com/",
      twitter: "https://twitter.com/brionmario",
      youtube: "https://www.youtube.com/BrionMario"
    }
  },
  forms: {
    newsletter: {
      mailchimp: {
        subscriptionURL: "https://brionmario.us15.list-manage.com/subscribe/post?u=41620257667e0123ce58b4277&amp;id=a030540f12"
      }
    }
  }
};

export type SiteConfigType = SiteConfigSchema;
export default siteConfig;
