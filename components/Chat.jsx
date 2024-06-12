"use client";

import { useState } from "react";

const Chat = () => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(text);
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div className="">
        <h2 className="text-5xl">messages</h2>
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
          <button className="btn btn-primary join-item" type="submit">
            ask question
          </button>
        </div>
      </form>
    </div>
  );
};

export { Chat };
