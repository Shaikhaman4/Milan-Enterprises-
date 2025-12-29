import multer from 'multer';
export declare const uploadProductImage: multer.Multer;
export declare const uploadCategoryImage: multer.Multer;
export declare const getFileUrl: (filename: string, type?: "products" | "categories") => string;
export declare const deleteFile: (filePath: string) => Promise<void>;
export declare const getFilenameFromUrl: (url: string) => string;
export declare const getFilePathFromUrl: (url: string) => string;
//# sourceMappingURL=upload.d.ts.map