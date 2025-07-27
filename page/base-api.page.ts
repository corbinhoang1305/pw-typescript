// pages/base-api.page.ts
import { APIRequestContext, expect } from '@playwright/test';
import { getEnvironmentConfig, EnvironmentConfig } from '../data/environments';

export class BaseApiPage {
  protected request: APIRequestContext;
  protected config: EnvironmentConfig;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.config = getEnvironmentConfig();
  }

  // Public method để test files có thể sử dụng khi cần thiết
  public getRequest(): APIRequestContext {
    return this.request;
  }

  // Get full URL với base URL từ environment
  protected getFullUrl(endpoint: string): string {
    return `${this.config.baseUrl}${endpoint}`;
  }

  async validateResponseStatus(response: any, expectedStatus: number) {
    expect(response.status()).toBe(expectedStatus);
  }

  async validateResponseHeaders(response: any, expectedHeaders: Record<string, string>) {
    const headers = response.headers();
    for (const [key, value] of Object.entries(expectedHeaders)) {
      expect(headers[key]).toBe(value);
    }
  }

  async getResponseBody(response: any) {
    return await response.json();
  }

  async validateJsonSchema(data: any, schema: any) {
    // Đơn giản validate các field bắt buộc
    for (const field of schema.required || []) {
      expect(data).toHaveProperty(field);
    }
  }

  // Method để handle generic requests với environment config
  async makeRequest(method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', 
                   endpoint: string, 
                   data?: any, 
                   expectedStatus: number = 200,
                   customHeaders?: Record<string, string>) {
    const url = this.getFullUrl(endpoint);
    const headers = { 
      ...this.config.headers, 
      ...customHeaders 
    };
    
    let response;
    const requestOptions = { 
      data, 
      headers,
      timeout: this.config.timeout 
    };
    
    switch (method) {
      case 'GET':
        response = await this.request.get(url, { headers, timeout: this.config.timeout });
        break;
      case 'POST':
        response = await this.request.post(url, requestOptions);
        break;
      case 'PUT':
        response = await this.request.put(url, requestOptions);
        break;
      case 'PATCH':
        response = await this.request.patch(url, requestOptions);
        break;
      case 'DELETE':
        response = await this.request.delete(url, { headers, timeout: this.config.timeout });
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
    
    await this.validateResponseStatus(response, expectedStatus);
    return response;
  }

  // Method để log request details cho debugging
  protected logRequest(method: string, endpoint: string, data?: any) {
    console.log(`📡 ${method} ${this.getFullUrl(endpoint)}`);
    if (data) {
      console.log('📦 Request body:', JSON.stringify(data, null, 2));
    }
  }

  // Method để validate response time
  async validateResponseTime(response: any, maxTimeMs: number) {
    const timing = response.timing();
    expect(timing.responseEnd - timing.requestStart).toBeLessThan(maxTimeMs);
  }
}