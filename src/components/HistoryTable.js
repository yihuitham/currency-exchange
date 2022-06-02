import React from "react";

export default function HistoryTable({ data }) {
  const sortedData = data.sort((a, b) => {
    if (a.BaseCurrency.S === b.BaseCurrency.S) {
      return a.BaseAmount.N < b.BaseAmount.N ? -1 : 1;
    } else {
      return a.BaseCurrency.S < b.BaseCurrency.S ? -1 : 1;
    }
  });

  // console.log("sorted", sortedData);
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
                  {element.BaseCurrency.S} {element.BaseAmount.N}
                </td>
                <td className="w-1/2">
                  {element.TargetCurrency.S} {element.TargetAmount.N}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
