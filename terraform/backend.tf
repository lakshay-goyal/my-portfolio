terraform {
  backend "s3" {
    bucket       = "portfolio-tf-state-582935480776"
    key          = "portfolio/prod.tfstate"
    region       = "ap-south-1"
    use_lockfile = true
  }
}
