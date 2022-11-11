import LichessApi from "~/api-utils/lichess-api";

const apiHandler = async (req, res) => {
  const lichessApi = LichessApi(req, res);
  res.json(await lichessApi.team(req.query.id));
};

export default apiHandler;
