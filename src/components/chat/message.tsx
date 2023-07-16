import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import OpenAiBrandIcon from "../icons/brands/openai";
import UserIcon from "../icons/user";
import { useMDXComponents } from "../markdown/components";

const Message = ({
  message,
}: {
  message: { role: string; content: string };
}) => {
  return (
    <div
      className={`flex items-center gap-4 w-full h-full format lg:format-lg dark:format-invert ${
        message.role === "user" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div className="w-fit flex text-gray-800 dark:text-gray-100 border p-1.5 dark:border-gray-700  rounded-full">
        {message.role === "user" ? (
          <UserIcon className="h-5 w-5" />
        ) : (
          <OpenAiBrandIcon className="h-5 w-5" />
        )}
      </div>
      <div
        className={`rounded-3xl px-4 py-4   ${
          message.role !== "system"
            ? "dark:bg-gray-700 bg-gray-200"
            : "bg-gray-100 dark:bg-gray-800"
        }`}
      >
        <div className="w-full text-gray-800 dark:text-gray-300 text-xs not-format">
          <ReactMarkdown components={useMDXComponents({})}>
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Message;
