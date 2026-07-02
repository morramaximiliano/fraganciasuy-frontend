import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import CartState from "./context/CartState";
import CartContainer from "./components/CartContainer";
import { ToastContainer } from "react-toastify";
import ProductsContainer from "./components/ProductsContainer";
import AdminDashboard from "./components/admin/AdminDashboard";
import LoginForm from "./components/admin/LoginForm";
import RegisterForm from "./components/admin/RegisterForm";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { useEffect } from "react";
import SuccessPage from "./components/SuccessPage";
import PendingPage from "./components/PendingPage";
import FailurePage from "./components/FailurePage";
import NotFoundPage from "./components/NotFoundPage";
import ScrollToTop from "./components/ScrollToTop";

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") {
    navigate("/");
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
          <Routes>
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
