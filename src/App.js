import {React, useState} from "react"
import Calculator from "./components/Calculator"
import Footer from "./components/Footer"
import Header from "./components/Header"
import About from "./components/About"

export default function App() {
    const [pageState, setPageState] = useState(0);
    const [nightMode, setNightMode] = useState(false);
    
    let page;
    switch(pageState) {
        case 0:
            page = <Calculator isNight={nightMode} />;
            break;
        case 1:
            page = <About />;
            break;
        default:
            page = <h1>Whoops, something went wrong.</h1>;
            break;
    }

    /**
     * Function to handle changing the page tab.
     * @param {Event} event - event object to parse which tab to change to.
     */
    function changeTab(event) {
        const {value} = event.target

        setPageState(parseInt(value,10));
    }

    /**
     * Function to handle toggling night mode.
     */
    function nightToggle() {
        setNightMode(prevValue => !prevValue);
    }

    return (
        <main className={nightMode ? "main--night" : "main--day"}>
            <Header
                onClick={changeTab} 
                nightToggle={nightToggle}
                isNight={nightMode} />
            {page}
            <Footer isNight={nightMode} />
        </main>
    )
}
