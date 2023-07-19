"use client";

const EmptyChatScreen = ({
  setPrompt,
}: {
  setPrompt: (prompt: string) => void;
}) => {
  const StarterPrompts = [
    {
      id: 1,
      prompt: "Tell me a joke.",
      data: {
        chatPrompt: "You: Tell me a joke.",
        user: "User",
        assistant: "Assistant",
        messages: [
          { role: "system", content: "You are User" },
          { role: "user", content: "Tell me a joke." },
          {
            role: "assistant",
            content:
              "Sure, I'd love to! Why don't scientists trust atoms? Because they make up everything!",
          },
        ],
      },
    },
    {
      id: 2,
      prompt: "What's the weather like today?",
      data: {
        chatPrompt: "You: What's the weather like today?",
        user: "User",
        assistant: "Assistant",
        messages: [
          { role: "system", content: "You are User" },
          { role: "user", content: "What's the weather like today?" },
          {
            role: "assistant",
            content:
              "I'm sorry, I don't have access to real-time weather information. However, you can check on a weather website or app to get the latest updates.",
          },
        ],
      },
    },
    {
      id: 3,
      prompt: "What is the capital of France?",
      data: {
        chatPrompt: "You: What is the capital of France?",
        user: "User",
        assistant: "Assistant",
        messages: [
          { role: "system", content: "You are User" },
          { role: "user", content: "What is the capital of France?" },
          { role: "assistant", content: "The capital of France is Paris." },
        ],
      },
    },
    {
      id: 4,
      prompt: "Can you help me with a math problem?",
      data: {
        chatPrompt: "You: Can you help me with a math problem?",
        user: "User",
        assistant: "Assistant",
        messages: [
          { role: "system", content: "You are User" },
          { role: "user", content: "Can you help me with a math problem?" },
          {
            role: "assistant",
            content:
              "Of course! I'll do my best. What's the math problem you need help with?",
          },
        ],
      },
    },
    {
      id: 5,
      prompt: "Recommend a good book to read.",
      data: {
        chatPrompt: "You: Recommend a good book to read.",
        user: "User",
        assistant: "Assistant",
        messages: [
          { role: "system", content: "You are User" },
          { role: "user", content: "Recommend a good book to read." },
          {
            role: "assistant",
            content: "Certainly! What genre are you interested in?",
          },
        ],
      },
    },
    // Add more prompts as needed
  ];
  return (
    <div className="flex flex-col items-center gap-2 justify-center h-full">
      <h1 className="text-4xl font-medium mb-2 text-gray-700 dark:text-gray-200">
        ChatGPT Clone
      </h1>
      <p className="mt-2 text-base text-center text-gray-500 dark:text-gray-400">
        This is a basic chatgpt clone built with Next.js, Tailwind CSS and
        OpenAI API. No ideas? Select a prompt!
      </p>

      <div className="flex my-2 flex-col sm:flex-row gap-2 flex-wrap ">
        {StarterPrompts.map((prompt, index) => (
          <button
            type="button"
            key={index}
            className="py-2.5 px-5 max-w-[315px] w-full mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => {
              setPrompt(prompt.prompt);
            }}
          >
            <h3 className="text-gray-800 dark:text-gray-200 text-sm font-medium">
              {prompt.prompt}
            </h3>
          </button>
        ))}
      </div>
    </div>
  );
};
export default EmptyChatScreen;
