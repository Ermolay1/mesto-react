import React from "react";

function SubmitButton(props) {

    return (
        <button className="popup__button popup__button-save" type="submit">{props.buttonText}</button>
    )
};

function Form(props) {

    return (
        
            <form className="popup__form " name={props.name}>
                
            {props.children}
            <SubmitButton
                buttonText={props.buttonText}>
            </SubmitButton>
        </form>
         
       
    )
}
export default Form;