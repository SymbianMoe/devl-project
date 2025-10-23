export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  website: string;
  joinedAt: string;
  stats: {
    followers: number;
    following: number;
    posts: number;
  };
}
