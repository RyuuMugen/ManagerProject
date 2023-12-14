import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  console.log(process.env.REACT_APP_Demo_APP_API_URL);
  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Home;
