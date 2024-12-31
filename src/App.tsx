import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import Pen from "./pages/Pen";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Signup from "./features/auth/Authentication";
import { Toaster } from "./components/ui/sonner";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./layout/AppLayout";
import YourWork from "./pages/YourWork";
import Following from "./pages/Following";
import Trending from "./pages/Trending";
import Profile from "./pages/Profile";
const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="auth" element={<Signup />} />
            </Route>
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="your-work" />} />
              <Route path="your-work" element={<YourWork />} />
              <Route path="following" element={<Following />} />
              <Route path="trending" element={<Trending />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="pen" element={<Pen />}></Route>
          </Routes>
        </Router>
      </Provider>
      <Toaster />
    </>
  );
};

export default App;
