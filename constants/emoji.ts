
type EmojiReaction = {
  emoji: string;
  label: string;
}

export const JUST_EMOJIS_REACTIONS = ["👍", "🙌", "🔥", "💡", "👎", "🤔", "❓"];

export const EMOJI_REACTIONS: EmojiReaction[] = [
  { emoji: "👍", label: "Agree" },
  { emoji: "🙌", label: "Helpful" },
  { emoji: "🔥", label: "Interesting" },
  { emoji: "💡", label: "Good idea!" },
  { emoji: "👎", label: "Unhelpful" },
  { emoji: "🤔", label: "Disagree" },
  { emoji: "❓", label: "Why?" },
]