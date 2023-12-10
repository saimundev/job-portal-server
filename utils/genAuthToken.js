import jwt from "jsonwebtoken";

const genAuthToken = (user) => {
  const token = jwt.sign(
    { name: user.name, email: user.email, userId: user._id, role: user.role },
    process.env.SECRET,
    { expiresIn: "7d" }
  );

  return token;
};

export default genAuthToken;
