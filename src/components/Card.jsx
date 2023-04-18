import React from "react";


function Card({ card, onCardClick }) {

    return (
        <li className="element">
            <img className="element__image "  src={card.link} alt={card.name} onClick={onCardClick}/>
            <div className="element__column">
                 <h2 className="element__text">{card.name}</h2>
                 <div>
                     <button type="button" className="element__like" aria-label="лайк"/>
                     <span className="element__likes-number">{card.likes.length}</span>
                  </div>
               </div>
            <button type="button" className="element__delete-element" aria-label='Кнопка для Удаления' />
        </li>
    )
}



export default Card;