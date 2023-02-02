import React from "react"
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai"

export default function Footer({isNight}) {
    const githubLink = "https://github.com/crimsonblue11";
    const linkedinLink = "https://www.linkedin.com/in/conor-dempsey-a66269237";
    
    return (
        <footer className={isNight ? "footer--night" : "footer--day"}>
            <p>Created and maintained by Conor Dempsey, 2023</p>
            <span
                className={isNight ? "footer--icons--night" : "footer--icons--day"}
            >
                <a href={githubLink}><AiFillGithub /></a>
                <a href={linkedinLink}><AiFillLinkedin /></a>
            </span>
        </footer>
    )
}
