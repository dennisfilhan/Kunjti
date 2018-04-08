var express = require('express')
	,router = express.Router();

// var multer  = require('multer');
// var upload = multer({ dest: '../public/files/multer/' });

var models = require('../models');

router.get('/', (req,res,next)=>{

	models.Modul
			.findAll({
				include: models.Praktikum
			})
			.then((respon)=>{
				//res.render('admin/unit', {modul: respon});
				if(respon.length==0 || respon==null){
					res.send('no modul exist');
				}else{
					res.send('<pre>'+JSON.stringify(respon, null, 2)+'</pre>');
				}
			})
			;
});

router.get('/next/:id', (req,res,next)=>{

	var modul_id = req.cookies.modul_id;
	// console.log(req.cookies);
	// res.send('cookes');
	if(modul_id==null){
		res.render('admin/unit');
	}else{
		models.Modul
			.findById(modul_id, {
				include: models.Praktikum
			})
			.then((respon)=>{
				res.render('admin/unit', {modul: respon});
				//res.send('<pre>'+JSON.stringify(respon, null, 2)+'</pre>');
			})
			;
	}
});

router.post('/save', (req,res,next)=>{
	// var created = {
	// 	units: []
	// };
	//res.write('<pre>'+JSON.stringify(req.file, null, 2)+'</pre>');
	// res.write('<pre>'+JSON.stringify(req.files, null, 2)+'</pre>');
	// res.write('<pre>'+JSON.stringify(req.body, null, 2)+'</pre>');
	// res.end();
	(req.body.units).forEach((e,i)=>{
	models.Unit
		.create({
			modulId: req.body.modul_id,
			type: e.unit_type,
			passkey: e.passkey,
			description: e.description
		})
		.then((unit)=>{
			if(e.unit_type=='QUIZ'){
				return models.Quiz.create({
					unitId: unit.id,
					nama: e.name,
					jumlah_soal: e.jumlah_soal,
					timelimit: e.timelimit,
					type: e.type,
					answerkey: e.answerkey
					// unit_type: e.unit_type,
					// file: e.file
				})
				;
			}else if(e.unit_type=='DOCUMENT'){
				return models.Document.create({
					unitId: unit.id,
					nama: e.name,
					// passkey: e.passkey,
					description: e.description
					// unit_type: e.unit_type,
					// file: e.file
				})
				;
			}
		})
		.then((_unit)=>{
			var findFile = (req.files).find((file)=> file.fieldname==='units['+i+'][file]');
			console.log(findFile);
			if(findFile!=null){
				return models.Attachment
					.create({
						unitId: _unit.unitId,
						nama: findFile.originalname,
						filename: findFile.filename,
						mimetype: findFile.mimetype,
						size: findFile.size,
						destination: findFile.destination
					})
					.then((file)=>{
						return models.Unit
							.update({
								file: file.id
							},{
								where: {id: _unit.unitId}
							});
					})
					;
			}else{
				return 'No Attachment -> units['+i+'][file]';
			}
			// return models.Unit
			// 	.update({
			// 		file: req.files[i].filename,
			// 		type: e.unit_type
			// 	}, {
			// 		where: {
			// 			id: _unit.unitId
			// 		}
			// 	});
		})
		.then((update)=>{
			console.log(update);
			console.log(i);
			if(i==(req.body.units).length-1){
				res.cookie('modul_id', '', {expires: new Date(0)});
				res.clearCookie('modul_id');
				console.log(req.cookies);
				res.redirect('/admin/modul/');
				//res.send('<pre>'+JSON.stringify(update, null, 2)+'</pre>');
			}
		});
	// 	// 	//res.write('<pre>'+JSON.stringify({update_status: update}, null, 2)+'</pre>');
	// 	// 	//return update;
	// 	// 	//res.send('<pre>'+JSON.stringify(pack, null, 2)+'</pre>');
	// 	// 	return update;
	// 	// });
	// 	// .finally((modul)=>{
	// 	// 	res.send('<pre>'+JSON.stringify(modul, null, 2)+'</pre>');
	// 	// })
	});

	// // models.Modul
	// // 	.findById(req.body.modul_id)
	// // 	.then((result)=>{
	// // 		clearCookie('modul_id');
	// // 		res.send('<pre>'+JSON.stringify(result, null, 2)+'</pre>');
	// // 		//res.end();
	// // 	});
	// // res.send('<pre>'+JSON.stringify(req.body, null, 2)+'</pre>');
});

router.get('/done', (req,res,next)=>{
	var modul_id = req.cookies.modul_id;
	console.log(modul_id);
	models.Modul.destroy({
		where: {
			id: modul_id
		}
	}).then((result)=>{
		console.log(result);
		res.cookie('modul_id','',{expires: new Date(0)});
		res.clearCookie('modul_id');
		res.redirect('/admin/modul/');
	});
});

router.get('/quiz/:id?/:no?', (req,res,next)=>{
	res.render('admin/template/quiz', {id: req.params.id, no: req.params.no});
});

router.get('/document/:id?/:no?', (req,res,next)=>{
	res.render('admin/template/document', {id: req.params.id, no: req.params.no});
});

module.exports = router; 