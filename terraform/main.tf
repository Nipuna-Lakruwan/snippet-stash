# 1. Define the Provider (AWS)
provider "aws" {
  region = "us-east-1"  # Virginia (Standard region)
}

# 2. Create a Security Group (Firewall)
# This acts like a bouncer. It only allows traffic we approve.
resource "aws_security_group" "snippet_sg" {
  name        = "snippet_security_group"
  description = "Allow Web and SSH traffic"

  # Allow SSH (to log in)
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allowed from anywhere (For learning only)
  }

  # Allow HTTP (for the website)
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow traffic from our custom backend port
  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  # Allow traffic from our custom frontend port
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow all outgoing traffic (so the server can download updates)
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 3. Create the Server (EC2 Instance)
resource "aws_instance" "snippet_server" {
  ami           = "ami-04b70fa74e45c3917"  # Ubuntu 24.04 LTS Image ID (us-east-1)
  instance_type = "t3.micro"              # Free Tier eligible hardware
  key_name      = "snippet-key"           # We will create this key next!
  security_groups = [aws_security_group.snippet_sg.name]

  tags = {
    Name = "SnippetStash-Production"
  }
}

# 4. Output the IP Address
# After it builds, print the IP so we know where to connect
output "server_ip" {
  value = aws_instance.snippet_server.public_ip
}