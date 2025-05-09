import finleyPortrait from '@/assets/images/Finley_portrait.png';
import bentAttr1 from '@/assets/images/bent_attr1_subject.png';
import { CardData } from '@/components/ui/generic-expandable-card';

// Sample testimonials data
export const testimonials = [
  {
    quote: "",
    name: "Finley",
    designation: "5",
    src: finleyPortrait,
    cardType: "finley"
  },
  {
    quote: "",
    name: "Bent",
    designation: "6",
    src: bentAttr1,
    cardType: "bent"
  }
];

// Card Data Definitions
export const finleyCardsData: CardData[] = [
  {
    id: "finley-card-1",
    title: "Passen",
    description: "Entwicklung 2023",
    src: finleyPortrait,
    ctaText: "Details",
    ctaLink: "#",
    videos: [
      {
        url: "https://data3.fra1.cdn.digitaloceanspaces.com/Finley.Time/Nested%20Sequence%2001%20-%20(4x5).mp4",
        title: "05/2025",
        description: "Ergebnis",
        score: "7/10"
      },
      {
        url: "https://data3.fra1.cdn.digitaloceanspaces.com/Finley.Time/Timeline%201%20(2).mp4",
        title: "11/2025",
        description: "Ergebnis",
        score: "8/10"
      }
    ]
  },
];

export const bentCardsData: CardData[] = [
  {
    id: "bent-card-1",
    title: "Jonglieren",
    description: "Entwicklung 2024",
    src: bentAttr1,
    ctaText: "Details",
    ctaLink: "#",
    videos: [
      {
        url: "https://data3.fra1.cdn.digitaloceanspaces.com/6%20(2).mp4",
        title: "03/2024",
        description: "Ergebnis",
        score: "8/10"
      },
      {
        url: "https://data3.fra1.cdn.digitaloceanspaces.com/bent1/bent.jong.mp4",
        title: "09/2025",
        description: "Ergebnis",
        score: "9/10"
      }
    ]
  },
]; 