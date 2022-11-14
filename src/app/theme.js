import { theme, extendTheme } from "@chakra-ui/react";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const { FONT } = publicRuntimeConfig;

const emotionTheme = extendTheme({
  fonts: {
    body: `${FONT}, Sans-Serif`,
    heading: `${FONT}, Sans-Serif`,
    mono: "Courier, Sans-Serif",
  },
  styles: {
    global: ({ colorMode }) => ({
      body: {
        bg: `lichess.${colorMode}.buttonGradientEnd`,
        color: `lichess.${colorMode}.buttonTextColor`,
      },
    }),
  },
  radii: {
    ...theme.radii,
    lichessButton: "3px",
  },
  components: {
    Button: {
      baseStyle: ({ colorMode, theme }) => ({
        color: `lichess.${colorMode}.buttonTextColor`,
        borderRadius: "lichessButton",
        textTransform: "uppercase",
        fontWeight: "normal",
        bg: `lichess.${colorMode}.buttonGradientStart`,
        bgGradient: theme.gradients.lichess[colorMode].button,
        boxShadow: "md",
        _hover: {
          color: `lichess.${colorMode}.buttonTextColorHover`,
          bg: `lichess.${colorMode}.buttonGradientStart`,
          bgGradient: theme.gradients.lichess[colorMode].buttonHover,
          boxShadow: "lg",
        },
        _active: {
          color: `lichess.${colorMode}.buttonTextColorHover`,
          bg: `lichess.${colorMode}.buttonGradientStart`,
          bgGradient: theme.gradients.lichess[colorMode].buttonHover,
          boxShadow: "sm",
        },
        _focus: {
          boxShadow: "none",
        },
      }),
    },
  },
  gradients: {
    lichess: {
      light: {
        button:
          "linear(to-b, lichess.light.buttonGradientStart, lichess.light.buttonGradientEnd)",
        buttonHover:
          "linear(to-b, lichess.light.buttonGradientStartHover, lichess.light.buttonGradientEndHover)",
      },
      dark: {
        button:
          "linear(to-b, lichess.dark.buttonGradientStart, lichess.dark.buttonGradientEnd)",
        buttonHover:
          "linear(to-b, lichess.dark.buttonGradientStartHover, lichess.dark.buttonGradientEndHover)",
      },
    },
  },
  colors: {
    lichess: {
      light: {
        buttonTextColor: "#787878",
        buttonTextColorHover: "#787878",
        buttonGradientStart: "#f5f5f5",
        buttonGradientEnd: "#ededed",
        buttonGradientStartHover: "#fafafa",
        buttonGradientEndHover: "#f2f2f2",
      },
      dark: {
        buttonTextColor: "#999",
        buttonTextColorHover: "#ccc",
        buttonGradientStart: "#3c3934",
        buttonGradientEnd: "#33312e",
        buttonGradientStartHover: "#44413b",
        buttonGradientEndHover: "#3b3935",
      },
    },
  },
});

export default emotionTheme;
