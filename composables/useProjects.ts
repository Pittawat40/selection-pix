// composables/useProjects.ts
export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: string;
  year: number;
  likes: number;
  views: string;
  cover: string;
  images: ProjectImage[];
}

export const useProjects = () => {
  const projects: Project[] = [
    {
      id: "1",
      slug: "silom-residences",
      title: "Silom Residences",
      location: "Bangkok",
      category: "Architecture",
      year: 2025,
      likes: 119,
      views: "1.8K",
      cover: "/images/1.png",
      images: [
        {
          src: "/images/1.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/2.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/3.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/4.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/5.png",
          alt: "Exterior facade",
        },
      ],
    },
    {
      id: "2",
      slug: "chewathai-thonglor",
      title: "Chewathai – Thonglor",
      location: "Bangkok",
      category: "Architecture",
      year: 2025,
      likes: 204,
      views: "3.2K",
      cover: "/images/2.png",
      images: [
        {
          src: "/images/1.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/2.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/3.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/4.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/5.png",
          alt: "Exterior facade",
        },
      ],
    },
    {
      id: "3",
      slug: "one-bangkok-tower",
      title: "One Bangkok Tower",
      location: "Bangkok",
      category: "Architecture",
      year: 2025,
      likes: 88,
      views: "2.1K",
      cover: "/images/3.png",
      images: [
        {
          src: "/images/1.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/2.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/3.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/4.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/5.png",
          alt: "Exterior facade",
        },
      ],
    },
    {
      id: "4",
      slug: "riverside-villa",
      title: "Riverside Villa",
      location: "Chiang Mai",
      category: "Interior",
      year: 2025,
      likes: 156,
      views: "4.5K",
      cover: "/images/4.png",
      images: [
        {
          src: "/images/1.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/2.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/3.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/4.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/5.png",
          alt: "Exterior facade",
        },
      ],
    },
    {
      id: "5",
      slug: "the-forest-residence",
      title: "The Forest Residence",
      location: "Khao Yai",
      category: "Interior",
      year: 2024,
      likes: 92,
      views: "1.6K",
      cover: "/images/5.png",
      images: [
        {
          src: "/images/1.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/2.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/3.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/4.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/5.png",
          alt: "Exterior facade",
        },
      ],
    },
    {
      id: "6",
      slug: "phuket-beachfront",
      title: "Phuket Beachfront",
      location: "Phuket",
      category: "Aerial",
      year: 2024,
      likes: 177,
      views: "5.0K",
      cover: "/images/6.png",
      images: [
        {
          src: "/images/1.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/2.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/3.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/4.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/5.png",
          alt: "Exterior facade",
        },
      ],
    },
    {
      id: "7",
      slug: "hua-hin-pool-villa",
      title: "Hua Hin Pool Villa",
      location: "Hua Hin",
      category: "Interior",
      year: 2024,
      likes: 63,
      views: "980",
      cover: "/images/7.png",
      images: [
        {
          src: "/images/1.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/2.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/3.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/4.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/5.png",
          alt: "Exterior facade",
        },
      ],
    },
    {
      id: "8",
      slug: "sukhumvit-modern",
      title: "Sukhumvit Modern",
      location: "Bangkok",
      category: "Architecture",
      year: 2024,
      likes: 141,
      views: "2.7K",
      cover: "/images/8.png",
      images: [
        {
          src: "/images/1.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/2.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/3.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/4.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/5.png",
          alt: "Exterior facade",
        },
      ],
    },
    {
      id: "9",
      slug: "sathorn-penthouse",
      title: "Sathorn Penthouse",
      location: "Bangkok",
      category: "Interior",
      year: 2023,
      likes: 98,
      views: "1.9K",
      cover: "/images/9.png",
      images: [
        {
          src: "/images/1.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/2.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/3.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/4.png",
          alt: "Exterior facade",
        },
        {
          src: "/images/5.png",
          alt: "Exterior facade",
        },
      ],
    },
  ];

  const categories = ["All", "Architecture", "Interior", "Aerial"];

  return { projects, categories };
};
