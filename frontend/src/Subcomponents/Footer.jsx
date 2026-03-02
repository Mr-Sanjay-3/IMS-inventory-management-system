import React from "react";
import styles from "../scss/footer.module.scss";
import { 
        FaGithub,
        FaLinkedin 
 } from "react-icons/fa";
 import { FaMailchimp } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>© 2026 IMS Project | Built by SANJAY RANJTH SANKAR SANJAY  </p>
  <p className={styles.college}>
       Commerce CA Final Year Students 2023-2026 |  
          <a
          href="https://roevercollege.ac.in/" 
          target="_blank"
          rel="noopener noreferrer"
          className={styles.CollegeTHAR}
          >Thanthai Hans Roever College of Arts and Science (Perambalur)  🎓</a>
        </p>
        <div className={styles.socials}>
   
          
          <a
            href="https://github.com/Mr-Sanjay-3/IMS-inventory-management-system"
            target="_blank"
         
            className={styles.socialLink}
          >
              <FaGithub /> GitHub 
          </a>
          <a
            href="mailto:sanjayprogrammer3@gmail.com"
            className={styles.socialLink}
          >
            <FaMailchimp /> Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;