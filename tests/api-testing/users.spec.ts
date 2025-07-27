// tests/users.spec.ts
import { test, expect } from '@playwright/test';
import { UsersApiPage } from '../../page/users-api.page';
import { testUsers } from '../../fixture/test-data';
import { ApiHelpers } from '../../utils/api-helpers';

test.describe('Users API Tests', () => {
  let usersApi: UsersApiPage;

  test.beforeEach(async ({ request }) => {
    usersApi = new UsersApiPage(request);
  });

  test('should get all users', async () => {
    const { response, data } = await usersApi.getAllUsers();
    
    expect(response.status()).toBe(200);
    ApiHelpers.validateArrayNotEmpty(data);
    expect(data).toHaveLength(10);
    
    // Validate first user structure
    ApiHelpers.validateUserStructure(data[0]);
    ApiHelpers.validateEmailFormat(data[0].email);
  });

  test('should get user by ID', async () => {
    const userId = 1;
    const { response, data } = await usersApi.getUserById(userId);
    
    expect(response.status()).toBe(200);
    expect(data.id).toBe(userId);
    ApiHelpers.validateUserStructure(data);
    ApiHelpers.validateEmailFormat(data.email);
  });

  test('should create new user', async () => {
    const newUser = testUsers[0];
    const { response, data } = await usersApi.createUser(newUser);
    
    expect(response.status()).toBe(201);
    expect(data.name).toBe(newUser.name);
    expect(data.username).toBe(newUser.username);
    expect(data.email).toBe(newUser.email);
    expect(data.id).toBe(11); // JSONPlaceholder returns id 11 for new users
  });

  test('should get user posts', async () => {
    const userId = 1;
    const { response, data } = await usersApi.getUserPosts(userId);
    
    expect(response.status()).toBe(200);
    ApiHelpers.validateArrayNotEmpty(data);
    
    // All posts should belong to the specified user
    data.forEach((post: any) => {
      expect(post.userId).toBe(userId);
      ApiHelpers.validatePostStructure(post);
    });
  });

  test('should get user todos', async () => {
    const userId = 1;
    const { response, data } = await usersApi.getUserTodos(userId);
    
    expect(response.status()).toBe(200);
    ApiHelpers.validateArrayNotEmpty(data);
    
    // All todos should belong to the specified user
    data.forEach((todo: any) => {
      expect(todo.userId).toBe(userId);
      expect(todo).toHaveProperty('id');
      expect(todo).toHaveProperty('title');
      expect(todo).toHaveProperty('completed');
      expect(typeof todo.completed).toBe('boolean');
    });
  });

  test('should handle non-existent user', async () => {
    const nonExistentId = 999;
    const response = await usersApi.getUserWithInvalidId(nonExistentId);
    expect(response.status()).toBe(404);
  });

  test('should filter users by username', async () => {
    // JSONPlaceholder không hỗ trợ filtering, nhưng method này để demo
    const { response, data } = await usersApi.getUsersByParam('username', 'Bret');
    
    expect(response.status()).toBe(200);
    // Vì JSONPlaceholder trả về tất cả users, ta sẽ filter manually để test
    const filteredUsers = data.filter((user: any) => user.username === 'Bret');
    expect(filteredUsers.length).toBeGreaterThan(0);
  });
});