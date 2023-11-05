import bg from "../../assets/bg.png";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="containerr">
      <div className="item">
        <img src={bg} />
      </div>
      <div className="item">
        <div className="card">
          <h2 className="motto">
            "Where Taste Meets Tradition, An Epicurean Expedition Awaits!".
          </h2>
        </div>
        <div className="card">
          <h1 className="title">FIND OUR RESTAURANTS</h1>
          <p className="text">
            1654 R. Don Road #304.
            <br /> NewYork, 85022
            <br /> (602) 867-1010
          </p>
          <p className="text">
            2356 K. Laquie Rd #235.
            <br /> NewYork, 85022
            <br /> (602) 867-1011
          </p>
          <p className="text">
            1614 E. Erwin St #104.
            <br /> NewYork, 85022
            <br /> (602) 867-1012
          </p>
          <p className="text">
            1614 W. Caroll St #125.
            <br /> NewYork, 85022
            <br /> (602) 867-1013
          </p>
        </div>
        <div className="card">
          <h1 className="title">WORKING HOURS</h1>
          <p className="text">
            MONDAY UNTIL FRIDAY
            <br /> 9:00 – 22:00 PM
          </p>
          <p className="text">
            SATURDAY - SUNDAY
            <br /> 12:00 – 24:00 PM
          </p>
        </div>
        <p style={{ color: "gold" }}>
          &copy; 2023 Manoj singh Kandari.
          <br /> All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
