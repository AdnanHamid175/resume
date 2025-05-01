const Link = ({ link, size = 24 }) => {
  const handleLink = async () => {
    window.open(link, "_blank");
  };

  return (
    <img
      src="../public/link.png"
      alt="copy"
      onClick={handleLink}
      style={{
        cursor: "pointer",
        width: size,
        height: size,
        marginRight: "3px",
      }}
      className="img noprint"
    />
  );
};

export default Link;
