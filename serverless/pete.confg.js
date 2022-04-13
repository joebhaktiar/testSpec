TWEBucket:
Type: AWS:: S3:: Bucket
Properties:
BucketName: ${ self: custom.settings.${ self: custom.myStage }.FRONTEND_BUCKET }
PublicAccessBlockConfiguration:
BlockPublicAcls: true
BlockPublicPolicy: true
IgnorePublicAcls: true
RestrictPublicBuckets: true