import React from "react";
import axios from "axios";
import Select from "react-select";
import logo from "../../man.png";
import "../../App.css";

export default class List extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      selecteds: []
    };
  }

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        const users = response.data;
        this.setState({ users });
      })
      .catch(err => {
        console.log(err);
      });
  }
  samiksha = props => {
    let selecteds = [];
    if (props) {
      props.forEach(element => {
        this.state.users.forEach(data => {
          if (element.value == data.name) {
            selecteds.push(data);
          }
        });
      });
      this.setState({ selecteds });
    } else {
      this.setState({ selecteds: [] });
    }
  };
  render() {
    console.log();
    return (
      <div className="container">
        <h2>Listing - {this.state.users.length}</h2>
        <Select
          value={this.state.selecteds.map(data => {
            return {
              value: data.name,
              label: (
                <div>
                  <img src={logo} width="30px" height="30px" /> {data.name}
                </div>
              )
            };
          })}
          options={this.state.users.map(data => {
            return {
              value: data.name,
              label: (
                <div>
                  <img src={logo} width="30px" height="30px" /> {data.name}
                  <span
                    style={{
                      opacity: 0.3,
                      fontSize: "14px",
                      marginLeft: "20px"
                    }}
                  >
                    {data.email}
                  </span>
                </div>
              )
            };
          })}
          isMulti
          isSearchable
          onChange={this.samiksha}
        />
      </div>
    );
  }
}
