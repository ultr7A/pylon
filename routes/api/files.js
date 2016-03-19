var express = require('express'),
    ObjectID = require('mongodb').ObjectID,
	Busboy = require('busboy');

// File Routes
module.exports = function (app, db) {
	var router = express.Router(),
        Files = db.collection("files");

	router.post('/', function(req, res) {
		// Create an Busyboy instance passing the HTTP Request headers.
		var busboy = new Busboy({ headers: req.headers });
		// Listen for event when Busboy finds a file to stream.
		busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
			// We are streaming! Handle chunks
			file.on('data', function (data) {
				// Here we can act on the data chunks streamed.
			});
			// Completed streaming the file.
			file.on('end', function () {
				console.log('Finished with ' + fieldname);
			});
		});
		// Listen for event when Busboy finds a non-file field.
		busboy.on('field', function (fieldname, val) {
			// Do something with non-file field.
		});
		// Listen for event when Busboy is finished parsing the form.
		busboy.on('finish', function () {
			res.statusCode = 200;
			res.end();
		});
		// Pipe the HTTP Request into Busboy.
		req.pipe(busboy);
	});

	router.post('/create/', function(req, res) {
		Files.insert({name: req.body.name, data: req.body.data}, function(err){
            if (err) {
                return console.log("Error inserting file: ", err);
            }
        });
		res.json({success: true, message: "File Created"});
	});

	router.get('/:file', function(req, res) {
		Files.findOne({name: req.params.file}, function(err, found) {
            if (err) {
                return console.log("Error getting file: ", err);
            }
            res.json(found);
        });
	});

	router.get('/search/:file', function(req, res) {
		Files.find({name: req.params.file}).toArray(function (err, found) {
            if (err) {
                return console.log("Error searching for file: ", err);
            }
            res.json(found);
        });
	});

	router.put('/:file', function(req, res) {
		Files.update({_id: ObjectID(req.body.id)}, {$set: {name: req.body.name, data: req.body.data}}, function(err) {
            if (err) {
                return console.log("Error updating file ", err);
            }
            res.json({success: true, message: "File Updated"});
        });
	});

	router.delete('/:file', function(req, res) {
		Files.remove({_id: ObjectID(req.body.id)}, function(err) {
            if(err) {
                return console.log('Error removing file: ', err);
            }
            res.json({success: true, message: "File Deleted"});
        });
	});

  return router;
};
