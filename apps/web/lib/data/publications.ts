export type Publisher = "IEEE" | "ResearchGate"

export interface Publication {
  id: string
  title: string
  conference: string
  year: number
  location?: string
  url: string
  publisher: Publisher
  abstract?: string
}

export const publications: Publication[] = [
  {
    id: "cybersickness-2019",
    title:
      "Early Prediction of Cybersickness in Virtual, Augmented & Mixed Reality Applications: A Review",
    conference:
      "5th International Conference for Convergence in Technology (I2CT)",
    year: 2019,
    location: "Pune, Maharashtra, India",
    url: "https://ieeexplore.ieee.org/document/9033650/",
    publisher: "IEEE",
    abstract:
      "A comprehensive review of methods for early prediction of cybersickness in XR applications, exploring physiological and behavioral indicators to improve user comfort in virtual, augmented, and mixed reality environments.",
  },
  {
    id: "kidney-iot-2018",
    title: "Kidney Transplant aftercare with IOT Medical Wearables",
    conference: "ResearchGate",
    year: 2018,
    url: "https://www.researchgate.net/publication/327653042_Kidney_Transplant_aftercare_with_IOT_Medical_Wearables",
    publisher: "ResearchGate",
    abstract:
      "An exploration of how IoT-enabled medical wearables can improve post-transplant monitoring and aftercare for kidney transplant patients, enabling continuous health tracking and early anomaly detection.",
  },
]
