const highlightName = (name: string, searchQuery: string) => {
  if (!searchQuery) {
    return name;
  }

  const regex = new RegExp(`(${searchQuery})`, "gi");
  return name.split(regex).map((part: any, index: any) =>
    regex.test(part) ? (
      <span
        key={index}
        style={{
          fontWeight: "bold",
          color: "black",
          fontSize: "1.1em",
        }}
      >
        {part}
      </span>
    ) : (
      part
    )
  );
};

export default highlightName;
