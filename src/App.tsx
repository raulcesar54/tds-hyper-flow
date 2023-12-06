import { ProviderBoard } from "./hooks/useBoard";
import { FlowProvider } from "./hooks/useFlow";
import Main from "./pages/main";
import "./styles/Home.module.css";
import "./styles/globals.css";

function App() {
  return (
    <div className="App">
      <FlowProvider>
        <ProviderBoard>
          <Main />
        </ProviderBoard>
      </FlowProvider>
    </div>
  );
}

export default App;
