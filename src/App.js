import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import './App.css';
import Header from "./Header.js";

import play_button from "./images/play.png";
import pause_button from "./images/pause.png";
import reverse_button from "./images/reverse.png";

function App() {
  const [mobile, setMobile] = useState(window.innerWidth < 1000)

  const [startArray, setStartArray] = useState(randomArray(200));
  const colors = useRef([])

  const [arraySize, setArraySize] = useState(200)
  const [algo, setAlgo] = useState("bubble")

  const currentStep = useRef(0)

  const [reverseButton, setReverseButton] = useState(false)
  const reverse = useRef(false)

  const [playButton, setPlayButton] = useState(true)
  const playing = useRef(false)

  const speeds = [.25, .5, 1, 2]
  const speed = useRef(1)

  useEffect(() => {
    currentStep.current = 0
    setStartArray(randomArray(arraySize))
  }, [arraySize])

  useEffect(() => {
    // colors.current = getColors(startArray)
    graphArray(startArray)
  }, [startArray])

  useEffect(() => {
    currentStep.current = 0
    graphArray(startArray)
  }, [algo])

  useEffect(() => {
    window.addEventListener('resize', updateMobile)

    return () => {
      window.removeEventListener('resize', updateMobile)
    }
  }, [startArray])

  const updateMobile = async e => {
    setMobile(window.innerWidth < 1000)

    // const canv = document.getElementById("canvas")
    // canv.width = window.innerWidth 
    // canv.height = window.innerWidth < 1000 ? window.innerHeight / 2 : window.innerHeight / 1.5

    // // colors.current = getColors(startArray)
    currentStep.current = 0
    await new Promise(r => setTimeout(r, 100))
    graphArray(startArray)
  }

  const getColors = (arr) => {
    let c = ["#2274A5", "#F75C03", "#F1C40F", "#D90368", "#00CC66", "#2274A5", "#F75C03", "#F1C40F", "#D90368", "#00CC66"]
    const sorted = quick(arr, 1)

    let returnArray = []
    for(let i = 0; i < sorted.length; i++)
    {
      returnArray.push(sorted[i])
      returnArray.push(c[Math.floor(i / (sorted.length / c.length))])
    }

    return returnArray
  }

  const graphArray = (arr) => {
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext('2d')
    colors.current = getColors(startArray)

    let max = canvas.width * .75;

    let barWidth = (max / 1) / arr.length
    // let barSpace = (max - (max / 1.5)) / arr.length
    let x = (canvas.width * .25) / 2

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for(let i = 0; i < arr.length; i++)
    {
      ctx.fillStyle = colors.current[colors.current.indexOf(arr[i]) + 1]
      ctx.fillRect(x, canvas.height, barWidth, -arr[i] * 550)
      x += barWidth
    }
  }

  const play = async (call, s, r, p, sp) => {
    p.current = true
    if(!r.current)
    {
      if(s.current === 1)
      {
        return
      }
    } else
    {
      if(s.current === 0)
      {
        return
      }
    }

    while(s.current >= 0 && s.current <= 1)
    {
      if(!playing.current)
      {
        return
      }

      if(!r.current)
      {
        s.current += (.00125 * sp.current)
      } else
      {
        s.current -= (.00125 * sp.current)
      }

      graphArray(call(startArray, s.current, false))
      await new Promise(r => setTimeout(r, 10))
    }

    if(!r.current)
    {
      s.current = 1
    } else
    {
      s.current = 0
    }
  }

  return (
    <div className="main">
      <Header isMobile={mobile} isPlaying={!playButton} size={arraySize} setSize={setArraySize} algo={algo} setAlgo={setAlgo} />
      <canvas id="canvas" width={window.innerWidth / 1} height={mobile ? window.innerHeight / 2 : window.innerHeight / 1.5} />
      <div className={mobile ? "controls_mobile" : "controls"}>
        <div className="reverse_container">
          <input className={reverseButton ? "selected" : ""} id="reverse" type="image" src={reverse_button} alt="reverse" onClick={() => {
            reverse.current = !reverse.current
            setReverseButton(reverse.current)
          }} />
        </div>
        <img src={playButton ? play_button : pause_button} alt="play" onClick={async () => {
          if(playing.current)
          {
            playing.current = false
            setPlayButton(true)
          } else
          {
            setPlayButton(false)
            if(algo === "bubble")
            {
              await play(bubble, currentStep, reverse, playing, speed)
            } else if (algo === "quick")
            {
              await play(quick, currentStep, reverse, playing, speed)
            } else if (algo === "merge")
            {
              await play(merge, currentStep, reverse, playing, speed)
            }
            
            playing.current = false
            setPlayButton(true)
          }
          
        }} />
        <div className="speed_container">
          <button id="speed" onClick={e => {
            speed.current = speeds[(speeds.indexOf(speed.current) + 1) % speeds.length]
            e.target.innerHTML = String(speed.current) + "x"
          }}>1x</button>
        </div>
      </div>
    </div>
  );
}

const bubble = (array, percentage, count=false) => {
  let max = null
  let step = 0;
  let arr = array.slice();

  if(!count)
  {
    max = bubble(array, 1, true)
  }

  if(percentage <= 0)
  {
    return arr
  } else if(percentage > 1)
  {
    percentage = 1
  }

  let sorted = false;
  while(!sorted)
  {
    sorted = true
    for(let i = 0; i < arr.length - 1; i++)
    {
      if(arr[i] > arr[i + 1])
      {
        step += 1

        const tmp = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = tmp
        sorted = false

        if(!count && step >= max * percentage)
        {
          return arr
        }
      }
    }
  }

  return step
}

const quick = (array, percentage, count=false) => {
  let arr = array.slice()
  let stack = [[0, array.length - 1]]
  let step = 0
  let max = null

  if(!count)
  {
    max = quick(arr, 1, true)
  }

  if(percentage <= 0)
  {
    return arr
  }

  while(stack.length > 0)
  {
    const [l, r] = stack.pop()
    if(l === r)
    {
      continue
    } else if (l + 1 === r)
    {
      if(arr[l] > arr[r])
      {
        const tmp = arr[l]
        arr[l] = arr[r]
        arr[r] = tmp
      }
      
      if(!count && step >= max * percentage)
      {
        return arr
      }
      step += 1
      continue
    } else
    {
      let choices = [arr[l], arr[r], arr[l + Math.floor((r - l) / 2)]]
      choices.sort()
      let pivot = choices[1]
      arr[arr.indexOf(pivot)] = arr[r]
      arr[r] = pivot

      let itemFromLeft, itemFromRight = null

      while(true)
      {
        itemFromLeft = itemFromRight = null

        for(let i = l; i < r; i++)
        {
          if(itemFromLeft === null && arr[i] > pivot)
          {
            itemFromLeft = i
          } else if(arr[i] < pivot)
          {
            itemFromRight = i
          }
        }

        if(!count && step >= max * percentage)
        {
          return arr
        }
        step += 1

        if(itemFromLeft < itemFromRight)
        {
          const tmp = arr[itemFromLeft]
          arr[itemFromLeft] = arr[itemFromRight]
          arr[itemFromRight] = tmp
          continue
        } else
        {
          arr[r] = arr[itemFromLeft]
          arr[itemFromLeft] = pivot
          break
        }
      }

      stack.push([itemFromLeft + 1, r])
      stack.push([l, itemFromLeft - 1])
    }
  }

  if(!count)
  {
    return arr
  } else
  {
    return step
  }
}

const merge = (array, percentage, count=false) => {
  const m = (a1, a2) => {
    let newArr = []
    while(a1.length > 0 && a2.length > 0)
    {
      if(a1[0] < a2[0])
      {
        newArr.push(a1[0])
        a1.shift()
      } else
      {
        newArr.push(a2[0])
        a2.shift()
      }
    }

    return newArr.concat(a1).concat(a2)
  }

  let arr = array.slice()
  let step = 0
  let max = null

  if(!count)
  {
    max = merge(arr, 1, true)
  }

  for(let currSize = 1; currSize < arr.length; currSize *= 2)
  {
    let left = 0
    while(left + currSize * 2 <= arr.length)
    {
      let l = arr.slice(left, left + currSize)
      left += currSize
      let r = arr.slice(left, left + currSize )
      left += currSize

      const merged = m(l, r)
      let mi = 0
      for(let i = left - currSize * 2; i < left; i++)
      {
        if(!count && step >= max * percentage)
        {
          return arr
        }

        arr[arr.indexOf(merged[mi])] = arr[i]
        arr[i] = merged[mi]

        mi += 1
        step += 1
      }
    }

    if(left + currSize < arr.length)
    {
      if(!count && step >= max * percentage)
      {
        return arr
      }

      let l = arr.slice(left, left + currSize)
      left += currSize
      let r = arr.slice(left)

      const merged = m(l, r)
      let mi = 0
      for(let i = left - currSize; i < arr.length; i++)
      {
        if(!count && step >= max * percentage)
        {
          return arr
        }

        arr[arr.indexOf(merged[mi])] = arr[i]
        arr[i] = merged[mi]

        mi += 1
        step += 1
      }
    }
  }
  
  if(count)
  {
    return step
  } else
  {
    return arr
  }
}

const randomArray = (len) => {
  let tmp = []

  for(let i = 0; i < len; i++)
  {
    tmp.push(Math.random());
  }

  return tmp
}

export default App;
