import { NextResponse } from 'next/server';

/**
 * Mock user data
 * In production, this would come from a database
 */
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  bio: 'Full-stack developer passionate about React and TypeScript',
  location: 'San Francisco, CA',
  website: 'https://johndoe.com',
  joinedAt: '2023-01-15T00:00:00.000Z',
  stats: {
    followers: 1234,
    following: 567,
    posts: 89,
  },
};

/**
 * User API Route
 *
 * GET /api/user - Fetch current user data
 * PATCH /api/user - Update user data
 *
 * This simulates a user API endpoint.
 * In production, this would include authentication and database queries.
 */
export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(mockUser, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

export async function PATCH(request: Request) {
  try {
    const updates = await request.json();

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Merge updates with mock user
    const updatedUser = {
      ...mockUser,
      ...updates,
    };

    return NextResponse.json(updatedUser, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 400 }
    );
  }
}
