// Setup instructions (README.md content)
/*
# JSONPlaceholder API Testing với Playwright/TypeScript - Multi Environment

## 🚀 Tính năng chính

- ✅ **Page Object Model** pattern
- ✅ **Multi-environment** support (production, staging, development, local)
- ✅ **Centralized endpoints** management
- ✅ **Environment-specific configurations**
- ✅ **TypeScript** support với type safety
- ✅ **Performance testing** với response time validation
- ✅ **Custom headers** và request customization
- ✅ **Comprehensive logging** cho debugging
- ✅ **Flexible test data** theo environment

## 📁 Cấu trúc Project

```
jsonplaceholder-api-tests/
├── package.json
├── playwright.config.ts
├── data/                      # 📊 Data management
│   ├── endpoints.ts          #   API endpoints definitions
│   ├── environments.ts       #   Environment configurations  
│   └── test-config.ts        #   Test configurations & constants
├── pages/                     # 🏗️ Page Object Models
│   ├── base-api.page.ts      #   Base API class
│   ├── posts-api.page.ts     #   Posts API operations
│   └── users-api.page.ts     #   Users API operations
├── types/                     # 🔷 TypeScript interfaces
│   └── api.types.ts          #   API response types
├── fixtures/                  # 🧪 Test data
│   └── test-data.ts          #   Sample data & environment-specific data
├── utils/                     # 🛠️ Helper functions
│   └── api-helpers.ts        #   Validation & utility functions
└── tests/                     # 🧪 Test files
    ├── posts.spec.ts         #   Posts API tests
    ├── users.spec.ts         #   Users API tests
    └── integration.spec.ts   #   Integration tests
```

## 🔧 Cài đặt

### 1. Khởi tạo project:
```bash
# Clone hoặc tạo thư mục project
mkdir jsonplaceholder-api-tests
cd jsonplaceholder-api-tests

# Khởi tạo package.json
npm init -y

# Cài đặt dependencies
npm install -D @playwright/test @types/node typescript

# Cài đặt Playwright browsers
npx playwright install
```

### 2. Copy code từ artifact vào các file tương ứng

## 🌍 Multi-Environment Support

### Available Environments:
- **production** (default): https://jsonplaceholder.typicode.com
- **staging**: https://staging-jsonplaceholder.typicode.com
- **development**: https://dev-jsonplaceholder.typicode.com  
- **local**: http://localhost:3000

### Environment Configuration:
Mỗi environment có các config riêng:
- Base URL
- Timeout settings
- Retry count
- Custom headers
- Authentication (nếu cần)

## 🚀 Chạy Tests

### Chạy tất cả tests:
```bash
npm test                    # Production (default)
npm run test:prod          # Production environment
npm run test:staging       # Staging environment
npm run test:dev           # Development environment
npm run test:local         # Local environment
```

### Chạy tests cho Posts API:
```bash
npm run test:posts         # Production
npm run test:posts:prod    # Production
npm run test:posts:staging # Staging
npm run test:posts:dev     # Development
npm run test:posts:local   # Local
```

### Chạy tests khác:
```bash
npm run test:users         # Users API tests
npm run test:integration   # Integration tests
npm run test:headed        # Với UI
npm run test:debug         # Debug mode
npm run test:parallel      # Parallel execution
npm run test:serial        # Serial execution
```

### Chạy tests cụ thể:
```bash
# Chạy test theo pattern
npm run test:specific "should get all posts"

# Chạy với custom environment variable
TEST_ENV=staging npx playwright test posts.spec.ts

# Chạy với custom timeout
npx playwright test --timeout=60000

# Chạy với retry
npx playwright test --retries=3
```

## 📊 Xem Reports

```bash
npm run report             # Xem HTML report
npx playwright show-report # Tương tự
```

## 🧪 Test Coverage

### Posts API Tests:
- ✅ GET /posts (all posts)
- ✅ GET /posts/{id} (single post)
- ✅ POST /posts (create post)
- ✅ PUT /posts/{id} (update post)
- ✅ PATCH /posts/{id} (partial update)
- ✅ DELETE /posts/{id} (delete post)
- ✅ GET /posts?userId={id} (posts by user)
- ✅ GET /posts/{id}/comments (post comments)
- ✅ Edge cases (404, invalid data)
- ✅ Performance testing
- ✅ Headers validation
- ✅ Custom headers testing

### Users API Tests:
- ✅ GET /users (all users)
- ✅ GET /users/{id} (single user)
- ✅ POST /users (create user)
- ✅ GET /users/{id}/posts (user posts)
- ✅ GET /users/{id}/todos (user todos)
- ✅ Edge cases & filtering

### Integration Tests:
- ✅ User-Post relationships
- ✅ Post-Comment relationships
- ✅ CRUD workflow testing

## 🔧 Customization

### Thêm Environment mới:
```typescript
// data/environments.ts
export const ENVIRONMENTS = {
  // ... existing environments
  testing: {
    name: 'Testing',
    baseUrl: 'https://test-api.example.com',
    timeout: 30000,
    retries: 1,
    headers: {
      'Authorization': 'Bearer test-token'
    }
  }
};
```

### Thêm Endpoint mới:
```typescript
// data/endpoints.ts
export const ENDPOINTS = {
  // ... existing endpoints
  ALBUMS: {
    BASE: '/albums',
    BY_ID: (id: number) => `/albums/${id}`,
    PHOTOS: (albumId: number) => `/albums/${albumId}/photos`,
  }
};
```

### Thêm Test Data cho Environment:
```typescript
// fixtures/test-data.ts
export const getTestDataForEnvironment = () => {
  const env = process.env.TEST_ENV || 'production';
  
  switch (env) {
    case 'testing':
      return {
        posts: [{
          userId: 999,
          title: '[TESTING] Special Test Post',
          body: 'Testing environment specific data'
        }]
      };
    // ... other cases
  }
};
```

## 🐛 Troubleshooting

### Common Issues:

1. **Environment not found error:**
   ```bash
   # Kiểm tra environment có tồn tại không
   echo $TEST_ENV
   ```

2. **Timeout errors:**
   ```bash
   # Tăng timeout
   npx playwright test --timeout=60000
   ```

3. **Network issues:**
   ```bash
   # Chạy với retry
   npx playwright test --retries=3
   ```

4. **Debug specific test:**
   ```bash
   npx playwright test posts.spec.ts -g "should get all posts" --debug
   ```

## 📝 Best Practices

1. **Environment Variables**: Luôn set TEST_ENV cho CI/CD
2. **Test Data**: Sử dụng environment-specific test data
3. **Timeouts**: Điều chỉnh timeout theo network conditions
4. **Logging**: Enable logging để debug issues
5. **Assertions**: Sử dụng meaningful assertions
6. **Page Objects**: Keep API logic trong page objects
7. **Error Handling**: Handle các edge cases properly

## 🚀 CI/CD Integration

```yaml
# .github/workflows/api-tests.yml
name: API Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        environment: [production, staging]
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install
      - run: TEST_ENV=${{ matrix.environment }} npm test
        env:
          TEST_ENV: ${{ matrix.environment }}
```

## 📞 Support

Nếu có vấn đề, hãy check:
1. Console logs cho error details
2. Playwright report cho test results
3. Network tab cho API responses
4. Environment configuration

Happy Testing! 🎉
*/