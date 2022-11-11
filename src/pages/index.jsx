import { getJWTCookie } from "~/api-utils/jwt";
import LichessApi from "~/api-utils/lichess-api";
import { Button, Box } from "@chakra-ui/react";
import NavBar from "~/components/NavBar";

const Page = ({ profile }) => {
  return (
    <Box>
      <NavBar username={profile?.username} />
      <Box p={4}>
        {profile && (
          <pre>
            <code>{JSON.stringify(profile, null, 2)}</code>
          </pre>
        )}
      </Box>
    </Box>
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
