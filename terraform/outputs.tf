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
  value       = "https://${aws_cloudfront_distribution.cdn.domain_name}"
}
