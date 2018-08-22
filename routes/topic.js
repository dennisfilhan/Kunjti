var express = require('express'), 
	router = express.Router(),
	fs = require('fs');

var mammoth = require('mammoth');

var storageReference = './public/files/multer/';

var models = require('../models');

/*
*
* VIEW ROUTE
*
*/

// 
// USER DATA
// 
router.get('/', function(req, res, next){
	// res.send('aa');
	res.redirect('/');
});

// 
// SHOW UNIT PAGE
// 
router.get('/show/:id', function(req, res, next){
	var id = req.params.id;
	models.Unit
		.findById(id, {
			include: [
				{model: models.Attachment},
				{model: models.Quiz},
				{model: models.Document},
				{
					model: models.Modul, 
					include: {
						model: models.Praktikum,
						include: {
							model: models.Lab
						}
					}
				}
			]
		})
		.then((result)=>{
			if(result.type==='QUIZ'){
				// res.send('QUIZ');
				// res.status(200).send("<pre>"+JSON.stringify(result,null,2)+"</pre>");
				res.render('./show_quiz', {quiz: result});
			}else if(result.type==='DOCUMENT'){
				// res.send('DOCUMENT');
				// res.status(200).send("<pre>"+JSON.stringify(result,null,2)+"</pre>");
				res.render('./show_document', {document: result});
			}
		});
});

// 
// ENROLL = QUIZ RESULT
// 
router.post('/enrolled', function(req, res, next){

	var data={};
	var answer_key = {};


	models.Unit
		.findById(req.body.unitid, {
			include: [{model: models.Quiz}, {model: models.Document}]
		})
		.then((result)=>{
			var json = {};
			json.user = req.body;
			json.unit= (result);
			json.choices=req.body.choices;
			json.review=[];
			json.score=0;
			(json.unit.Quiz.answerkey).split('').forEach((e,i)=>{
				if(e.toLowerCase()===json.user.choices[i].toLowerCase()){
					(json.review).push(1);
					(json.score)+=1;
				}else{
					(json.review).push(0);
				}
			});
			// console.log((json.unit.answerkey).split(''));
			if(result.type=='QUIZ'){
				data.quiz = json;
				// console.log(json.user.nim);

				// IF USER NIM NOT VALID
				if(req.body.assignshiftid==''){
					// res.status(200).send("<pre>"+JSON.stringify(req.body,null,2)+"</pre>"); 
					res.status(200).render('./show_quiz_result', {result: data});
					return;
				}


				models.Nilai.create({
					praktikanUnitId: json.user.assignunitid,
					praktikanId: json.user.nim,
					asistenId: 1,
					score: json.score
				})
				.then((nilai)=>{
					data.nilai_user = nilai;
					// return data;
					// res.status(200).send("<pre>"+JSON.stringify(data,null,2)+"</pre>");
					res.status(200).render('./show_quiz_result', {result: data});
				})
				.catch((ex)=>{
					data.nilai_error=ex;
					// res.status(200).send("<pre>"+JSON.stringify(data,null,2)+"</pre>");
					res.status(200).send("<pre>"+JSON.stringify(data.nilai_error,null,2)+"</pre>");
				})
				;
				// res.status(200).send("<pre>"+JSON.stringify(req.body,null,2)+"</pre>");

				// return data;
			}
		// res.status(200).send("<pre>"+JSON.stringify(result,null,2)+"</pre>");
		})
		// .then((dataNilai)=>{
		// 	res.status(200).send("<pre>"+JSON.stringify(dataNilai,null,2)+"</pre>");
		// })
		;

	// res.status(200).send("<pre>"+JSON.stringify(req.body,null,2)+"</pre>");
	//res.send("<pre>"+JSON.stringify(req.body,null,2)+"</pre>");
});


/*
*
* MISC. ROUTE
*
*/

// 
// USER DATA
// 
router.post('/user/',(req,res,next)=>{
	// var unit = req.params.unit;
	var praktikan=req.body.praktikan;
	models.Praktikan_Shift_Assign
		.findOne({
			where: {
				praktikanId: praktikan
			},
			include: [
				{model: models.Praktikan},
				{model: models.Shift},
			]
		})
		.then((result)=>{
			if(result==null){
				res.status(200).json({status: -1});
			}else{
				res.status(200).json({status: 1, data: result});
			// res.status(200).send("<pre>"+JSON.stringify(result,null,2)+"</pre>");
			}
		})
		.catch((ex)=>{
			// if(req.body.shift!=null){
			// 	models.Shift
			// 		.findOne({
			// 			where: {
			// 				id: req.body.shift
			// 			}
			// 		})
			// 		.then((res)=>{
			// 			res.status(200).json({status: 10, messages: res});
			// 			// console.log(res);
			// 		});
			// }else{
				res.status(406).json({status: 0, messages: ex});
			// }
		})
		;
});

// 
// WHEN START BUTTON EXEC
// 
router.post('/start',(req,res,next)=>{
	var shiftAssignId = req.body.shiftAssignId;
	if(shiftAssignId==-100){shiftAssignId=null;}

	models.Praktikan_Unit_Assign
		.create({
			unitId: req.body.unitId,
			praktikan_on_shift: shiftAssignId
		})
		.then((result)=>{
			res.status(200).json({status: 1, data: result});
		})
		.catch((ex)=>{
			res.status(400).json({status: -1, exceptions: ex});
		});
	// res.status(200).json(req.body);
});

// 
// RESULT
// 
// router.get('/result', (req,res,next)=>{
// 	res.render('./show_quiz_result');
// });


// 
// DOCUMENT DATA
// 
router.get('/docx/:code', function(req, res, next){
	var options = {
	    convertImage: mammoth.images.inline(function(element) {
	        return element.read("base64").then(function(imageBuffer) {
	            return {
	            	width: "100%",
	                src: "data:" + element.contentType + ";base64," + imageBuffer
	            };
	        });
	    })
	};

	var code = (req.params.code).replace('-','/');
	console.log(storageReference+'/'+code);
	mammoth.convertToHtml({path: storageReference+code}, options)
    .then(function(result){
        var html = result.value; // The generated HTML
        var messages = result.messages; // Any messages, such as warnings during conversion
        console.log(messages);
        res.send(html);
    }).catch((e)=>{res.send(e.messages);})
    .done();
});


// 
// UNLOCK UNIT
// 
router.post('/unlock/:id', function(req, res, next){
	var id = req.params.id;
	var password = req.body.password;

	models.Unit
		.findById(id, {
			include: {
				model: models.Attachment
			}
		})
		.then((result)=>{
			if(password===result.passkey){
				res.status(200).send('<iframe id="frame" src="/unit/docx/'+result.Attachment.filename+'" frameborder="0" width="100%" style="height:100vh; min-height:380px;"></iframe>');
			}else{
				res.status(406).json({status: "wrong"});
			}
			return result;
			console.log(result);
		})
		.catch((ex)=>{
			res.status(400).json({status: 'error '+ex});
		})
		;
});

module.exports = router;