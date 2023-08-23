import { hashSync, compareSync, genSaltSync } from "bcryptjs";
import crypto from "crypto";

export const decryptBase64 = (str: string) => {
  return Buffer.from(str, "base64").toString();
};

export function hashRefreshToken(refreshToken) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedRefreshToken = crypto
    .createHmac("sha256", salt)
    .update(refreshToken)
    .digest("hex");
  return { salt, hashedRefreshToken };
}

export function verifyRefreshToken(
  refreshToken: string,
  salt: string,
  storedHash: string,
) {
  const hash = crypto
    .createHmac("sha256", salt)
    .update(refreshToken)
    .digest("hex");
  return hash === storedHash;
}

export function encodePassword(pwd: string) {
  const SALT = genSaltSync();
  const decodeBase64Pwd = decryptBase64(pwd);
  return hashSync(decodeBase64Pwd, SALT);
}

export function comparePassword(pwd: string, dbPwd: string) {
  const decodeBase64Pwd = decryptBase64(pwd);
  return compareSync(decodeBase64Pwd, dbPwd);
}

export function isValidPassword(pwd: string) {
  const decodeBase64Pwd = decryptBase64(pwd) || "";
  const pwdRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*)(?=.{8,})");
  return pwd && pwdRegex.test(decodeBase64Pwd);
}

export function isValidPasswordWithoutRegex(pwd: string) {
  const decodeBase64Pwd = decryptBase64(pwd) || "";
  return pwd && decodeBase64Pwd;
}
