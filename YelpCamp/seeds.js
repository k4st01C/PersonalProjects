const campsite = require('./models/campsite.js');

const mongoose = require('mongoose'),
	Campsite = require('./models/campsite.js'),
	Comment = require('./models/comment.js').default,
	sites = [
		{
			title: 'Ayder',
			img:
				'https://seyahatdergisi.com/wp-content/uploads/2015/01/ayder-yaylasi.jpg',
			article:
				'  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro, atque mollitia exercitationem quia quas, praesentium earum repellat, minus sint laborum eius velit! Modi, corporis? Temporibus eius nulla, sint pariatur voluptates odio iure numquam ullam sit id distinctio possimus incidunt ipsum nisi, provident corrupti nobis? Voluptatibus, qui pariatur. Quaerat recusandae dolorum possimus ab deleniti enim tempore, laudantium corporis illo sunt? Dolorem autem quia voluptate ut quos! Amet maiores delectus neque? In quo culpa eius enim, dolorum et voluptas quasi. Assumenda accusamus dicta facere beatae harum adipisci enim maiores sequi quos velit culpa earum nesciunt, nemo eveniet explicabo deleniti quo numquam possimus!',
		},
		{
			title: 'Datça',
			img:
				'https://www.oscarrentacar.com/dosya/1694/lokasyon/27-turkiye_mugla.jpg',
			article: "Ege'de Cennetten bir köşe",
		},
		{
			title: 'Ayder',
			img:
				'https://seyahatdergisi.com/wp-content/uploads/2015/01/ayder-yaylasi.jpg',
			article:
				'  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro, atque mollitia exercitationem quia quas, praesentium earum repellat, minus sint laborum eius velit! Modi, corporis? Temporibus eius nulla, sint pariatur voluptates odio iure numquam ullam sit id distinctio possimus incidunt ipsum nisi, provident corrupti nobis? Voluptatibus, qui pariatur. Quaerat recusandae dolorum possimus ab deleniti enim tempore, laudantium corporis illo sunt? Dolorem autem quia voluptate ut quos! Amet maiores delectus neque? In quo culpa eius enim, dolorum et voluptas quasi. Assumenda accusamus dicta facere beatae harum adipisci enim maiores sequi quos velit culpa earum nesciunt, nemo eveniet explicabo deleniti quo numquam possimus!',
		},
		{
			title: 'Ayder',
			img:
				'https://seyahatdergisi.com/wp-content/uploads/2015/01/ayder-yaylasi.jpg',
			article:
				'  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro, atque mollitia exercitationem quia quas, praesentium earum repellat, minus sint laborum eius velit! Modi, corporis? Temporibus eius nulla, sint pariatur voluptates odio iure numquam ullam sit id distinctio possimus incidunt ipsum nisi, provident corrupti nobis? Voluptatibus, qui pariatur. Quaerat recusandae dolorum possimus ab deleniti enim tempore, laudantium corporis illo sunt? Dolorem autem quia voluptate ut quos! Amet maiores delectus neque? In quo culpa eius enim, dolorum et voluptas quasi. Assumenda accusamus dicta facere beatae harum adipisci enim maiores sequi quos velit culpa earum nesciunt, nemo eveniet explicabo deleniti quo numquam possimus!',
		},
		{
			title: 'Ayder',
			img:
				'https://seyahatdergisi.com/wp-content/uploads/2015/01/ayder-yaylasi.jpg',
			article:
				'  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro, atque mollitia exercitationem quia quas, praesentium earum repellat, minus sint laborum eius velit! Modi, corporis? Temporibus eius nulla, sint pariatur voluptates odio iure numquam ullam sit id distinctio possimus incidunt ipsum nisi, provident corrupti nobis? Voluptatibus, qui pariatur. Quaerat recusandae dolorum possimus ab deleniti enim tempore, laudantium corporis illo sunt? Dolorem autem quia voluptate ut quos! Amet maiores delectus neque? In quo culpa eius enim, dolorum et voluptas quasi. Assumenda accusamus dicta facere beatae harum adipisci enim maiores sequi quos velit culpa earum nesciunt, nemo eveniet explicabo deleniti quo numquam possimus!',
		},
	],
	seedDB = () => {
		Comment.deleteMany({}, (err) => {
			if (err) console.log(err);
		});
		Campsite.deleteMany({}, (err) => {
			if (err) {
				console.log(err);
			} else {
				sites.forEach((e) => {
					Campsite.create(e, (err, site) => {
						if (err) console.log(err);
						else {
							Comment.create(
								{
									text: 'Nabeeer',
									author: 'kemal',
								},
								(err, comment) => {
									if (err) console.log(err);
									else {
										site.comments.push(comment);
										site.save((err, site) => {
											if (err) console.log(err);
										});
									}
								},
							);
						}
					});
				});
			}
		});
	};

module.exports = seedDB;
