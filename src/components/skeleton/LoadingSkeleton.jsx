import "./LoadingSkeleton.scss";

export default function LoadingSkeleton(posterHeight, titleWidth, textWidth) {
  return (
    <div className="skeleton">
      <div className="skeleton-poster" style={{ height: posterHeight }}></div>
      <div className="skeleton-title" style={{ width: titleWidth }}></div>
      <div className="skeleton-text" style={{ width: textWidth }}></div>
    </div>
  );
}
