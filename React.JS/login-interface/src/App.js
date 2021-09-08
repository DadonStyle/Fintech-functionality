import "./App.css";
import { Routing } from "./Routing/Routing";
import "notyf/notyf.min.css";
import MenuBar from "./Components/MenuBar/MenuBar";

function App() {
  return (
    <div className="App">     
        <header>
          <MenuBar />
        </header>
        <body>
          <Routing />
        </body>
    </div>
  );
}

export default App;
