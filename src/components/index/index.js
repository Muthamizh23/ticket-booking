import React from "react";
import "./index.css";
import { connect } from "react-redux";
import movie from "./movie.json";

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedMovie: "miller",
      millerMovies: movie.miller,
      ayalonMovies: movie.ayalon,
      totalSeatSelectedMiller: 0,
      totalSeatSelectedAyalon: 0,
    };
  }

  selectSeat = (id, val) => {
    const newState = Object.assign({}, this.state);
    if (this.state.selectedMovie === "miller") {
      newState.millerMovies.forEach((element) => {
        if (element.id === id) {
          if (val === "select") {
            element.selected = true;
            element.occupied = false;
            element.na = false;
          }
          if (val === "unselect") {
            element.selected = false;
            element.occupied = false;
            element.na = true;
          }
        }
      });
      this.setState(newState);
      var seatSelectedMiller = 0;
      this.state.millerMovies.forEach((element) => {
        if (element.selected) {
          seatSelectedMiller++;
        }
      });
      this.setState({ totalSeatSelectedMiller: seatSelectedMiller });
    } else if (this.state.selectedMovie === "ayalon") {
      newState.ayalonMovies.forEach((element) => {
        if (element.id === id) {
          if (val === "select") {
            element.selected = true;
            element.occupied = false;
            element.na = false;
          }
          if (val === "unselect") {
            element.selected = false;
            element.occupied = false;
            element.na = true;
          }
        }
      });
      this.setState(newState);
      var seatSelectedAyalon = 0;
      this.state.ayalonMovies.forEach((element) => {
        if (element.selected) {
          seatSelectedAyalon++;
        }
      });
      this.setState({ totalSeatSelectedAyalon: seatSelectedAyalon });
    }
  };

  bookTicket = () => {
    const newState = Object.assign({}, this.state);
    if(this.state.selectedMovie === 'miller'){
      newState.millerMovies.forEach((element) => {
        if (element.selected) {
          element.selected = false;
          element.occupied = true;
          element.na = false;
        }
      });
      this.setState(newState);
    }
    else if(this.state.selectedMovie === 'ayalon'){
      newState.ayalonMovies.forEach((element) => {
        if (element.selected) {
          element.selected = false;
          element.occupied = true;
          element.na = false;
        }
      });
      this.setState(newState);
    }
  };

  selectMovie = (e) => {
    var val = e.target.value;
    this.setState({ selectedMovie: val });
    setTimeout(() => {
      console.log(this.state.selectedMovie);
    }, 100);
  };

  render() {
    return (
      <div className="index">
        <div className="container">
          <div className="movieLabel">
            <label>Select a Movie</label>
            <select onChange={(e) => this.selectMovie(e)}>
              <option value="miller">Miller</option>
              <option value="ayalon">Ayalon</option>
            </select>
          </div>
          <div className="movieSeatInfo mt-3">
            <div className="movieSeatInfoBox">
              <div className="tile na"></div>
              <p className="m-0">N/A</p>
            </div>
            <div className="movieSeatInfoBox mx-3">
              <div className="tile selected"></div>
              <p className="m-0">Selected</p>
            </div>
            <div className="movieSeatInfoBox">
              <div className="tile occupied"></div>
              <p className="m-0">Occupied</p>
            </div>
          </div>
          <div className="row movieSeats mt-3">
            {this.state.selectedMovie === "miller" ? (
              <>
                {this.state.millerMovies.map((data) => {
                  <div>{data.id}</div>;
                  if (data.selected) {
                    return (
                      <div
                        key={data.id}
                        className="tile selected"
                        onClick={() => {
                          this.selectSeat(data.id, "unselect");
                        }}
                      ></div>
                    );
                  } else if (data.occupied) {
                    return <div key={data.id} className="tile occupied"></div>;
                  } else {
                    return (
                      <div
                        key={data.id}
                        className="tile na"
                        onClick={() => {
                          this.selectSeat(data.id, "select");
                        }}
                      ></div>
                    );
                  }
                })}
              </>
            ) : (
              <>
                {this.state.ayalonMovies.map((data) => {
                  <div>{data.id}</div>;
                  if (data.selected) {
                    return (
                      <div
                        key={data.id}
                        className="tile selected"
                        onClick={() => {
                          this.selectSeat(data.id, "unselect");
                        }}
                      ></div>
                    );
                  } else if (data.occupied) {
                    return <div key={data.id} className="tile occupied"></div>;
                  } else {
                    return (
                      <div
                        key={data.id}
                        className="tile na"
                        onClick={() => {
                          this.selectSeat(data.id, "select");
                        }}
                      ></div>
                    );
                  }
                })}
              </>
            )}
          </div>
          <div className="movieSelected text-center mt-3">
            <p>You have selected  
            {
              this.state.selectedMovie === 'miller' ? " "+this.state.totalSeatSelectedMiller + " " : " " + this.state.totalSeatSelectedAyalon + " "
            }
            seats for
            {
  this.state.selectedMovie === 'miller' ? " Miller" : " Ayalon"
}
            </p>
          </div>
          <div className="movieBook text-center mt-4">
            <button
              className="btn btn-sm btn-info"
              onClick={() => this.bookTicket()}
            >
              Book
            </button>
          </div>
        </div>
      </div>
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

Index = connect(mapStateToProps, mapDispatchToProps)(Index);

export default Index;
