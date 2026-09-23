# Define the Kubernetes provider
provider "kubernetes" {
  config_path = "~/.kube/config" # Assumes local kubeconfig (like k3s/minikube/docker-desktop)
}

# Create a dedicated Namespace for our app
resource "kubernetes_namespace" "meme_namespace" {
  metadata {
    name = var.namespace
  }
}

# Create a Kubernetes Deployment
resource "kubernetes_deployment" "meme_app" {
  metadata {
    name      = "meme-generator"
    namespace = kubernetes_namespace.meme_namespace.metadata[0].name
  }

  spec {
    replicas = var.replicas

    selector {
      match_labels = {
        app = "meme-generator"
      }
    }

    template {
      metadata {
        labels = {
          app = "meme-generator"
        }
      }

      spec {
        container {
          name  = "meme-generator"
          image = var.image_name
          
          # Use local image without trying to pull from external registry
          image_pull_policy = "Never"

          port {
            container_port = 80
          }
        }
      }
    }
  }
}

# Create a Kubernetes Service to expose the application
resource "kubernetes_service" "meme_service" {
  metadata {
    name      = "meme-generator-service"
    namespace = kubernetes_namespace.meme_namespace.metadata[0].name
  }

  spec {
    selector = {
      app = "meme-generator"
    }

    port {
      port        = 8080
      target_port = 80
    }

    # Using NodePort makes it easily accessible.
    type = "NodePort"
  }
}
