

import Header from './Header';
import Footer from './Footer';
import Main from './Main.jsx';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import { useState } from 'react';

function App() {
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = useState(false)
  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = useState(false)
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = useState(false)
  const [ selectedCard, setSelectedCard ] = useState({name: "", link: ""} )
  

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
      
        setSelectedCard(card)}
    
  
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({name: "", link: ""})
  }

     return (
        <div className="App">
            <div className="page">
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                     />
                <Footer />
                <PopupWithForm
                   title={"Обновить аватар"}
                   name={"change-avatar"}
                   isOpen={isEditAvatarPopupOpen}
                   onClose={closeAllPopups}
                   buttonText={"Сохранить"}
                   >
                   <input
                    className="popup__input"
                    id="popup-avatar"
                    name="link"
                    type="url"
                    placeholder="Ссылка на картинку"
                    required
                    />
                   <span className="popup__input-error popup-avatar-error"></span>
                </PopupWithForm> 
                <PopupWithForm
          title={"Редактировать профиль"}
          name={"profile"}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          buttonText={"Сохранить"}
        >
          <input
            className="popup__input popup__input_value_name"
            id="popup-name"
            name="name"
            type="text"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__input-error popup-name-error"></span>
          <input
            className="popup__input popup__input_value_description"
            id="popup-description"
            name="about"
            type="text"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__input-error popup-description-error"></span>
        </PopupWithForm>

        <PopupWithForm
          title={"Новое место"}
          name={"add-image"}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonText={"Создать"}
        >
          <input
            className="popup__input popup__input_type_value-name"
            id="popup-img"
            name="name"
            type="text"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="popup__input-error  popup-img-error"></span>
          <input
            className="popup__input popup__input_type_value-link"
            id="popup-link"
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error popup-link-error "></span>
        </PopupWithForm>
        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
        />
                </div>

                </div>);}
export default App;