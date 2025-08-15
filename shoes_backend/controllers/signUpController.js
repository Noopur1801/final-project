const User = require("./../models/signUpModel");

const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: false,
    httpOnly: true,
    sameSite: "none",
    path: "/",
  };

  res.setHeader(
    "Set-Cookie",
    `jwt=${token}; expires=${cookieOptions.expires}; Path=/; HttpOnly; SameSite=${cookieOptions.sameSite};`
  );

  user.password = undefined;

  res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, role, password, address } = req.body;
    const profilePicture = req.file ? req.file.filename : undefined;

    const user = await User.create({
      name,
      email,
      role,
      password,
      profilePicture,
      address,
    });

    const token = signToken(user._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).json({
        success: "Failed",
        message: "Please enter email and password!",
      });
    }

    const currentUser = await User.findOne({ email }).select("+password");

    if (
      !currentUser ||
      !(await currentUser.checkPassword(password, currentUser.password))
    ) {
      return res.status(401).json({
        success: "Failed",
        message: "Incorrect email or password!",
      });
    }

    createSendToken(currentUser, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.jwtcookie) {
    token = req.headers.jwtcookie;
  }

  if (!token) {
    return res.status(401).json({ message: "You are not logged in!" });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        message: "The user belonging to this token no longer exists.",
      });
    }

    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

exports.adminProtect = async (req, res, next) => {
  try {
    if (req.user.role == "admin") {
      return next();
    }

    return res.status(401).json({
      message: "You don't have admin privileges",
    });
  } catch (err) {
    return res
      .status(401)
      .json({ message: "You don't have admin privileges!" });
  }
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.headers.jwtcookie) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.headers.jwtcookie,
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }
      res.locals.user = currentUser;

      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.getLoggedInUser = (req, res, next) => {
  if (res.locals.user) {
    res.status(200).json({ status: "success", loggedInUser: res.locals.user });
  } else {
    res.status(404).json({ status: "Failed", message: "no user found!" });
  }
};
