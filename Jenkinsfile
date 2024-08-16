pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = "sagnik3788/conversate"
        DOCKER_TAG = "${BUILD_NUMBER}"
        KUBECONFIG = credentials('eks-kubeconfig')
        AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')  // Add your AWS Access Key ID
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')  // Add your AWS Secret Access Key
        AWS_DEFAULT_REGION = 'us-west-2'  // Specify your AWS region
    }
    
    stages {

         stage('Checkout') {
            steps {
                git credentialsId: 'git-credentials-id', url: 'https://github.com/sagnik3788/Conversate'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push("latest")
                    }
                }
            }
        }
        
        stage('Deploy to EKS') {
            steps {
                script {
                    sh "kubectl --kubeconfig $KUBECONFIG apply -f k8s-deployment-service.yaml"
                    sh "kubectl --kubeconfig $KUBECONFIG set image deployment/conversate-deploy conversate=${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }
        
        stage('Get Service URL') {
            steps {
                script {
                    sh "kubectl --kubeconfig $KUBECONFIG get services conversate-service"
                }
            }
        }
    }
}
