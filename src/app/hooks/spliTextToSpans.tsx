export const splitTextToSpans = (text: string) => {
  return text.split("\n").map((line, index) =>
    line === "" ? (
      <br key={index} />
    ) : (
      <span key={index} className="block">
        {line}
      </span>
    )
  );
};
