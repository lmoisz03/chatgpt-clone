"use client";
import { useState } from "react";
import LoaderIcon from "../icons/loader";
import { useChat } from "ai/react";
import SendIcon from "../icons/send";
import Message from "./message";

const ChatUi = () => {
  const { messages, isLoading, input, handleInputChange, handleSubmit } =
    useChat();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
  };
  return (
    <>
      <div className="flex flex-col flex-grow  w-full h-full gap-4 pb-20">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <form onSubmit={handleFormSubmit} className="relative z-10">
        <div className="fixed flex flex-row gap-2 items-center inset-x-0 mt-10 bottom-0 z-20 w-full  max-w-4xl mx-auto px-8 sm:px-28 py-10">
          <div className="flex mt-auto w-full relative bottom-0  items-center">
            <input
              className="bg-gray-50 border pr-10  outline-none resize-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
