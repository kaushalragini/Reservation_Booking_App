import React, {useState, useEffect} from 'react'
import axios from 'axios';
const SeatBooking = () => {
    let arr = [
        [0, 0, 0, 0, 0, 0, 0], //0
        [0, 0, 0, 0, 0, 0, 0], //1
        [0, 0, 0, 0, 0, 0, 0], //2
        [0, 0, 0, 0, 0, 0, 0], //3
        [0, 0, 0, 0, 0, 0, 0], //4
        [0, 0, 0, 0, 0, 0, 0], //5
        [0, 0, 0, 0, 0, 0, 0], //6
        [0, 0, 0, 0, 0, 0, 0], //7
        [0, 0, 0, 0, 0, 0, 0], //8
        [0, 0, 0, 0, 0, 0, 0], //9
        [0, 0, 0, 0, 0, 0, 0], //10
        [0, 0, 0] //11
    ]
    const [number, setNumber] = useState('');
    const [seats, setSeats] = useState(arr);
    const [message, setMessage] = useState('');
    const resetSeat = async () => {
        await axios.post("http://localhost:8000/train/reset");
    }
    const reserveSeat = async (number) => {
        const result = await axios.post("http://localhost:8000/train/book", { number: number });
        setSeats(result.data.data);
        setMessage(result.data.msg);
    }
    useEffect(() => {
        resetSeat();
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(number);
        reserveSeat(number);
    }
    return (
        <>
            <div>SeatBooking</div>
            <div className="box">
                {
                    seats.map((ele, i) => {
                        return (
                            ele.map((item, j) => {
                                return(
                                    <div className="boxElement">{item}</div>
                                )
                            })    
                        )       
                    })
                }
            </div>
            <form onSubmit={ handleSubmit}>
                <input type="text" onChange={(e) => setNumber(e.target.value)} />
                <button>Submit</button>
                <div>{ message}</div>
            </form>
        </>
    )
}

export default SeatBooking