export type EngagementType = "conference" | "meetup" | "workshop"

export interface CommunityEngagement {
  id: string
  event: string
  date: string
  location: string
  type: EngagementType
  url: string
  videoUrl?: string
  description?: string
  talk?: string
}

export const communityEngagements: CommunityEngagement[] = [
  {
    id: "react-chennai-2025",
    event: "React Chennai Meetup",
    date: "2025-04-01",
    location: "Chennai, India",
    type: "meetup",
    url: "https://youtu.be/2Ss3K2UjVUo?t=5999",
    videoUrl: "https://youtu.be/2Ss3K2UjVUo?t=5999",
    description:
      "Spoke at the React Chennai community meetup on modern authentication patterns in React applications.",
    talk: "Securing React Apps with Modern Auth",
  },
  {
    id: "react-bangalore-2025",
    event: "React Bangalore Meetup",
    date: "2025-04-01",
    location: "Bangalore, India",
    type: "meetup",
    url: "https://www.meetup.com/reactjs-bangalore/events/306454095/?eventOrigin=group_events_list",
    description:
      "Participated in the React Bangalore community meetup, discussing cutting-edge patterns and identity management for React applications.",
    talk: "Identity & Access Management in React",
  },
  {
    id: "react-delhi-2025",
    event: "React Delhi Meetup",
    date: "2025-04-01",
    location: "Delhi, India",
    type: "meetup",
    url: "https://www.linkedin.com/posts/react-delhi_reactdelhi-reactjs-websecurity-activity-7314396322839556096-xquQ/",
    description:
      "Spoke at React Delhi on web security best practices and how to protect React applications from common vulnerabilities.",
    talk: "Web Security for React Developers",
  },
]
