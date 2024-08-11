function Rect({rect}) {

    function randomColor(){
        const colorIndex = () => Math.floor(Math.random() * 255);
        return `rgb(${colorIndex()}, ${colorIndex()}, ${colorIndex()})`;
    }

    return (
        <div
            className="rect"
            style={{
                backgroundColor: randomColor(),
                width: (rect.w * 72) / 6,
                height: (rect.h * 72) / 6,
                top: (rect.fit.y * 72) / 6,
                left: (rect.fit.x * 72) / 6,
            }}
        ></div>
    );
}

export default Rect;