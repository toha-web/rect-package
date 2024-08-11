import Sheet from "../Sheet/Sheet";

function SheetsContainer({sheetSize, container, filled}){

    return (
        <div className="sheets-container">
            {container.map((sheet, i) => {
                return <Sheet key={i} width={`${(sheetSize.width * 72) / 6}px`} height={`${(sheetSize.height * 72) / 6}px`} rects={sheet} filled={filled[i]}/>
            })}
        </div>
    );
}

export default SheetsContainer;