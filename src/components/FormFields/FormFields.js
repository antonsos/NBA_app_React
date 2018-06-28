import React from 'react';

const FormFields = ({formdata, change, id}) => {

  const showError = () => {
    let errorMessage = null;

    if(formdata.validation && !formdata.valid) {
      errorMessage = (
        <div className='validation-message'>
          {formdata.validationMessage}
        </div>
      )
    }

    return errorMessage;
  }

  const renderTemplate = () => {
    let formTemplate = null;

    switch(formdata.element) {
      case('input'):

        formTemplate = (
          <input 
            className='sign-form__input'
            {...formdata.config}
            onChange={(event) => change({event, id, blur: false})}
            onBlur={(event) => change({event, id, blur: true})}
          />
        )

        break;
      
      case('password'):

        formTemplate = (
          <input 
            className='sign-form__input'
            {...formdata.config}
            onChange={(event) => change({event, id, blur: false})}
            onBlur={(event) => change({event, id, blur: true})}
          />
        )

        break;
      default:
        formTemplate = null;
    }

    return formTemplate;
  }

  return (
    <div className='sign-form__group'>
      {renderTemplate()}
      {showError()}
    </div>
  )
}

export default FormFields;