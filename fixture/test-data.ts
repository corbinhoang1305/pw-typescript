import { Post, User, Comment, Todo } from '../types/api.types';

export const testPosts: Post[] = [
  {
    userId: 1,
    id: 1,
    title: 'Test Post Title',
    body: 'This is a test post body content for API testing with Playwright'
  },
  {
    userId: 2,
    id: 2,
    title: 'Another Test Post',
    body: 'Another test post for validation purposes'
  }
];

export const testUsers: User[] = [
  {
    name: 'Test User',
    username: 'testuser',
    email: 'test@example.com',
    address: {
      street: 'Test Street',
      suite: 'Apt. 123',
      city: 'Test City',
      zipcode: '12345-678',
      geo: {
        lat: '0.0000',
        lng: '0.0000'
      }
    },
    phone: '1-234-567-8900',
    website: 'test.com',
    company: {
      name: 'Test Company',
      catchPhrase: 'Test catchphrase',
      bs: 'test business'
    }
  }
];

export const testComments: Comment[] = [
  {
    postId: 1,
    name: 'Test Comment',
    email: 'comment@test.com',
    body: 'This is a test comment'
  }
];

export const testTodos: Todo[] = [
  {
    userId: 1,
    title: 'Test Todo',
    completed: false
  }
];