const campsite = require('./models/campsite.js');

const mongoose = require('mongoose'),
	Campsite = require('./models/campsite.js'),
	Comment = require('./models/comment.js'),
	sites = [
		{
			title: 'Ayder',
			img:
				'https://seyahatdergisi.com/wp-content/uploads/2015/01/ayder-yaylasi.jpg',
			article: 'Karadenizde Cennetten bir köşe',
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
			article: 'Karadenizde Cennetten bir köşe',
		},
		{
			title: 'Ayder',
			img:
				'https://seyahatdergisi.com/wp-content/uploads/2015/01/ayder-yaylasi.jpg',
			article: 'Karadenizde Cennetten bir köşe',
		},
		{
			title: 'Ayder',
			img:
				'https://seyahatdergisi.com/wp-content/uploads/2015/01/ayder-yaylasi.jpg',
			article: 'Karadenizde Cennetten bir köşe',
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
