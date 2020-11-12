const express=require('express');
const router=express.Router();
const checkAuth=require("../Utils/checkAuth")
const myfunc=require("../Utils/impFunc")
const myModel=require("../Model/userModel")
router.get("/data",async (req,res)=>{
    //var obj=await myfunc.findList(req.user._id);
    var obj=await req.user;
    res.render("main",{List: obj.appointments})
})


router.get("/add",checkAuth.checkAuthenticate,(req,res)=>{
    res.render("add");
})

router.post("/add",checkAuth.checkAuthenticate,async (req,res)=>{
  ///console.log(req.body);

  var id=await req.user;
  
  myModel.findById(id._id,function(err,obj){
         if(err)
         {
            console.log(err);
         }
         else if(obj){
             myobj={
                 ...req.body,
                 uniqueID: Date.now()
                }
              obj.appointments.push(myobj);
              obj.save()
              .then(()=>res.redirect("/reservation/add"))
              .catch((err)=>console.log(err));
         }
  })
})

module.exports=router;