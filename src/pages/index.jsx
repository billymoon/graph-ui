import { getJWTCookie } from "~/api-utils/jwt";
import LichessApi from "~/api-utils/lichess-api";

const Page = ({ profile }) => {
  return profile ? (
    <div>
      I know who you are:{" "}
      <pre>
        <code>{JSON.stringify(profile, null, 2)}</code>
      </pre>
    </div>
  ) : (
    <div>
      <a href="/api/auth/signin">Sign in through Lichess</a>
    </div>
  );
};

export async function getServerSideProps({ req, res }) {
  const { access_token, exp } = getJWTCookie("LICHESS_AUTH", req, res);
  const lichessApi = LichessApi(req, res);
  const profile = access_token ? await lichessApi.user() : null;
  return {
    props: {
      profile,
    },
  };
}
export default Page;
