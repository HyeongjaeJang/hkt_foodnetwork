const prisma = require("../prisma/index");
const isEmail = require("validator/lib/isEmail");
const isStrongPassword = require("validator/lib/isStrongPassword");
const argon2 = require("argon2");
const getjwtToken = require("../helpers/getJwtToken");
const verJwtToken = require("../helpers/verJwtToken");

exports.signup = async (req, res) => {
  try {
    const {
      data: { username, email, password, type },
    } = req.body;
    if (!username || !email || !password || !type) {
      return res.json({ error: "Please provide all fields" });
    }

    if (!isEmail(email)) {
      return res.json({ error: "Email is invalid" });
    }

    if (!isStrongPassword(password)) {
      return res.json({ error: "Strong password is required" });
    }

    if (!!(await prisma.user.findFirst({ where: { email: email } }))) {
      return res.json({ error: "Already registered" });
    }
    if (!!(await prisma.organization.findFirst({ where: { email: email } }))) {
      return res.json({ error: "Already registered" });
    }

    const hash = await argon2.hash(password);
    let user = "";
    let org = "";

    if (type == "normal") {
      user = await prisma.user.create({
        data: {
          name: username,
          email: email,
          password: hash,
        },
      });
    } else {
      org = await prisma.organization.create({
        data: {
          name: username,
          email: email,
          password: hash,
          type: type,
        },
      });
    }

    const signedToken = getjwtToken(user.id || org.id);

    return res
      .cookie("token", signedToken, {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({
        success: true,
        signedToken,
      });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const {
      data: { email, password },
    } = req.body;

    if (!email || !password) {
      return res.json({ error: "Please provide all fields" });
    }

    if (!isEmail(email)) {
      return res.json({ error: "Email is invalid" });
    }

    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    const org = await prisma.organization.findFirst({
      where: { email: email },
    });

    if (!user && !org)
      return res.json({ error: "You must need to register first." });

    if (!!org && !(await argon2.verify(org.password, password))) {
      return res.json({ error: "Incorret password" });
    }

    if (!!user && !(await argon2.verify(user.password, password)))
      return res.json({ error: "Incorret password" });

    let signedToken;

    if (!!org) signedToken = getjwtToken(org.id);
    if (!!user) signedToken = getjwtToken(user.id);

    return res
      .cookie("token", signedToken, {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({
        success: true,
        signedToken,
      });
  } catch (err) {
    res.json({ error: "Internal server error" });
  }
};

exports.checkauth = async (req, res) => {
  const tk = req.headers["authorization"];
  if (!tk) return res.sendStatus(403);

  if (!verJwtToken(tk)) return res.sendStatus(403);

  const { userId, iat, exp } = verJwtToken(tk);

  if (exp > Date.now()) {
    return res.sendStatus(403);
  }

  const checkUser = await prisma.user.findFirst({ where: { id: userId } });
  const checkOrg = await prisma.organization.findFirst({
    where: { id: userId },
  });

  if (!checkUser && !checkOrg) {
    return res.sendStatus(403);
  } else if (!!checkUser) {
    return res.json({ auth: true, type: "normal" });
  } else if (!!checkOrg) {
    return res.json({ auth: true, type: "org" });
  }

  return res.sendStatus(200);
};

exports.logout = (req, res) => {
  res.clearCookie("token");

  return res.sendStatus(200);
};

exports.needsAdd = async (req, res) => {
  const { items, type } = req.body;
  const tk = req.headers["authorization"];

  if (!tk) return res.sendStatus(403);

  const { userId } = verJwtToken(tk);

  if (type == "normal") {
    if (await prisma.user.findFirst({ where: { id: userId } }))
      await prisma.user.update({
        where: { id: userId },
        data: {
          updatedAt: new Date(Date.now()),
          need: items,
        },
      });
  }

  return res.sendStatus(200);
};

exports.changeLoca = async (req, res) => {
  const { location, type } = req.body;
  const tk = req.headers["authorization"];

  if (!tk) return res.sendStatus(403);

  const { userId } = verJwtToken(tk);

  if (type == "normal") {
    if (await prisma.user.findFirst({ where: { id: userId } }))
      await prisma.user.update({
        where: { id: userId },
        data: {
          updatedAt: new Date(Date.now()),
          location: location,
        },
      });
  }

  return res.sendStatus(200);
};

exports.showProfile = async (req, res) => {
  const tk = req.headers["authorization"];

  if (!tk) return res.sendStatus(403);
  let user;
  const { userId } = verJwtToken(tk);

  const checkUser = await prisma.user.findFirst({ where: { id: userId } });
  const checkOrg = await prisma.organization.findFirst({
    where: { id: userId },
  });

  if (!checkUser && !checkOrg) return;

  if (!!checkUser)
    return res.json({
      name: checkUser.name,
      mail: checkUser.email,
      address: checkUser.location,
      preferences: checkUser.need,
    });

  if (!!checkOrg)
    return res.json({
      name: checkOrg.name,
      mail: checkOrg.email,
      address: checkOrg.location,
    });
};
