import { test, expect } from '@playwright/test';
import { PostsApiPage } from '../../page/posts-api.page';
import { testPosts } from '../../fixture/test-data';
import { ApiHelpers } from '../../utils/api-helpers';

test.describe('Posts API Tests', () => {
  let postsApi: PostsApiPage;

  test.beforeEach(async ({ request }) => {
    postsApi = new PostsApiPage(request);
  });

  test('should get all posts', async () => {
    const { response, data } = await postsApi.getAllPosts();
    
    expect(response.status()).toBe(200);
    ApiHelpers.validateArrayNotEmpty(data);
    expect(data).toHaveLength(100);
    
    // Validate first post structure
    ApiHelpers.validatePostStructure(data[0]);
    console.log('Result: should get all posts', { status: response.status(), length: data.length });
  });

  test('should get post by ID', async () => {
    const postId = 1;
    const { response, data } = await postsApi.getPostById(postId);
    
    expect(response.status()).toBe(200);
    expect(data.id).toBe(postId);
    ApiHelpers.validatePostStructure(data);
    console.log('Result: should get post by ID', { status: response.status(), id: data.id });
  });

  test('should create new post', async () => {
    console.log('testPosts in create new post:', testPosts);
    const newPost = testPosts[0];
    const { response, data } = await postsApi.createPost(newPost);
    
    expect(response.status()).toBe(201);
    expect(data.userId).toBe(newPost.userId);
    expect(data.title).toBe(newPost.title);
    expect(data.body).toBe(newPost.body);
    expect(data.id).toBe(101); // JSONPlaceholder returns id 101 for new posts
    console.log('Result: should create new post', { status: response.status(), id: data.id });
  });

  test('should update post', async () => {
    const postId = 1;
    const updatedPost = {
      id: postId,
      userId: 1,
      title: 'Updated Title',
      body: 'Updated body content'
    };
    
    const { response, data } = await postsApi.updatePost(postId, updatedPost);
    
    expect(response.status()).toBe(200);
    expect(data.id).toBe(postId);
    expect(data.title).toBe(updatedPost.title);
    expect(data.body).toBe(updatedPost.body);
    console.log('Result: should update post', { status: response.status(), id: data.id });
  });

  test('should patch post', async () => {
    const postId = 1;
    const patchData = { title: 'Patched Title' };
    
    const { response, data } = await postsApi.patchPost(postId, patchData);
    
    expect(response.status()).toBe(200);
    expect(data.id).toBe(postId);
    expect(data.title).toBe(patchData.title);
    console.log('Result: should patch post', { status: response.status(), id: data.id });
  });

  test('should delete post', async () => {
    const postId = 1;
    const response = await postsApi.deletePost(postId);
    
    expect(response.status()).toBe(200);
    console.log('Result: should delete post', { status: response.status() });
  });

  test('should get posts by user ID', async () => {
    const userId = 1;
    const { response, data } = await postsApi.getPostsByUserId(userId);
    
    expect(response.status()).toBe(200);
    ApiHelpers.validateArrayNotEmpty(data);
    
    // All posts should belong to the specified user
    data.forEach((post: any) => {
      expect(post.userId).toBe(userId);
    });
    console.log('Result: should get posts by user ID', { status: response.status(), count: data.length });
  });

  test('should get comments for post', async () => {
    const postId = 1;
    const { response, data } = await postsApi.getCommentsForPost(postId);
    
    expect(response.status()).toBe(200);
    ApiHelpers.validateArrayNotEmpty(data);
    
    // Validate comment structure
    const comment = data[0];
    expect(comment).toHaveProperty('id');
    expect(comment).toHaveProperty('postId');
    expect(comment).toHaveProperty('name');
    expect(comment).toHaveProperty('email');
    expect(comment).toHaveProperty('body');
    expect(comment.postId).toBe(postId);
    console.log('Result: should get comments for post', { status: response.status(), count: data.length });
  });

  test('should handle non-existent post', async () => {
    const nonExistentId = 999;
    const response = await postsApi.getPostWithInvalidId(nonExistentId);
    expect(response.status()).toBe(404);
    console.log('Result: should handle non-existent post', { status: response.status() });
  });

  test('should validate response headers', async () => {
    const { response } = await postsApi.getAllPosts();
    
    const headers = response.headers();
    expect(headers['content-type']).toContain('application/json');
    expect(headers).toHaveProperty('cache-control');
    console.log('Result: should validate response headers', { status: response.status(), headers: response.headers() });
  });

  test('should handle custom headers in request', async () => {
    console.log('testPosts in handle custom headers:', testPosts);
    const newPost = testPosts[0];
    const customHeaders = {
      'X-Custom-Header': 'test-value'
    };
    
    const response = await postsApi.createPostWithCustomHeaders(newPost, customHeaders);
    expect(response.status()).toBe(201);
    console.log('Result: should handle custom headers in request', { status: response.status() });
  });
});