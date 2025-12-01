import "./OAuthButton.scss";

export default function OAuthButton({
  onClick,
  logo,
  children,
  className = "",
  label,
}) {
  if (!logo || !children) {
    return null;
  }

  return (
    <button
      className={`oauth-btn ${className}`}
      onClick={onClick}
      aria-label={label || children}
    >
      <img
        src={logo}
        alt={label ? label : `${children} logo`}
        className="oauth-logo"
      />
      <span className="btn-text">{children}</span>
    </button>
  );
}
