import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { z } from 'zod';

// TODO: should figure out how to validate for 'empty' file
// right now just checking file type and allowing 'application/octet-stream' type
// which happens to be default type of file input value when 'empty'

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
  const formData = await request.formData();
  const MAX_FILE_SIZE = 3000 * 1000; // max nMegabytes = max nBytes * nKilobytes
  const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/octet-stream'];

  const schema = z.object({
    file: z.any()
      .refine((file) => file?.size <= MAX_FILE_SIZE, 'Max file size is 3MB.')
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), '.jpg, .jpeg, .png are accepted.').optional().nullable(),
    firstName: z.string().min(1).nullable(),
    lastName: z.string().min(1).nullable(),
    email: z.string().email().optional().nullable(),
  })

  const userMail = (typeof (formData.get('email')) === 'string' && !formData.get('email')) ? undefined : formData.get('email'); // otherwise, zod validation 
  // throws error for invalid email as it doesn't consider empty string ('') 
  // to be undefined, so doesn't pass optional() method

  const parse = schema.safeParse({
    file: formData.get('file'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: userMail,
  })

  if (!parse.success) {
    const formatted = parse.error.format();
    console.error(formatted)
    const nextProfileInfo = {
      firstName: { value: formData.get('firstName'), errors: formatted.firstName?._errors || '' },
      lastName: { value: formData.get('lastName'), errors: formatted.lastName?._errors || '' },
      email: { value: formData.get('email'), errors: formatted.email?._errors || '' },
      profilePicUrl: { value: '', errors: formatted.file?._errors || '' },
    }
    return Response.json(nextProfileInfo);
  }

  const data = parse.data;
  let imageUrl = '';

  if (data.file && data.file.size > 1000) {
    const file = formData.get('file');
    const userId = Date.now(); // setting this user id temporarily
    const objectKey = `${userId}/${data.file.name || 'untitled'}`;
    const urlStr = `${process.env.CLOUDFLARE_IMAGE_BASE_PATH}/${objectKey}`;
    const url = new URL(urlStr);
    imageUrl = url.href;

    const cmd = new PutObjectCommand({
      Bucket: CLOUDFLARE_R2_BUCKET_NAME,
      Key: objectKey,
      ContentLength: data.file.size,
      ContentType: data.file.type,
    })

    try {
      const preSignedUrl = await getSignedUrl(S3, cmd, { expiresIn: 5200 });
      const response = await fetch(preSignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': data.file.type,
        },
        body: file,
      })
      if (!response.ok) {
        console.log(`status: ${response.status}, message: Failed to fetch Image API`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const nextProfileInfo = {
    firstName: { value: data.firstName, errors: '' },
    lastName: { value: data.lastName, errors: '' },
    email: { value: data.email || '', errors: '' },
    profilePicUrl: { value: imageUrl, errors: '' },
  }

  return Response.json(nextProfileInfo)
}