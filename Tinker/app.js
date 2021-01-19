const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
  }),
  Post = mongoose.model('Post', postSchema),
  userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [postSchema],
  }),
  User = mongoose.model('User', userSchema);

//   const newUser=new User({
//       name:'Kemal',
//       email:'kemal@gmail.com',
//   });

//   newUser.posts.push({
//     title:'naber',
//     content:'iyidir',
//   });

// newUser.save((err,user)=>{
//   if (err) console.log(err);
//   else {console.log(user);}
// })

User.findOne({ name: 'Kemal' }, (err, user) => {
  if (err) {
    console.log(err);
  } else {
    user.posts.push({
      title: 'aq',
      content: 'senin',
    });
    user.save((err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
      }
    });
  }
});
