// Purpose of the Code
// This component is a theme toggle switch.
//  It allows the user to switch between light mode and dark mode by clicking a button.
//  The current theme is stored in both the global state (via a custom store) and localStorage.


import React, { useState } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { LuSunMoon } from "react-icons/lu";
import useStore from "../store";

const ThemeSwitch = () => {
  const { theme, setTheme } = useStore((state) => state);
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button onClick={toggleTheme} className="outline-none">
        {isDarkMode ? (
            <LuSunMoon size={26} className="text-gray-500" />
        ) : (
            <IoMoonOutline size={26} className=""/>
        )}
    </button>
  )
};

export default ThemeSwitch;