import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/sections/Home";
import Nav from "./components/sections/Nav";
import CartState from "./context/CartState";
import CartContainer from "./components/CartContainer";
import { ToastContainer } from "react-toastify";
import ProductsContainer from "./components/ProductsContainer";
import AdminDashboard from "./components/admin/dashboard/AdminDashboard";
import LoginForm from "./components/admin/auth/LoginForm";
import RegisterForm from "./components/admin/auth/RegisterForm";
import Footer from "./components/sections/Footer";
import { AuthProvider } from "./context/AuthContext";
import { useEffect } from "react";
import SuccessPage from "./components/SuccessPage";
import PendingPage from "./components/PendingPage";
import FailurePage from "./components/FailurePage";
import NotFoundPage from "./components/NotFoundPage";
import ScrollToTop from "./components/ScrollToTop";
import { useLocation } from "react-router-dom";

const location = useLocation();

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};
function App() {
  return (
    <AuthProvider>
      <CartState>
        <Router>
          <ScrollToTop />
          <Nav />
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsContainer />} />
            <Route path="/products/:id" element={<ProductsContainer />} />
            <Route path="/cart" element={<CartContainer />} />
            <Route
              path="/register"
              element={
                <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
                  <RegisterForm />
                </div>
              }
            />{" "}
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/pending" element={<PendingPage />} />
            <Route path="/failure" element={<FailurePage />} />
          </Routes>
          <Footer />
        </Router>
        <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          theme="dark"
          position="bottom-right"
          autoClose={2000}
        />
      </CartState>
    </AuthProvider>
  );
}

export default App;
