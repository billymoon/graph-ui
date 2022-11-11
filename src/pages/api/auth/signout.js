import getBaseUrl from "~/utils/get-base-url";
import { deleteJWTCookie } from "~/api-utils/jwt";

const apiHandler = async (req, res) => {
  deleteJWTCookie("LICHESS_AUTH", req, res);
  const Location = getBaseUrl(req);
  res.writeHead(301, { Location }).end();
};

export default apiHandler;
