import { User } from "../../model";
import jwt from "jsonwebtoken";

interface UserAttributes {
  username: string;
  email: string;
  password: string;
  access_token: string;
  refresh_token: string;
}

const registerService = async (data: UserAttributes) => {
  try {
    const userData = await User.create(data);
    // Generate JWT token
    const token = jwt.sign({ userId: userData.id }, "abcdefghijklmnopqrstuv", {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(
      { userId: userData.id },
      "abcdefghijklmnopqrstuv",
      { expiresIn: "3d" }
    );
    userData.access_token = token;
    userData.refresh_token = refreshToken;
    User.update(
      { access_token: token, refresh_token: refreshToken },
      {
        where: {
          id: userData.id,
        },
      }
    );
    return userData;
  } catch (err) {
    throw err;
  }
};

export default { registerService };
