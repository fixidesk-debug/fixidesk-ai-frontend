variable "aws_region" { type = string }
variable "s3_bucket" { type = string }
variable "kubeconfig" { type = string }
variable "ingress_namespace" { type = string, default = "ingress-nginx" }
variable "cert_manager_namespace" { type = string, default = "cert-manager" }
variable "redis_namespace" { type = string, default = "redis" }
variable "nginx_ingress_chart_version" { type = string, default = "4.10.0" }
variable "cert_manager_chart_version" { type = string, default = "v1.14.4" }
variable "redis_chart_version" { type = string, default = "19.0.0" }
