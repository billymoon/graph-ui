import LichessApi from "~/api-utils/lichess-api";

const apiHandler = async (req, res) => {
  const lichessApi = LichessApi(req, res);
  res.json(await lichessApi.user(req.query.id));
};

export default apiHandler;
