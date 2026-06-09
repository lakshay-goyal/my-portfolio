variable "aws_region" {
  description = "The primary AWS region to deploy resources"
  type        = string
  default     = "ap-south-1"
}

variable "domain_name" {
  description = "The domain name for the portfolio application"
  type        = string
  default     = "lakshaygoyal.in"
}
