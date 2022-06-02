import React from "react";

export default function HistoryTable({ data }) {
  console.log(data);
  return (
    <table className="table-auto w-full text-center ">
      <thead>
        <tr>
          <th>Amount to Send</th>
          <th>Amount to Receive</th>
        </tr>
      </thead>
      <tbody>
        {data.map((element, index) => {
          return (
            <tr key={index}>
              <td>
                {element.BaseCurrency} {element.BaseAmount}
              </td>
              <td>
                {element.TargetCurrency} {element.TargetAmount}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
