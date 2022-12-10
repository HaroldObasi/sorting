function Header (props) {
    return (
        <div className={props.isMobile ? "header_mobile" : "header"}>
            <div className="title">
                <h1>Sorting Algorithm Visualizer</h1>
                <p>Maxwell Roberts | <a href="https://www.github.com/robertsmaxwell" target="_blank" rel="noreferrer">github.com/robertsmaxwell</a></p>
            </div>
            <div className="options">
                <div id="algorithm">
                    <p>Algorithm</p>
                    <select disabled={props.isPlaying} value={props.algo} onChange={e => props.setAlgo(e.target.value)}>
                        <option value="bubble">Bubble Sort</option>
                        <option value="quick">Quick Sort</option>
                        <option value="merge">Merge Sort</option>
                    </select>
                </div>
                <div id="size">
                    <p>{"Array size"}</p>
                    <input disabled={props.isPlaying} type="range" value={props.size} onChange={e => props.setSize(e.target.value)} min="20" max="500" />
                    <p>{props.size}</p>
                </div>
            </div>
        </div>
    );
}

export default Header;