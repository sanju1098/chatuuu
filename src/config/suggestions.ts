export const suggestions = [
  "Summarize AI adoption trends across industries.",
  "Impact of generative AI on creative jobs.",
  "Ethical issues with deepfakes and mitigations.",
  "How AI personalizes consumer experiences.",
  "Effects of AI regulations on innovation.",
  "How automation will change workforce skills.",
  "Trends in public trust of AI.",
  "AI decision-making impacts in healthcare.",
  "AI's role in climate and sustainability.",
  "Strategies for responsible AI adoption.",
];

export const randomSuggestions = (): string[] => {
  const unique = Array.from(new Set(suggestions));
  const count = Math.min(3, unique.length);
  return [...unique].sort(() => Math.random() - 0.5).slice(0, count);
};
