//used to eliminate the repeated try catch block
const asyncWrapper = (fn)=>{
    return async (req,res,next)=>{
        try{
            await fn(req,res,next)
        }
        catch(err){
            next(err)
        }
    }
}
module.exports=asyncWrapper