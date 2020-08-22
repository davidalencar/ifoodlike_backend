const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
	const token = req.header("Authorization");
	if (!token) return res.status(401).send("Access deined. No token provided.");

	try {
		
		const user = jwt.verify(token, config.get("jwtPrivateKey"));	
		
		if (!user.stores.includes(req.params.id)) res.status(401).send("Access deined.");

		req.user = user;

		next();
	} catch (ex) {
		res.status(400).send("Invalid token.");
	}
}