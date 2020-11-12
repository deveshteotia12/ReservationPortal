module.exports={
    checkAuthenticate: (req,res,next)=>{
        if(req.isAuthenticated())
        {
            return next()
        }
        res.redirect("/")
    },
    checkNotAuthenticate: (req,res,next)=>{
        if(req.isAuthenticated())
        {
            return res.redirect("/reservation/data")
        }
        next()
    }
}