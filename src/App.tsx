import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProviderBoard } from "./hooks/useBoard";
import { FlowProvider } from "./hooks/useFlow";
import { UsePropertyProvider } from "./hooks/useProperty";
import Main from "./pages/main";
import "./styles/Home.module.css";
import "./styles/globals.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <FlowProvider>
        <ProviderBoard>
          <UsePropertyProvider>
            <Main />
          </UsePropertyProvider>
        </ProviderBoard>
      </FlowProvider>
    </div>
  );
}

export default App;
