var express = require('express');
var router = express.Router();

var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('admin/index', {menu:0});
});


/*
*
* PRAKTIKUM ROUTE & CONTROLLER
* 
*/


router.get('/praktikum', function(req, res, next) {

	var collections = {};

	models.Lab
		.findAll({
			include: {model: models.Praktikum, include: {model: models.Modul}}
		})
		.then((result)=>{
			res.render('admin/praktikum', {menu:1, data: result});
			// res.send('<pre>'+JSON.stringify(result, null, 2)+'</pre>');
			// collections.lab_list = result;
		});

	// models.Praktikum
	// 	.findAll({
	// 		include: {model: models.Modul}
	// 	})
	// 	.then(function(praktikums){
	// 		//res.send('<pre>'+JSON.stringify(praktikums, null, 2)+'</pre>');
	// 		collections.list_praktikum
	// 		res.render('admin/praktikum', {menu:1, data: praktikums});
	// 	});
});

router.get('/praktikum/:id', function(req, res, next) {
	models.Praktikum
		.findById(req.params.id, {
			include: [
			{model: models.Lab},
			{model: models.Modul, include: {model: models.Unit}}
			]
		})
		.then(function(result){
			res.send('<pre>'+JSON.stringify(result, null, 2)+'</pre>');
			// res.render('admin/show_praktikum', {menu:1, praktikum: result});
		});
});
router.get('/praktikum/:id/delete',function(req,res,next){
	models.Praktikum
		.destroy({
			where:{
				id: req.params.id
			}
		})
		.then(function(deleted){
			//res.json({delete: deleted});
			res.redirect('/admin/praktikum');
		});
});

router.post('/praktikum/save', function(req, res, next) {
	models.Praktikum
		.build({
		lab: req.body.lab,
		nama: req.body.nama,
		periode: req.body.periode[0]+'-'+req.body.periode[1],
		angkatan: req.body.angkatan,
		jumlah_modul: req.body.jumlah_modul,
		description: req.body.description
		})
		.save()
		.then(function(praktikum){
			//res.send('<pre>'+JSON.stringify(praktikum, null, 2)+'</pre>');
			res.redirect('/admin/praktikum');
		});
});


/*
*
* MODUL ROUTE & CONTROLLER
* 
*/

router.get('/modul', function(req, res, next) {
	var collection = {};

	res.cookie('modul_id','',{expires: new Date(0)});
	res.clearCookie('modul_id', {path:'/'});
	console.log(req.cookies);

	models.Praktikum
		.findAll()
		.then(function(data){
			collection.praktikum_list = data;
		})
	;

	models.Modul
		.findAll({
			include: [
			{model: models.Praktikum},
			{model: models.Unit}
			]
		})
		.then(function(data){
			collection.modul_list = data;
			//res.send('<pre>'+JSON.stringify(collection, null, 2)+'</pre>');
			res.render('admin/modul', {menu:2, collections: collection});
		})
	;
});

router.get('/modul/show/:id', (req,res,next)=>{
	models.Modul
		.findById(req.params.id, {
			include: [
				{model: models.Praktikum},
				{model: models.Unit}
			]
		})
		.then((result)=>{
			res.render('admin/show_modul', {menu:2, modul: result});
		});
});

router.post('/modul/save', function(req, res, next) {
	
	//const Praktikum = models.Modul.belongsTo(models.Praktikum, {as: praktikum});
	//const Units = models.Unit.belongsTo(models.Modul, {as: units});

	var collections={};
		collections.modul_content = {units: {}};

	models.Modul
		.create({
			praktikumId: req.body.praktikum,
			nomor: req.body.nomor,
			nama: req.body.nama,
			description: req.body.description,
			//units: req.body.komponen
		}).then(function(modul){
			collections.modul_content = modul;

			// var units={};
			// (req.body.komponen).forEach(function(item){
			// 	models.Unit.create({
			// 		nama: item.nama,
			// 		description: item.description,
			// 		bobot: item.bobot,
			// 		file: item.file,
			// 		type: item.type,
			// 		answerkey: item.answerkey,
			// 		timelimit: item.timelimit,
			// 		passcode: item.passcode,
			// 		modulId: modul.id
			// 	})
			// 	// .then(function(unit){
			// 	// 	units.push(unit);
			// 	// 	console.log(units);
			// 	// })
			// 	;
			// //units.push(unit);
			// });

			//console.log("NUM::UNIT"+unit.length);

			// res.send('<pre>'+JSON.stringify(collections, null, 2)+'</pre>');
			res.cookie('modul_id', modul.id, {maxAge: 30*60*1000});
			res.redirect('/admin/modul/unit/next/'+modul.id);
			//models.Unit.bulkCreate(units);
		});

	//res.send('<pre>'+JSON.stringify(req.body, null, 2)+'</pre>');
});

router.get('/modul/delete/:id', function(req,res,next){
	models.Modul
		.destroy({
			where: {
				id: req.params.id
			}
		})
		.then(function(rowAffected){
			res.redirect('/admin/modul');
		})
		;
});


/*
*
* UNIT MODUL ROUTE & CONTROLLER
* 
*/
router.use('/modul/unit',require('./unit'));


/*
*
* NILAI ROUTE & CONTROLLER
* 
*/

router.get('/nilai', function(req, res, next) {
	var data = {};
	models.Praktikum
		.findAll({
			where: {
				lab: 1
			},
			include: models.Modul
		})
		.then((result)=>{
			res.render('admin/nilai', {menu:3, res: result});
			// res.send('<pre>'+JSON.stringify(result, null, 2)+'</pre>');
		});
});
router.get('/nilai/praktikum-:id', function(req, res, next) {
	// console.log("praktikum_id "+req.params.id);
	var data = {};
	models.Praktikum
		.findAll({
			where: {
				id: req.params.id,
				lab: 1
			},
			include: {model: models.Modul, include: models.Unit}
		})
		.then((result)=>{
			// res.render('admin/nilai', {menu:3, res: result});
			// res.send('<pre>'+JSON.stringify(result, null, 2)+'</pre>');
			res.render('admin/nilai', {menu:3, praktikum_id: req.params.id, res: result});
		});

	// res.render('admin/nilai', {menu:3, praktikum_id: req.params.id, res: result});
});
router.get('/nilai/praktikum-:praktikum_id/modul-:modul_id?', function(req, res, next) {
	models.Nilai
		.findAll({
			include: [
				{model: models.Praktikan},
				{model: models.Asisten},
				{
					model: models.Praktikan_Unit_Assign,
					include: {
						model: models.Praktikan_Shift_Assign,
						include: {
							model: models.Shift,
							include: {
								model: models.Praktikum, 
								include: models.Lab
							}
						}
					}
				}
			]
		})
		.then((result)=>{
			// res.render('admin/nilai', {menu:3, res: result});
			res.send('<pre>'+JSON.stringify(result, null, 2)+'</pre>');
			// res.render('admin/nilai', {menu:3, praktikum_id: req.params.id, res: result});
		});
	// res.render('admin/nilai', {menu:3, praktikum_id: req.params.praktikum_id, modul_id: req.params.praktikum_id});
});

/*
*
* PRAKTIKAN ROUTE & CONTROLLER
* 
*/

router.get('/praktikan', function(req, res, next) {
  res.render('admin/praktikan', {menu:4});
});
router.get('/praktikan/praktikum-:id', function(req, res, next) {
  res.render('admin/praktikan', {menu:4});
});

/*
*
* ASISTEN ROUTE & CONTROLLER
* 
*/

router.get('/asisten', function(req, res, next) {
  res.render('admin/asisten', {menu:5});
});


module.exports = router;
