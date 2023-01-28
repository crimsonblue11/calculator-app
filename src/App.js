import React from "react"
import Calculator from "./components/Calculator"
import Footer from "./components/Footer"
import Header from "./components/Header"
import About from "./components/About"

export default function App() {
    const [pageState, setPageState] = React.useState(0)
    const [nightMode, setNightMode] = React.useState(false)
    
    var style = {
        backgroundColor: nightMode ? "#404258" : "white",
        color: nightMode ? "white" : "black"
    }
    
    var buttonStyle = {
        backgroundColor: nightMode ? "#474E68" : "lightgrey",
        color: nightMode ? "white" : "black"
    }
    
    let page;
    switch(pageState) {
        case 0:
            page = <Calculator style={buttonStyle} />
            break
        case 1:
            page = <About />
            break
        default:
            page = <h1>Whoops, something went wrong.</h1>
            break
    }

    function changeTab(event) {
        setPageState(parseInt(event.target.value,10))
    }

    function nightToggle() {
        setNightMode(prevValue => !prevValue)
    }

    return (
        <main style={style}>
            <Header 
                onClick={changeTab} 
                nightToggle={nightToggle}
                isNight={nightMode}
                style={style} />
            {page}
            <Footer style={style} />
        </main>
    )
}
