"use client";
import { useRef, useState } from "react";
import LoaderIcon from "../icons/loader";
import { useChat } from "ai/react";
import SendIcon from "../icons/send";
import Message from "./message";
import EmptyChatScreen from "./empty-chat";
import PaperClipIcon from "../icons/paperclip";

const ChatUi = () => {
  const PromptInput = useRef<HTMLInputElement>(null);
  const {
    messages,
    isLoading,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
  } = useChat();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
  };

  const setPrompt = (prompt: string) => {
    if (PromptInput?.current) {
      // We need to set the value of the input to the prompt, however needs to be done like a human
      // because the browser will not allow it.
      // We can't just set the value of the input to the prompt, because the browser will not allow it.
      // We need to set the value of the input to the prompt, however needs to be done like a human
      setInput(prompt);
    }
  };
  return (
    <>
      <div className="flex flex-col flex-grow  w-full h-full gap-4 pb-20">
        {
          // If there are no messages, show the empty chat screen
          messages.length === 0 && (
            <EmptyChatScreen setPrompt={setPrompt} />
            // If there are messages, show the messages
          )
        }

        <div className="flex flex-col flex-grow gap-4 ">
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
        </div>
      </div>
      <form onSubmit={handleFormSubmit} className="relative z-10">
        <div className="fixed flex flex-row gap-2 items-center inset-x-0  mt-10 bottom-0  z-20 w-full  max-w-4xl mx-auto px-8 sm:px-28 py-10">
          <div className="flex mt-auto w-full relative bottom-0  items-center">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <button
                type="button"
                className="flex items-center justify-center rounded-full disabled:cursor-not-allowed"
                aria-label="Attach files"
                title="Attach files(To be implemented)"
                disabled
              >
                <PaperClipIcon className="w-5 h-5 text-gray-700 dark:text-gray-400" />
              </button>
            </div>
            <input
              ref={PromptInput}
              className="bg-gray-50 border pl-10  outline-none resize-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Send a message."
              name="message"
              value={input}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            onClick={() => handleFormSubmit}
            className={`cursor-pointer z-20 ${
              input ? "" : "bg-gray-100 dark:bg-gray-800"
            } border dark:border-gray-700 font-bold py-2 px-2 rounded-lg dark:text-gray-200 text-gray-700`}
          >
            {isLoading ? (
              <LoaderIcon
                aria-hidden="true"
                role="status"
                className="w-6 h-6  animate-spin"
              />
            ) : (
              <SendIcon className="h-6 w-6 rotate-45" />
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default ChatUi;
