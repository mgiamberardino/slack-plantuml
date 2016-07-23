var plantuml = require('node-plantuml');
var plantumlEncoder = require('plantuml-encoder')
var Entities = require('html-entities').XmlEntities;


var fs = require('fs'),
    request = require('request');

exports.generatePng = function(req, res) {
    console.log("Trying to generate an UML image.")

    plantuml.useNailgun();
    entities = new Entities();
    res.set('Content-Type', 'image/png');
    var text = req.body.text;
    console.log(entities.decode(text));
    var encoded = plantumlEncoder.encode(text);
    console.log('http://www.plantuml.com/plantuml/img/'+encoded);
    res.status(200).jsonp({text: 'http://www.plantuml.com/plantuml/img/'+encoded})
    //request('http://www.plantuml.com/plantuml/img/'+encoded).pipe(res);
};

exports.generateSvg = function(req, res) {
    plantuml.useNailgun();

    res.set('Content-Type', 'image/svg');

    var decode = plantuml.decode(req.body.uml);
    var gen = plantuml.generate({format: 'svg'});

    decode.out.pipe(gen.in);
    gen.out.pipe(res);
};
