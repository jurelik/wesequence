import "focus-visible/dist/focus-visible";
import '../styles/globals.css';
import { Provider  } from "react-redux";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import store from "redux/store";

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
  }
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
