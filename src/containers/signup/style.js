import Styled from 'styled-components';

const SignUpWrapper = Styled.div`
body {
    background-color: #f0f2f5;
  }

  .signin-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .signin-box {
    width: 400px;
    height: 480px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    text-align: center;
  }

  .logo {
    margin-bottom: 20px;
  }

  .form-item {
    margin-bottom: 16px;
  }

  .submit-button {
    width: 100%;
  }

  .footer-links {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    text-align: right;
  }

  .footer-links span {
    margin-left: 10px;
    color: #25B864;
    cursor: pointer;
  }
`;

export { SignUpWrapper };
