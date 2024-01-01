import Admin from "../models/adminModel.js";

export const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const existinguser = await Admin.findOne({ email: email });
    if (existinguser) {
      return res.status(409).json({
        warning: "Admin with that email already exists",
        success: false,
      });
    }
    const adminInfo = new Admin({
      email: email,
      password: password,
    });
    const admin = await Admin.create(adminInfo);
    return res.status(201).json({
      message: "New admin account has been registered ",
      success: true,
    });
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.username === 1
    ) {
      // Duplicate key error for the username field
      return res.status(400).json({
        message: "User with this username already exists",
        success: false,
      });
    } else {
      return res.status(500).json({
        message: "Error creating user",
        error: error.message,
        success: false,
      });
    }
  }
};

export const adminlogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const findUser = await User.findOne({ email });
  if (!findUser || !(await findUser.isPasswordMatched(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  res.json({
    token: createJwtToken(findUser?._id),
    user: {
      _id: findUser?._id,
      username: findUser?.username,
      email: findUser?.email,
    },
  });
};
