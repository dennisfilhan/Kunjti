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

router.get('/', function(req, res, next){
	// res.send('aa');
	res.redirect('/');
});

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
				res.render('./show_document', {document: result});
			}
			//res.status(200).send("<pre>"+JSON.stringify(result,null,2)+"</pre>");
		});
});

router.post('/enrolled', function(req, res, next){

	// var nim = req.body.nim, 
	// 	nama = req.body.nama, 
	// 	kelas = req.body.kelas, 
	// 	shift = req.body.shift,
	// 	answers = req.body.answer,
	// 	answers_review = [];
	// 	score = 0;
	// var request = {
	// 	"nim": nim,
	// 	"nama": nama,
	// 	"kelas": kelas,
	// 	"shift": shift,
	// 	"answers": answers,
	// 	"answers_review":answers_review,
	// 	"score": score 
	// };

	// var answered = fs.readFileSync('./public/files/example/taa/modul1.txt', 'utf8');
	// 	answered = answered.replace(/\s+/g,'').split('');
	// 	answered.forEach(function(e,i){
	// 		if(e.toUpperCase()==answers[i].toUpperCase()){score++; answers_review.push(1);}
	// 		else{answers_review.push(0);}
	// 	});

	// request.score = score;

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
				// answer_key=result.answerkey;
				// req.params.answerkey = answer_key;
				// res.status(200).send("<pre>"+JSON.stringify(json,null,2)+"</pre>");
				res.status(200).render('./show_quiz_result', {result: json});
				// return result;
			}
		// res.status(200).send("<pre>"+JSON.stringify(result,null,2)+"</pre>");
		})

	// res.status(200).send("<pre>"+JSON.stringify(req.body,null,2)+"</pre>");
	//res.send("<pre>"+JSON.stringify(req.body,null,2)+"</pre>");
});


/*
*
* MISC. ROUTE
*
*/

// router.get('/:id/show', function(req, res, next){
// 	res.render('show_topic', {title: "Tes Awal "+req.params.id, srcpath:"4108f5582449a66743ef5a40f14a2b83"});
// 	// res.send('workd');
// });

router.get('/result', (req,res,next)=>{
	res.render('./show_quiz_result');
});

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
	// if(password=="halo"){
	// 	res.status(200).send({status: "success"});
	// }else{
	// 	res.status(406).send({status: "failed"});
	// }
});

router.post('/:id/userdata', function(req, res, next){
	var nim = req.body.nim;
	if(nim=="1202150079"){
		res.status(200).send({status: "success", nim: "1202150079", fullname: "Filhan Dennis", kelas: "SI-39-07", shift: 7});
	}else{
		res.status(406).send({status: "failed"});
	}
});

module.exports = router;