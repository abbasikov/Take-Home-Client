import Styled from 'styled-components';

const LayoutWrapper = Styled.div`
.layout-parent-wrap {
  min-height: 100vh;
  }

  .layout-header-wrap {
    background: #001529;
    position: fixed !important;
    z-index: 99;
    height: 60px;
    left: 200px;
    right: 0px;
    color: #fff;
  }

  .ant-layout-sider-children {
    background: #fff;
    position: fixed;
    top: 0px;
    width: 200px;
  }

  .layout-content-wrap {
    position: relative;
    top: 60px;
    border-left: 1px solid;
    border-color: lightgray;
  }

  .ant-title-info {
    display: flex;
    margin: 8% 12% 8%;
  }

  .layout-outer-wrap {
    display: flex;
    justify-content: space-between;
  }

  .layout-title-wrap {
    margin: 0;
    color: #fff;
  }

  .layout-image-wrap {
    width: 40px; 
    height: 40px; 
    margin-right: 20px
  }

  .layout-sider-wrap {
    background: #405189
  }

  .layout-footer-wrap {
  padding: 20px 30px 18px;
  height: 50px;
  background: gainsboro;
  color: grey;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 200px;
  font-size: 14px;
  box-shadow: 0 -5px 10px rgba(146,153,184, 0.05)
  }
  .admin-footer__links{
    text-align: ${({ theme }) => (theme.rtl ? 'left' : 'right')};
    @media only screen and (max-width: 767px){
        text-align: center;
    }
    a{
        color: ${({ theme }) => theme['light-color']};
        &:not(:last-child){
            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 15px;
        }
        &:hover{
            color: ${({ theme }) => theme['primary-color']};
        }
    }
}
`;

export { LayoutWrapper };
