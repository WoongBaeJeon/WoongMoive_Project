import "./CommonButton.scss";

export default function CommonButton({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  style = {},
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`common-btn ${className}`}
      style={style}
    >
      {children}
    </button>
  );
}
