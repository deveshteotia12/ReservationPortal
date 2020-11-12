
const userModel=require("../Model/userModel")
const myfunc={
   
    findUserByEmail: async (email)=>{
            var final;
           await userModel.findOne({email: email},function(err,obj){
               if(err)
               {
                   console.log(err);
               }
               else if(obj){
                   final=obj;
               }
    })
    return final;
 }
  ,
    findUserById: async (id)=>{
        var final;
        await userModel.findOne({_id: id},function(err,obj){
            if(err)
            {
                console.log(err)
            }
            else{
                final=obj;
            }
        })
        return final;
    },
    findList: async (id)=>{
        var final;
        await userModel.findById(id,function(err,obj){
            if(err)
            {
                console.log(err);
            }
            else{
                final=obj;
            }
        })
        return final;
    },
    UpdateList: async(id,obj)=>{
        await userModel.findById(id,function(err,obj){
            if(err)
            {
                console.log(err);
            }
            else if(obj){
                
                var temp=obj.appointments;
                temp.push(obj);
                console.log(temp);
                obj.appointments=temp;
                obj.save();
            }
            else{
                console.log("HII")
            }
        })
    }
}
module.exports= myfunc;