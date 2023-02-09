import { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { Loading } from "../components";
import ScrollToBottom from "react-scroll-to-bottom";
const TextEditor = ({ id, socket }) => {
  const { isLoadingCMT, videoById, getVideoById, addComment } = useAppContext();
  const [input, setInput] = useState({ comment: "", name: "" });
  const [listInput, setListInput] = useState([]);
  useEffect(() => {
    setListInput(videoById && videoById.comment);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    addComment({ comment: input.comment, userName: input.name, id });
    socket.emit("send_comment", {
      msg: input.comment,
      id: id,
      name: input.name,
    });
    setListInput((prev) => [
      ...prev,
      { comment: input.comment, userName: input.name },
    ]);
    setInput({ comment: "", name: "" });
  };
  // socket.io

  useEffect(() => {
    socket.on("sendback_comment", (data) => {
      // console.log("tao");
      // console.log(data);
      setListInput((prev) => [
        ...prev,
        { comment: data.msg, userName: data.name },
      ]);
    });
  }, [socket]);
  return (
    <div className="w-full">
      {isLoadingCMT || !videoById ? (
        <Loading />
      ) : (
        <>
          <h3 className="text-slate-700 font-semibold tracking-[1.5px] mx-3 ">
            Các bình luận
          </h3>
          <div className="cmt mx-3 w-full max-h-[300px] my-5 border border-gray-300 rounded-sm shadow-sm shadow-gray-500 p-3">
            <ScrollToBottom className="h-[250px]">
              {!!videoById.comment &&
                listInput &&
                listInput.map((video, index) => {
                  return (
                    <p
                      key={index + "cmt"}
                      className="border border-gray-300 p-2 w-full rounded-sm my-2"
                    >
                      {video.userName}: {video.comment}
                    </p>
                  );
                })}
            </ScrollToBottom>
          </div>
        </>
      )}
      <form className="text-area w-full mx-3">
        <input
          className="border border-gray-300 w-full rounded-sm p-2"
          type="text"
          placeholder="your name"
          value={input.name}
          onChange={(e) => {
            setInput((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
        <textarea
          className="border border-gray-300 w-full rounded-sm p-2"
          placeholder="type your comment here"
          value={input.comment}
          onChange={(e) => {
            setInput((prev) => ({ ...prev, comment: e.target.value }));
          }}
        />
        <button
          type=""
          onClick={handleSubmit}
          className="w-full bg-[#AC7B60] py-2 text-white font-semibold tracking-[1.5px]"
        >
          Enter
        </button>
      </form>
    </div>
  );
};
export default TextEditor;
