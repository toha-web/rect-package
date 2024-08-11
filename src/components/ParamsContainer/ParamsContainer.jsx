import ParamsTitle from "../ParamsTitle/ParamsTitle";

function ParamsContainer({sheetSize, rects}){
    const rectsArr = rects.split("\n");
    return (
        <div className="params-container">
            <ParamsTitle title="Sheet size (in * 72 / 6)" />
            {`${sheetSize.width} x ${sheetSize.height}`}
            {/* <form id="sheet-form" action="">
                <label htmlFor="">
                    width: <input type="text" />
                </label>
                <label htmlFor="">
                    height: <input type="text" />
                </label>
            </form> */}
            <ParamsTitle title="Rectangle size (in * 72 / 6)" />
            {rectsArr.map((rect) => {
                return <div key={rect}>{rect}</div>;
            })}
            {/* <form id="rect-form" action="">
                <label htmlFor="">
                    width: <input type="text" />
                </label>
                <label htmlFor="">
                    height: <input type="text" />
                </label>
                <label htmlFor="">
                    count: <input type="text" />
                </label>
            </form> */}
        </div>
    );
}

export default ParamsContainer;