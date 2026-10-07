import { calcLevel, calculateAccuracy, calculateNewWords } from '../utils'
import ProgressBar from './ProgressBar'

export default function Stats(props) {
    const { name, day, attempts, PLAN } = props
    // const name = 'Dynasty'
    // const day = 16

    // the values below don't need to be defines as stateful variables
    // They are just derived values based on the day
    const currLvl = calcLevel(day)
    console.log(currLvl);
    const flooredLvl = Math.floor(currLvl)
    const remainder = (currLvl - flooredLvl) * 100
    // The above calculates our XP on the current level

    return (
        <div className="card stats-card">
            <div className="welcome-text">
                <h6>Welcome</h6>
                <h4 className="text-large">
                    {name}
                </h4>
            </div>

            <div className="stats-column">
                <div>  
                    <p>Streak 🔥 </p>
                    <h4>{day - 1}</h4>
                </div>
                <div>  
                    {/* The reason fo rpassing in day - 1, is because 
                    we don't want to include the words of the current day because 
                    we haven't seen those words yet */}
                    <p>Words seen  </p>
                    <h4>{calculateNewWords(day-1)}</h4>
                </div>
                <div>  
                    <p>Accuracy [%] </p>
                    <h4>{(calculateAccuracy(attempts, day) * 100).toFixed(1)}</h4>
                </div>
            </div>

            <ProgressBar text={`lvl ${flooredLvl}`} remainder={remainder}/>

        </div>
    )
}