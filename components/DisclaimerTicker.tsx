const MSG =
  "Startup And All is a professional advisory & process-facilitation service — final approvals and certificates are issued solely by the relevant government authorities.";

export default function DisclaimerTicker() {
  return (
    <div className="disc-ticker" aria-label="Disclaimer">
      <div className="disc-track">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i}>
            <span className="disc-item">{MSG}</span>
            <span className="disc-sep">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
