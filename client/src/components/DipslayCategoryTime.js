import React from "react";
import moment from "moment";

export default function DipslayCategoryTime(props) {
  return <td>{moment.utc(props.getSum * 1000).format("HH:mm:ss")}</td>;
}
