module.exports.home = function(req,res){
    res.render('index', {title : 'MEAN STACK'});
}
module.exports.about = function(req,res){
    res.render('about', {title : 'About Us'});
}
module.exports.contact = function(req,res){
    res.render('contact', {title : 'Contact Us'});
}
module.exports.error = function(req,res){
    res.render('error', {title : 'Error !'});
}
module.exports.forgotpassword = function(req,res){
    res.render('forgot-password', {title : 'Forgot Password'});
}
module.exports.login = function(req,res){
    res.render('login', {title : 'Login Page'});
}
module.exports.register = function(req,res){
    res.render('register', {title : 'Register Page'});
}