import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

export const uploadToS3 = async (file: File): Promise<string> => {
  const fileName = `${Date.now()}-${file.name}`;
  const params = {
    Bucket: process.env.REACT_APP_S3_BUCKET || 'furnishare-uploads',
    Key: fileName,
    Body: file,
    ContentType: file.type,
    ACL: 'public-read',
  };

  try {
    const { Location } = await s3.upload(params).promise();
    return Location;
  } catch (error) {
    console.error('S3 upload error:', error);
    throw new Error('Failed to upload image');
  }
}; 