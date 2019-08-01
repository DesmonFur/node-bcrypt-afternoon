
module.exports = {
    usersOnly: (req,res,next) => {
        if(!req.session.user){
            res.status(401).send('please log in')
        } 
        next()
    },

    adminsOnly: (req,res,next) => {
        if(req.body.isAdmin === false){
               return  res.status(403).send('YOu are not an ADMIN GET OUT')
        }
        next()
    }
}