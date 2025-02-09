import { z } from 'zod';

export const uploadImageToGallerySchema = z.object({
  body: z.object({
    folder: z.string({
      required_error: 'Folder is required',
      invalid_type_error: 'Folder must be a string',
    }),
  }),
});

export const deleteImageFromGallerySchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'Image ID is required',
    }),
    public_id: z.string({
      required_error: 'Public ID is required',
    }),
  }),
});

export const createFolderSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Folder name is required',
      invalid_type_error: 'Folder name must be a string',
    }),
  }),
});



export const compressImageSchema = z.object({
  body:z.object({
    files: z
    .array(
      z.object({
        mimetype: z.string().regex(/^image\/(jpeg|jpg|png|gif)$/), // Accepts only image files (jpeg, jpg, png, gif)
        size: z.number().max(5 * 1024 * 1024, 'File size should not exceed 5MB'), // Max file size 5MB
      })
    )
    .min(1, 'At least one image is required'), // Ensure at least one image is uploaded
  })
});
