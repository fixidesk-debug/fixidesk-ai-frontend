resource "kubernetes_namespace" "ingress" { metadata { name = var.ingress_namespace } }
resource "kubernetes_namespace" "cert_manager" { metadata { name = var.cert_manager_namespace } }
resource "kubernetes_namespace" "redis" { metadata { name = var.redis_namespace } }

resource "helm_release" "nginx_ingress" {
  name       = "ingress-nginx"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"
  namespace  = kubernetes_namespace.ingress.metadata[0].name
  version    = var.nginx_ingress_chart_version
  values = [
    yamlencode({
      controller: { service: { type: "LoadBalancer" } }
    })
  ]
}

resource "helm_release" "cert_manager" {
  name       = "cert-manager"
  repository = "https://charts.jetstack.io"
  chart      = "cert-manager"
  namespace  = kubernetes_namespace.cert_manager.metadata[0].name
  version    = var.cert_manager_chart_version
  values = [
    yamlencode({ installCRDs: true })
  ]
}

resource "helm_release" "redis" {
  name       = "redis"
  repository = "https://charts.bitnami.com/bitnami"
  chart      = "redis"
  namespace  = kubernetes_namespace.redis.metadata[0].name
  version    = var.redis_chart_version
  values = [
    yamlencode({ architecture: "standalone" })
  ]
}
