import mongoose from "mongoose"
const companySchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "company name is required"]
    },

    position: {
        type: String,
        required: [true, " position is required"],
        minilength: 100
    },
    status: {
        type: String,
        enum: ["pending", "reject", "interview"],
        default: "pending"
    },
    workType: {
        type: String,
        enum: ["full-time", "part-time", "intership", "contract"],
        default: "full-time"
    },
    workLocation: {
        type: String,
        default: "mumbai",
        required: [true, " location is required"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true })

 const companymodel= mongoose.model( "companymodel", companySchema)
 export default companymodel