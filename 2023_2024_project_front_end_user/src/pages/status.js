import React from 'react';
import './status.css';

let stage = 2;

function Status() {
    return(
    <div>
    <img className = 'progress' src = 'https://static.vecteezy.com/system/resources/previews/024/109/972/original/business-process-management-background-business-process-workflow-or-automated-business-system-with-icons-and-hexagonal-shapes-illustration-vector.jpg'></img>
        {stage >= 1 && <img className = "first cir" src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Eo_circle_green_blank.svg/1024px-Eo_circle_green_blank.svg.png"></img>}
        {stage < 1 && <img className = "first cir" src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Circle_Davys-Grey_Solid.svg/2048px-Circle_Davys-Grey_Solid.svg.png"></img>}
        {stage >= 2 && <img className = "second cir" src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Eo_circle_green_blank.svg/1024px-Eo_circle_green_blank.svg.png"></img>}
        {stage < 2 && <img className = "second cir" src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Circle_Davys-Grey_Solid.svg/2048px-Circle_Davys-Grey_Solid.svg.png"></img>}
        {stage >= 3 && <img className = "third cir" src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Eo_circle_green_blank.svg/1024px-Eo_circle_green_blank.svg.png"></img>}
        {stage < 3 && <img className = "third cir" src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Circle_Davys-Grey_Solid.svg/2048px-Circle_Davys-Grey_Solid.svg.png"></img>}
        <h1 className='one'>1</h1>
        <h1 className='two'>2</h1>
        <h1 className='three'>3</h1>
        <h1 className='Message'>Your refund is being processed in stage {stage}</h1>
        <h1 className='Message2'>Please wait for the concerned department to respond...</h1>
    </div>)
}

export default Status;