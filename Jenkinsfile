pipeline {
    agent any  // Chạy trên bất kỳ agent nào có sẵn

    tools {
        nodejs 'NodeJS-Playwright'  // Sử dụng Node.js đã cài trong Jenkins
    }

    stages {
        stage('Clone Repository') {  // Bước 1: Clone code từ GitHub/GitLab
            steps {
                git branch: 'main', url: 'https://github.com/corbinhoang1305/pw-typescript.git'  // Thay URL repo của bạn
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
                bat 'npx playwright test --reporter=html'  // Chạy test với Allure report
            }
        }

        stage('Publish Test Report') {
            steps {
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report'
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', onlyIfSuccessful: true

        }
    }
}
