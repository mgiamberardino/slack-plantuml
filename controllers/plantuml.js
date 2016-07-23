var plantuml = require('node-plantuml');
var plantumlEncoder = require('plantuml-encoder')

var fs = require('fs'),
    request = require('request');

function htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

exports.generatePng = function(req, res) {
    console.log("Trying to generate an UML image.")

    plantuml.useNailgun();

    res.set('Content-Type', 'image/png');
    var encoded = plantumlEncoder.encode(htmlDecode(req.body.text));
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
