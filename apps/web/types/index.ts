export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
  readTime: string;
}
