import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

import S3Singleton from './s3';

export async function getConversations() {
  const s3 = await S3Singleton.getInstance();

  const { Body } = await s3.send(
    new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET!,
      Key: 'conversations.json',
    }),
  );

  if (!Body) {
    return [];
  }

  const data = await Body.transformToString();

  return JSON.parse(data) || [];
}

export async function writeConversations(content: string) {
  const s3 = await S3Singleton.getInstance();

  return await s3.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET!,
      Key: 'conversations.json',
      Body: content,
    }),
  );
}
