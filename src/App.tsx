import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
