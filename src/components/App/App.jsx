import { useState } from "react";

import ParamsContainer from "../ParamsContainer/ParamsContainer";
import SheetsContainer from "../SheetsContainer/SheetsContainer";

import { Packer } from "../../utils/packer";

function App(){

    const [sheetSize, setSheetSize] = useState({width: 20, height: 40});
    const [rects, setRects] = useState([
        {
            w: 5,
            h: 7,
            num: 50,
        },
        {
            w: 3,
            h: 4.5,
            num: 70,
        },
        {
            w: 9,
            h: 2,
            num: 50,
        },
    ]);

    // function changeSheetSize(width, height){
    //     setSheetSize({width, height});
    // }

    // function changeRects(rects){
    //     setRects(rects);
    // }

    function serialize(blockTypes) {
        let str = "";
        for (let i = 0; i < blockTypes.length; i++) {
            const block = blockTypes[i];
            str = `${str}${block.w}x${block.h}${block.num > 1 ? "x" + block.num : ""}\n`;
        }
        return str;
    }

    function deserialize(val) {
        const blocks = val.split("\n");
        let result = [];
        let expanded = [];
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i].split("x");
            if (block.length >= 2) {
                result.push({
                    w: parseInt(block[0]),
                    h: parseInt(block[1]),
                    num: block.length === 2 ? 1 : parseInt(block[2]),
                });
            }
        }
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[i].num; j++) {
                expanded.push({
                    w: result[i].w,
                    h: result[i].h,
                    area: result[i].w * result[i].h,
                });
            }
        }
        return expanded;
    }

    let container = [];
    let sheetCount = 0;
    let filledSheets = [];

    function pack(w, h, blocks) {
        const packer = new Packer(sheetSize.width, sheetSize.height);
        packer.fit(blocks);
        container[sheetCount] = [];

        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            if(block.fit){
                container[sheetCount].push(block);
            }
        }
        sheetCount++;
        check(blocks, w, h);
    }

    function check(blocks, w, h) {
        let fit = 0;
        let nofit = [];
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            if (block.fit) {
                fit = fit + block.area;
            } else {
                nofit.push(block);
            }
        }
        console.log(Math.round((100 * fit) / (w * h)) + "%");
        filledSheets.push(Math.round((100 * fit) / (w * h)) + "%");
        if (nofit.length > 0) {
            pack(w, h, nofit);
        }
    }
    pack(sheetSize.width, sheetSize.height, deserialize(serialize(rects)));

    return (
        <div className="wrapper">
            <div className="container">
                <ParamsContainer sheetSize={sheetSize} rects={serialize(rects)} />
                <SheetsContainer sheetSize={sheetSize} container={container} filled={filledSheets}/>
            </div>
        </div>
    );
}

export default App;