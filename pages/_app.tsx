import '../styles/globals.css'
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
  }
})

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
