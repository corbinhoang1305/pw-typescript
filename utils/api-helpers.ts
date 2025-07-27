// utils/api-helpers.ts
import { expect } from '@playwright/test';
import { Post, User } from '../types/api.types';

export class ApiHelpers {
  static validatePostStructure(post: Post) {
    expect(post).toHaveProperty('id');
    expect(post).toHaveProperty('userId');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
    expect(typeof post.id).toBe('number');
    expect(typeof post.userId).toBe('number');
    expect(typeof post.title).toBe('string');
    expect(typeof post.body).toBe('string');
  }

  static validateUserStructure(user: User) {
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('address');
    expect(user).toHaveProperty('phone');
    expect(user).toHaveProperty('website');
    expect(user).toHaveProperty('company');
  }

  static validateArrayNotEmpty(array: any[]) {
    expect(Array.isArray(array)).toBeTruthy();
    expect(array.length).toBeGreaterThan(0);
  }

  static validateEmailFormat(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(email)).toBeTruthy();
  }

  static generateRandomString(length: number = 10): string {
    return Math.random().toString(36).substring(2, length + 2);
  }

  static generateRandomEmail(): string {
    return `test${this.generateRandomString(5)}@example.com`;
  }
}
