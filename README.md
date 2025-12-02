# SnippetStash: Cloud-Native DevOps Project

**SnippetStash** is a full-stack MERN application designed to demonstrate a complete **DevOps Lifecycle**. It features a containerized architecture, automated CI/CD pipelines, and Infrastructure as Code (IaC) provisioning on AWS.

## Architecture
**Code** (GitHub) -> **CI** (GitHub Actions) -> **Registry** (Docker Hub) -> **CD** (SSH Deploy) -> **Cloud** (AWS EC2)

## Tech Stack
- **Application:** MongoDB, Express.js, React, Node.js (MERN)
- **Containerization:** Docker & Docker Compose
- **Orchestration:** GitHub Actions (CI/CD)
- **Infrastructure:** Terraform (IaC)
- **Cloud Provider:** AWS (EC2, Security Groups, IAM)

## Key Features
- **Fully Containerized:** Backend, Frontend, and Database run in isolated Docker containers.
- **Infrastructure as Code:** Server infrastructure provisioned programmatically using Terraform.
- **Zero-Touch Deployment:** Commits to the `main` branch automatically trigger testing, building, and deployment to the live server.
- **Self-Healing:** Docker Compose policies ensure services restart automatically on failure.

## How to Run Locally

Prerequisites: Docker & Docker Compose installed.

1. **Clone the Repository**
   ```bash
   git clone [https://github.com/Nipuna-Lakruwan/snippet-stash.git](https://github.com/Nipuna-Lakruwan/snippet-stash.git)
   cd snippet-stash
   ```

2.  **Start the Application**

    ```bash
    docker-compose up --build
    ```

3.  **Access the App**

      - Frontend: `http://localhost:3000`
      - Backend API: `http://localhost:5000`

## Deployment Pipeline

This project uses **GitHub Actions** for automation:

1.  **Build Job:** Checks out code, builds Docker images for React/Node.
2.  **Push Job:** Pushes optimized images to Docker Hub.
3.  **Deploy Job:** Connects to the AWS EC2 instance via SSH, pulls the latest images, and performs a zero-downtime update using Docker Compose.

-----

*Built by Nipuna Lakruwan as a showcase of modern DevOps engineering.*
