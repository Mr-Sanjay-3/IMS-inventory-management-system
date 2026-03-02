import React, { useEffect, useState } from "react";
import styles from "../scss/aboutDevelopers.module.scss";
import Footer from "../Subcomponents/Footer";
import Loader from "../Subcomponents/LoadingAnimation";
import { FaConnectdevelop } from "react-icons/fa";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";


const developers = [

  {
     name: "RANJTH KUMAR M",
    role: " Assistant UI/UX Helper",
    ID: "23UCC032",
    description: "Designing clean interfaces with smooth user vibes ✨🎯",
    color: "#6b92ff",
   connect : [ 
      {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/yourprofile"
    },
    {
      platform: "GitHub",
      url: "https://github.com/yourprofile"
    },
    {
      platform: "Instagram",
      url: "https://instagram.com/yourprofile"
    }
  ]
  },
  {
    
    name: "SANJAY KUMAR M",
    role: "Information Curator",
    ID: "23UCC033",
    description: "Collecting chaos and crafting structured knowledge 🧠✨",
    color: "#6bffb0",

  connect : [
      {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/yourprofile"
    },
    {
      platform: "GitHub",
      url: "https://github.com/yourprofile"
    },
    {
      platform: "Instagram",
      url: "https://instagram.com/yourprofile"
    }
  ]
  },
  {
    name: "SANJAY KUMAR",
    role: "Fullstack Hero",
    ID: "23UCC034",
    description: "Brings front & back together smoothly 🚀⚡",
    color: "#ff6b6b",
    connect : [
      {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/sanjay-s-044945354"
    },
    {
      platform: "GitHub",
      url: "https://github.com/Mr-Sanjay-3"
    },
    {
      platform: "Portfolio",
      url: "https://sanjay-kumar-web.vercel.app"
    }
    
  ]
  },
  {
    name: "SANKAR A",
    role: "UX/UI Guru",
    ID :"23UCC035",
    description: "Makes sure the IMS is gorgeous and usable ✨🎯",
    color: "#ffda6b",
    connect : [
      {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/yourprofile"
    },
    {
      platform: "GitHub",
      url: "https://github.com/yourprofile"
    },
    {
      platform: "Instagram",
      url: "https://instagram.com/yourprofile"
    }
  ]
    

  },
];
const AboutDevelopersPage = () => {
  const [Loading , setLoadig]= useState(false);
  const getIcon = (platform) => {
  switch (platform) {
    case "LinkedIn":
      return <FaLinkedin />;
    case "GitHub":
      return <FaGithub />;
    case "Instagram":
      return <FaInstagram />;
      case "Portfolio":
        return <FaConnectdevelop />
    default:
      return null;
  }
};
useEffect( ()=> {
 const Timer = setTimeout(()=>{
  setLoadig(true);
 },4000);

 return clearTimeout(Timer);

},[]);

if(Loading){
  return <Loader />;
} 
  return (
    <>

    <div className={styles.container}>
      <h1 className={styles.title}>Meet Our Awesome Team</h1>
      <p className={styles.scroll}>Scroll Page</p>

      <div className={styles.grid}>
        {developers.map((dev, index) => (
          <div
            key={index}
            className={styles.card}
            style={{ borderTop: `4px solid ${dev.color}` }}
          >
            <h2 className={styles.devName}>{dev.name}</h2>
            <h3 className={styles.devRole}>{dev.role}</h3>
            <p>ID {dev.ID}</p>
            <p className={styles.devDesc}>{dev.description}</p>
            <div className={styles.avatar}>
              <span role="img" aria-label="avatar">
                👤
              </span>
              <div className={styles.socialLinks}>
                {dev.connect?.map((item, i)=>(
                  <a 
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"  
                  className={styles.icon} 
                  >
              {getIcon(item.platform)}               
                 </a>
            ))}
                </div>
            </div>
          </div>
        ))}
      </div>

      <section className={styles.project}>
        <h2>About Our Project</h2>
        <p>
          We created <strong>IMS – Inventory Management System</strong> for
          small shops like Malligai Basic Shop 🏪 because keeping track of
          products manually is a nightmare 😵‍💫.
        </p>
        <p>
          Our goal: Make it <strong>fast, organized, and fun</strong> for
          shopkeepers. We also added staff management, product history, and
          role-based access.
        </p>
        <p className={styles.humor}>
          And yes, we tested it ourselves—no more sticky notes flying around!
          📌😂
        </p>
                <h2>Feature Update</h2>
           <p className={styles.humor}>
  Feature update alert: <strong>Mobile app incoming + barcode scanning </strong>so fast you'll wonder why you ever suffered with keyboards and sticky notes! 📱🔍 No more manual entry disasters—your phone's camera is now your new best employee (and it never asks for leave) 😎😂
</p>

      </section>
    </div>
    <Footer />
    </>
  );
};

export default AboutDevelopersPage;