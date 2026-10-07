import { useEffect, useState } from "react"
import { convertMilliseconds, countdownIn24Hours } from "../utils"

export default function Countdown(props) {
    const { handleChangePage, daysWords, dateTime, day } = props

    const targetMillis = dateTime || Date.UTC(1944, 2, 17, 12, 0) // a backup to prevent our code from breaking, when user hasn't started, we default to that specific day.
    const [remainingMs, setRemainingMs] = useState(countdownIn24Hours(targetMillis))
    // It is a stateful variable, because it modifies itself every second -> Essentially how many milliseconds are left in a day

    const timer = convertMilliseconds(remainingMs)
    // console.log(timer)

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingMs(countdownIn24Hours(targetMillis))
        }, 1000)
        // last, we return a cleanup function
        return () => clearInterval(interval) 
    }, [targetMillis])


    return (
        <div className="card countdown-card">
            <h1 className="item-header">Day {day}</h1>
            <div className="today-container">
                <div>
                    <p>Time remaining</p>
                    <h3>{dateTime ? `${Math.abs(timer.hours)}H
                    ${Math.abs(timer.minutes)}M
                    ${Math.abs(timer.seconds)}S`
                    : '24H 59M 59S'}</h3>
                </div>
                <div>
                    <p>Words for today</p>
                    <h3>{daysWords.length}</h3>
                </div>
            </div>

            <button onClick={() => { handleChangePage(2) }} className="start-task">
                <h6>Start</h6>
            </button>
            <div></div>
        </div>
    )
}

// THis component contains the logic of our daily countdowns.
 