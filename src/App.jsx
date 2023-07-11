import "./App.css";
import Router from "./shared/Router";
import { GlobalStyle } from "./style/GlobalStyle";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle/>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
