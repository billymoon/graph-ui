import { getJWTCookie } from "./jwt";

const handleJSONResponse = (r) => r.json();

const handleNDJSONResponse = (r) =>
  r.text().then((text) =>
    text
      .split("\n")
      .filter((str) => str !== "")
      .map(JSON.parse)
  );

const lichessApiAccountMapper = ({ username, url, perfs, profile }) => ({
  username,
  url,
  perfs,
  profile,
});
const lichessApiTeamsMapper = ({
  id,
  name,
  description,
  leaders,
  nbMembers,
}) => ({ id, name, description, leaders, nbMembers });

const LichessApi = (req, res) => {
  const { access_token, exp } = getJWTCookie("LICHESS_AUTH", req, res);

  const fetchWithAuth = (url, options = {}, ...rest) =>
    fetch(
      url,
      {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${access_token}`,
        },
      },
      ...rest
    );

  const lichessApiAccount = () =>
    fetchWithAuth("https://lichess.org/api/account").then(handleJSONResponse);
  const lichessApiProfile = (accountId) =>
    fetchWithAuth(`https://lichess.org/api/user/${accountId}`).then(
      handleJSONResponse
    );
  const lichessApiTeam = (teamId) =>
    fetchWithAuth(`https://lichess.org/api/team/${teamId}`).then(
      handleJSONResponse
    );
  const lichessApiTeams = (accountId) =>
    fetchWithAuth(`https://lichess.org/api/team/of/${accountId}`).then(
      handleJSONResponse
    );
  const lichessApiTeamUsers = (teamId) =>
    fetchWithAuth(`https://lichess.org/api/team/${teamId}/users`).then(
      handleNDJSONResponse
    );

  const user = async (accountId) => {
    const profile = lichessApiAccountMapper(
      accountId ? await lichessApiProfile(accountId) : await lichessApiAccount()
    );
    const teams = (await lichessApiTeams(profile.username)).map(
      lichessApiTeamsMapper
    );
    return { ...profile, teams };
  };

  const team = async (teamId) => {
    const team = lichessApiTeamsMapper(await lichessApiTeam(teamId));
    const users = (await lichessApiTeamUsers(teamId)).map(
      lichessApiAccountMapper
    );
    return { ...team, users };
  };

  return {
    user,
    team,
  };
};

export default LichessApi;
