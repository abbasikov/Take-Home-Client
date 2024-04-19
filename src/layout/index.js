/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { Layout, Menu, Row, Col, Tooltip } from 'antd';
import { DashboardOutlined, LogoutOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../static/assets/React_Logo.jpeg';

import { LayoutWrapper } from './style';

const { Header, Sider, Content, Footer } = Layout;

const ThemeLayout = WrappedComponent => {
  class LayoutComponent extends Component {
    constructor(props) {
      super(props);
      this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
      window.addEventListener('resize', this.updateDimensions);
      this.updateDimensions();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions() {}

    handleLogout() {}

    render() {
      return (
        <LayoutWrapper>
          <Layout className="layout-parent-wrap">
            <div>
              <Header className="layout-header-wrap">
                <div className="layout-outer-wrap">
                  <div className="layout-div-wrap">
                    <h2 className="layout-title-wrap">Take Home Client</h2>
                  </div>
                  <div className="">
                    <div className="layout-div-wrap">
                      {/* <Tooltip title="Logout">
                        <LogoutOutlined onClick={this.handleLogout} />
                      </Tooltip> */}
                    </div>
                  </div>
                </div>
              </Header>
            </div>
            <Layout>
              <Sider className="layout-sider-wrap" width={200}>
                <div className="ant-title-info">
                  <img className="layout-image-wrap" src={Logo} alt="Logo" />
                </div>
                <Menu
                  mode="vertical"
                  defaultSelectedKeys={[window.location.href?.includes('history') ? 'history' : 'home']}
                >
                  <Menu.Item key="home" icon={<DashboardOutlined />}>
                    <NavLink to="home">Home</NavLink>
                  </Menu.Item>
                  <Menu.Item key="history" icon={<DashboardOutlined />}>
                    <NavLink to="history">History</NavLink>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout className="layout-content-wrap">
                <Content
                  style={{
                    background: '#fff',
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                  <WrappedComponent {...this.props} />
                  <Footer className="admin-footer layout-footer-wrap">
                    <Row>
                      <Col md={12} xs={24}></Col>
                      <Col md={12} xs={24}>
                        <div className="admin-footer__links"></div>
                      </Col>
                    </Row>
                  </Footer>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </LayoutWrapper>
      );
    }
  }

  const mapStateToProps = state => ({
    ChangeLayoutMode: state?.ChangeLayoutMode?.data,
    rtl: state?.ChangeLayoutMode?.rtlData,
    topMenu: state?.ChangeLayoutMode?.topMenu,
  });

  return connect(mapStateToProps)(LayoutComponent);
};
export default ThemeLayout;
