var email = require('mailer'),
    config = require('../../config/config');

exports.index = function (req, res) {
    if (!req.session.form) {
        req.session.form = {};
    }

    var status = req.session.status;
    delete req.session.status;

    res.render('contact/index', { status: status, form: req.session.form });
};

exports.send = function (req, res) {
    delete req.session.status;

    req.session.form.txtName = req.body.txtName;
    req.session.form.txtEmail = req.body.txtEmail;
    req.session.form.txtMessage = req.body.txtMessage;

    if (req.body.txtName != '' && isValidEmailField(req.body.txtName) &&
        req.body.txtEmail != '' && isValidEmailField(req.body.txtEmail) && req.body.txtEmail.indexOf('@') != -1 && req.body.txtEmail.indexOf('%') == -1 &&
        req.body.txtMessage != '' && isValidEmailField(req.body.txtMessage)) {
        email.send({
            host : "smtp.gmail.com",              // smtp server hostname
            port : "465",                     // smtp server port
            ssl: true,
            domain : "localhost",            // domain used by client to identify itself to server
            to : "kory@dummysoftware.com",
            from : '"' + req.body.txtName + '" ' + '<' + req.body.txtEmail + '>',
            subject : 'Neural Network Color Bot',
            body: 'Name: ' + req.body.txtName + '\nEmail: ' + req.body.txtEmail + '\n\n' + req.body.txtMessage,
            authentication : "login",        // auth login is supported; anything else is no auth
            username : config.gmail.username,
            password : config.gmail.password
        },
        function (err, result) {
            // Error sending email.
            console.log('ERR: ' + err);
            console.log('RESULT: ' + result);

            if (err) {
                req.session.status = 0;
            }
            else {
                req.session.status = 1;

                // Clear the form.
                delete req.session.form;
            }

            res.redirect('/contact');
        });
    }
    else {
        // Error validating form.
        req.session.status = 0;
        res.redirect('/contact');
    }
};

function isValidEmailField(value) {
    if (value.indexOf('<') != -1 || value.indexOf('>') != -1 || value.indexOf('[') != -1 || value.indexOf(']') != -1) {
        return false;
    }
    else {
        return true;
    }
}