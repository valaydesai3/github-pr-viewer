pipeline {
    agent any

    environment {
        IMAGE_NAME = "github-pr-viewer-frontend"
        CONTAINER_NAME = "frontend-container"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/valaydesai3/github-pr-viewer.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}:latest .'
            }
        }

        stage('Run Tests in Docker') {
            steps {
                sh 'docker run --rm ${IMAGE_NAME}:latest npm run test:ci'
            }
        }

        stage('Run Frontend in Docker') {
            steps {
                // Stop and remove existing container if running
                sh 'docker stop ${CONTAINER_NAME} || true && docker rm ${CONTAINER_NAME} || true'

                // Run the new container
                sh 'docker run -d -p 3000:80 --name ${CONTAINER_NAME} ${IMAGE_NAME}:latest'
            }
        }

        stage('Clean Up Old Images') {
            steps {
                sh 'docker system prune -f'
            }
        }
    }

    post {
        success {
            echo "Deployment successful!"
        }
        failure {
            echo "Deployment failed!"
        }
    }
}
