import React from 'react';
import Card from './Card';
import { useState } from 'react';
import { useEffect } from 'react';
import api from '../utils/Api';
import pencil from '../images/pencil.svg';
import plus from '../images/plus.svg';
import avatarImage from '../images/image.jpg';
function Main ({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {
     
    const [ userName, setUserName ] = useState('Жак-Ив Кусто')
    const [ userDescription, setUserDescription ] = useState('Исследователь океана')
    const [ userAvatar, setUserAvatar ] = useState(avatarImage)
    const [ cards, setCards ] = useState([])

    useEffect(()=> {
        api.getCurrentUser()
        .then(res => {
          console.log(res);
          setUserName(res.name)
          setUserDescription(res.about)
          setUserAvatar(res.avatar)
        })
        .catch( err => console.log(err))
      }, [])

      useEffect(()=> {
        api.getCards()
        .then(res => setCards(res))
        .catch(err => console.log(err))
      },[])

    return(
       <main className="content">
         <section className="profile">
            <img
             className="profile__image"
             src={userAvatar}
              alt="Аватар пользователя"/>
            <button
             className="profile__button-avatar"
              onClick={onEditAvatar} />
            
            <div className="profile__info">
                <div className="profile__container">
                   <h1 className="profile__title">{userName}</h1>
                   <button type="button"
                    className="profile__edit-button profile__edit"
                     aria-label="изменить"
                      onClick={onEditProfile}>
                      <img className="profile__button-image" 
                      src={pencil}
                       alt="карандаш"/>
                   </button>   
                 </div>
                    <h2 className="profile__subtitle">{userDescription}</h2>
            </div>
            <button className="profile__addbutton" 
              aria-label="добавить"
              onClick={onAddPlace}
                    > 
               <img className="profile__addbutton-image"
                src={plus}
                 alt="плюс"/>
            </button>
         </section>
         <section >
              <ul className="elements">
              {cards.map(card => {
                return (
                        <Card key={card._id}
                            card={card}
                            onCardclick={onCardClick}
                             />
                    )}
                    )}
              </ul>
          </section>
        </main> 
    );
              }


     export default Main;