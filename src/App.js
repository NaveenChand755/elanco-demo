import React, { useState, useEffect } from "react";
import { Layout, Menu, theme, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import Home from "./pages/Home";
import DownLoad from "./components/Download";
import Graph from "./components/Graph";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faChartSimple } from "@fortawesome/free-solid-svg-icons";
import api from "./api";
const { Header, Content, Footer } = Layout;

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [selectedTab, setSelectedTab] = useState("1");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const showModal = () => {
    setOpen(true);
  };

  const handleSelectedTab = (selected) => {
    setSelectedTab(selected?.key);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.getData();
      setData(response?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
        }}
      >
        <div
          style={{
            float: "left",
            width: 120,
            height: 31,
            margin: "16px 24px 16px 0",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        >
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item
            key="1"
            icon={<FontAwesomeIcon icon={faHouse} />}
            onClick={handleSelectedTab}
          >
            Home
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<FontAwesomeIcon icon={faChartSimple} />}
            onClick={handleSelectedTab}
          >
            Data Visualization
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: "0 10px",
        }}
      >
        <div className="export">
          <div>
            <Button
              type="primary"
              shape="round"
              icon={<DownloadOutlined />}
              onClick={showModal}
              size="small"
            >
              Download
            </Button>
          </div>
        </div>

        <div
          style={{
            padding: 6,
            minHeight: 380,
            background: colorBgContainer,
          }}
        >
          {selectedTab === "1" ? (
            <Home data={data} loading={loading}></Home>
          ) : null}
          {selectedTab === "2" ? (
            <Graph data={data}></Graph>
          ) : null}
          <DownLoad open={open} setOpen={setOpen}></DownLoad>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Elanco ©2023
      </Footer>
    </Layout>
  );
};
export default App;
