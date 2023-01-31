function FormRow({
  name,
  labelText,
  type,
  value,
  disabled,
  handleChange,
  inputColor,
}) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="mt-3 mb-1 text-slate-600 font-semibold">
        {labelText || name}
      </label>
      <input
        disabled={disabled === true ? true : false}
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className={`border border-gray-300  p-1 rounded-sm mb-1 outline-1 outline-[#D1B5A5] ${
          !inputColor ? "text-gray-600" : "text-gray-900 bg-green-100"
        }`}
      />
    </div>
  );
}
export default FormRow;
