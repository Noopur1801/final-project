// // src/components/AboutUs.jsx
// import React from 'react';
// import './AboutUs.css';

// const AboutUs = () => {
//     const teamMembers = [
//         {
//             id: 1,
//             name: 'Lovish',
//             role: 'CEO & Founder',
//             imageUrl: './4.jpg',
//             description: 'Lovish is the visionary behind our brand and leads the company with a focus on innovation and excellence.',
//         },
//         {
//             id: 2,
//             name: 'Mansi',
//             role: 'Chief Designer',
//             imageUrl: './1.jpg',
//             description: 'Mansi is responsible for designing our unique footwear collections, blending style and comfort.',
//         },
//         {
//             id: 3,
//             name: 'Prachi',
//             role: 'Marketing Director',
//             imageUrl: './2.jpg',
//             description: 'Prachi oversees our marketing strategies and campaigns, ensuring our brand reaches a wide audience.',
//         },
//         {
//             id: 4,
//             name: 'Noopur',
//             role: 'Operations Manager',
//             imageUrl: './3.jpg',
//             description: 'Noopur manages the day-to-day operations, ensuring everything runs smoothly and efficiently.',
//         },
//     ];

//     return (
//         <div className="about-us-container">
//             <h1 className="about-us-title">About Us</h1>
//             <p className="about-us-mission">
//                 At Footwear Store, our mission is to provide high-quality, stylish, and comfortable footwear for everyone.
//                 We believe that great shoes can enhance your life, whether you're running a marathon, hiking a trail, or simply going about your day.
//             </p>
//             <div className="team-section">
//                 <h2 className="team-title">Meet Our Team</h2>
//                 <div className="team-members">
//                     {teamMembers.map(member => (
//                         <div key={member.id} className="team-member">
//                             <img src={member.imageUrl} alt={member.name} />
//                             <h3>{member.name}</h3>
//                             <p>{member.role}</p>
//                             <p>{member.description}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <footer className="footer">

//                 <p>
//                     Follow us on
//                     <a href="#" className="text-white mx-1">Facebook</a> |
//                     <a href="#" className="text-white mx-1">Twitter</a> |
//                     <a href="#" className="text-white mx-1">Instagram</a>
//                 </p>
//             </footer>
//         </div>
//     );
// };

// export default AboutUs;
import React from "react";
import "./AboutUs.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Lovish",
      role: "CEO & Founder",
      imageUrl: "./lovish.jpg",
      description:
        "Lovish Barber is the visionary behind our brand and leads the company with a focus on innovation and excellence.",
    },
    {
      id: 2,
      name: "Prachi",
      role: "Chief Designer",
      imageUrl: "./prachi.jpeg",
      description:
        "Prachi Singh is responsible for designing our unique footwear collections, blending style and comfort.",
    },
    {
      id: 3,
      name: "Noopur",
      role: "Marketing Director",
      imageUrl: "./noopur.jpeg",
      description:
        "Noopur Maheswari oversees our marketing strategies and campaigns, ensuring our brand reaches a wide audience.",
    },
    {
      id: 4,
      name: "Mansi",
      role: "Operations Manager",
      imageUrl: "./mansi.jpeg",
      description:
        "Mansi Menaria manages the day-to-day operations, ensuring everything runs smoothly and efficiently.",
    },
    {
      id: 5,
      name: "Heeniksha",
      role: "Director",
      imageUrl: "./heeniksha.jpeg",
      description:
        "Jain Heeniksha Yashwant manages the day-to-day operations, ensuring everything runs smoothly and efficiently.",
    },
  ];

  return (
    <div className="about-us-container">
      <h1 className="about-us-title">About Us</h1>
      <p className="about-us-mission">
        At Sole Sneakers Store, our mission is to provide high-quality, stylish,
        and comfortable footwear for everyone. We believe that great shoes can
        enhance your life, whether you're running a marathon, hiking a trail, or
        simply going about your day.
      </p>
      <section className="about-us-history">
        <h2>Our History</h2>
        <p>
          Footwear Store was established in 2010 with a vision to revolutionize
          the footwear industry. Starting as a small family business, we have
          grown into a well-known brand renowned for our commitment to quality
          and customer satisfaction. Over the years, we have introduced
          innovative designs and sustainable practices, making us a favorite
          among customers.
        </p>
      </section>
      <section className="about-us-values">
        <h2>Our Values</h2>
        <ul>
          <li>
            <strong>Quality:</strong> We use only the best materials and
            craftsmanship to ensure our shoes last and provide exceptional
            comfort.
          </li>
          <li>
            <strong>Customer Satisfaction:</strong> Our customers are at the
            heart of everything we do. We strive to exceed their expectations
            with every pair of shoes.
          </li>
          <li>
            <strong>Innovation:</strong> We are constantly innovating to bring
            you the latest in footwear technology and design.
          </li>
          <li>
            <strong>Sustainability:</strong> We are committed to reducing our
            environmental impact through sustainable sourcing and production
            methods.
          </li>
        </ul>
      </section>
      <div className="team-section">
        <h2 className="team-title">Meet Our Team</h2>
        <div className="team-members">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-member">
              <img src={member.imageUrl} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <p>{member.description}</p>
            </div>
          ))}
        </div>
      </div>
      <footer className="footer">
        <p>
          Follow us on
          <a href="#" className="social-link">
            <FaFacebook />
          </a>
          <a href="#" className="social-link">
            <FaTwitter />
          </a>
          <a href="#" className="social-link">
            <FaInstagram />
          </a>
        </p>
      </footer>
    </div>
  );
};

export default AboutUs;
