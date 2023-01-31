import loading from "../assets/images/loading.svg";
function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img src={loading} alt="" />
    </div>
  );
}

export default Loading;
