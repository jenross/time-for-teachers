// import React from "react";
import React, { Component } from "react";
import Timer from "./Timer";
import moment from "moment";
import InputTime from "./InputTime";
import "./CategoryRow.css";

// export default function CategoryRow(props) {
//   return (
//     <tr className="table-row">
//       <td className="first-timer-section">
//         <Timer
//           category={props.category}
//           array={props.array}
//           getSum={props.getSum}
//           convertedTime={props.convertedTime}
//           startClock={props.startClock}
//           stopClock={props.stopClock}
//           clockStatus={props.clockStatus}

//         />
//       </td>
//       <td>{props.name}</td>
//       <td>{moment.utc(props.getSum * 1000).format("HH:mm:ss")}</td>
//       <FormGroup>
//         <InputTime
//           type="text"
//           name="userInput"
//           id="exampleNumber"
//           placeholder="input your time"
//           category={props.category}
//           convertedTime={props.convertedTime}
//         />
//       </FormGroup>
//     </tr>
//   );
// }

export default class CategoryRow extends Component {
  state = {
    didTimeChange: false
  };

  triggerRerender = () => {
    this.setState({ didTimeChange: !this.state.didTimeChange });
  };

  render() {
    // console.log(this.state.didTimeChange);

    return (
      <tr className="table-row">
        <td className="first-timer-section">
          <Timer
            category={this.props.category}
            array={this.props.array}
            getSum={this.props.getSum}
            convertedtime={this.props.convertedtime}
            startClock={this.props.startClock}
            stopClock={this.props.stopClock}
            clockStatus={this.props.clockStatus}
            triggerRerender={this.triggerRerender}
            counter={this.props.counter}
            updateCounter={this.props.updateCounter}
            counterCategory={this.props.counterCategory}
          />
        </td>
        <td>{this.props.name}</td>
        <td>{moment.utc(this.props.getSum * 1000).format("HH:mm:ss")}</td>
        <td>
          <InputTime
            type="text"
            name="userInput"
            id="exampleNumber"
            placeholder="input time (hh:mm)"
            category={this.props.category}
            convertedtime={this.props.convertedtime}
          />
        </td>
      </tr>
    );
  }
}
