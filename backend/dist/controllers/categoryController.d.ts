import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare const getCategories: (req: Request, res: Response) => Promise<void>;
export declare const getCategoryById: (req: Request, res: Response) => Promise<void>;
export declare const createCategory: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateCategory: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteCategory: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getCategoryProducts: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=categoryController.d.ts.map