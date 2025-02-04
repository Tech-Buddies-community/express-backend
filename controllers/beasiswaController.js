import asyncHandler from "../middleware/asyncMiddleware.js";
import Beasiswa from "../models/beasiswaModel.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

export const createBeasiswa = asyncHandler(async(req, res) => {
    try {
        const createEvent = await Beasiswa.create(req.body);

        res.status(200).json({
            message: 'Success add event!',
            data: createEvent
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
});

export const getAllBeasiswa = asyncHandler(async(req, res) => {
    const queryOjb = { ...req.query };

    // function for mengabaikan jika ada req page dan limit
    const excludeField = ['page', 'limit', 'name'];
    excludeField.forEach((element) => delete queryOjb[element]);

    let query;

    if (req.query.name) {
        query = Beasiswa.find({
            name: {$regex: req.query.name, $options: 'i'}
        })
    } else {
        query = Beasiswa.find(queryOjb)
    }

    // Pagination
    const page = req.query.page * 1 || 1
    const limitData = req.query.limit * 1 || 8
    const skipData = (page -1 ) * limitData

    query = query.skip(skipData).limit(limitData);

    let countBeasiswa = await Beasiswa.countDocuments(queryOjb)
    if (req.query.page) {
        if (skipData >= countProduct) {
            res.status(404)
            throw new Error('This page doest exist')
        }
    }

    const data = await query
    const totalPage = Math.ceil(countBeasiswa / limitData)

    return res.status(200).json({
        message: 'Success get all event!',
        data,
        pagination: {
            totalPage,
            page,
            totalBeasiswa: countBeasiswa
        }
    })
});

export const getDetailBeasiswa = asyncHandler(async(req, res) => {
    try {
        const paramsId = req.params.id
        const beasiswaDataId = await Beasiswa.findById(paramsId)

        if (!beasiswaDataId) {
            res.status(404)
            throw new Error('Data not found!')
        }

        return res.status(200).json({
            message: 'Success get detail beasiswa!',
            data: beasiswaDataId
        })
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
});

export const updateBeasiswa = asyncHandler(async(req, res) => {
    try {
        const paramsId = req.params.id
        const updateBeasiswaId = await Beasiswa.findByIdAndUpdate(paramsId, 
            req.body, {
                runValidators: false,
                new: true
            })

        return res.status(201).json({
            message: 'Success update beasiswa!',
            data: updateBeasiswaId
        })
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
});

export const deleteBeasiswa = asyncHandler(async(req, res) => {
    try {
        const paramsId = req.params.id;
        await Beasiswa.findByIdAndDelete(paramsId);

        return res.status(200).json({
            message: 'Success delete beasiswa!',
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
        folder: 'techbuddies/beasiswa',
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