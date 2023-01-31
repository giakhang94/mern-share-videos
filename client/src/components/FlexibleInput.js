const FlexibleInput = ({
  name,
  children,
  value,
  handleChange,
  text,
  type,
  className,
}) => {
  if (type === "p") {
    return <p className={className}>{children}</p>;
  }
  if (type === "span") {
    return <span className={className}>{children}</span>;
  }
  if (type === "input") {
    return (
      <input
        className="border border-gray-300 pl-1 w-[100%] text-gray-600 bg-green-100 rounded-md text-sm block mb-[1px] "
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
      />
    );
  }
};
export default FlexibleInput;
