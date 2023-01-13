import React from "react"
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai"

export default function Footer() {
    return (
        <footer>
            <p>Created and maintained by Conor Dempsey, 2023</p>
            <span className="footer--icons">
                <a href="https://github.com/crimsonblue11"><AiFillGithub /></a>
                <a href="https://www.linkedin.com/in/conor-dempsey-a66269237"><AiFillLinkedin /></a>
            </span>
        </footer>
    )
}
