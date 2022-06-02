import React, { useState, useEffect } from "react";
import Downshift from "downshift";

function Dropdown({ data, element, curr, setCurr, label }) {
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
          <div className="relative mt-6">
            <input
              className="
                text-center
                font-bold
                text-white
                bg-black
                border-b border-gray-300
                mt-6
                transition
                ease-in-out
                focus:text-white focus:outline-none 
                focus:border-blue-400
                text-lg"
              placeholder={curr}
              {...getInputProps({ onFocus: openMenu, onBlur: closeMenu })}
            />
            {isOpen ? (
              <div
                id="dropdown"
                className=" overflow-auto scrollbar-hide h-32 drop-shadow-md absolute z-10 w-full rounded-bl-xl rounded-br-lg"
              >
                <ul className="" {...getMenuProps()}>
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
                          className: `text-center bg-gray-800 ${
                            highlightedIndex === index
                              ? "bg-gray-600 font-bold"
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
