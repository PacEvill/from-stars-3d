import fs from 'node:fs';
import path from 'node:path';

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;

async function uploadToCloudinary(fileBuffer: Buffer, fileName: string) {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error('Cloudinary not configured');
  }

  const form = new FormData();
  const base64 = fileBuffer.toString('base64');
  form.append('file', `data:application/octet-stream;base64,${base64}`);
  form.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`, {
    method: 'POST',
    body: form as any,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cloudinary upload failed: ${res.status} ${text}`);
  }

  const json = await res.json();
  return json.secure_url as string;
}

export async function saveFile(buffer: Buffer, fileName: string) {
  // Prefer Cloudinary when configured
  try {
    if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET) {
      return await uploadToCloudinary(buffer, fileName);
    }
  } catch (err) {
    console.error('Cloudinary upload failed, falling back to local storage:', err);
  }

  // Fallback: save to public/uploads
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  await fs.promises.mkdir(uploadDir, { recursive: true });
  const filePath = path.join(uploadDir, fileName);
  await fs.promises.writeFile(filePath, buffer);
  return `/uploads/${fileName}`;
}

export default { saveFile };
