import { S3Client } from '@aws-sdk/client-s3';

class S3Singleton {
  static instance: S3Client;

  static async getInstance() {
    if (S3Singleton.instance) {
      return S3Singleton.instance;
    }

    S3Singleton.instance = await S3Singleton.createInstance();

    return S3Singleton.instance;
  }

  static createInstance = async () => {
    return new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  };
}

export default S3Singleton;
