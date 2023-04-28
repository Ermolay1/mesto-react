import React from 'react'

function DeleteCardPopup({ isOpen, isLoading, onClose, onDeleteCard }) {

    const popupClass = `popup popup_type_delete-card ${isOpen ? 'popup_opened' : ''}`;

    return (
        <section class={popupClass}
        onClick={() => onClose(false)}>
         <div class="popup__container">
            <h3 class="popup__title">Вы уверены?</h3>
            <form name="deleteForm" action="#" class="popup__form popup__form_type_delete" novalidate>
               <button type="submit" class="popup__button popup__button-save">Да</button>
            </form>
            <button type="button" 
            class="popup__close popup__close-delete"
            onClick={onDeleteCard}>
               {isLoading ? 'Удаление' : 'Да'} 
            </button>
         </div>
       </section>
    )
}

export default DeleteCardPopup;