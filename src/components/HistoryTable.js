import React from "react";

export default function HistoryTable({ data }) {
  console.log(data);
  return (
    <div className="overflow-auto h-full scrollbar">
      <table className="table-auto w-full text-center">
        <thead className="sticky top-0 bg-black">
          <tr>
            <th>Amount to Send</th>
            <th>Amount to Receive</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element, index) => {
            return (
              <tr key={index}>
                <td className="w-1/2">
                  {element.BaseCurrency} {element.BaseAmount}
                </td>
                <td className="w-1/2">
                  {element.TargetCurrency} {element.TargetAmount}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
