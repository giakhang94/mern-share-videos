const Alert = ({ alertType, alertText }) => {
  return (
    <p
      className={`${
        alertType === "danger"
          ? "bg-red-200 text-red-500"
          : "bg-green-200 text-green-500"
      } tracking-[1px] font-semibold block w-full text-center text-md py-2 rounded-sm my-2`}
    >
      {alertText}
    </p>
  );
};
export default Alert;
