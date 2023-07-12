import "./App.css";
import Router from "./shared/Router";
import { GlobalStyle } from "./style/GlobalStyle";
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "./style/GlobalStyle";
import { ThemeProvider } from "styled-components";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
