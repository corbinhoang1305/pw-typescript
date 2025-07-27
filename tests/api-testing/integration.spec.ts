// tests/integration.spec.ts
import { test, expect } from '@playwright/test';
import { PostsApiPage } from '../../page/posts-api.page';
import { UsersApiPage } from '../../page/users-api.page';
import { ApiHelpers } from '../../utils/api-helpers';

test.describe('Integration Tests', () => {
  let postsApi: PostsApiPage;
  let usersApi: UsersApiPage;

  test.beforeEach(async ({ request }) => {
    postsApi = new PostsApiPage(request);
    usersApi = new UsersApiPage(request);
  });

  test('should verify user-post relationship', async () => {
    // Get a user
    const { data: user } = await usersApi.getUserById(1);
    expect(user.id).toBe(1);
    
    // Get posts for that user
    const { data: posts } = await postsApi.getPostsByUserId(user.id);
    ApiHelpers.validateArrayNotEmpty(posts);
    
    // Verify all posts belong to the user
    posts.forEach((post: any) => {
      expect(post.userId).toBe(user.id);
    });
    
    // Get a specific post and verify it exists
    const firstPost = posts[0];
    const { data: postDetail } = await postsApi.getPostById(firstPost.id);
    expect(postDetail.id).toBe(firstPost.id);
    expect(postDetail.userId).toBe(user.id);
  });

  test('should verify post-comment relationship', async () => {
    // Get a post
    const { data: post } = await postsApi.getPostById(1);
    expect(post.id).toBe(1);
    
    // Get comments for that post
    const { data: comments } = await postsApi.getCommentsForPost(post.id);
    ApiHelpers.validateArrayNotEmpty(comments);
    
    // Verify all comments belong to the post
    comments.forEach((comment: any) => {
      expect(comment.postId).toBe(post.id);
      ApiHelpers.validateEmailFormat(comment.email);
    });
  });

  test('should perform CRUD operations workflow', async () => {
    // CREATE - Create a new post
    const newPost = {
      userId: 1,
      title: 'Integration Test Post',
      body: 'This post is created during integration testing'
    };
    
    const { data: createdPost } = await postsApi.createPost(newPost);
    expect(createdPost.title).toBe(newPost.title);
    
    // READ - Get the created post (simulated since JSONPlaceholder doesn't persist)
    const { data: retrievedPost } = await postsApi.getPostById(1);
    expect(retrievedPost.id).toBe(1);
    
    // UPDATE - Update the post
    const updatedData = {
      ...retrievedPost,
      title: 'Updated Integration Test Post'
    };
    
    const { data: updatedPost } = await postsApi.updatePost(1, updatedData);
    expect(updatedPost.title).toBe(updatedData.title);
    
    // DELETE - Delete the post
    const deleteResponse = await postsApi.deletePost(1);
    expect(deleteResponse.status()).toBe(200);
  });
});