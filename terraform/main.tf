terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

# Configure primary provider (Mumbai region ap-south-1 by default)
provider "aws" {
  region = var.aws_region
}

# Configure secondary provider for us-east-1 (required for CloudFront ACM certificate)
provider "aws" {
  alias  = "us-east-1"
  region = "us-east-1"
}

# ----------------------------------------------------
# 1. S3 Bucket for Static Website
# ----------------------------------------------------
resource "aws_s3_bucket" "portfolio_bucket" {
  bucket        = "${var.domain_name}-static-website"
  force_destroy = true
}

# Disable public access to S3 (assets served strictly via CloudFront OAC)
resource "aws_s3_bucket_public_access_block" "portfolio_bucket_acl" {
  bucket = aws_s3_bucket.portfolio_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# S3 Bucket Policy to allow access only from CloudFront OAC
resource "aws_s3_bucket_policy" "portfolio_bucket_policy" {
  bucket = aws_s3_bucket.portfolio_bucket.id
  policy = data.aws_iam_policy_document.s3_policy.json
}

data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.portfolio_bucket.arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.cdn.arn]
    }
  }
}



# ----------------------------------------------------
# 2. ACM Certificate for Custom Domain (must live in us-east-1 for CloudFront)
# ----------------------------------------------------
resource "aws_acm_certificate" "cert" {
  provider                  = aws.us-east-1
  domain_name               = var.domain_name
  subject_alternative_names = ["www.${var.domain_name}"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# Waits until the certificate is ISSUED. DNS validation CNAME records are
# managed in Hostinger (the domain registrar), not in Route53, so they must
# exist in the Hostinger DNS zone before this resource can complete.
resource "aws_acm_certificate_validation" "cert" {
  provider        = aws.us-east-1
  certificate_arn = aws_acm_certificate.cert.arn

  timeouts {
    create = "30m"
  }
}

# ----------------------------------------------------
# 3. CloudFront CDN
# ----------------------------------------------------
resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "${var.domain_name}-oac"
  description                       = "OAC for portfolio S3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "cdn" {
  origin {
    domain_name              = aws_s3_bucket.portfolio_bucket.bucket_regional_domain_name
    origin_id                = "S3-${aws_s3_bucket.portfolio_bucket.id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = [var.domain_name, "www.${var.domain_name}"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.portfolio_bucket.id}"

    forwarded_values {
      query_string = false
      headers      = ["Origin"]

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  # Custom error response to rewrite sub-paths back to index.html (supports client-side routing)
  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 10
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 10
  }

  price_class = "PriceClass_100" # Class 100 uses US, Canada, Europe, and Asia (lowest cost)

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.cert.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}



