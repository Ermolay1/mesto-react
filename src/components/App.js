import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main.jsx";
import ImagePopup from "./ImagePopup";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import NewCardPopup from "./NewCardPopup";
import DeleteCardPopup from "./DeleteCardPopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isNewCardPopupOpen, setIsNewCardPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });
  const [removedCardId, setRemovedCardId] = useState("");

  useEffect(() => {
    api
      .getAllCardWhithUser()
      .then(([cards, user]) => {
        setCards(cards);
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleNewCardClick() {
    setIsNewCardPopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleDeleteCardClick(cardId) {
    setIsDeletePopupOpen(true);
    setRemovedCardId(cardId);
  }

  function closeAllPopups() {
    if (isEditProfilePopupOpen) setIsEditProfilePopupOpen(false);
    if (isNewCardPopupOpen) setIsNewCardPopupOpen(false);
    if (isEditAvatarPopupOpen) setIsEditAvatarPopupOpen(false);
    if (isImagePopupOpen) setIsImagePopupOpen(false);
    if (isDeletePopupOpen) setIsDeletePopupOpen(false);
  }

  const [isLoadingDeleteCard, setIsLoadingDeleteCard] = useState(false);
  const [isLoadingNewCard, setIsLoadingNewCard] = useState(false);
  const [isLoadingUpdateUser, setIsLoadingUpdateUser] = useState(false);
  const [isLoadingUpdateAvatar, setIsLoadingUpdateAvatar] = useState(false);

  function handleDeleteCard(cardId) {
    setIsLoadingDeleteCard(true);
    api
      .deleteCard(cardId)
      .then(() => {
        setCards(cards => cards.filter(c => c._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoadingDeleteCard(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleAddNewCard(card) {
    setIsLoadingNewCard(true);
    api
      .addNewCard({ item: card })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoadingNewCard(false);
      });
  }

  function handleUpdateUser(user) {
    setIsLoadingUpdateUser(true);
    api
      .editUserInfo({ item: user })
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingUpdateUser(false);
      });
  }

  function handleUpdateAvatar(userAvatarLink) {
    setIsLoadingUpdateAvatar(true);
    api
      .editAvatar({ item: userAvatarLink })
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingUpdateAvatar(false);
      });
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
            isLoading={isLoadingUpdateAvatar}
          ></EditAvatarPopup>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoadingUpdateUser}
          ></EditProfilePopup>
          <NewCardPopup
            isOpen={isNewCardPopupOpen}
            onClose={closeAllPopups}
            onNewCard={handleAddNewCard}
            isLoading={isLoadingNewCard}
          ></NewCardPopup>
          <DeleteCardPopup
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            isLoading={isLoadingDeleteCard}
            onSubmit={handleDeleteCard}
            card={removedCardId}
          ></DeleteCardPopup>

          <ImagePopup
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onClose={setIsImagePopupOpen}
          />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}
export default App;
