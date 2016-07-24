var plantuml = require('node-plantuml');
var plantumlEncoder = require('plantuml-encoder')
var Entities = require('html-entities').XmlEntities;


var fs = require('fs'),
    request = require('request');

exports.generatePng = function(req, res) {
    generate(res,req,false)
    //request('http://www.plantuml.com/plantuml/img/'+encoded).pipe(res);
};

exports.generatePng = function(req, res) {
    generate(res,req,true)
    //request('http://www.plantuml.com/plantuml/img/'+encoded).pipe(res);
};

function generate(res, req, command){
  console.log("Trying to generate an UML image.")

  plantuml.useNailgun();
  entities = new Entities();
  res.set('Content-Type', 'image/png');
  var text = req.body.text;
  console.log("body " + req.body.text);
  console.log("params " + req.params.text);
  splited = text.split("```");
  if(splited.length > 1){
    code=splited[1];
    if (code.includes("@startuml")){
      console.log(entities.decode(code));
      var encoded = plantumlEncoder.encode(entities.decode(code));
      console.log('http://www.plantuml.com/plantuml/img/'+encoded);
      if (command){
        res.status(200).jsonp({   text:
                                  attachments: [
                                      {
                                          text: "Optional text that appears within the attachment",
                                          image_url: "http://www.plantuml.com/plantuml/img/"+encoded,
                                          footer: "Generated UML"
                                      }
                                  ]
                              });
      } else {
        res.status(200).jsonp({text: 'http://www.plantuml.com/plantuml/img/'+encoded})
      }
    } else {
      res.status(200).jsonp({});
    }
  } else {
    res.status(200).jsonp({});
  }
}

exports.generateSvg = function(req, res) {
    plantuml.useNailgun();

    res.set('Content-Type', 'image/svg');

    var decode = plantuml.decode(req.body.uml);
    var gen = plantuml.generate({format: 'svg'});

    decode.out.pipe(gen.in);
    gen.out.pipe(res);
};
