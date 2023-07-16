import ChatUi from "@/src/components/chat";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GPT Clone",
};
export default function Home() {
  return (
    <main className="flex justify-between  w-full mx-auto   max-w-4xl flex-col h-full px-4  sm:px-28 py-10">
      <ChatUi />
    </main>
  );
}
