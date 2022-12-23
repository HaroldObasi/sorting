import { useGlobalContext } from "./Context/context";

function Header(props) {
  const { arraySize, setArraySize, algo, setAlgo, playButton, mobile } =
    useGlobalContext();
  return (
    <div className={mobile ? "header_mobile" : "header"}>
      <div className="title">
        <h1>Sorting Algorithm Visualizer</h1>
        <p>
          Maxwell Roberts |{" "}
          <a
            href="https://www.github.com/robertsmaxwell"
            target="_blank"
            rel="noreferrer"
          >
            github.com/robertsmaxwell
          </a>
        </p>
      </div>
      <div className="options">
        <div id="algorithm">
          <p>Algorithm</p>
          <select
            disabled={!playButton}
            value={algo}
            onChange={(e) => setAlgo(e.target.value)}
          >
            <option value="bubble">Bubble Sort</option>
            <option value="quick">Quick Sort</option>
            <option value="merge">Merge Sort</option>
          </select>
        </div>
        <div id="size">
          <p>{"Array size"}</p>
          {/* <input
            disabled={props.isPlaying}
            type="range"
            value={props.size}
            onChange={(e) => props.setSize(e.target.value)}
            min="20"
            max="500"
          /> */}
          <input
            disabled={!playButton}
            type="range"
            value={arraySize}
            onChange={(e) => setArraySize(e.target.value)}
            min="20"
            max="500"
          />
          <p>{arraySize}</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
