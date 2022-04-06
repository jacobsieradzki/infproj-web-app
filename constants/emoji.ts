
type EmojiReaction = {
  emoji: string;
  label: string;
}

export const JUST_EMOJIS_REACTIONS = ["👍", "🙌", "🔥", "💡", "🤔", "❓"];

export const EMOJI_REACTIONS: EmojiReaction[] = [
  { emoji: "👍", label: "Agree" },
  { emoji: "🙌", label: "Helpful" },
  { emoji: "🔥", label: "Interesting" },
  { emoji: "💡", label: "Good idea!" },
  { emoji: "🤔", label: "Unsure" },
  { emoji: "❓", label: "Why?" },
]

const RANDOM_REACTION_ARRAY = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 3];
const calculateRandomReaction = () => {
  return RANDOM_REACTION_ARRAY[Math.floor(Math.random()*RANDOM_REACTION_ARRAY.length)];
}

export const createInitialEmojiReactions = () => {
  return {
    "👍": calculateRandomReaction(),
    "🙌": calculateRandomReaction(),
    "🔥": calculateRandomReaction(),
    "💡": calculateRandomReaction(),
    "🤔": calculateRandomReaction(),
    "❓": calculateRandomReaction(),
  }
}