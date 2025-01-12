import React from 'react';
import '../style/AboutUs.css'; 
import Navbar from '../components/NavBar'; 
import arati from "../images/arati.jpg";
import anshita from "../images/anshita.jpg";
import pushpak from "../images/pushpak.jpg";
import madhuri from "../images/madhuri.jpg";
import jayant from "../images/jayant.jpg";

const teamMembers = [
  { name: 'Arati Somwanshi', PRN: '240340320017', role: 'Project Lead', photo: arati },
  { name: 'Anshita Shukla', PRN: '240340520021', role: 'Team member', photo: anshita },
  { name: 'Pushpak Pandharpatte', PRN: '240340520067', role: 'Team member', photo: pushpak },
  { name: 'Madhuri Khote', PRN: '240340320057', role: 'Team member', photo: madhuri },
  { name: 'Jayant Sharma', PRN: '240340320044', role: 'Team member', photo: jayant },
];

const AboutUs = () => {
  return (
    <div className="AboutUs">
      <Navbar /> 
      
      <div className="vision-mission">
        <h1>Our Vision</h1>
        <p>Sportify is committed to providing the best sports accessories and gear to enhance your performance.<br></br> We aim to offer high-quality products with exceptional customer service to support athletes at every level.</p>
        <h1>Our Mission</h1>
        <p>Founded in 2024, Sportify is the brainchild of five passionate sports enthusiasts. <br></br>Our headquarters is located in the heart of Mumbai, where we work tirelessly to bring you the finest sports gear available.</p>
      </div>
      
      <div className="team">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <img src={member.photo} alt={member.name} className="team-photo" />
            <div className="team-info">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <p>PRN: {member.PRN}</p> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
