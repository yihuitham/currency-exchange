import React, { useState } from "react";
import Downshift from "downshift";

function Dropdown({ data, element, curr, setCurr, label }) {
  console.log("selected currency:", curr);
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
        <div className="">
          <label
            {...getLabelProps()}
            className="font-bold text-xs text-white block"
          >
            {label}
          </label>
          <div className="">
            <input
              className="
                text-center
                font-bold
                text-white
                bg-black
                border-b border-gray-300
                rounded
                transition
                ease-in-out
                focus:text-white focus:outline-none
            "
              placeholder={curr}
              {...getInputProps({ onFocus: openMenu, onBlur: closeMenu })}
            />
            {isOpen ? (
              <div
                id="dropdown"
                className="fixed overflow-auto scrollbar-hide h-32 drop-shadow-md"
              >
                <ul className="bg-black relative z-10" {...getMenuProps()}>
                  {data
                    .filter(
                      (item) =>
                        !inputValue ||
                        item.code
                          .toLowerCase()
                          .startsWith(inputValue.toLowerCase())
                    )
                    .map((item, index) => (
                      <li
                        {...getItemProps({
                          key: item.code,
                          index,
                          item,
                          className: `text-center ${
                            highlightedIndex === index
                              ? "bg-gray-100 font-bold text-gray-700"
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
