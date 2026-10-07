import { useState, useEffect } from "react"
import Challenge from "./components/layouts/Challenge"
import Dashboard from "./components/layouts/Dashboard"
import Layout from "./components/layouts/Layout"
import Welcome from "./components/layouts/Welcome"
import WORDS from './utils/VOCAB.json';
import { countdownIn24Hours, getWordByIndex, PLAN } from './utils'; /// normal norma, the index file inside a folder is always used to import and export all previously defined functions, so javascript will definitely be looking into the index.js file initially

function App() {

    const [selectedPage, setSelectedPage] = useState(0)
    // const selectedPage = 2 // zero is for welcome, 1 is for dashboard, 2 is for challenge
    const [name, setName] = useState('')
    const [day, setDay] = useState(1)
    const [dateTime, setDateTime] = useState(null);
    const [history, setHistory] = useState({}) 
    const [attempts, setAttempts] = useState(0)

    
    
    // After having all the words, now we need to figure out which word we have for any given day:
    // The PLAN inside index.js defines the spaced repetition algorithm

    const daysWords = PLAN[day].map((idx) => {
       return getWordByIndex(WORDS, idx).word
    });
    console.log(daysWords);

    function handleChangePage(pageIndex) {
        setSelectedPage(pageIndex)
    }

    function handleCreateAccount(params) {
        if (!name) { return }
        localStorage.setItem("username", name)
        handleChangePage(1)
    }

    function handleCompleteDay() {
        const newDay = day + 1;
        const newDateTime = Date.now()
        setDay(newDay)
        setDateTime(newDateTime)
        localStorage.setItem("day", JSON.stringify({
            day: newDay, 
            dateTime: newDateTime
        }))
        setSelectedPage(1)
    }

    function handleIncrementAttempts() {
        // take the current attempt number, and add one and save it to local storage
        const newRecord = attempts + 1
        localStorage.setItem('attempts', newRecord)
        setAttempts(newRecord);
    }

    useEffect(() => {
        // this callback function is triggered on page load
        if (!localStorage) { return } // if we don't yet have access to the database, then exit the callback function

        if (localStorage.getItem('username')) {
            // if we find the item (so get item returns something), then we enter the if block.
            setName(localStorage.getItem("username"))

            // we have a name, so we can skip to the dashboard
            setSelectedPage(1) // because 1 is associated with the Dashboard
        }
        // the first useEffect() above checks if local storage contains our name, we will modifyour useEffect 
        // now to factor in order things such as check if it contains our attempts, our history, or the currentDay.

        if (localStorage.getItem('attempts')) {
            // in the localStorage JSON db, only strings exist, hence the need for parseInt
            setAttempts(parseInt(localStorage.getItem('attempts')))
        }

        if (localStorage.getItem('history')) {
            setHistory(JSON.parse(localStorage.getItem('history')))
        }

        if (localStorage.getItem('day')) {
            const { day: d, dateTime: dt } = JSON.parse(localStorage.getItem('day'))
            setDateTime(dt)
            setDay(d)

            if (d > 1) {
                const diff = countdownIn24Hours(dt)
                console.log(diff)

                if (diff < 0) {
                    console.log('Failed challenge')
                    let newHistory = {...history} // spreading out history to ensure we include all of our historical history records
                    const timeStamp = new Date(dt)
                    const formattedTimeStamp= timeStamp.toString().split(' ').slice(1, 4).join(' ')

                    newHistory[formattedTimeStamp] = d // then add in a new entry into our history, which is what we just did here.
                    setHistory(newHistory)
                    setDay(1)
                    setDateTime(null)
                    setAttempts(0) // all of this is for ensuring the user cna restart because they failed to complete it within the appropriate time.

                    localStorage.setItem('attempts', 0)
                    localStorage.setItem('history', JSON.stringify(newHistory))
                    localStorage.setItem('day', JSON.stringify({day: 1, dateTime: null}))
                }
            }
        }
    }, [])
    // Okay, let us now truly see if wakatime has been able to really track things up

    const pages = {
        0: <Welcome handleCreateAccount={handleCreateAccount} username="hello world" name={name} setName={setName}/>,
        1: <Dashboard history={history} name={name} attempts={attempts} PLAN={PLAN} day={day} 
        handleChangePage={handleChangePage} daysWords={daysWords} dateTime={dateTime} />,
        2: <Challenge day={day} daysWords={daysWords} handleChangePage={handleChangePage} 
    handleIncrementAttempts={handleIncrementAttempts} handleCompleteDay={handleCompleteDay} PLAN={PLAN}/>
    }
    return (
        <Layout>
            {pages[selectedPage]}
        </Layout>
    )
}

export default App
