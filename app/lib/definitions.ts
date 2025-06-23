export type Project = {
    id: string;
    title: string;
    description: string;
    content: string;
    image_url: string;
    link: string;
};

export type User = {
    id: string;
    username: string;
    password: string;
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