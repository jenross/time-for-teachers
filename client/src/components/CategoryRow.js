import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import Timer from "./Timer";
import Add from "./images/ic_add_circle_48px.svg";

export default function CategoryRow(props) {
  console.log(`the sum for  ${props.category}`, props.getSum);
  return (
    <tr>
      <td className="text-center">
        <FormGroup check>
          <Label check>
            <Input type="checkbox"></Input>
            <span className="form-check-sign"></span>
          </Label>
        </FormGroup>
      </td>
      <td>
        <Timer
          category={props.category}
          array={props.array}
          getSum={props.getSum}
        />
      </td>
      <td>{props.name}</td>
      <td>{props.getSum}</td>
      <td>
        <FormGroup>
          <Input
            type="number"
            name="number"
            id="exampleNumber"
            placeholder="number placeholder"
          />
        </FormGroup>
      </td>
      <td>
        <button>
          <img className="add-btn" src={Add} alt="add button" />
        </button>
      </td>
    </tr>
  );
}
