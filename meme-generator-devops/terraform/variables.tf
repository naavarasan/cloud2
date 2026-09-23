# Variable for the namespace name
variable "namespace" {
  description = "Kubernetes namespace for the meme generator"
  type        = string
  default     = "meme-gen-ns"
}

# Variable for the Docker image
variable "image_name" {
  description = "Docker image to deploy"
  type        = string
  default     = "meme-generator:latest"
}

# Variable for number of replicas
variable "replicas" {
  description = "Number of pod replicas"
  type        = number
  default     = 1
}
