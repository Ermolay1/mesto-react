import React from "react";

function ImagePopup({ onClose, card }) {

    return (
        <section className={`popup popup_type_image ${card.link && "popup_opened"}`}>
         <button type="button"
             className="popup__close popup__button-close popup__button-closeImage" 
             aria-label="закрыть"
             onClick={onClose}
             />
         <figure className="popup__figure">
            <img className="popup__image " 
              src={card.link}
              alt={card.name}
             />
            <h5 className="popup__image-name">{card.name}</h5>
         </figure>
       </section>
    )
}

export default ImagePopup;