import multer from 'multer';
import path from 'path';

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req:any, file:any, cb: any) => {
    cb(null, 'uploads/'); // Define the destination folder
  },
  filename: (req:any, file:any, cb:any) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter to allow only certain file types
const fileFilter = (req: any, file: any, cb: any) => {
  const filetypes = /jpeg|jpg|png/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb('Error: File upload only supports the following filetypes - ' + filetypes);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // 5 MB limit
});

export default upload;
