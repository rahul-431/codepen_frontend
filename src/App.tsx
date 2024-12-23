import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import Pen from "./pages/Pen";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/pen" element={<Pen />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
