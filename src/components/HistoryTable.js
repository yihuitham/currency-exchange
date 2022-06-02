import React, { useEffect } from "react";

export default function HistoryTable({ data }) {
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
                  {element.BaseCurrency.S} {element.BaseAmount.S}
                </td>
                <td className="w-1/2">
                  {element.TargetCurrency.S} {element.TargetAmount.S}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
