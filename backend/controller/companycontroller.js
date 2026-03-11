import companymodel from "../models/companymodel.js"
import mongoose from "mongoose"

export const jobcontroller = async (req, res) => {
    try {
        const { company, position } = req.body
        if (!company || !position) {
            return res.status(400).json({
                message: "all feild is required",
                success: false
            })
        }

        req.body.createdBy = req.user.userId
        const job = await companymodel.create(req.body);
        return res.status(200).json(job)

    } catch (error) {
        console.log(error.message)
    }
}

export const getjobcontroller = async (req, res, next) => {
    //     try {
    //         const job = await companymodel.find({ createdBy: req.user.userId })
    //         return res.status(201).json({
    //             totaljob: job.length,
    //             job
    //         })
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }
    try {

        // query filter
        const { status, workType, search, sort } = req.query
        const queryObject = {}        // logic filter

        if (status && status !== 'all') {
            queryObject.status = status
        }

        if (workType && workType !== 'all') {
            queryObject.workType = workType
        }

        if (search) {
            queryObject.position = { $regex: search, $options: 'i' }
        }
        let queryResult = await companymodel.find(queryObject)
        const job = await queryResult;



        if (sort == "latest") {
            queryResult = queryResult.sort("-createdAt")
        }
        if (sort == "oldest") {
            queryResult = queryResult.sort("createdAt")
        }

        return res.status(201).json({
            totaljob: job.length,
            job
        })

    } catch (error) {

    }

}

export const updatecompanycontroller = async (req, res) => {
    try {
        const { id } = req.params
        const { company, position } = req.body
        if (!company || !position) {
            return res.status(401).json({
                message: "all feild is required",
                success: false
            })
        }

        const job = await companymodel.findOne({ _id: id })
        if (!job) {
            return res.status(401).json({
                message: `no jobs find with this is ${id}`
            })
        }
        if (req.user.userId !== job.createdBy.toString()) {
            return res.status(402).json({
                meesage: " Your not authorized update to this job"
            })
        }

        const updatejob = await companymodel.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        })
        return res.status(200).json(updatejob)
    } catch (error) {
        console.log(error.message)
    }
}

export const deletecontoller = async (req, res) => {
    try {

        const { id } = req.params
        const job = await companymodel.findOne({ _id: id })
        if (!job) {
            return res.status(401).json({
                message: `no job found this is ${id}`
            })
        }
        if (!req.user.userId === job.createdBy.toString()) {
            return res.status(401).json({
                message: "your not authorized delete this job",
                success: false
            })
        }

        await job.deleteOne();
        return res.status(201).json({ message: "success , job deleted" })

    }
    catch (error) {
        console.log(error.message)
    }
}

export const jobStatscontroller = async (req, res) => {
    try {
        const stats = await companymodel.aggregate([
            {
                $match: {
                    createdBy: new mongoose.Types.ObjectId(req.user.userId)
                }
            }
        ])

        return res.status(200).json({ totaljob: stats.length, stats })
    }
    catch (error) {
        console.log(error.meesage)
    }
}