export type Project = {
    id: string;
    title: string;
    description: string;
    content: string;
    image_url: string;
    link: string;
    md_link: string;
};

export type UserData = {
    id: string;
    username: string;
    password: string;
    image: string;
};

export type TimelineEvent = {
    duration: number;
    begin: string;
    end: string;
    title: string;
    company: string;
    location: string;
    description: string;
    tasks: string[];
    link: string;
    type: string; // "job" | "education"
};

export type Image = {
  url: string;
  title: string;
  slug: string;
  category: string[];
  prompt: string;
  created_at: string;
  description: string;
};

export type Cocktail = {
    name: string;
    slug: string;
    description: string;
    image_url: string;
    ingredients: string[];
    instructions: string;
};

export type Tab = {
  id: number;
  title: string;
  artist: string;
  tab_data: string;
  pdf_url?: string;
  slug: string;
};
