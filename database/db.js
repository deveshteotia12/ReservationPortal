var mongoose=require('mongoose');

//
const connection= async ()=>{
    try {
      const conn= await mongoose.connect('mongodb+srv://admin-devesh:Ravindra1@cluster0.dusi7.mongodb.net/Intern?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
      } 
      catch (error) {
        console.log(error);
      }
}
module.exports= connection;