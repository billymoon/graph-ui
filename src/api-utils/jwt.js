import { getCookie, setCookie, deleteCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import getConfig from "next/config";
import { encrypt, decrypt } from "~/utils/crypt";

const { serverRuntimeConfig } = getConfig();

export const setJWTCookie = (key, data, exp, req, res) => {
  const JWT = jwt.sign(data, serverRuntimeConfig.JWT_SECRET, {
    expiresIn: exp,
  });
  setCookie(key, encrypt(JWT), { req, res, maxAge: 60 * 60 * 24 * 365 });
};

export const getJWTCookie = (key, req, res) => {
  const JWT = getCookie(key, { req, res });
  return JWT ? jwt.decode(decrypt(JWT)) : {};
};

export const deleteJWTCookie = (key, req, res) =>
  deleteCookie(key, { req, res });
