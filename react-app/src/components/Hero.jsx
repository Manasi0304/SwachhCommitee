import "./Hero.css";
import { HiLocationMarker } from "react-icons/hi";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="hero" className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* left side */}
        <div className="flexColStart hero-left">
          <div className="hero-title">

            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: "ease-in",
              }}
            >
              Efficient <br />
              Waste Management <br />
              for a Sustainable Future
            </motion.h1>

          </div>
          <div className="flexColStart secondaryText flexhero-des">
            <span>Our Services Make Recycling Easy</span>
            <span>We provide solutions that fit your needs and promote sustainability.</span>
          </div>


          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={450} end={500} duration={3} /> <span>+</span>
              </span>
              <span className="secondaryText">Waste Recycled</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp start={0} end={100} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Registered Customers</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp end={18} /> <span>+</span>
              </span>
              <span className="secondaryText">Number of Collection Events</span>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default Hero;
