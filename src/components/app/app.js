import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Index from "../index";
import SignIn from "../signIn/signIn";
import { connect } from "react-redux";

class Application extends React.Component {

  render() {
    return (
      <Router>
        <Routes>
          {this.props.isAuthenticated ? (
            <>
              <Route path="/" element={<Index />} />
            </>
          ) : (
            <>
              <Route path="/" element={<SignIn />} />
            </>
          )}
        </Routes>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.isAuthenticated,
  };
}

const mapDispatchToProps = (dispatch) => {
  const extraProps = {};
  return extraProps;
};

Application = connect(mapStateToProps, mapDispatchToProps)(Application);

export default Application;
