# Notes
- using JSON format for target
- getting something from an s3 bucket needs authorization
  - credentials are in the default AWS location unless otherwise defined
    - it's a bad idea to pass auth directly to containers
  - You can access an S3 bucket privately without authentication when you access the bucket from an Amazon Virtual Private Cloud
    - probably not across regions
  - presigned urls can be generated and used to access without auth (final method used)
- docker hub image can be deployed on ECS using docker.io/imagename:tag

# Docker Hub Image
https://hub.docker.com/r/athresher/loader_prototype

# Mockbin link
https://mockbin.org/bin/a953bf53-c692-4114-8a9c-a6c84037414a/log
