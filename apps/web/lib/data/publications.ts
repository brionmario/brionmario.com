export type Publisher = "IEEE" | "ResearchGate"

export interface Publication {
  id: string
  title: string
  conference: string
  year: number
  location?: string
  url: string
  publisher: Publisher
  /** Site-hosted copy of the full text, rendered inline on the detail page. */
  pdf?: string
  abstract: string
  keywords: string[]
  /** BibTeX entry, offered as a copy-to-clipboard block on the detail page. */
  citation: string
}

export const publications: Publication[] = [
  {
    id: "cybersickness-2019",
    title:
      "Early Prediction of Cybersickness in Virtual, Augmented & Mixed Reality Applications: A Review",
    conference: "5th International Conference for Convergence in Technology (I2CT)",
    year: 2019,
    location: "Pune, India",
    url: "https://ieeexplore.ieee.org/document/9033650/",
    publisher: "IEEE",
    pdf: "/papers/early-prediction-of-cybersickness-vamr-review.pdf",
    // Abstract and keywords transcribed from the paper itself.
    abstract:
      "The field of Virtual, Augmented & Mixed Reality (VAMR) has already taken up the consumer market by storm and are demanding among users owing to their practicality and aesthetics. Despite the massive popularity and hype, VAMR carry a loathsome side-effect called “Cybersickness”, which is often times severe enough to cause significant discomfort to the users causing the discontinuation of use. There are systems to quantify and measure cybersickness but a symptom prediction tool which can be used by application developers to evaluate their products for cybersickness susceptibility is non-existent. This paper presents a summary of literature and provides a review and a discussion with the intentions of deriving a predictive algorithm which would ultimately address the research gap and missing links.",
    keywords: [
      "cybersickness",
      "virtual reality",
      "computer-vision",
      "human-computer-interaction",
    ],
    // Official BibTeX export from IEEE Xplore — do not hand-edit.
    citation: `@INPROCEEDINGS{9033650,
  author={Silva, Brion M. and Fernando, Pumudu},
  booktitle={2019 IEEE 5th International Conference for Convergence in Technology (I2CT)},
  title={Early Prediction of Cybersickness in Virtual, Augmented & Mixed Reality Applications: A Review},
  year={2019},
  volume={},
  number={},
  pages={1-6},
  keywords={Virtual reality;Computers;Physiology;Visualization;Sociology;Statistics;Fatigue;cybersickness;virtual reality;computer-vision;human-computer-interaction},
  doi={10.1109/I2CT45611.2019.9033650}}`,
  },
  {
    id: "kidney-iot-2018",
    title: "Kidney Transplant aftercare with IOT Medical Wearables",
    conference: "ResearchGate",
    // The authoritative record dates the work to May 2017; 2018 is only when it
    // was posted to ResearchGate.
    year: 2017,
    location: "Colombo, LK",
    url: "https://www.researchgate.net/publication/327653042_Kidney_Transplant_aftercare_with_IOT_Medical_Wearables",
    publisher: "ResearchGate",
    pdf: "/papers/kidney-transplant-aftercare-iot-medical-wearables.pdf",
    // Abstract and index terms transcribed from the paper itself.
    abstract:
      "Kidney disease has been a growing concern in Sri Lankan healthcare system. Many patients are undergoing transplantation day by day. Not just doctors, patients too have to do their part to ensure their own safety. This means frequent visits to the doctor's office which can cost a lot. We live in the era of Internet of Things and wearable devices are becoming extremely popular, not just for sports utilized necessities but also for self-health monitoring. This research paper summarizes the attempt made by the Safe Plant development team in finding the feasibility of having a medical wearable to help and support kidney transplant patients in their aftercare process.",
    keywords: [
      "Assistive mobile application",
      "Cloud Platform",
      "MIoT",
      "Kidney Transplant Aftercare",
    ],
    // Official BibTeX export from ResearchGate — do not hand-edit.
    citation: `@unknown{unknown,
author = {Mario, Brion and Walpola, Hasitha and Kisal, Ramith and De Silva, Savani},
year = {2017},
month = {05},
pages = {},
title = {Kidney Transplant aftercare with IOT Medical Wearables},
doi = {10.13140/RG.2.2.25822.08009}
}`,
  },
]
