export const highlightHastag = (text: string) => {
  return text
    .split(" ")
    .map((word) =>
      word.startsWith("#") || word.startsWith("@") ? (
        <span className="text-blue-500">{word} </span>
      ) : (
        `${word} `
      )
    );
};
