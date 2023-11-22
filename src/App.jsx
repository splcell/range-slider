
import { Slider } from "./components/Slider/ui/Slider";



function App() {
  
  const min = 0;
  const max = 1000;

  return (
    <>
      <div className="inner">
            <Slider min={min} max={max}/>
      </div>
    </>
  )
}

export default App
