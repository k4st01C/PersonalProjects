const mongoose = require('mongoose');
const Post = require('./models/post.js');
const User = require('./models/user.js');

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User.create({
//   name:'kemal',
//   email:'kemal@gmail.com'
// });

// Post.create(
//   {
//     title: 'aa',
//     content: 'bb',
//   },
//   (err, post) => {
//     if (err) console.log(err);
//     else {
//       User.findOne({ name: 'kemal' }, (err, foundUser) => {
//         if (err) console.log(err);
//         else {
//           foundUser.posts.push(post);
//           foundUser.save((err, user) => {
//             if (err) console.log(err);
//             else {
//               console.log(user);
//             }
//           });
//         }
//       });
//     }
//   },
// );

User.findOne({ name: 'kemal' })
  .populate('posts')
  .exec((err, user) => {
    if (err) console.log(err);
    else console.log(user);
  });


