import { Request, Response, NextFunction } from 'express';

export const validateFileUpload = (req: Request, res: Response, next: NextFunction) => {
  if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
    return res.status(400).json({
      success: false,
      message: 'At least one image is required',
    });
  }

  // If files exist, manually add them to req.body for Zod validation
  req.body.files = req.files;

  next();
};
