import type { Metadata } from 'next';
import { PostCard } from '@/components/blog';
import { getAllPosts } from '@/lib/mdx';
import { EmptyState } from '@devlaunch/ui';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | DevLaunch',
  description: 'Technical articles and tutorials about web development',
};

// Revalidate every 10 minutes (ISR)
export const revalidate = 600;

/**
 * Blog Listing Page - Static Site Generation with ISR
 *
 * This page is pre-rendered at build time and revalidated periodically.
 * Combines the benefits of static generation with dynamic content updates.
 *
 * Rendering Mode: SSG + ISR (Incremental Static Regeneration)
 * Cache: Static with periodic revalidation
 * Revalidation: Every 600 seconds (10 minutes)
 */
export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Technical articles and tutorials (SSG + ISR mode)
        </p>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<FileText className="h-10 w-10 text-muted-foreground" />}
          title="No posts yet"
          description="Check back soon for new content!"
        />
      )}
    </div>
  );
}
