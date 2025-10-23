import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Badge } from '@devlaunch/ui';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { getPostBySlug, getAllPostSlugs } from '@/lib/mdx';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | DevLaunch Blog`,
    description: post.description,
  };
}

// Revalidate every 10 minutes (ISR)
export const revalidate = 600;

/**
 * Blog Post Page - Incremental Static Regeneration
 *
 * This page is pre-rendered for all blog posts at build time,
 * then revalidated periodically to pick up content changes.
 *
 * Rendering Mode: ISR (Incremental Static Regeneration)
 * Cache: Static with periodic revalidation
 * Revalidation: Every 600 seconds (10 minutes)
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Link */}
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      {/* Article Header */}
      <article className="mx-auto max-w-3xl">
        <header className="mb-8 border-b pb-8">
          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
            {post.title}
          </h1>

          {/* Description */}
          <p className="mb-6 text-xl text-muted-foreground">
            {post.description}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
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
        </header>

        {/* MDX Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  rehypeHighlight as any,
                  rehypeSlug as any,
                  [
                    rehypeAutolinkHeadings,
                    {
                      behavior: 'wrap',
                      properties: {
                        className: ['anchor'],
                      },
                    },
                  ] as any,
                ],
              },
            }}
          />
        </div>
      </article>
    </div>
  );
}
