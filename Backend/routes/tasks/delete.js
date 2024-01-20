const Task = require('../../models/Task');

module.exports = {
    
    deleteTask:  (req,res,next) => {
        Task.deleteOne({_id:req.params.id,  creator:req.userData.userId })
        .then(
            (result) =>{
                console.log(result);
                console.log("result of delete task -->", result);
                if(result.deletedCount>0){
                    res.json({
                        status:{
                            message:"successful in deletion",
                            code:201
                        }
                    });
                }
                else{
                    res.status(401).json({
                        status:{
                            message:"Unsuccessful in deletion -- Auth Failed",
                            code:401
                        }
                    });
                }
            }
        )
        .catch(e => {
            res.status(500).json({
                status:{
                    message:e.message,
                    code:500
                }
            });
        })
    }

    
}