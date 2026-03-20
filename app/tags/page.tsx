import data from "../../data.json";

const Tags = async () => {
  console.log(data);

  return (
    <div>
      {getUniqueTags().map((tag) => (
        <p key={tag}>{tag}</p>
      ))}
    </div>
  );
};

export function getUniqueTags(): string[] {
  const tags = data.notes
    .flatMap((item) => {
      const value = item["tags"];
      return Array.isArray(value) ? value : [value];
    })
    .filter((v) => v !== null && v != undefined);

  const uniqueTags = [...new Set(tags)];

  return uniqueTags;
}

export default Tags;
