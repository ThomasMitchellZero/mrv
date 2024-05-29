
import "./BadgeMRV.css";

function BadgeMRV({ badgeText = "Badge Text", badgeType = "neutral", extraClassStr = "", neutral__green__gold__red__brandBlue,}) { 
    return (
        <div className={`badge ${badgeType} ${extraClassStr}`}>
        {badgeText}
        </div>
    );
}

export { BadgeMRV };