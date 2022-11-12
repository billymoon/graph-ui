import { getJWTCookie } from "~/api-utils/jwt";
import LichessApi from "~/api-utils/lichess-api";
import { Box } from "@chakra-ui/react";
import NavBar from "~/components/NavBar";
import { useTina } from "tinacms/dist/react";
import { client } from "$/.tina/__generated__/client";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { css } from "@emotion/react";

const components = {
  p: ({ ...props }) => (
    <p
      css={css`
        color: $pink;
      `}
    >
      {props.children}
    </p>
  ),
};

const Page = ({ query, variables, data: dataIn, profile }) => {
  const { data } = useTina({
    query,
    variables,
    data: dataIn,
  });

  const content = data.page.body;

  return (
    <Box>
      <NavBar username={profile?.username} />
      <Box p={4}>
        <TinaMarkdown content={content} components={components} />
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
  const { data, query, variables } = await client.queries.page({
    // For dynamic paths akin to [slug].jsx grab params from context and...
    //   relativePath: `${params.slug}.mdx`,
    relativePath: `home.mdx`,
  });

  return {
    props: {
      profile,
      data,
      query,
      variables,
    },
  };
}
export default Page;
