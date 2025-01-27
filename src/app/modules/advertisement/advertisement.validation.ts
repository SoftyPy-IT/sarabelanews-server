import { z } from 'zod';

export const createAdvertisementValidationSchema = z.object({
  body: z.object({
    advertisementImage: z
      .string().optional(),
     
    advertisementLink: z
      .string({ required_error: 'Advertisement link is required.' })
      .trim()
      .url('Advertisement link must be a valid URL.'),
    displayLocation: z
      .string({ required_error: 'Display location is required.' })
      .trim(),
  }),
});

export const updateAdvertisementValidationSchema = z.object({
  body: z.object({
    advertisementImage: z.string().trim().optional(),
    advertisementLink: z
      .string()
      .trim()
      .url('Advertisement link must be a valid URL.')
      .optional(),
    displayLocation: z.string().trim().optional(),
  }),
});

export const advertisementValidations = {
  createAdvertisementValidationSchema,
  updateAdvertisementValidationSchema,
};
