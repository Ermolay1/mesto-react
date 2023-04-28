

import Header from './Header';
import Footer from './Footer';
import Main from './Main.jsx';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import NewCardPopup from './NewCardPopup';
import DeleteCardPopup from './DeleteCardPopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isNewCardPopupOpen, setIsNewCardPopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState({})
    const [cards, setCards] = useState([])

    useEffect(() => {

        api.getAllCardWhithUser()
        .then(([cards, user]) => {
                setCards(cards)
                setCurrentUser(user)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '' })


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleNewCardClick() {
    setIsNewCardPopupOpen(true)
  }

  function handleCardClick(card) {
       setIsImagePopupOpen(true)
        setSelectedCard(card)}

  function handleDeleteCardClick(card) {
          setIsDeletePopupOpen(true)
          setSelectedCard(card)
      }
  
  function closeAllPopups() {
    if (isEditProfilePopupOpen) setIsEditProfilePopupOpen(false)
    if (isNewCardPopupOpen) setIsNewCardPopupOpen(false)
    if (isEditAvatarPopupOpen) setIsEditAvatarPopupOpen(false)
    if (isImagePopupOpen) setIsImagePopupOpen(false)
    if (isDeletePopupOpen) setIsDeletePopupOpen(false)
  }

  const [isLoadingDeleteCard, setIsLoadingDeleteCard] = useState(false)
  const [isLoadingNewCard, setIsLoadingNewCard] = useState(false)
  const [isLoadingUpdateUser, setIsLoadingUpdateUser] = useState(false)
  const [isLoadingUpdateAvatar, setIsLoadingUpdateAvatar] = useState(false)

  function handleDeleteCard() {
      setIsLoadingDeleteCard(true)
      api.deleteCard(selectedCard._id)
          .then(() => {
              setCards(cards => cards.filter(c => c._id !== selectedCard._id))
              closeAllPopups()
          })
          .catch((err) =>
              console.log(err))
          .finally(() => {
              setIsLoadingDeleteCard(false)
          })
  }

  function handleCardLike(card) {
      const isLiked = card.likes.some(i => i._id === currentUser._id)
      api.changeLikeCardStatus(card._id, isLiked)
          .then((newCard) => {
              setCards(cards => cards.map(c => c._id === card._id ? newCard : c))
          })
          .catch((err) => console.log(err))
  }

  function handleAddNewCard(card) {
    setIsLoadingNewCard(true)
    api.addNewCard({ item: card })
        .then((newCard) => {
            setCards([newCard, ...cards])
            closeAllPopups()
        })
        .catch((err) => console.log(err))
        .finally(() => {
            setIsLoadingNewCard(false)
        })
}

  function handleUpdateUser(user) {
      setIsLoadingUpdateUser(true)
      api.editUserInfo({ item: user })
          .then((newUser) => {
              setCurrentUser(newUser)
              closeAllPopups()
          })
          .catch((err) => {
              console.log(err)
          })
          .finally(() => {
              setIsLoadingUpdateUser(false)
          })
  }

  function handleUpdateAvatar(userAvatarLink) {
      setIsLoadingUpdateAvatar(true)
      api.editAvatar({ item: userAvatarLink })
          .then((newAvatar) => {
              setCurrentUser(newAvatar)
              closeAllPopups()
          })
          .catch((err) => {
              console.log(err)
          })
          .finally(() => {
              setIsLoadingUpdateAvatar(false)
          })
  }
     return (
        <div className="App">
          <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                     setCards={setCards}
                     cards={cards}
                     onEditProfile={handleEditProfileClick}
                     onNewCard={handleNewCardClick}
                     onEditAvatar={handleEditAvatarClick}
                     onCardClick={handleCardClick}
                     onCardDelete={handleDeleteCardClick}
                     onCardLike={handleCardLike}
                     />
                <Footer />
                <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                        isLoading={isLoadingUpdateAvatar}>
                    </EditAvatarPopup>

                <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                        isLoading={isLoadingUpdateUser}>
                    </EditProfilePopup> 
                <NewCardPopup
                    isOpen={isNewCardPopupOpen}
                    onClose={closeAllPopups}
                    onNewCard={handleAddNewCard}
                    isLoading={isLoadingNewCard}>
                    </NewCardPopup>
                <DeleteCardPopup
                        isOpen={isDeletePopupOpen}
                        onClose={setIsDeletePopupOpen}
                        onDeleteCard={handleDeleteCard}
                        isLoading={isLoadingDeleteCard}>
                    </DeleteCardPopup>

                <ImagePopup
                        card={selectedCard}
                        onClose={setIsImagePopupOpen}
                        isOpen={isImagePopupOpen}
                        />
                </div>
                </CurrentUserContext.Provider>
                </div>);}
export default App;