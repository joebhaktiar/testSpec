
TWEBucket:
Type: AWS:: S3:: Bucket
Properties:
BucketName: ${ self: custom.settings.${ self: custom.myStage }.FRONTEND_BUCKET }
TWEBucketAllowPublicReadPolicy:
Type: AWS:: S3:: BucketPolicy
Properties:
Bucket:
Ref: TWEBucket
PolicyDocument:
Version: '2012-10-17'
Statement:
- Effect: Allow
Action:
- 's3:GetObject'
Resource: ${ self: custom.settings.${ self: custom.myStage }.RESOURCE }
Principal: '*'