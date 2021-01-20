const Post= 
userSchema= new mongoose.Schema({
    name:String,
    email:String,
    posts:[postSchema]
})

module.exports=mongoose.model('User',userSchema)