import { useState, useEffect } from "react";

function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDark(saved);
    if (saved) document.body.classList.add("dark-mode");
  }, []);

  const toggle = () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", !dark);
    setDark(!dark);
  };

  return <button onClick={toggle}>{dark ? "☀️" : "🌙"}</button>;
}

export default DarkModeToggle;
