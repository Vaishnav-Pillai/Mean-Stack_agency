const providers = require('../model/providers')

module.exports.list = function(req,res){
    res.render('providers/providers-list', { title: 'Service Providers', providers : providers});
}

module.exports.details = function(req,res){
    let id = req.params.id;
    let provider = providers.find(i => i.id == id)
    res.render('providers/providers-details', { id : id, title : 'Provider Details', company : provider.company});
}

module.exports.edit = function(req,res){
    let id = req.params.id;
    let provider = providers.find(i => i.id == id)
    res.render('providers/providers-edit', { id : id, title : 'Edit Provider', provider : provider});
}

module.exports.update = function(req,res){
    let id = req.params.id;
    let provider = providers.find(i => i.id == id)
    provider.firstname = req.body.firstname;
    provider.lastname = req.body.lastname;
    provider.position = req.body.position;
    provider.company.email = req.body.email;
    provider.company.phone = req.body.phone;
    provider.company.company_name = req.body.company_name;
    provider.company.address = req.body.address;
    provider.company.city = req.body.city;
    provider.company.state = req.body.state;
    provider.company.postal_code = req.body.postal_code;
    provider.company.description = req.body.description;
    provider.company.tagline = req.body.tagline;

    res.render('providers/providers-update', { title : 'Update Provider' });
}

module.exports.add = function(req,res){
    res.render('providers/providers-add', { title : 'Add Provider'});
}

module.exports.added = function(req,res){
    let min = 100000;
    let max = 999999;
    let id = Math.floor(Math.random() * (max-min) + min);

    let provider = {
        id : id,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        position : req.body.position,
        company : {
            email : req.body.email,
            phone : req.body.phone,
            company_name : req.body.company_name,
            address : req.body.address,
            city : req.body.city,
            state : req.body.state,
            postal_code : req.body.postal_code,
            description : req.body.description,
            tagline : req.body.tagline,
        }
    }

    providers.push(provider);
    res.render('providers/providers-added', { title : 'Added the Provider'});
}

module.exports.delete = function(req,res){
    let id = req.params.id;
    let provider = providers.find(i => i.id == id)
    let company = provider.company.company_name;
    let idx = providers.indexOf(provider);

    providers.splice(idx,1);

    res.render('providers/providers-delete', { title : 'Deleted Provider', company : company});
}