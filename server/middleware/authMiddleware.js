
module.exports = {
    usersOnly: (req,res,next) => {
        if(!req.session.user){
            res.status(401).send('please log in')
        } 
        next()
    }
}