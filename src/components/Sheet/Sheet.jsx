import Rect from "../Rect/Rect";

function Sheet({ width, height, rects, filled }) {
    return (
        <div className="sheet" style={{ width, height }}>
            <span>Filled: {filled}</span>
            {rects.map((rect, i) => {
                return <Rect key={i} rect={rect} />;
            })}
        </div>
    );
}

export default Sheet;