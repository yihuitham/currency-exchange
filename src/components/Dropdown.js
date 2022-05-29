import React, { useState } from "react";
import Downshift from "downshift";

function Dropdown({ data, element, curr, setCurr }) {
  console.log(curr);
  return (
    <Downshift
      onChange={(selection) => setCurr(selection.code)}
      itemToString={(item) => (item ? item[element] : curr)}
    >
      {({
        closeMenu,
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        openMenu,
        selectedItem,
      }) => (
        <div className="m-auto w-full">
          <div className="m-auto w-1/2 mt-6">
            <label
              {...getLabelProps()}
              className="font-bold text-xs text-gray-700 block"
            >
              Base Currency
            </label>
            <input
              className="
                form-control
                block
                w-2/12
                text-center
                font-bold
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
              placeholder={curr}
              {...getInputProps({ onFocus: openMenu, onBlur: closeMenu })}
            />
            <div
              id="dropdown"
              className="overflow-auto scrollbar-hide h-32 w-2/12 drop-shadow-md rounded"
            >
              <ul className="rounded bg-white" {...getMenuProps()}>
                {isOpen
                  ? data
                      .filter(
                        (item) =>
                          !inputValue ||
                          item.code
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())
                      )
                      .map((item, index) => (
                        <li
                          {...getItemProps({
                            key: item.code,
                            index,
                            item,
                            className: `text-center ${
                              highlightedIndex === index
                                ? "bg-gray-100 font-bold"
                                : ""
                            }`,
                          })}
                        >
                          {item[element]}
                        </li>
                      ))
                  : null}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Downshift>
  );
}

export default Dropdown;
