import asyncHandler from "../middleware/asyncMiddleware.js";
import Job from "../models/jobModel.js";

export const createJob = asyncHandler( async(req, res) => {
    try {
        const createJob = await Job.create(req.body);

        res.status(200).json({
            message: 'Success add job!',
            data: createJob
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
});

export const getAllJob = asyncHandler( async(req, res) => {
    const queryOjb = { ...req.query };

    // function for mengabaikan jika ada req page dan limit
    const excludeField = ['page', 'limit', 'name'];
    excludeField.forEach((element) => delete queryOjb[element]);

    let query;

    if (req.query.name) {
        query = Job.find({
            name: {$regex: req.query.name, $options: 'i'}
        })
    } else {
        query = Job.find(queryOjb)
    }

    // Pagination
    const page = req.query.page * 1 || 1
    const limitData = req.query.limit * 1 || 8
    const skipData = (page -1 ) * limitData

    query = query.skip(skipData).limit(limitData);

    let countJob = await Job.countDocuments(queryOjb)
    if (req.query.page) {
        if (skipData >= countJob) {
            res.status(404)
            throw new Error('This page doest exist')
        }
    }

    const data = await query
    const totalPage = Math.ceil(countJob / limitData)

    return res.status(200).json({
        message: 'Success get all job!',
        data,
        pagination: {
            totalPage,
            page,
            totalJob: countJob
        }
    })
});

export const getDetailJob = asyncHandler( async(req, res) => {
    try {
        const paramsId = req.params.id
        const jobDataId = await Job.findById(paramsId)

        if (!jobDataId) {
            res.status(404)
            throw new Error('Data not found!')
        }

        return res.status(200).json({
            message: 'Success get detail job!',
            data: jobDataId
        })
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
});

export const updateJob = asyncHandler( async(req, res) => {
    try {
        const paramsId = req.params.id
        const updateJobId = await Job.findByIdAndUpdate(paramsId, 
            req.body, {
                runValidators: false,
                new: true
            })

        return res.status(201).json({
            message: 'Success update job!',
            data: updateJobId
        })
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
});

export const deleteJob = asyncHandler( async(req, res) => {
    try {
        const paramsId = req.params.id;
        await Job.findByIdAndDelete(paramsId);

        return res.status(200).json({
            message: 'Success delete job!',
        })
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
});