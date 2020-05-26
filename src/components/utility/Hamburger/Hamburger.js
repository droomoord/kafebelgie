import React from 'react'
import { FaBars } from 'react-icons/fa';

const Hamburger = (props) => {
    return (
        <FaBars onClick={props.clicked} className="hamburger"/>
    )
}

export default Hamburger
