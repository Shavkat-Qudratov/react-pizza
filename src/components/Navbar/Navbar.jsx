import React, { useState } from 'react';

import './Navbar.css';

export const Navbar = () => {
    const [active, setActive] = useState(false);
    const [title, setTitle] = useState("популярности");
    const dataList = [
        { id: 1, title: "популярности" },
        { id: 2, title: "по цене" },
        { id: 3, title: "по алфавиту" }
    ];
    const choose = (data) => {
        setTitle(data);
        setActive(!active);
    };

    return (
        <div className='Navbar'>
            <div className='left'>
                <button className='btn btn1'>Все</button>
                <button className='btn btn2'>Мясные</button>
                <button className='btn btn3'>Вегетарианская</button>
                <button className='btn btn4'>Гриль</button>
                <button className='btn btn5'>Острые</button>
                <button className='btn btn6'>Закрытые</button>
            </div>
            <div  className='right'>

                <div onClick={() => setActive(!active)} className="select">

                    Сортировка по: <span>{title}</span>
                </div>
                <ul className={active ? "options" : "hide"}>
                    {dataList.map((item) => {
                        return (
                            <li key={item.id} onClick={() => choose(item.title)}>
                                {item.title}
                            </li>
                        );
                    })}
                </ul>
            </div>

        </div>
    )
}


