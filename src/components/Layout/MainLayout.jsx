import React from 'react';
import Navbar from '../Navigation/Navbar';
import Footer from '../Footer/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;