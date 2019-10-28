import React from "react"
import Slider from "@material-ui/core/Slider"

interface SliderProps {
  value: number[]
  handleChange: (e: any, value: number | number[]) => void
}
  
export const RangeSlider:React.FC<SliderProps> = props => (
  <div className="slider">
    <Slider
      value={props.value}
      onChange={props.handleChange}
      valueLabelDisplay="auto"
      aria-labelledby="range-slider"
    />
  </div>
)