output "s3_bucket_name" {
  description = "The name of the S3 bucket created for static hosting"
  value       = aws_s3_bucket.portfolio_bucket.id
}

output "cloudfront_domain_name" {
  description = "The domain name of the CloudFront distribution"
  value       = aws_cloudfront_distribution.cdn.domain_name
}

output "website_url" {
  description = "The website URL for the deployed portfolio"
  value       = "https://${var.domain_name}"
}

output "acm_validation_records" {
  description = "DNS CNAME records that must exist in the Hostinger DNS zone to validate the ACM certificate"
  value = [
    for dvo in aws_acm_certificate.cert.domain_validation_options : {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  ]
}

output "cloudfront_distribution_id" {
  description = "The ID of the CloudFront distribution"
  value       = aws_cloudfront_distribution.cdn.id
}
