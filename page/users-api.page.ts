// pages/users-api.page.ts
import { APIRequestContext } from '@playwright/test';
import { BaseApiPage } from './base-api.page';
import { User } from '../types/api.types';
import { ENDPOINTS } from '../data/endpoints';
import { TEST_CONFIG } from '../data/test-config';

export class UsersApiPage extends BaseApiPage {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async getAllUsers() {
    this.logRequest('GET', ENDPOINTS.USERS.BASE);
    const response = await this.makeRequest('GET', ENDPOINTS.USERS.BASE, undefined, TEST_CONFIG.STATUS_CODES.OK);
    return {
      response,
      data: await this.getResponseBody(response)
    };
  }

  async getUserById(id: number) {
    const endpoint = ENDPOINTS.USERS.BY_ID(id);
    this.logRequest('GET', endpoint);
    const response = await this.makeRequest('GET', endpoint, undefined, TEST_CONFIG.STATUS_CODES.OK);
    return {
      response,
      data: await this.getResponseBody(response)
    };
  }

  async createUser(userData: User) {
    this.logRequest('POST', ENDPOINTS.USERS.BASE, userData);
    const response = await this.makeRequest('POST', ENDPOINTS.USERS.BASE, userData, TEST_CONFIG.STATUS_CODES.CREATED);
    return {
      response,
      data: await this.getResponseBody(response)
    };
  }

  async getUserPosts(userId: number) {
    const endpoint = ENDPOINTS.USERS.POSTS(userId);
    this.logRequest('GET', endpoint);
    const response = await this.makeRequest('GET', endpoint, undefined, TEST_CONFIG.STATUS_CODES.OK);
    return {
      response,
      data: await this.getResponseBody(response)
    };
  }

  async getUserTodos(userId: number) {
    const endpoint = ENDPOINTS.USERS.TODOS(userId);
    this.logRequest('GET', endpoint);
    const response = await this.makeRequest('GET', endpoint, undefined, TEST_CONFIG.STATUS_CODES.OK);
    return {
      response,
      data: await this.getResponseBody(response)
    };
  }

  // Method để test edge cases
  async getUserWithInvalidId(id: number) {
    const endpoint = ENDPOINTS.USERS.BY_ID(id);
    this.logRequest('GET', endpoint);
    const url = this.getFullUrl(endpoint);
    const response = await this.request.get(url, { 
      headers: this.config.headers,
      timeout: this.config.timeout 
    });
    return response; // Không validate status
  }

  // Method để test filtering
  async getUsersByParam(param: string, value: string) {
    const endpoint = `${ENDPOINTS.USERS.BASE}?${param}=${value}`;
    this.logRequest('GET', endpoint);
    const response = await this.makeRequest('GET', endpoint, undefined, TEST_CONFIG.STATUS_CODES.OK);
    return {
      response,
      data: await this.getResponseBody(response)
    };
  }
}