var express = require('express');
var router = express.Router();

var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {

	models.Lab
		.findAll()
		.then((result)=>{
			//res.status(200).send("<pre>"+JSON.stringify(result,null,2)+"</pre>");
			res.render('index', { title: 'EAD Product', labs: result});
		})
		;

});

/*
*
* MISC
*
*/
router.post('/qoutes',(req,res,next)=>{
	var quotes = [
		{text: 'Anyone who has never made a mistake has never tried anything new', author: 'Albert Einstein', job: ''},
		{text: 'Without destruction there is no creation... there is no change', author: 'Oda Nobunaga', job: ''},
		{text: 'Every act of creation is first an act of destruction', author: 'Pablo Picasso', job: ''},
		{text: 'Do not fear mistakes. You will know failure. Continue to reach out', author: 'Benjamin Franklin', job: ''},
		{text: "I have not failed. I've just found 10.000 ways that won't work", author: 'Thomas A. Edison', job: ''},
		{text: 'Innovation is the ability to see change as an opportunity, not a threat', author: 'Steve Jobs', job: ''},
		{text: "Many of life's failures are people who did not realize how close they were to success when they gave up", author: 'Thomas A. Edison', job: ''},
		{text: 'Innovation is the ability to see change as an opportunity, not a threat', author: 'Thomas A. Edison', job: ''},
		{text: "I have not failed. I've just found 10.000 ways that won't work", author: 'Thomas A. Edison', job: ''},
		{text: "Hard work beats talent when talent doesn't work hard", author: 'Time Notke', job: ''},
		{text: "All of us do not have equal talent, but all of us should have an equal opportunity to develop our telent", author: 'John F. Kennedy', job: ''},
		{text: "Everyday is a new opportunity to change your life and be who you want to be", author: 'Demi Lovato', job: ''},
		{text: 'If there are nine rabbits on the ground and you want to catch one, just focus on one', author: 'Jack Ma', job: ''}
	];

	var offset = req.body.pos;
	// var offset = req.params.pos;
	res.status(200).json({qlength: quotes.length, offset: offset, quote: quotes[offset]});
});

/*
*
* LAB
*
*/

// router.post('', (req,res,next)=>{});
router.post('/lab/:getID?', (req,res,next)=>{
	models.Praktikum
		.findAll({
			where: {lab: req.body.lab},
			include: {
				model: models.Modul,
				include: {
					model: models.Unit
				}
			}
		})
		.then((result)=>{
			res.status(200).json(result);
		})
		.catch((ex)=>{
			res.status(400).send(ex);
		})
		;
});


// router.get('/lab/:id', function(req, res, next) {
// 	models.Praktikum
// 		.findAll({
// 			where: {lab: req.params.id},
// 			include: {
// 				model: models.Modul,
// 				include: {
// 					model: models.Unit
// 				}
// 			}
// 		})
// 		.then(function(result){
// 			res.send('<pre>'+JSON.stringify(result, null, 2)+'</pre>');
// 			// res.render('admin/show_praktikum', {menu:1, praktikum: result});
// 		});
// });

/*
*
* PRAKTIKUM
*
*/

router.post('/praktikum/:id',(req,res,next)=>{
	models.Modul
		.findAll({
			where: {praktikumId: req.body.praktikum},
			include: [
			{
				model: models.Unit,
				include: [
					{model: models.Quiz},
					{model: models.Document}
				]
			},
			{
				model: models.Praktikum,
				include: {model: models.Lab}
			}
			]
		})
		.then((result)=>{
			result.sort((obj1, obj2)=>{
				return obj1.nomor - obj2.nomor;
			});
			res.status(200).json(result);
			// res.send('<pre>'+JSON.stringify(result, null, 2)+'</pre>');
		});
});

/*
*
* MODUL
*
*/


router.use('/unit', require('./topic'));
module.exports = router;
