output "s3_bucket" { value = aws_s3_bucket.fixidesk.bucket }
output "nginx_ingress_namespace" { value = kubernetes_namespace.ingress.metadata[0].name }
output "cert_manager_namespace" { value = kubernetes_namespace.cert_manager.metadata[0].name }
output "redis_namespace" { value = kubernetes_namespace.redis.metadata[0].name }
