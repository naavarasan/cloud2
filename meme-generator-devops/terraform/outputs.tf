# Output the namespace created
output "namespace" {
  description = "The namespace where the application is deployed"
  value       = kubernetes_namespace.meme_namespace.metadata[0].name
}

# Output the service name
output "service_name" {
  description = "The name of the Kubernetes service"
  value       = kubernetes_service.meme_service.metadata[0].name
}
