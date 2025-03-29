pipeline {
    agent any  // Chạy trên bất kỳ agent nào có sẵn

    environment {
        NODEJS_HOME = tool 'C:\\nvm4w\\nodejs'  // Sử dụng Node.js đã cài trong Jenkins
        PATH = "${NODEJS_HOME}/bin;${env.PATH}"  // Cập nhật đường dẫn Node.js vào PATH
    }

    stages {
        stage('Clone Repository') {  // Bước 1: Clone code từ GitHub/GitLab
            steps {
                git 'https://github.com/corbinhoang1305/pw-typescript.git'  // Thay URL repo của bạn
            }
        }

        stage('Install Dependencies') {  // Bước 2: Cài đặt các package cần thiết
            steps {
                bat 'npm install'  // Cài đặt thư viện
                bat 'npx playwright install'  // Cài trình duyệt cho Playwright
            }
        }

        stage('Run Playwright Tests') {  // Bước 3: Chạy test Playwright
            steps {
                bat 'npx playwright test --reporter=allure'  // Chạy test với Allure report
            }
        }

        stage('Generate Allure Report') {  // Bước 4: Tạo báo cáo Allure
            steps {
                bat 'npx allure generate allure-results --clean -o allure-report'
            }
        }

        stage('Publish Allure Report') {  // Bước 5: Xuất báo cáo Allure trên Jenkins
            steps {
                allure([
                    includeProperties: false,
                    jdk: '',
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'allure-report/**', fingerprint: true
        }
    }
}
