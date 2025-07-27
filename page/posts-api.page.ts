// pages/posts-api.page.ts
import { APIRequestContext } from '@playwright/test';
import { BaseApiPage } from './base-api.page';
import { Post } from '../types/api.types';
import { ENDPOINTS } from '../data/endpoints';
import { TEST_CONFIG } from '../data/test-config';

export class PostsApiPage extends BaseApiPage {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async getAllPosts() {
    this.logRequest('GET', ENDPOINTS.POSTS.BASE);
    const response = await this.makeRequest('GET', ENDPOINTS.POSTS.BASE, undefined, TEST_CONFIG.STATUS_CODES.OK);
    return {
      response,
      data: await this.getResponseBody(response)
    };
  }

  async getPostById(id: number) {
    const endpoint = ENDPOINTS.POSTS.BY_ID(id);
    this.logRequest('GET', endpoint);
    const response = await this.makeRequest('GET', endpoint, undefined, TEST_CONFIG.STATUS_CODES.OK);
    return {
      response,
      data: await this.getResponseBody(response)
    };
  }

  async createPost(postData: Post) {
    this.logRequest('POST', ENDPOINTS.POSTS.BASE, postData);
    const response = await this.makeRequest('POST', ENDPOINTS.POSTS.BASE, postData, TEST_CONFIG.STATUS_CODES.CREATED);
    return {
      response,
      data: await this.getResponseBody(response)
    };
  }

  async updatePost(id: number, postData: Partial<Post>) {
    const endpoint = ENDPOINTS.POSTS.BY_ID(id);
    this.logRequest('PUT', endpoint, postData);
    const response = await this.makeRequest('PUT', endpoint, postData, TEST_CONFIG.STATUS_CODES.OK);
    return {
      response,
      data: await this.getResponseBody(response)
    };
  }

  async patchPost(id: number, postData: Partial<Post>) {
    const endpoint = ENDPOINTS.POSTS.BY_ID(id);
    this.logRequest('PATCH', endpoint, postData);
    const response = await this.makeRequest('PATCH', endpoint, postData, TEST_CONFIG.STATUS_CODES.OK);
    return {
      response,
      data: await this.getResponseBody(response)
    };
  }

  async deletePost(id: number) {
    const endpoint = ENDPOINTS.POSTS.BY_ID(id);
    this.logRequest('DELETE', endpoint);
    return await this.makeRequest('DELETE', endpoint, undefined, TEST_CONFIG.STATUS_CODES.OK);
  }

  async getPostsByUserId(userId: number) {
    const endpoint = ENDPOINTS.POSTS.BY_USER_ID(userId);
    this.logRequest('GET', endpoint);
    const response = await this.makeRequest('GET', endpoint, undefined, TEST_CONFIG.STATUS_CODES.OK);
    return {
      response,
      data: await this.getResponseBody(response)
    };
  }

  async getCommentsForPost(postId: number) {
    const endpoint = ENDPOINTS.POSTS.COMMENTS(postId);
    this.logRequest('GET', endpoint);
    const response = await this.makeRequest('GET', endpoint, undefined, TEST_CONFIG.STATUS_CODES.OK);
    return {
      response,
      data: await this.getResponseBody(response)
    };
  }

  // Method để test edge cases
  async getPostWithInvalidId(id: number) {
    const endpoint = ENDPOINTS.POSTS.BY_ID(id);
    this.logRequest('GET', endpoint);
    const url = this.getFullUrl(endpoint);
    const response = await this.request.get(url, { 
      headers: this.config.headers,
      timeout: this.config.timeout 
    });
    return response; // Không validate status để test có thể kiểm tra các status khác nhau
  }

  // Method để test với custom headers
  async createPostWithCustomHeaders(postData: Post, customHeaders: Record<string, string>) {
    this.logRequest('POST', ENDPOINTS.POSTS.BASE, postData);
    const url = this.getFullUrl(ENDPOINTS.POSTS.BASE);
    const headers = { 
      ...this.config.headers, 
      ...customHeaders 
    };
    const response = await this.request.post(url, {
      data: postData,
      headers,
      timeout: this.config.timeout
    });
    return response;
  }

  // Method để test performance
  async getPostByIdWithPerformanceCheck(id: number, maxResponseTimeMs: number = 1000) {
    const endpoint = ENDPOINTS.POSTS.BY_ID(id);
    this.logRequest('GET', endpoint);
    const response = await this.makeRequest('GET', endpoint, undefined, TEST_CONFIG.STATUS_CODES.OK);
    await this.validateResponseTime(response, maxResponseTimeMs);
    return {
      response,
      data: await this.getResponseBody(response)
    };
  }
}