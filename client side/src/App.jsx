import { Routes,Route } from 'react-router';
import Home from "./components/Home";
import PracticeScreen from "./Screens/PracticeScreen";
import RankScreen from "./Screens/RankScreen";


function App() {
  return (
    <div >
      <nav className="navb text-center py-2 shadow p-3 mb-5 ">
        <span className="h3 text-white">Test</span>
      </nav>
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/PracticeScreen" element={<PracticeScreen />} />
            <Route path="/RankScreen" element={<RankScreen />} />
      </Routes>
    </div>
  );
}

export default App;