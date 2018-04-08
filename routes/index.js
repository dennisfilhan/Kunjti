var express = require('express');
var router = express.Router();

var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {

	models.Lab
		.findAll()
		.then((result)=>{
			//res.status(200).send("<pre>"+JSON.stringify(result,null,2)+"</pre>");
			res.render('index', { title: 'Express', labs: result});
		})
		;

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


router.get('/lab/:id', function(req, res, next) {
	models.Praktikum
		.findAll({
			where: {lab: req.params.id},
			include: {
				model: models.Modul,
				include: {
					model: models.Unit
				}
			}
		})
		.then(function(result){
			res.send('<pre>'+JSON.stringify(result, null, 2)+'</pre>');
			// res.render('admin/show_praktikum', {menu:1, praktikum: result});
		});
});

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
