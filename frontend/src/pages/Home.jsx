import React, { useEffect } from "react";
import Header from "../components/layout/header/Header";
import Hero from "../components/layout/body/hero/Hero";
import Categories from "../components/layout/body/categories/Categories";
import Deals from "../components/layout/body/product/Deals";

import Sponsor from "../components/layout/body/sponsor/Sponsor";
import Footer from "../components/layout/body/footer/Footer";
import BeFriend from "../components/layout/body/sponsor/BeFriend";

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <Deals />
      <Sponsor />
      <BeFriend />
    </div>
  );
};

export default Home;
