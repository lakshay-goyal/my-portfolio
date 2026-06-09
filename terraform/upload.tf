locals {
  mime_types = {
    "html" = "text/html"
    "css"  = "text/css"
    "js"   = "application/javascript"
    "png"  = "image/png"
    "jpg"  = "image/jpeg"
    "jpeg" = "image/jpeg"
    "svg"  = "image/svg+xml"
    "json" = "application/json"
    "ico"  = "image/x-icon"
    "txt"  = "text/plain"
    "webp" = "image/webp"
    "pdf"  = "application/pdf"
    "mp4"  = "video/mp4"
    "md"   = "text/markdown"
    "map"  = "application/json"
  }
}

resource "aws_s3_object" "portfolio_files" {
  for_each = {
    for f in fileset("${path.module}/../dist", "**") : f => f
    if !endswith(f, ".DS_Store")
  }

  bucket       = aws_s3_bucket.portfolio_bucket.id
  key          = each.value
  source       = "${path.module}/../dist/${each.value}"
  content_type = lookup(local.mime_types, element(split(".", each.value), length(split(".", each.value)) - 1), "binary/octet-stream")
  etag         = filemd5("${path.module}/../dist/${each.value}")
}
