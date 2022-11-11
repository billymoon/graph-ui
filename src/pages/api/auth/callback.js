// import jwt from 'jsonwebtoken';
// import { setCookie } from 'cookies-next';
import getConfig from "next/config";
import getBaseUrl from "~/utils/get-base-url";
import { decrypt } from "~/utils/crypt";
import { setJWTCookie } from "~/api-utils/jwt";

const { serverRuntimeConfig } = getConfig();

const apiHandler = async (req, res) => {
  const state = JSON.parse(decrypt(req.query.state));
  const details = {
    grant_type: "authorization_code",
    code: req.query.code,
    code_verifier: state.code_verifier,
    redirect_uri: `${getBaseUrl(req)}/api/auth/callback`,
    client_id: serverRuntimeConfig.LICHESS_CLIENT_ID,
  };

  const bodyArr = [];
  for (const property in details) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(details[property]);
    bodyArr.push(encodedKey + "=" + encodedValue);
  }
  const body = bodyArr.join("&");

  const { access_token, expires_in } = await fetch(
    "https://lichess.org/api/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body,
    }
  ).then((r) => r.json());

  // const JWT = jwt.sign({ access_token }, serverRuntimeConfig.JWT_SECRET, { expiresIn: expires_in });

  // setCookie("JWT", JWT, { req, res, maxAge: 60 * 60 * 24 * 365 });
  setJWTCookie("LICHESS_AUTH", { access_token }, expires_in, req, res);
  const Location = getBaseUrl(req);
  res.writeHead(301, { Location }).end();
  // res.json({ ok: true });
};

export default apiHandler;
