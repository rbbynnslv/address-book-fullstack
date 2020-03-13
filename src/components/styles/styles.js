import styled from 'styled-components';
import Background1 from '../images/Background-1.svg';
import Background2 from '../images/Background-2.png';

export const StyledHeader = styled.div`
  .mainHeader {
    flex-grow: 1;
  }

  .app {
    background-color: #f50057;
  }

  .iconButton {
    margin-right: 10px;
  }

  .typo {
    flex-grow: 1;
  }
`;

export const StyledLR = styled.div`
  .grid {
    height: 100vh;
  }

  .gridImage {
    background-image: url(${Background1});
    background-repeat: no-repeat;
    background-position: center;
  }

  .gridImagee {
    background-image: url(${Background2});
    background-repeat: no-repeat;
    background-position: center;
  }

  .divContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }

  .image {
    width: 100px;
    height: 100px;
    margin: 30px;
  }

  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .textfield {
    width: 350px;
    height: 30px;
    margin: 30px;
  }

  .btn {
    width: 350px;
    height: 50px;
    margin-top: 30px;
  }

  .iconBtn {
    background-color: #f50057;
    color: #fff;
    margin-top: 30px;
  }
  .iconBtn:hover {
    background-color: #f50057;
    color: #fff;
  }
`;

export const StyledAG = styled.div`
  .contacts {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-content: center;
    margin: 20px;
  }

  .fab {
    width: 200px;
    height: 50px;
  }

  .icon {
    margin-right: 20px;
    font-weight: bold;
  }

  .searchForm {
    width: 300px;
    height: 50px;
    padding: 2px 4px;
    display: flex;
    align-items: center;
  }

  .inputbase {
    flex: 1;
    padding: 10px;
  }

  .iconSubmit {
    padding: 10;
  }

  .divMain {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow: hidden;
  }

  .cardContent {
    display: flex;
    width: 300px;
    height: 300px;
    margin: 5px 5px;
  }

  .divFlex {
    display: flex;
    flex-direction: column;
  }

  .text {
    font-weight: bold;
  }

  .fabMargin {
    margin: 2px;
  }

  .fabAdd {
    background-color: green;
    color: #ffffff;
    margin: 2px;
  }
  .fabAdd:hover {
    background-color: green;
    color: #ffffff;
  }
`;
