import React, { Component } from "react";
import API from "../utility/API";
import { Input, FormBtn } from "../Form";

export default class AddUser extends Component {
  state = {
    userData: [],
    grading: "",
    lessonPlanning: "",
    specialEventPlanning: "",
    communications: "",
    paperwork: "",
    training: "",
    continuingEducation: "",
    other: ""
  };

  componentDidMount() {
    this.loadUserData();
  }

  loadUserData = () => {
    API.getUserData(localStorage.getItem("email"))
      .then(res => {
        this.setState({
          userData: res.data,
          grading: "",
          lessonPlanning: "",
          specialEventPlanning: "",
          communications: "",
          paperwork: "",
          training: "",
          continuingEducation: "",
          other: ""
        });
        return console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.grading && this.state.lessonPlanning) {
      API.saveUserData({
        grading: this.state.grading,
        lessonPlanning: this.state.lessonPlanning,
        specialEventPlanning: this.state.specialEventPlanning,
        communications: this.state.communications,
        paperwork: this.state.paperwork,
        training: this.state.training,
        continuingEducation: this.state.continuingEducation,
        other: this.state.other,
        email: localStorage.getItem("email")
      })
        .then(res => this.loadUserData())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <form>
          <Input
            value={this.state.grading}
            onChange={this.handleInputChange}
            name="grading"
            placeholder="grading "
          />
          <Input
            value={this.state.lessonPlanning}
            onChange={this.handleInputChange}
            name="lessonPlanning"
            placeholder="lessonPlanning "
          />
          <Input
            value={this.state.specialEventPlanning}
            onChange={this.handleInputChange}
            name="specialEventPlanning"
            placeholder="specialEventPlanning "
          />
          <Input
            value={this.state.communications}
            onChange={this.handleInputChange}
            name="communications"
            placeholder="communications "
          />
          <Input
            value={this.state.papaerwork}
            onChange={this.handleInputChange}
            name="papaerwork"
            placeholder="papaerwork "
          />
          <Input
            value={this.state.training}
            onChange={this.handleInputChange}
            name="training"
            placeholder="training "
          />
          <Input
            value={this.state.continuingEducation}
            onChange={this.handleInputChange}
            name="continuingEducation"
            placeholder="continuingEducation "
          />
          <Input
            value={this.state.other}
            onChange={this.handleInputChange}
            name="other"
            placeholder="other "
          />
          <FormBtn onClick={this.handleFormSubmit}>Submit user</FormBtn>
          <div>
            {this.state.userData.map(data => (
              <div
                style={{
                  padding: "20px",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  margin: "5px 10% 5px 10%"
                }}
                key={data._id}
              >
                <li>Grading: {data.grading}</li>
                <li>Lesson Planning: {data.lessonPlanning}</li>
                <li>Time Submitted: {data.date}</li>
              </div>
            ))}
          </div>
        </form>
      </div>
    );
  }
}
