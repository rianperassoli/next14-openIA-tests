"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { generateChatResponse } from "@/utils/action";
import toast from "react-hot-toast";

const Chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const { mutate: createMessage, isPending } = useMutation({
    mutationFn: (query) => generateChatResponse([...messages, query]),
    onSuccess: (data) => {
      if (!data) {
        toast.error("Something went wrong...");
        return;
      }
      setMessages((prev) => [...prev, data]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const query = { role: "user", content: text };
    createMessage(query);

    setMessages((prev) => [...prev, query]);
    setText("");
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div className="">
        {messages.map(({ role, content }, index) => {
          const avatar = role === "user" ? "👤" : "🤖";
          const bgColor = role === "user" ? "bg-base-200" : "bg-base-100";
          return (
            <div
              key={index}
              className={` ${bgColor} flex py-6 -mx-8 px-8
               text-xl leading-loose border-b border-base-300`}
            >
              <span className=" mr-4">{avatar}</span>
              <p className="max-w-3xl">{content}</p>
            </div>
          );
        })}
        {isPending && (
          <div className="flex items-center justify-center w-full h-20">
            <span className="loading loading-dots loading-lg bg-primary opacity-30" />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
        <div className="join w-full">
          <input
            type="text"
            className="input input-bordered join-item w-full"
            placeholder="Message GeniousGPT"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <button
            className="btn btn-primary join-item"
            type="submit"
            disabled={isPending}
          >
            {isPending && <span className="loading loading-bars loading-xs" />}
            {isPending ? "please wait..." : "ask question"}
          </button>
        </div>
      </form>
    </div>
  );
};

export { Chat };
