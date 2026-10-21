module.exports.isLoggedInD = (req, res, next) => {
    console.log(req.user);
    // console.log(req.path, "..", req.originalUrl);

    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create Doctor's account !");
        return res.redirect("/loginD");
    }
    next();
}

module.exports.isLoggedInP = (req, res, next) => {
    console.log(req.user);

    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create Patients's account !");
        return res.redirect("/loginP");
    }
    next();
}

module.exports.saveRedirectUrlD = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.saveRedirectUrlP = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}
