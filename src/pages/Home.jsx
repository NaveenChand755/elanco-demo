import React from "react";
import Main from "../components/Table";

const Home = (props) => {
    const { data, loading } = props
  return <Main data={data} loading={loading}></Main>;
};

export default Home;
