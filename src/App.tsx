import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Search from "./components/Search";
import About from "./components/About";
import Studentupload from "./components/Student Upload";
import Form from "./components/Form"; // Adjust the path if necessary
import Description from "./components/Description";
import MainData from "./components/MainData";

const Welcome: React.FC = () => (
  <div>
    <Description text="Discover your path to college acceptance" text2="" />
    <MainData
      h1="Navigate the admission landscape with ease!"
      text1={
        <>
          Whether you’re exploring the traditional academic qualifications
          needed or discovering unique paths to gain acceptance into college,
          we’ve got it all. Search by school, degree, or use your own grades to
          find out where you stand,{" "}
          <NavLink to="/search" className="inline-link">
            right here
          </NavLink>
          ! Or are you already an enrolled student? Great, then share your stats{" "}
          <NavLink to="/contact" className="inline-link">
            here
          </NavLink>{" "}
          to help future students realize their dreams.
        </>
      }
      h2="Our Goal"
      text2="At Admission Compass, our goal is to help potential students with the admissions process. 
      Our mission is to empower students with clear, accessible information, ensuring that students have the knowledge
       they need about the different admissions requirements available to them."
    />
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/search" element={<Search />} />
          <Route path="/Student Upload" element={<Studentupload />} />
          <Route path="/about" element={<About />} />
          <Route path="/form" element={<Form />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
