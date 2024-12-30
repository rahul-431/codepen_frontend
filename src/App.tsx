import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import Pen from "./pages/Pen";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Signup from "./features/auth/Authentication";
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/auth" element={<Signup />} />
          </Route>
          <Route path="/pen" element={<Pen />}></Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
