import React, { useEffect, useState } from "react";
import { Layout, Menu, Spin } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  UserSwitchOutlined,
  MoneyCollectOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "./layout.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const { Header, Sider, Content } = Layout;

const LayoutApp = ({ children }) => {
  const { cartItems, loading } = useSelector((state) => state.cartItems);

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "Home",
      onClick: () => {
        navigate("/");
      },
    },
    {
      key: "/bills",
      icon: <MoneyCollectOutlined />,
      label: "Bills",
      onClick: () => {
        navigate("/bills");
      },
    },
    {
      key: "/products",
      icon: <HomeOutlined />,
      label: "Products",
      onClick: () => {
        navigate("/products");
      },
    },
    {
      key: "/customers",
      icon: <UserSwitchOutlined />,
      label: "Customers",
      onClick: () => {
        navigate("/customers");
      },
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "LogOut",
      onClick: () => {
        localStorage.removeItem("auth");
        navigate("/login");
      },
    },
  ];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="logo-title" onClick={() => navigate("/")}>
            BOOK STORE
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
          items={menuItems}
        ></Menu>
      </Sider>
      {loading ? (
        <Spin size="large" tip="Loading..." className="spin" />
      ) : (
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
            <div className="cart-items" onClick={() => navigate("/cart")}>
              <ShoppingCartOutlined />
              <span className="cart-badge">{cartItems.length}</span>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      )}
    </Layout>
  );
};

export default LayoutApp;
