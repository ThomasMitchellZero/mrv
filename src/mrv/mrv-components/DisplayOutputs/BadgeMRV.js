
import "./BadgeMRV.css";

function BadgeMRV({ badgeText = "Badge Text", badgeType = "neutral", extraClassStr = "", neutral__green__gold__red__brandBlue,}) { 
    return (
        <div className={`badge body__small ${badgeType} ${extraClassStr}`}>
        {badgeText}
        </div>
    );
}

export { BadgeMRV };