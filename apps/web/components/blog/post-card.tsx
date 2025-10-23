import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '@devlaunch/ui';
import { Calendar, Clock, User } from 'lucide-react';
import type { BlogPostMetadata } from '@/lib/mdx';
import { format } from 'date-fns';

interface PostCardProps {
  post: BlogPostMetadata;
}

/**
 * PostCard - Display a blog post preview card
 */
export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="mb-2 flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {post.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
