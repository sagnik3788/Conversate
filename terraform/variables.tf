variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
}

variable "public_subnet_count" {
  description = "Number of public subnets"
  type        = number
}

variable "cluster_name" {
  description = "Name of the EKS cluster"
  type        = string
}

variable "node_group_name" {
  description = "Name of the EKS node group"
  type        = string
}

variable "node_desired_size" {
  description = "Desired number of worker nodes"
  type        = number
}

variable "node_max_size" {
  description = "Maximum number of worker nodes"
  type        = number
}

variable "node_min_size" {
  description = "Minimum number of worker nodes"
  type        = number
}

variable "iam_role_eks_arn" {
  description = "ARN of the IAM role for the EKS cluster"
  type        = string
}

variable "iam_role_node_arn" {
  description = "ARN of the IAM role for the EKS node group"
  type        = string
}

# variable "ami_id" {
#   description = "AMI ID for the jenkins instamce"
#   type = string
# }

variable "instance_type" {
  description = "Instance type for the jenkins instamce"
  type = string
}

variable "key_name" {
  description = "key name for the jenkins instance"
  type = string
}


