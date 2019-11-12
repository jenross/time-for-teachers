import React from "react";
import { FormGroup, Label } from "reactstrap";
import Timer from "./Timer";
import moment from "moment";
import InputTime from "./InputTime";

export default function CategoryRow(props) {
  return (
    <tr>
      <td>
        <Timer
          category={props.category}
          array={props.array}
          getSum={props.getSum}
        />
      </td>
      <td>{props.name}</td>
      <td>{moment.utc(props.getSum * 1000).format("HH:mm:ss")}</td>
      <FormGroup>
        <InputTime
          type="number"
          name="userInput"
          id="exampleNumber"
          placeholder="input your time"
          category={props.category}
        />
      </FormGroup>
    </tr>
  );
}
