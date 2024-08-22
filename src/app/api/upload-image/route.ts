import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

const {
  CLOUDFLARE_ACCOUNT_ID,
  CLOUDFLARE_ACCESS_ID,
  CLOUDFLARE_ACCESS_KEY,
  CLOUDFLARE_R2_BUCKET_NAME,
} = process.env;

const S3 = new S3Client({
  region: 'auto',
  endpoint: `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: CLOUDFLARE_ACCESS_ID || '',
    secretAccessKey: CLOUDFLARE_ACCESS_KEY || '',
  }
})

export async function POST(request: Request) {
  const blob = await request.blob();
  const MAX_FILE_SIZE = 3000 * 1000; // max nMegabytes = max nBytes * nKilobytes
  const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

  const blobSchema = z.any().refine((file) => file?.size <= MAX_FILE_SIZE, 'Max file size is 3MB.').refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), '.jpg, .jpeg, .png are accepted.').optional().nullable();

  const parse = blobSchema.safeParse(blob)

  if (!parse.success) {
    const formatted = parse.error.format();
    return Response.json({ profilePicUrl: { value: '', errors: formatted._errors } });
  }

  const data = parse.data;
  let imageUrl = '';

  if (data && data.size > 1000) {
    const userId = Date.now(); // setting this user id temporarily
    const imgId = uuidv4();
    const objectKey = `${userId}/${imgId}`;
    imageUrl = `${process.env.CLOUDFLARE_IMAGE_BASE_PATH}/${objectKey}`;

    const cmd = new PutObjectCommand({
      Bucket: CLOUDFLARE_R2_BUCKET_NAME,
      Key: objectKey,
      ContentLength: data.size,
      ContentType: data.type,
    })

    try {
      const preSignedUrl = await getSignedUrl(S3, cmd, { expiresIn: 5200 });
      const response = await fetch(preSignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': data.type,
        },
        body: data,
      })
      if (!response.ok) {
        console.log(`status: ${response.status}, message: Failed to fetch Image API`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return Response.json({ value: imageUrl, errors: [''] })
}