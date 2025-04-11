import "./App.css";
import Footer from "./components/Footer";
import GetStarted from "./components/GetStarted";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Initiatives from "./components/Initiatives";
import Reviews from "./components/Reviews";
import Chatbot from "./components/Chatbot";


import CalendarSchedule from "./components/CalendarSchedule";

function App() {
  return (
    <div className="App" id="mainHome">
      <div>
        <div className="white-gradient" />
        <video className="bg-video" autoPlay loop muted>
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        <Header />
        <Hero />
      </div>
      <Features/>
      <Initiatives/>
      <Reviews/>
      <GetStarted/>
      <Footer/>
      <Chatbot/>
    </div>
  );
}

export default App;
