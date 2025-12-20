export const suggestions = [
  "Summarize AI adoption trends across industries.",
  "How automation will change workforce skills.",
  "AI decision-making impacts in healthcare.",
];

export const randomSuggestions = (): string[] => {
  const unique = Array.from(new Set(suggestions));
  const count = Math.min(3, unique.length);
  return [...unique].sort(() => Math.random() - 0.5).slice(0, count);
};
