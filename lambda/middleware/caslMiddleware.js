const defineAbilityFor = require("../ability");
const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/helper");

async function caslMiddleware(req, res, next) {
  try {
    return next();
    if (req.url === "/" && req.method === "GET") {
      return next();
    }

    if (req.url === "/user/login" && req.method === "POST") {
      return next();
    }

    if (req.url === "/user/register" && req.method === "POST") {
      return next();
    }

    if (req.url === "/customer/login" && req.method === "POST") {
      return next();
    }

    const tokenKey = req.headers.authorization;
    console.log("tokenKey", tokenKey);

    const decoded = await jwt.verify(tokenKey, process.env.TOKEN_KEY);
    if (!decoded) {
      throw new Error("Failed to authenticate token!");
    }
    req.tokenData = decoded;
    next();
  } catch (error) {
    return errorResponse(res, error);
  }

  // const token = req.headers.authorization;
  // console.log("token", token);

  // if (token) {
  //   jwt.verify(token, process.env.TOKEN_KEY, function (err, decoded) {
  //     if (err) {
  //       return res.json({ success: false, message: "Failed to authenticate token." });
  //     } else {
  //       const user = {
  //         role: decoded.role,
  //       };
  //       req.ability = defineAbilityFor(user);
  //       next();
  //     }
  //   });
  // } else {
  //   return res.status(403).send({
  //     success: false,
  //     message: "No token provided.",
  //   });
  // }
}

module.exports = caslMiddleware;
