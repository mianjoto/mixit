export default function applyClasses(input: string) {
  return input
    .replace(/\s+/gm, " ")
    .split(" ")
    .filter((cond) => typeof cond === "string" && cond !== "undefined")
    .join(" ")
    .trim();
}