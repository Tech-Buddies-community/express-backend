import express from "express";
import { createBeasiswa, deleteBeasiswa, fileUpload, getAllBeasiswa, getDetailBeasiswa, updateBeasiswa } from "../controllers/beasiswaController.js";
import { upload } from "../utils/uploadFileHandler.js";

const router = express.Router();

// post /api/v1/beasiswa/add
router.post('/add', createBeasiswa);

// get /api/v1/beasiswa
router.get('/', getAllBeasiswa);

// get api/v1/beasiswa/:id
router.get('/:id', getDetailBeasiswa);

// put /api/v1/beasiswa/:id
router.put('/:id', updateBeasiswa);

// delete api/v1/beasiswa/:id
router.delete('/:id', deleteBeasiswa);

// post api/v1/beasiswa/fileupload
router.post('/fileupload', upload.single('poster'), fileUpload);

export default router;