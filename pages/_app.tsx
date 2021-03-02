import "focus-visible/dist/focus-visible";
import '../styles/globals.css';
import { Provider  } from "react-redux";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools"
import store from "redux/store";

// This is the default breakpoint
const breakpoints = createBreakpoints({
  sm: "45em",
  md: "66em",
  lg: "72em",
  xl: "80em",
  "2xl": "90em",
})

const theme = extendTheme({
  components: {
    Editable: {
      baseStyle: {
        input: {
          _focus: null,
        }
      }
    }
  },
  colors: {
    gray: {
      100: "#d5d5d5",
      200: "#bbb",
      300: "#999",
    },
    green: {
      50: "#dcebd5",
      100: "#d7e6d1"
    },
    red: {
      50: "#f2dcdc",
      100: "#e6cccc",
      500: "#cc5a5a",
      600: "#ba5252",
      700: "#ab4b4b"
    },
    yellow: {
      500: "#e0b763",
      600: "#d4ac5b",
    },
    white: "#eee",
    black: "#222"
  },
  styles: {
    global: {
      "html, body": {
        color: "#222",
      }
    }
  },
  breakpoints
});


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
