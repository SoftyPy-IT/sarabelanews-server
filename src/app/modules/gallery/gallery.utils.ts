const supportedMimeTypes = ['image/jpg', 'image/avif','image/webp','image/png', 'image/jpeg']; // Removed 'image/jpg'

export const imageValidator = (size: number, mime: string): string | null => {
  if (bytesToMB(size) > 10) {
    return 'Image size should be less than 10MB';
  }

  if (!supportedMimeTypes.includes(mime)) {
    return 'Image type not supported! Please upload a png or jpeg image';
  }

  return null;
};

export const bytesToMB = (bytes: number): number => {
  return bytes / (1024 * 1024);
};
