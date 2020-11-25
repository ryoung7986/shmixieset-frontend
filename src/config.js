
export const config = {
  bucketName: 'shmixieset-gallery-images',
  dirName: '', /* optional */
  region: 'us-east-1',
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
}

/*  Notice that if you don't provide a dirName, the file will be automatically uploaded to the root of your bucket */
