import React, { useState } from "react";
import Downshift from "downshift";

function Dropdown({ data, element, curr, setCurr, label }) {
  console.log(label, ":", curr);
  return (
    <Downshift
      onChange={(selection) => setCurr(selection.code)}
      itemToString={(item) => (item ? item[element] : "")}
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
        <div className="mt-6">
          <label
            {...getLabelProps()}
            className="font-bold text-xs text-gray-700 w-fit block"
          >
            {label}
          </label>
          <div>
            <input
              className="
                form-control
                block
                w-fit
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
            {isOpen ? (
              <div
                id="dropdown"
                className="fixed overflow-auto scrollbar-hide h-32 w-fit drop-shadow-md rounded"
              >
                <ul
                  className="bg-white relative rounded w-fit z-10"
                  {...getMenuProps()}
                >
                  {data
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
                    ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </Downshift>
  );
}

export default Dropdown;
