import './App.css';

import Options from "./components/Options";
import Notifications from "./components/Notifications"
import Video from "./components/Video"
function App() {
  return (
    <div className="App">
      <div className="main_div">
        <h1>YEJPE</h1>

        {/* components */}
        
        <Video/>
        <Options>
           <Notifications/>
         </Options>

      </div>
    </div>
  );
}

export default App;
