import "./App.scss";
// import Home from "./components/routes/Home";
import AIDescription from "./components/Ai/AiwithImage"
import StreamlitApp from "./components/Ai/Streamlit"
import Home from "./components/Home";
import ResetPassword from "./components/routes/ResetPassword";
import Header from "./components/navbar/Header";
import About from "./components/routes/About";
import Footer from "./components/navbar/Footer";
import Editor from "./components/editor/Editor";
import ServerMessage from "./components/routes/ServerMessage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/editor" element={<Editor />} />
      <Route path="/" element={<Home />} />
      <Route path="/erai" element={<AIDescription />} />
      <Route path="/streamlit" element={<StreamlitApp />} />

      <Route element={
        <div className="main-page">
          <Header />
          <div className="inner-body">
            <Routes>
              <Route path="/resetpassword/*" element={<ResetPassword />} />
              <Route path="/msg" element={<ServerMessage />} />
              <Route path="/about" element={<About />} />
              <Route path="/home" element={<Home />} />

              {/* <Route path="/" element={<Home />} /> */}
            </Routes>
          </div>
          <Footer />
        </div>
      } />
    </Routes>
  </Router>
  );
};

const NoMatchPage = () => {
  document.title = "404";
  return (
    <div className="general-centered-container">
      <div className="container">
        <h1>404 - Nope, nothing here.</h1>
      </div>
    </div>
  );
};

export default App;

