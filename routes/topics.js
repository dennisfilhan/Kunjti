var express = require('express'), 
	router = express.Router();

var mammoth = require('mammoth');

router.get('/', function(req, res, next){
	console.log('opening topic /');
	res.send("topic open");
});

//Tambah Topic / Modul
router.get('/add', function(req, res, next){
	console.log('opening topic/add');
	res.render("add-topic", {title: "Topic 1"});
});

router.post('/submit', function(req, res, next){
	console.log(JSON.stringify(req.body));
	res.send("<pre>"+JSON.stringify(req.body,null,2)+"</pre>");
});

router.get('/:id/show', function(req, res, next){
	res.render('show_topic', {title: "Tes Awal "+req.params.id, srcpath:"example-Jurnal.docx"});
	// res.send('workd');
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

	mammoth.convertToHtml({path: "./public/files/"+code}, options)
    .then(function(result){
        var html = result.value; // The generated HTML
        var messages = result.messages; // Any messages, such as warnings during conversion
        console.log(messages);
        res.send(html);
    })
    .done();
});

router.post('/enrolled', function(req, res, next){
	res.send("<pre>"+JSON.stringify(req.body,null,2)+"</pre>");
});

router.post('/:id/unlock', function(req, res, next){
	var password = req.body.password;
	if(password=="halo"){
		res.status(200).send({status: "success"});
	}else{
		res.status(406).send({status: "failed"});
	}
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