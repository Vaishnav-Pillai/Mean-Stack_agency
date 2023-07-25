var providers = require('../model/providers.models');
var Provider = require('../db/db');
const { ObjectId } = require('mongodb');

function isEmptyList(obj){
    return(!obj || obj.length == 0 || Object.keys(obj).length == 0);
}

function handleError(res,error){
    res.status(200);
    res.send('Something went wrong. \n'+error);
}

// function existsProvider(id){
//     return providers.find( provider => provider.id == id);
// }

// function uniqueIdGenerator(providers){
//     let min = 100000;
//     let max = 999999;
//     do{
//         var id = Math.floor(Math.random() * (max-min) + min);
//     }while(existsProvider(id))

//     return id;
// }

//CRUD

//uri1: /api/providers
//uri2: /api/providers/id

module.exports.create = function(req,res){
    
    try{
        // if(isEmptyList(providers)){
        //     providers = [];
        // }

        // var id = req.body.id;
        // if(existsProvider(id)){
        //     id = uniqueIdGenerator();
        // }

        // provider.id = id;

        // let provider = {
        //     id : id,
        //     firstname : req.body.firstname,
        //     lastname : req.body.lastname,
        //     position : req.body.position,
        //     company : {
        //         email : req.body.company.email,
        //         phone : req.body.company.phone,
        //         company_name : req.body.company.company_name,
        //         address : req.body.company.address,
        //         city : req.body.company.city,
        //         state : req.body.company.state,
        //         postal_code : req.body.company.postal_code,
        //         description : req.body.company.description,
        //         tagline : req.body.company.tagline,
        //     }
        // }

        // providers.push(provider);
        var provider = req.body;

        Provider.create(provider)
            .then( result => {
                res.status(201);
                res.send('Added'+result);
            })
            .catch(error => handleError(res,error))
    }
    catch(e){
        handleError(res,e)
    }
}

module.exports.readAll = function(req,res){

    try{
        Provider.find()
            .then( result => {
                if(isEmptyList(result)){
                    res.status(400);
                    res.send("List is Empty.");
                }
                res.status(200);
                res.send(result);
            })
            .catch(error => handleError(res,error));
    }
    catch(e){
        handleError(res,e)
    }
}

module.exports.readOne = function(req,res){
    
    try{
        // let id = ObjectId(req.params.id);

        Provider.find({'id':(req.params.id)})
            .then( result => {
                if(isEmptyList(result)){
                    res.status(400);
                    res.send("List is Empty.");
                }
                res.status(200);
                res.send(result);
            })
            .catch(error => handleError(res,error))
    }
    catch(e){
        handleError(res,e)
    }
}

module.exports.update = function(req,res){

    try{
        let provider = req.body;

        Provider.findOneAndUpdate({'id':(req.params.id)}, provider, {new:true})
            .then( result => {
                if(isEmptyList(result)){
                    res.status(400);
                    res.send("List is Empty.");
                }
        
                res.status(200);
                res.send(result);
            })
            .catch(error => handleError(res,error))
    }
    catch(e){
        handleError(res,e)
    }
}

module.exports.deleteAll = function(req,res){
    try{
        Provider.deleteMany({})
            .then( result => {
                if(result.deletedCount === 0){
                    res.status(400);
                    res.send("List is Empty.");
                }
        
                res.status(200);
                res.send("List Deleted \n"+result);
            })
            .catch(error => handleError(res,error))
        providers = [];

    }
    catch(e){
        handleError(res,e)
    }
}

module.exports.deleteOne = function(req,res){
    
    try{

        Provider.findOneAndDelete( {'id':(req.params.id)})
            .then( result => {
                if(isEmptyList(result)){
                    res.status(400);
                    res.send("List is Empty.");
                }

                res.status(200);
                res.send(result);
            })
            .catch(error => handleError(res,error))

        // let provider = providers.find(i => i.id == id)
        // let idx = providers.indexOf(provider);

        // providers.splice(idx,1);

    }
    catch(e){
        handleError(res,e)
    }
}