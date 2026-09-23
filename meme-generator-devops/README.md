# Meme Generator – DevOps Deployment

## Project Overview
This is a beginner-friendly DevOps project demonstrating how to containerize and deploy a simple Meme Generator application. It uses HTML/CSS/JavaScript for the frontend, Docker for containerization, Jenkins for CI/CD automation, Ansible for configuration management, and Terraform for Kubernetes deployment.

## Problem Statement
Deploy a simple asset-heavy static Meme Generator application using Terraform, configure asset directory permissions using Ansible, and use Jenkins to build a Docker image locally.

## Technologies Used
* **Frontend:** HTML5, CSS3, JavaScript (Canvas API)
* **Containerization:** Docker
* **Infrastructure as Code:** Terraform
* **Configuration Management:** Ansible
* **CI/CD:** Jenkins
* **Orchestration:** K3s / Kubernetes (Local)

## Project Architecture & Folder Structure

```text
meme-generator-devops/
├── app/
│   ├── index.html        # Main HTML file
│   ├── style.css         # Responsive styling
│   ├── script.js         # Canvas logic for meme generation
│   └── assets/           # Directory for meme template images
│       ├── meme1.jpg
│       ├── meme2.jpg
│       ├── meme3.jpg
│       └── README.txt
├── docker/
│   └── Dockerfile        # Instructions to build the Nginx Docker image
├── terraform/
│   ├── main.tf           # Kubernetes deployment and service definitions
│   ├── variables.tf      # Configurable variables
│   └── outputs.tf        # Outputs like namespace and service name
├── ansible/
│   ├── inventory.ini     # Local inventory definition
│   └── setup.yml         # Playbook to set file permissions
├── jenkins/
│   └── Jenkinsfile       # Pipeline to build and run the Docker image
└── README.md             # Project documentation
```

## How the Meme Generator Works
The application is a purely static web page that requires no backend or database.
1. The user inputs top and bottom text.
2. The user selects one of the provided meme image templates.
3. Clicking "Generate Meme" uses the HTML5 `<canvas>` element to draw the image and overlay the text onto it.
4. The generated image can be downloaded locally.

---

## Instructions

### 1. How to Run Without Docker (Local testing)
Simply open the `app/index.html` file in any web browser. 
*(Alternatively, use an extension like VS Code Live Server).*

### 2. How to Build Docker Image
Make sure Docker Desktop (or Docker daemon) is running. Navigate to the root folder `meme-generator-devops` and run:

```bash
docker build -f docker/Dockerfile -t meme-generator:latest .
```

### 3. How to Run Docker Container
After building the image, run it mapping host port 8080 to container port 80:

```bash
docker run -d -p 8080:80 --name meme-generator meme-generator:latest
```
Access the application at: [http://localhost:8080](http://localhost:8080)

### 4. How to Run Ansible
Ansible is used to ensure the `assets` folder has the correct read and execute permissions for the web server. Navigate to the `ansible` directory:

```bash
cd ansible
ansible-playbook -i inventory.ini setup.yml
```
*Note: Ansible is typically run on Linux/macOS or WSL on Windows.*

### 5. How to Run Terraform
Terraform is used to deploy the application to a local Kubernetes cluster (like K3s, Minikube, or Docker Desktop Kubernetes). 

Navigate to the `terraform` directory:

```bash
cd terraform
terraform init
terraform apply -auto-approve
```
*Note on local K3s image handling:* Because we are using a locally built image (`image_pull_policy = "Never"` in `main.tf`), the Kubernetes cluster needs access to your local Docker registry. If using Minikube or K3d, you might need to load the image into the cluster first (e.g., `minikube image load meme-generator:latest` or `k3d image import meme-generator:latest`).

### 6. How to Configure Jenkins
1. Install Jenkins and ensure it has access to the Docker daemon. (If running Jenkins inside Docker, it needs the docker socket mounted).
2. Create a new "Pipeline" job.
3. In the Pipeline section, choose "Pipeline script from SCM" (if pushing to Git) OR just copy the contents of `jenkins/Jenkinsfile` into the pipeline script block.
4. Run the build. The pipeline will:
   - Checkout code
   - Build the Docker image locally
   - Run the Docker container

---

## DevOps Workflow

```text
Meme Generator
      ↓
HTML/CSS/JavaScript
      ↓
Docker Image (Built via Dockerfile)
      ↓
Jenkins Build (Automated Pipeline)
      ↓
Ansible Asset Configuration (Permissions)
      ↓
Terraform (Infrastructure as Code)
      ↓
K3s/Kubernetes (Deployment)
      ↓
Meme Generator Application
```

---

## Viva Explanation (For College Practical Demo)

**What is Docker?**
Docker is a tool that packages applications and their dependencies into a standardized unit called a container.
**Why Docker is used here?**
We use Docker to package our Nginx web server and static HTML/CSS/JS files together so it runs exactly the same on any computer.

**What is Terraform?**
Terraform is an Infrastructure as Code (IaC) tool used to create, update, and manage infrastructure securely and consistently.
**Why Terraform is used?**
Instead of manually clicking around or running multiple commands to create Kubernetes Deployments and Services, we wrote a `main.tf` file that Terraform uses to automatically set up our app in the cluster.

**What is Ansible?**
Ansible is an IT automation tool that configures systems, deploys software, and orchestrates more advanced IT tasks.
**Why Ansible is used?**
We used Ansible here to automate the process of setting the correct folder and file permissions on our `assets/` directory, ensuring the web server can always read the images.

**What is Jenkins?**
Jenkins is an open-source automation server used for Continuous Integration and Continuous Deployment (CI/CD).
**Why Jenkins is used?**
We used Jenkins to automate our workflow. When triggered, Jenkins automatically builds our Docker image and runs the container using the steps defined in the `Jenkinsfile`.

**What is K3s?**
K3s is a highly available, certified Kubernetes distribution designed for production workloads in unattended, resource-constrained, remote locations or local testing.
**How all four technologies work together?**
1. **Jenkins** acts as the brain, triggering the build process.
2. It uses **Docker** to package our static website.
3. **Ansible** ensures the local files have correct configurations/permissions before deployment.
4. **Terraform** takes that built application and deploys it cleanly into a **K3s/Kubernetes** cluster.
