import express from "express";
import { createJob, deleteJob, getAllJob, getDetailJob, updateJob } from "../controllers/jobController.js";

const router = express.Router();

// post /api/v1/job/add
router.post('/add', createJob);

// get /api/v1/job
router.get('/', getAllJob);

// get /api/v1/job/:id
router.get('/:id', getDetailJob);

// put /api/v1/job/:id
router.put('/:id', updateJob);

// delete /api/v1/job/:id
router.delete('/delete/:id', deleteJob);

export default router;