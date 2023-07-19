import { Components } from "react-markdown";
import CodeBlock from "./highlighter";
import { ReactNode } from "react";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

type CodeProps = {
  node: any;
  inline: any;
  className: any;
  children: ReactNode;
  props: any;
};
const headingClasses = [
  "text-3xl font-bold", // h1
  "text-2xl font-semibold", // h2
  "text-xl font-medium", // h3 (using a different font weight)
  "text-lg font-medium", // h4 (using a different font weight)
  "text-base font-normal", // h5 (using a different font weight)
  "text-sm font-normal", // h6 (using a different font weight)
];

const heading = ({
  level,
  children,
}: {
  level: number;
  children: React.ReactNode;
}) => {
  const Tag: any = `h${level}`;
  const className = `${
    headingClasses[level - 1]
  } text-gray-900 dark:text-gray-200`;

  const headingStyles = {
    margin: "2rem 0", // Adjust the margin as per your preference
    lineHeight: "1.2", // Adjust the line-height as per your preference
    letterSpacing: "0.05em", // Adjust the letter-spacing as per your preference
  };
  return (
    <Tag className={`dark:text-gray-200`} style={headingStyles}>
      {children}
    </Tag>
  );
};
// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: Components): Components {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    h1: ({ children }) => heading({ level: 1, children }),
    h2: ({ children }) => heading({ level: 2, children }),
    h3: ({ children }) => heading({ level: 3, children }),
    h4: ({ children }) => heading({ level: 4, children }),
    h5: ({ children }) => heading({ level: 5, children }),
    h6: ({ children }) => heading({ level: 6, children }),
    // Allows customizing built-in components, e.g. to add styling.
    p: ({ children }) => (
      <p className="text-sm text-gray-700 dark:text-gray-300">{children}</p>
    ),
    // ul: ({ children }) => (
    //   <ul className="lst-inside list-disc space-y-1"i>{children}</ul>
    // ),
    // ol: ({ children }) => (
    //   <ol className="list-inside list-decimal space-y-1">{children}</ol>
    // ),
    li: ({ children }) => <li className="dark:text-gray-300 ">{children}</li>,
    img: ({ src, alt, height, width }) => (
      <img src={src} alt={alt} className="my-4 mx-auto max-w-full rounded" />
    ),
    // Typescript ignore next line
    // @ts-ignore
    code({ node, inline, className, children, ...props }: CodeProps) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <CodeBlock language={match[1]}>
          {String(children).replace(/\n$/, "")}
        </CodeBlock>
      ) : (
        <span
          className={`rounded-md bg-gray-100 dark:bg-neutral-700 font-mono dark:text-rose-500 text-rose-700 px-2 py-1 text-sm   `}
          {...props}
          style={{
            // color: "hsl(355, 65%, 65%)",
            // textShadow: "var(--code-text-shadow)",
            // fontFamily: `"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace;"`,
            // @ts-ignore
            fontSize: "0.9em",
          }}
        >
          {children}
        </span>
      );
    },
    // @ts-ignore
    pre: ({ children }) => {
      return (
        <div className="overflow-auto scrollbar-light dark:scrollbar-dark">
          {children}
        </div>
      );
    },
    // @ts-ignore
    a({ href, children }: { href: string; children: React.ReactNode }) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="not-format text-blue-500 hover:underline"
        >
          {children}
        </a>
      );
    },
    // @ts-ignore - Typescript ignore next line
    hr({ children }: { children: React.ReactNode }) {
      return (
        <div className="border-t border-gray-200 dark:border-gray-600">
          {children}
        </div>
      );
    },

    // @ts-ignore - Typescript ignore next line
    blockquote({ children }: { children: React.ReactNode }) {
      return (
        <blockquote className="border-l-2 border-gray-300 pl-4 dark:border-gray-700">
          {children}
        </blockquote>
      );
    },
    table({ children }: { children: React.ReactNode }) {
      return (
        <table className="w-full text-left text-sm text-gray-500 my-2  dark:text-gray-400">
          {children}
        </table>
      );
    },
    thead({ children }: { children: React.ReactNode }) {
      return (
        <thead className="bg-gray-50 text-xs uppercase rounded-t-lg table-caption text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          {children}
        </thead>
      );
    },
    tbody({ children }: { children: React.ReactNode }) {
      return (
        <tbody className="rounded-b-lg table-footer-group">{children}</tbody>
      );
    },
    tr({ isHeader, children }: { isHeader: any; children: React.ReactNode }) {
      const isHeaderRow = isHeader;
      // console.log(isHeaderRow);
      const className = `${
        isHeaderRow ? "" : "border-b bg-gray-100  dark:bg-gray-800"
      } dark:border-gray-700`;
      return <tr className={className}>{children}</tr>;
    },
    th({
      node,
      isHeader,
      children,
    }: {
      node: any;
      isHeader: any;
      children: React.ReactNode;
    }) {
      const classNames = `${
        !isHeader
          ? "px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-gray-300"
          : "px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-gray-300"
      }`;
      return <th className={classNames}>{children}</th>;
    },
    td({ children }: { children: React.ReactNode }) {
      return <td className="px-6 py-2">{children}</td>;
    },
    ...components,
  };
}
