import React from "react"
import Calculator from "./components/Calculator"
import Footer from "./components/Footer"
import Header from "./components/Header"
import About from "./components/About"

export default function App() {
    const [pageState, setPageState] = React.useState(0)

    let page;
    switch(pageState) {
        case 0:
            page = <Calculator />
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

    return (
        <main className="container">
            <Header onClick={changeTab} />
            {page}
            <Footer />
        </main>
    )
}
