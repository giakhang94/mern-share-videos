import loading from "../assets/images/small-loading.svg";
function SmallLoading() {
  return (
    <div className="w-[full] flex items-center justify-center">
      <img src={loading} alt="" className="w-5" />
      <span className="ml-2">Loading...</span>
    </div>
  );
}

export default SmallLoading;
