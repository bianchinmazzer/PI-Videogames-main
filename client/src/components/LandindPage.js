import React from "react";
import {Link} from "react-router-dom";



export default function LandingPage() {
    
    return (
        <div className="Landing">
        <div className="container">
            <div className="wrap">
            <Link to="/home">
                <div className="first">Start</div>
                <div className="second">The game</div>
            </Link>
            </div>
        </div>
        </div>
    )
}