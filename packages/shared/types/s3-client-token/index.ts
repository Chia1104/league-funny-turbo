export type S3ClientToken = {
  $metadata: {
    httpStatusCode: number;
    requestId: string;
    attempts: number;
    totalRetryDelay: number;
  };
  Credentials: {
    AccessKeyId: string;
    SecretAccessKey: string;
    SessionToken: string;
    Expiration: Date | string;
  };
  FederatedUser: {
    FederatedUserId: string;
    Arn: string;
  };
  PackedPolicySize: number;
};
