import React, { useReducer } from "react";
import { RangeSlider } from "./Components"

type Views = "home" | "roll";
type Areas = "top" | "left" | "right" | "bottom";
const areas: Areas[] = ["top", "left", "right", "bottom"];
const phrases: string[] = ["How about", "Go for", "Obviously", "Definitely", "What about", "Try", "Computer says", "Consider"]

const dontGoBack = (previous: string, array: string[]) => {
  const reversed = array.slice(0).reverse()
  let i = getIntBetween(0, array.length - 1)
  while (reversed[i] === previous) {
    i = getIntBetween(0, array.length - 1)
  }
  return array[i]
}

const randomFromArray = (array: string[]) => {
  return array[getIntBetween(0, array.length - 1)]
}

const getIntBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const initOptions = {
  animate: false,
  current: 'home',
  direction: 'center',
  phrase: phrases[0],
  range: [1, 10],
  roll: 0,
}

const reducer = (state:any, action:any) => {
  switch (action.type) {
    case 'ANIMATE':
      return { ...state, animate: action.payload }

    case 'CHANGE_VIEW':
      return { ...state, direction: action.payload }

    case 'SET_CURRENT_VIEW':
      return { ...state, current: action.payload }

    case 'SET_PHRASE':
      return { ...state, phrase: action.payload }

    case 'SET_ROLL':
      return { ...state, roll: action.payload }

    case 'SET_ROLL_RANGE':
      return { ...state, range: action.payload }

    default:
      return state
  }
};

const App: React.FC = () => {

  const [options, dispatch] = useReducer(reducer, initOptions)

  const handleChange = (e: any, value: any) => {
    dispatch({ type: 'SET_ROLL_RANGE', payload: value })
  }

  const rollNumber = () => {
    dispatch({ type: 'SET_PHRASE', payload: randomFromArray(phrases) })
    dispatch({ type: 'SET_ROLL', payload: getIntBetween(options.range[0], options.range[1]) })
    changeView("roll")
  }

  const changeView = (view:Views) => {
    dispatch({ type: 'ANIMATE', payload: true })
    dispatch({ type: 'CHANGE_VIEW', payload: dontGoBack(options.direction, areas) })
    setTimeout(() => {
      dispatch({ type: 'SET_CURRENT_VIEW', payload: view })
      dispatch({ type: 'ANIMATE', payload: false })
    }, 1000)
  }

  const getClass = (view: Views) => {
    if (options.animate) {
      return options.current !== view ? `${view} ${options.direction}` : `${view} center`
    }
    return options.current === view ? `${view} center` : `${view} hidden`
  }

  return (
    <main>
      <section className={ options.animate ? `animate ${options.direction}` : `center` }>
        <section className={getClass("home")}>
          <div className="container">
            <RangeSlider value={options.range} handleChange={handleChange} />
            <button disabled={options.animate} onClick={() => rollNumber()}>Roll</button>
          </div>
        </section>
        <section className={getClass("roll")}>
          <div className="container">
            <div className="phrase">{options.phrase}</div>
            <div className="drop">
              <h3>{options.roll}</h3>
            </div>
            <button disabled={options.animate} onClick={() => changeView("home")}>Again</button>
          </div>
        </section>
      </section>
    </main>
  )
}

export default App
