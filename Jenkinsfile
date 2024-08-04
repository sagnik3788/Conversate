pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = "sagnik3788/conversate"
        DOCKER_TAG = "${BUILD_NUMBER}"
        KUBECONFIG = credentials('eks-kubeconfig')
    }
    
    stages {
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