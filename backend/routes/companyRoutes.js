import express from "express"
import { deletecontoller, getjobcontroller, jobcontroller, jobStatscontroller, updatecompanycontroller } from "../controller/companycontroller.js"
import userAuth from "../middleware/Authmiddlewar.js";
const companyRoute = express.Router()
/** 
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       required:
 *         - company
 *         - position
 *         - workLocation
 *       properties:
 *         company:
 *           type: string
 *           description: Company name
 *           example: Google
 *
 *         position:
 *           type: string
 *           description: Job position
 *           example: Frontend Developer
 *
 *         status:
 *           type: string
 *           description: Job application status
 *           enum:
 *             - pending
 *             - reject
 *             - interview
 *           example: pending
 *
 *         workType:
 *           type: string
 *           description: Type of job
 *           enum:
 *             - full-time
 *             - part-time
 *             - intership
 *             - contract
 *           example: full-time
 *
 *         workLocation:
 *           type: string
 *           description: Job location
 *           example: Mumbai
 *
 *         createdBy:
 *           type: string
 *           description: User ID who created the job
 *           example: 64f1c2e9a1234567890abcd1
 *
 *       example:
 *         company: Google
 *         position: Backend Developer
 *         status: pending
 *         workType: full-time
 *         workLocation: Mumbai
 *         createdBy: 64f1c2e9a1234567890abcd1
 */


companyRoute.post("/company", userAuth, jobcontroller)
companyRoute.get("/getcompany", userAuth, getjobcontroller)
companyRoute.patch("/getcompany/:id", userAuth, updatecompanycontroller)
companyRoute.delete("/deletecompany/:id", userAuth, deletecontoller)
companyRoute.get("/Stats", userAuth, jobStatscontroller)





export default companyRoute;
