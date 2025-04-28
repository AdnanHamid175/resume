import React, { useState } from "react";

const Copy = ({ text, copyIcon, checkIcon, size = 24 }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <img
      src={copied ? checkIcon : copyIcon}
      alt="copy"
      onClick={handleCopy}
      style={{
        cursor: "pointer",
        width: size,
        height: size,
        marginLeft: "auto",
      }}
      className="img noprint"
    />
  );
};

export default Copy;
