import { connect } from 'react-redux';
import React, { Component } from 'react';

import './index.css';
import { css } from "@emotion/react";
import BounceLoader from "react-spinners/BounceLoader";
import Logomain from "../../assets/logo-icon.png";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Loader extends Component {

  render() {
    const { isLoader } = this.props
    return (
      <>
        {isLoader['status'] == true &&
          <div className='loader'>
            <div className="loader-area">
              <img alt="..." src={Logomain} />
              <span className="loading-text">
                <p className="mt-4 text-white">{isLoader['message']}</p>
              </span>
            </div>
          </div>
        }
      </>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = ({ Auth }) => {
  let { isLoader } = Auth;
  return { isLoader };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
