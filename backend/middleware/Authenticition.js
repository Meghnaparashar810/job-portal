const middleware = async(err ,req ,res , next)=>{
    console.log(err);
   return res.status(500).json({
    message:" middlewar error",
    success : false,
    err
   })
}
export default middleware ;