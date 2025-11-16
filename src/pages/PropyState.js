import {useState} from "react";

// export default function PropyStates(){
//     const [count, setCount] = useState(0); 
//     return (
//         <div>
//             <p>Has hecho click :D {count} veces</p>
//             <button className="btn btn-primary" onClick={() => setCount(count + 1)}>Clickeame</button>
//         </div>
//     );
// }

//ejemplo usando props
export default function PropyStates({valorInicial}){
    const [count, setCount] = useState(valorInicial); 
    return (
        <div>
            <p>Has hecho click :D {count} veces</p>
            <button className="btn btn-primary" onClick={() => setCount(count + 1)}>Clickeame</button>
        </div>
    );
}