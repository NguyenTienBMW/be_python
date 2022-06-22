var express = require('express');
var cors = require('cors')
const db = require("./db");
var app = express();
app.use(cors())

app.listen(3002, function () {
	console.log('server running on port 3002');
});

var bodyParser = require('body-parser');

const urlEncodeParser = bodyParser.urlencoded({ extended: false });

app.get('/recomender&id=:idPro', urlEncodeParser ,callName);

function callName(req, res){
	const idPro = req.params.idPro
	var spawn = require("child_process").spawn;

	var process  = spawn('python',["./hello.py", idPro]);

	process.stdout.on('data',function(data){
		const model = data.toString();
		const newModel = model.slice(1, -3);
		const dataPro = newModel.replaceAll("'","").split(',');
		// var selectProduct = `SELECT * FROM products 
		// WHERE id = '${dataPro[0].trim()}' 
		// 	OR id = '${dataPro[1].trim()}'
		// 	OR id = '${dataPro[2].trim()}'
		// 	OR id = '${dataPro[3].trim()}'
		// 	OR id = '${dataPro[4].trim()}'
		// 	OR id = '${dataPro[5].trim()}'
		// 	OR id = '${dataPro[6].trim()}'
		// 	OR id = '${dataPro[7].trim()}'
		// 	OR id = '${dataPro[8].trim()}' 
		// 	OR id = '${dataPro[9].trim()}'
		// `;
		var selectProduct = `SELECT products.*, AVG(rating.rating) AS meanRating FROM products LEFT JOIN rating ON products.id = rating.productId 
		WHERE 
		products.id = '${dataPro[0].trim()}'  
		OR products.id = '${dataPro[1].trim()}'
		OR products.id = '${dataPro[2].trim()}'
		OR products.id = '${dataPro[3].trim()}'
		OR products.id = '${dataPro[4].trim()}'
		OR products.id = '${dataPro[5].trim()}'
		OR products.id = '${dataPro[6].trim()}'
		OR products.id = '${dataPro[7].trim()}'
		OR products.id = '${dataPro[8].trim()}' 
		OR products.id = '${dataPro[9].trim()}'
		GROUP BY rating.productId `
        db.query(selectProduct, function (err, result) {
            if (err) throw err;
            res.send(result);
        });
	});

}

