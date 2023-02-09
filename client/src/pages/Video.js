import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Alert, Loading, MyEditor } from "../components";
import { useAppContext } from "../context/appContext";
import io from "socket.io-client";
const socket = io.connect("http://127.0.0.1:5000");
export default function Video() {
  const {
    isLoading,
    isLoadingCMT,
    alertType,
    alertText,
    showAlert,
    getVideoById,
    videoById,
  } = useAppContext();
  const { id } = useParams();
  useEffect(() => {
    getVideoById(id);
  }, []);
  //socket.io
  useEffect(() => {
    socket.emit("join_comment", id);
  }, []);
  if (isLoading && !isLoadingCMT) {
    return <Loading />;
  }
  return (
    <>
      {showAlert && <Alert alertText={alertText} alertType={alertType} />}
      <div className="p-3">
        <div className="title uppercase text-center text-slate-700 font-bold tracking-[2px] text-xl mb-3">
          {videoById && videoById.title}
        </div>
        <div className="flex justify-center">
          <iframe
            className="max-w-[800px]"
            width="80%"
            height="315"
            src={`https://www.youtube.com/embed/${videoById && videoById.link}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="comments">
          <div className="text-editor w-full p-5 max-h-[150px] ">
            <MyEditor id={id} socket={socket} />
          </div>
        </div>
      </div>
    </>
  );
}
