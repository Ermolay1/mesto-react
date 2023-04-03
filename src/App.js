
import './App.css';
import headerLogo from './images/header-logo.svg';
import imageAvatar from './images/image.jpg';
import pencil from './images/pencil.svg';
import plus from './images/plus.svg';


function App() {
  return (
    <div className="page">
      <header className="header">
        <img class="header__logo" src={headerLogo} alt="логотип место"/>
     </header>
     <main className="content">
         <section className="profile">
            <img className="profile__image" src={imageAvatar} alt="Аватар пользователя"/>
            <button type="button" className="profile__button-avatar">
            </button>
            <div className="profile__info">
                <div className="profile__container">
                   <h1 className="profile__title">Жак-Ив Кусто</h1>
                   <button type="button" className="profile__edit-button">
                      <img className="profile__button-image" src={pencil} alt="карандаш"/>
                   </button>   
                 </div>
                    <h2 className="profile__subtitle">Исследователь океана</h2>
            </div>
            <button className="profile__addbutton"> 
               <img className="profile__addbutton-image" src={plus} alt="плюс"/>
            </button>
         </section>
         <section >
              <ul className="elements">
              </ul>
          </section>
     </main>     
     <footer className="footer">
        <p className="footer__name">&copy;2020Mesto Russia</p>
     </footer>
     <section className="popup popup_type_profile-avatar  ">
      <div className="popup__container">
         <h3 className="popup__title">Обновить&nbsp;аватар</h3>
         <form name="formAvatar" className="popup__form  popup__form-avatar" novalidate>
              <input type="url"  className="popup__input popup__form-input popup__input_type_value-link" placeholder="Ссылка на Аватар" name="link" id="popup-avatar" required/>
              <span className="popup__input-error popup-avatar-error">Введите адрес аватарки</span>
            
             <button type="submit"  className="popup__button popup__button-avatar popup__button-save popup__button-save_type_avatar" name="submit">Сохранить</button>
         </form>
         <button type="button" className="popup__close popup__close-avatar "></button>
      </div>
    </section>
       <section className="popup popup_type_profile ">
          <div className="popup__container">
             <h3 className="popup__title">Редактировать&nbsp;профиль</h3>
             <form name="profile-form" className="popup__form popup__form-profile" novalidate>
                   <input type="text"  className="popup__input popup__input_value_name " value="Жак-Ив Кусто" name="name" placeholder="Введите имя" id="popup-name" minlength="2" maxlength="40" required/>
                   <span className="popup__input-error popup-name-error ">Минимаоьное количество символов: 2. Длина текста сейчас: 1&nbsp;символ.</span>
                   <input type="text"  className="popup__input popup__input_value_description" value="Исследователь океана" name="about" id="popup-description" placeholder="Введите описание" minlength="2" maxlength="200" required/>
                   <span className="popup__input-error popup-description-error"></span> 
                 <button type="submit"  className="popup__button popup__button-save" name="submit">Сохранить</button>
             </form>
             <button type="button" className="popup__close popup__close-popup"></button>
          </div>
       </section>
       <section className="popup popup_type_element">
         <div className="popup__container">
            <h3 className="popup__title">Новое&nbsp;место</h3>
            <form name="mestoForm" className="popup__form popup__form_type_mesto" novalidate>
                 <input type="text"  className="popup__input popup__input_type_value-name" placeholder="Название" name="name" id="popup-img" minlength="2" maxlength="30" required/>
                 <span className="popup__input-error  popup-img-error"></span>
                 <input type="url"  className="popup__input popup__input_type_value-link" placeholder="Ссылка на картинку" name="link" id="popup-link" required/>
                 <span className="popup__input-error popup-link-error ">Введите адрес сайта</span>
                <button type="submit"  className="popup__button popup__button-save popup__button-save_type_mesto" name="submit">Создать</button>
            </form>
            <button type="button" className="popup__close popup__close-popup "></button>
         </div>
       </section>
       <section className="popup popup_type_element-delete">
         <div className="popup__container">
            <h3 className="popup__title">Вы уверены?</h3>
            <form name="deleteForm" action="#" className="popup__form popup__form_type_delete" novalidate>
               <button type="submit" className="popup__button popup__button-save">Да</button>
            </form>
            <button type="button" className="popup__close popup__close-delete"></button>
         </div>
       </section>
       <section className="popup popup_type_image">
         <figure className="popup__figure">
            <button type="button" className="popup__close popup__button-close"></button>
            <img className="popup__image " src="#" alt="#"/>
            <h5 className="popup__image-name"></h5>
         </figure>
       </section>
       <template className="element__cards">
         <li className="element">
            <img className="element__image hg"  src="#" alt="#" />
            <div className="element__column">
                 <h2 className="element__text">text</h2>
                 <div>
                     <button type="button" className="element__like"></button>
                     <span className="element__likes-number"></span>
                  </div>
               </div>
            <button type="button" className="element__delete-element"></button>
        </li>
       </template>
    </div>
  );
}

export default App;
