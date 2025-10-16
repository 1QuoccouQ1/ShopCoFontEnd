import "./App.css";
import { Outlet } from "react-router-dom";
// import { UserProvider } from './ContextAPI/UserContext';
import Nav from "./page/Nav/Nav.jsx";
import Footer from "./page/Footer/Footer.jsx";
import "./hooks/useCarousel/embla.css";
import "./hooks/useThumbnailsProduct/thumbnails.css";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./services/ScrollToTop.jsx";

function App() {
  return (
    <>
      {/* <UserProvider> */}
      <div className="flex min-h-screen bg-[#f4f7fe] w-full ">
        <div className="  relative bg-medium w-full  pr-1">
          <Nav></Nav>
          <ScrollToTop />
          <div className=" w-full">
            <Outlet />
          </div>
          <Footer></Footer>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
      {/* </UserProvider> */}
    </>
  );
}

export default App;
