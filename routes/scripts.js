var express = require('express');
var router = express.Router();
var scriptDAO = require('../dao/scriptDAO');
var result = require('../model/result');
/* list scripts */
router.get('/', function(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*"); 
    console.log('list scripts called');
    scriptDAO.list(function (scripts) {
		console.log(scripts);
		console.log("------------");
        res.json(result.createResult(true, scripts));
		console.log(res);
    });
});

/* get script */
router.get('/:id', function(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*"); 
    var id = req.params.id;
    console.log('get script called, id: ' + id);
    scriptDAO.getById(id, function (script) {
        res.json(result.createResult(true, script));
    });
});

/* delete script */
router.delete('/:id', function (req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*"); 
    var id = req.params.id;
    console.log('delete script called, id=' + id);
    scriptDAO.deleteById(id, function (success) {
        res.json(result.createResult(success, null));
    });
});

/* add scripts */
router.post('/', function (req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*"); 
    console.log('post scripts called');	
    var script = req.body;
    scriptDAO.add(script, function (success,id) {
        var r =  result.createResult(success, id);
        res.json(r);
    });
});

/* update scripts */
router.put('/:id', function (req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('update script called');
    var script = req.body;
    scriptDAO.update(script, function (success,id) {
        var r =  result.createResult(success, id);
        res.json(r);
    });
});
/* patch scripts */
router.patch('/:id', function (req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*"); 
    console.log('patch script called');
    scriptDAO.getById(req.params.id, function (script) {
        var name = req.body.name;
        if(name) {
            script.name = name;
        }
         var changeorder = req.body.changeorder;
        if(changeorder) {
            script.changeorder = changeorder;
        }
		 var changedesc = req.body.changedesc;
        if(changedesc) {
            script.changedesc = changedesc;
        }
		 var type = req.body.type;
        if(type) {
            script.type = type;
        }
		 var status = req.body.status;
        if(status) {
            script.status = status;
        }
		 var closetime = req.body.closetime;
        if(closetime) {
            script.closetime = closetime;
        }
        console.log(script);
        scriptDAO.update(script, function (success) {
            var r =  result.createResult(success, null);
            res.json(r);
        });
    });
});

module.exports = router;
