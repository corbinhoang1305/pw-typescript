// data/environments.ts
export interface EnvironmentConfig {
    name: string;
    baseUrl: string;
    timeout: number;
    retries: number;
    headers?: Record<string, string>;
    auth?: {
      type: 'bearer' | 'basic' | 'apikey';
      token?: string;
      username?: string;
      password?: string;
      apiKey?: string;
    };
  }
  
  export const ENVIRONMENTS: Record<string, EnvironmentConfig> = {
    production: {
      name: 'Production',
      baseUrl: 'https://jsonplaceholder.typicode.com',
      timeout: 30000,
      retries: 2,
      headers: {
        'User-Agent': 'Playwright-Tests/1.0'
      }
    },
    staging: {
      name: 'Staging',
      baseUrl: 'https://staging-jsonplaceholder.typicode.com', // Giả định
      timeout: 45000,
      retries: 3,
      headers: {
        'User-Agent': 'Playwright-Tests/1.0',
        'X-Environment': 'staging'
      }
    },
    development: {
      name: 'Development',
      baseUrl: 'https://dev-jsonplaceholder.typicode.com', // Giả định
      timeout: 60000,
      retries: 1,
      headers: {
        'User-Agent': 'Playwright-Tests/1.0',
        'X-Environment': 'development'
      }
    },
    local: {
      name: 'Local',
      baseUrl: 'http://localhost:3000', // Local server
      timeout: 10000,
      retries: 0,
      headers: {
        'User-Agent': 'Playwright-Tests/1.0'
      }
    }
  };
  
  // Utility function để get environment config
  export function getEnvironmentConfig(): EnvironmentConfig {
    const envName = process.env.TEST_ENV || 'production';
    const config = ENVIRONMENTS[envName];
    
    if (!config) {
      throw new Error(`Environment '${envName}' not found. Available: ${Object.keys(ENVIRONMENTS).join(', ')}`);
    }
    
    console.log(`🌍 Running tests against: ${config.name} (${config.baseUrl})`);
    return config;
  }