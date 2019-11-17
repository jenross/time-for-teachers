import React from "react";
import { FormGroup } from "reactstrap";
import Timer from "./Timer";
import moment from "moment";
import InputTime from "./InputTime";
import "./CategoryRow.css";

export default function CategoryRow(props) {
  return (
    <tr className="table-row">
      <td className="first-timer-section">
        <Timer
          category={props.category}
          array={props.array}
          getSum={props.getSum}
          convertedTime={props.convertedTime}
        />
      </td>
      <td>{props.name}</td>
      <td>{moment.utc(props.getSum * 1000).format("HH:mm:ss")}</td>
      <FormGroup>
        <InputTime
          type="text"
          name="userInput"
          id="exampleNumber"
          placeholder="input your time"
          category={props.category}
          convertedTime={props.convertedTime}
        />
      </FormGroup>
    </tr>
  );
}
