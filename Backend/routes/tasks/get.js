const Task = require('../../models/Task');

module.exports = {
    getById : (req,res,next) => {

        Task.findById(req.params.id)
            .then(tasks=>{
                res.json({
                    status:{
                        message:"successful",
                        code:200
                    },
                    data:tasks,
                });
            })
            .catch(e => {
                res.status(500).json({
                    status:{
                        message:e.message,
                        code:500
                    }
                });
            })
    },


    getAll : (req,res,next) => {
        Task.find()
            .then(tasks=>{
                res.json({
                    status:{
                        message:"successful",
                        code:200
                    },
                    data:tasks,
                });
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