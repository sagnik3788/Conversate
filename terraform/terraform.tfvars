vpc_cidr = "10.0.0.0/16"

public_subnet_cidrs = [
  "10.0.1.0/24",
  "10.0.2.0/24"
]

public_subnet_count = 2

cluster_name = "eks-cluster"

node_group_name = "node-group"

node_desired_size = 2
node_max_size     = 3
node_min_size     = 1

iam_role_eks_arn  = "arn:aws:iam::151134196195:role/aws-service-role/eks.amazonaws.com/AWSServiceRoleForAmazonEKS"
iam_role_node_arn = "arn:aws:iam::151134196195:role/aws-service-role/eks-nodegroup.amazonaws.com/AWSServiceRoleForAmazonEKSNodegroup"

instance_type = "t2.micro"

key_name = "key-pair"

