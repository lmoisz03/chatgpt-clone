import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import OpenAiBrandIcon from "../icons/brands/openai";
import UserIcon from "../icons/user";
import { useMDXComponents } from "../markdown/components";
import remarkGfm from "remark-gfm";

const Message = ({
  message,
}: {
  message: { role: string; content: string };
}) => {
  return (
    <div
      className={`flex relative group items-start gap-4 w-full h-full format lg:format-lg dark:format-invert flex-row`}
    >
      <div className="w-fit flex text-gray-800 dark:text-gray-100 border p-1.5 dark:border-gray-700  rounded-full">
        {message.role === "user" ? (
          <UserIcon className="h-5 w-5" />
        ) : (
          <OpenAiBrandIcon className="h-5 w-5" />
        )}
      </div>
      <div className={`rounded-3xl  flex-1  `}>
        <div className="w-full text-gray-800  dark:text-gray-300 text-xs not-format">
          <ReactMarkdown
            components={useMDXComponents({})}
            remarkPlugins={[remarkGfm]}
          >
            {message.content}
          </ReactMarkdown>
        </div>
        <div className="border-b dark:border-b-gray-800 my-4 md:my-8 " />
      </div>
    </div>
  );
};

export default Message;
