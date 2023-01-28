import React from "react"
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai"

export default function Footer(props) {
    return (
        <footer style={props.style}>
            <p>Created and maintained by Conor Dempsey, 2023</p>
            <span className="footer--icons">
                <a style={props.style} href="https://github.com/crimsonblue11"><AiFillGithub /></a>
                <a style={props.style} href="https://www.linkedin.com/in/conor-dempsey-a66269237"><AiFillLinkedin /></a>
            </span>
        </footer>
    )
}
