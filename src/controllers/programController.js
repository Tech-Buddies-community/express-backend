import asyncHandler from "../middleware/asyncMiddleware.js";
import Program from "../models/programModel.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

export const createProgram = asyncHandler(async(req, res) => {
    try {
        const createProgram = await Program.create(req.body);

        res.status(200).json({
            message: 'Success add program!',
            data: createProgram
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
});

export const getAllProgram = asyncHandler(async(req, res) => {
    const queryOjb = { ...req.query };

    // function for mengabaikan jika ada req page dan limit
    const excludeField = ['page', 'limit', 'name'];
    excludeField.forEach((element) => delete queryOjb[element]);

    let query;

    if (req.query.name) {
        query = Program.find({
            name: {$regex: req.query.name, $options: 'i'}
        })
    } else {
        query = Program.find(queryOjb)
    }

    query = query.sort({ date: 1 });

    // Pagination
    const page = req.query.page * 1 || 1
    const limitData = req.query.limit * 1 || 8
    const skipData = (page -1 ) * limitData

    query = query.skip(skipData).limit(limitData);

    let countProgram = await Program.countDocuments(queryOjb)
    if (req.query.page) {
        if (skipData >= countProgram) {
            res.status(404)
            throw new Error('This page doest exist')
        }
    }

    const data = await query
    const totalPage = Math.ceil(countProgram / limitData)

    return res.status(200).json({
        message: 'Success get all program!',
        data,
        pagination: {
            totalPage,
            page,
            totalProgram: countProgram
        }
    })
});

export const getDetailProgram = asyncHandler(async(req, res) => {
    try {
        const paramsId = req.params.id
        const programDataId = await Program.findById(paramsId)

        if (!programDataId) {
            res.status(404)
            throw new Error('Data not found!')
        }

        return res.status(200).json({
            message: 'Success get detail program!',
            data: programDataId
        })
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
});

export const updateProgram = asyncHandler(async(req, res) => {
    try {
        const paramsId = req.params.id
        const updateProgramId = await Program.findByIdAndUpdate(paramsId, 
            req.body, {
                runValidators: false,
                new: true
            })

        return res.status(201).json({
            message: 'Success update program!',
            data: updateProgramId
        })
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
});

export const deleteProgram = asyncHandler(async(req, res) => {
    try {
        const paramsId = req.params.id;
        await Program.findByIdAndDelete(paramsId);

        return res.status(200).json({
            message: 'Success delete program!',
        })
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
});

export const fileUpload = asyncHandler( async(req, res) => {
    const stream = cloudinary.uploader.upload_stream({
        folder: 'techbuddies/program',
        allowed_formats: ['jpg', 'jpeg', 'png']
    }, 
    function(err, result){
        if (err) {
            console.log(err)
            return res.status(500).json({ message: 'Failed upload image!', error: err })
        }

        res.json({ message: 'Success upload image!', url: result.secure_url })
    })

    streamifier.createReadStream(req.file.buffer).pipe(stream)
})