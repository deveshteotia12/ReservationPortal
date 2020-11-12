var express=require("express");
const router = express.Router();
const checkAuth=require("../Utils/checkAuth")
const myfunc=require("../Utils/impFunc")
const myModel=require("../Model/userModel")

router.post("/search",async (req,res)=>{
    
    const User=await req.user;
   myModel.findById(User._id,function(err,obj)
   {
       if(err)
       {
           console.log(err);
       }
       else if(obj)
       {
            var temp=obj.appointments.filter((item)=>{
                return item.name===req.body.filterItem
           })
          res.render('main',{List: temp});
       }
   })
})

router.post("/delete",async (req,res)=>{
    const User=await req.user;
    myModel.findById(User._id,function(err,obj)
    {
        if(err)
        {
            console.log(err);
        }
        else if(obj)
        {
                obj.appointments=obj.appointments.filter((item)=>{
                 return item.uniqueID!=req.body.uniqueID
               })
               obj.save()
               .then(()=>res.redirect("/reservation/data"))
               .catch((err)=>console.log(err))
        }
    })
})

router.get("/:obj",checkAuth.checkAuthenticate,async (req,res)=>{
    const User=await req.user;
    myModel.findById(User._id,function(err,obj)
    {
        if(err)
        {
            console.log(err);
        }
        else if(obj)
        {
                var temp=obj.appointments.filter((item)=>{
                 return item.uniqueID==req.params.obj
               })
               res.render('edit',{Name: temp[0].name,Description: temp[0].Description,Time: temp[0].time,Address: temp[0].address,uniqueID: req.params.obj})
        }
    })
})
router.post("/:obj",async (req,res)=>{

    const User= await req.user;
    myModel.findById(User._id,function(err,obj)
    {
        if(err)
        {
            console.log(err);
        }
        else if(obj)
        {
            obj.appointments=obj.appointments.map((item)=>{
                 if(item.uniqueID==req.params.obj)
                 {
                     return {
                         ...req.body,
                         uniqueID: item.uniqueID
                     };
                 }else{
                        return item;
                 }
               })
               obj.save()
               .then(()=>res.redirect("/reservation/data"))
               .catch((err)=>console.log(err))

        }
    })
})



module.exports=router;