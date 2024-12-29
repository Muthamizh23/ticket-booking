import React from "react";
import "./signIn.css";
import eyeShow from "../../assets/images/eyeShow.png";
import eyeHide from "../../assets/images/eyeHide.png";
import { connect } from "react-redux";
import { signInRes } from "../../redux/actions/actions";
import Alert from "react-bootstrap/Alert";

const iniState = {
  alert: false,
  passwordShow: false,
  user: {
    userName: "",
    password: "",
  },
  userNameErr: null,
  passwordErr: null,
  signInSubmit: null,
};

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = iniState;
  }

  passwordShowHide = () => {
    this.state.passwordShow
      ? this.setState({ passwordShow: false })
      : this.setState({ passwordShow: true });
  };

  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      },
    });
  };

  signIn = (e) => {
    e.preventDefault();
    if (!this.state.user.userName)
      this.setState({ userNameErr: "Please Enter User Name" });
    else this.setState({ userNameErr: null });

    if (!this.state.user.password)
      this.setState({ passwordErr: "Please Enter Password" });
    else this.setState({ passwordErr: null });

    setTimeout(() => {
      var data = this.state.user;
      if (data.userName && data.password) {
        if (
          data.userName === this.props.userName &&
          data.password === this.props.password
        ) {
          this.props.fetchSignInRes(true);
        } else {
          this.setState({ alert: true });
        }
      }
    }, 500);
  };

  render() {
    return (
      <>
        <div className="signIn">
          {this.state.alert ? (
            <>
              <Alert
                variant="danger"
                onClose={() => this.setState({ alert: false })}
                dismissible
              >
                <Alert.Heading>Credentials Error</Alert.Heading>
                <p className="m-0">Please check User Name or Password.</p>
              </Alert>
            </>
          ) : (
            ""
          )}
          <div className="container">
            <div className="row">
              <div className="offset-md-3 col-md-6">
                <div className="signInNox">
                  <h3 className="mb-4 text-center">Log In</h3>
                  <form>
                    <label>User Name</label>
                    <div className="position-relative">
                      <input
                        name="userName"
                        value={this.state.user.userName}
                        onChange={(e) => this.changeHandler(e)}
                        type="text"
                        placeholder="Enter User Name"
                        className="mt-2 mb-4 form-control"
                      />
                      {this.state.userNameErr ? (
                        <p className="mb-0 formError">
                          {this.state.userNameErr}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <label>Password</label>
                    <div className="position-relative mb-2">
                      <input
                        name="password"
                        value={this.state.user.password}
                        onChange={(e) => this.changeHandler(e)}
                        type={this.state.passwordShow ? "text" : "password"}
                        placeholder="Enter Password"
                        className="mt-2 form-control"
                      />
                      <div className="position-absolute showHide">
                        <img
                          src={this.state.passwordShow ? eyeHide : eyeShow}
                          onClick={() => this.passwordShowHide()}
                          alt="Show"
                        />
                      </div>
                      {this.state.passwordErr ? (
                        <p className="mb-0 formError">
                          {this.state.passwordErr}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <button
                      className="btn btn-primary btn-sm mt-4"
                      onClick={(e) => this.signIn(e)}
                    >
                      Sign In
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    userName: state.userName,
    password: state.password,
    isAuthenticated: state.isAuthenticated,
  };
}

const mapDispatchToProps = (dispatch) => {
  const extraProps = {
    fetchSignInRes: (val) => {
      dispatch(signInRes(val));
    },
  };
  return extraProps;
};

SignIn = connect(mapStateToProps, mapDispatchToProps)(SignIn);

export default SignIn;
