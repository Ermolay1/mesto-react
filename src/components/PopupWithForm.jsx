import React from "react";
import Form from "./Form"; 

function PopupWithForm({ title, name, children, isOpen, onClose, buttonText }) {
    const popupClass = `popup  popup_type_${name} ${isOpen ? 'popup_opened' : ''}`;
    const handleCloseByOverlay = (e) => {
      if (e.target === e.currentTarget) {
         onClose()
      }
   
   }
   
   return (
    <section className={popupClass} onClick={onClose && handleCloseByOverlay} >
       
    <div className="popup__container">
    <button type="button" className="popup__close popup__button-close" 
     aria-label="закрыть"
     onClick={onClose}></button>
     <h3 className="popup__title">{title}</h3> 
       <Form
       title={title}
       name={name}
       children={children}
       buttonText={buttonText}>
       </Form>
      
    </div>
  </section>
   ) 
}

export default PopupWithForm;