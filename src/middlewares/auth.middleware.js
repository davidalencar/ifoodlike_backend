const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
	const token = req.header("x-auth-token");
	if (!token) return res.status(401).send("Access deined. No token provided.");

	try {
		
		const user = jwt.verify(token, config.get("jwtPrivateKey"));	
		
		console.log('---------USER TOKEN \n', user)
		console.log('---------PARAM \n', req.params)

		if (!user.stores.includes(req.params.id)) res.status(401).send("Access deined.");

		req.user = user;

		next();
	} catch (ex) {
		res.status(400).send("Invalid token.");
	}
}
