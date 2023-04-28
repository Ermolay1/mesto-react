import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete } ){
    const currentUser = React.useContext(CurrentUserContext)
  
    
    const isOwn = card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = `element__delete-element ${
      isOwn ? 'element__delete-element-active' : ''
    }`;
  
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
  
    
    const cardLikeButtonClassName = `element__like ${
      isLiked ? 'element__like-active' : ''
    }`;
  
    function handleClick() {
      onCardClick(card);
    }
  
    function handleLikeClick() {
      onCardLike(card);
    }
  
    function handleDeleteClick() {
      onCardDelete(card);
    }
    return (
        <li className="element">
            <img className="element__image " 
             src={card.link}
              alt={card.name}
              onClick={handleClick}/>
            <div className="element__column">
                 <h2 className="element__text">
                    {card.name}</h2>
                 <div>
                     <button type="button" 
                     className={cardLikeButtonClassName}
                      aria-label="лайк"
                      onClick={handleLikeClick}/>
                     <span
                      className="element__likes-number">
                        {card.likes.length}</span>
                  </div>
               </div>
            <button type="button"
             className={cardDeleteButtonClassName}
              aria-label='Кнопка для Удаления'
              onClick={handleDeleteClick} />
        </li>
    )
}



export default Card;