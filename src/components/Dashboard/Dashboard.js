import React, { Component } from 'react';

//FORMFILDS
import FormField from '../FormFields/FormFields';

//FIREBASE
import { firebaseTeams, firebaseArticles, firebase } from '../../firebase';

//WYSIWYG
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
// import {stateFromHTML} from 'draft-js-import-html';

//CONPONENTS
import Uploader from '../widgets/FileUploader/FileUploader'

class Dashboard extends Component {

  state = {
    editorState: EditorState.createEmpty(),
    postError: '',
    loading: false,
    formdata: {
      author: {
        element: 'input',
        value: '',
        config: {
          name: 'author_input',
          type: 'text',
          placeholder: 'Author post'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      title: {
        element: 'input',
        value: '',
        config: {
          name: 'title_input',
          type: 'text',
          placeholder: 'Enter this title'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      body: {
        element: 'texteditor',
        value: '',
        valid: true
      },
      image: {
        element: 'image',
        value: '',
        valid: true
      },
      team: {
        element: 'select',
        value: '',
        config: {
          name: 'team_input',
          options: []
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  }

  componentDidMount() {
    this.loadTeams()
  }

  loadTeams = () => {
    firebaseTeams.once('value')
    .then( snapshot => {
      let team = [];

      snapshot.forEach( childSnapshot => {
        team.push({
          id: childSnapshot.val().teamId,
          name: childSnapshot.val().city
        })
      })

      const newFormdata = {...this.state.formdata};
      const newElement = {...newFormdata['team']};

      newElement.config.options = team;
      newFormdata['team'] = newElement;

      this.setState({
        formdata: newFormdata
      })
    })
  }

  validData = (element) => {
    let error = [true, ''];

    if(element.validation.required) {
      const valid = element.value.trim() !== '';
      const message = `${ !valid ? 'This field is required' : ''}`

      error = !valid ? [valid, message] : error;
    }

    return error;
  }

  updateForm = (element, content = '') => {
    const newFormdata = {
      ...this.state.formdata
    }

    const newElement = {
      ...newFormdata[element.id]
    }

    if(content === '') {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }

    if(element.blur) {
      let validData = this.validData(newElement);

      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    newFormdata[element.id] = newElement;

    this.setState({
      formdata: newFormdata
    })
  }

  submitButton = () => (
    this.state.loading ?
      '...loading'
      :
      <button 
        className='button btn-reg' 
        type="submit"
      >Add Post</button>
  )

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for(let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
    }

    for(let key in this.state.formdata) {
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }

    if(formIsValid) {
      this.setState({
        loading: true,
        postError: ''
      })

      firebaseArticles.orderByChild('id')
      .limitToLast(1).once('value')
      .then( snapshot => {
        let articleId = null;

        snapshot.forEach( childSnapshot => {
          articleId = childSnapshot.val().id;
        })

        dataToSubmit['date'] = firebase.database.ServerValue.TIMESTAMP;
        dataToSubmit['team'] = parseInt(dataToSubmit['team'], 10);
        dataToSubmit['id'] = articleId + 1;

        firebaseArticles.push(dataToSubmit)
        .then( article => {
          this.props.history.push(`/articles/${article.key}`)
        }).catch( err =>{
          this.setState({
            postError: err.message
          })
        })

      })

    } else {
      this.setState({
        postError: 'Is there something wrong'
      })
    }
  }

  submitError = () => (
    this.state.postError !== '' ?
      <div className='validation-message'>{this.state.postError}</div>
      :
      null
  )

  onEditorStateChange = (editorState) => {

    let contentState = editorState.getCurrentContent();
    let html = stateToHTML(contentState);
    // contentState = stateFromHTML(html);

    this.updateForm({id:'body'}, html)

    this.setState({
      editorState
    })
  }

  storeFilname = (filename) => {
    this.updateForm({id:'image'}, filename)
  }

  render() {
    return (
      <form className='post-form' onSubmit={this.submitForm}>
        <h2 className='post-form__title'>Added new Post</h2>
        <FormField
          id={'author'}
          formdata={this.state.formdata.author}
          change={(element) => this.updateForm(element)}
        />

        <FormField
          id={'title'}
          formdata={this.state.formdata.title}
          change={(element) => this.updateForm(element)}
        />

        <Editor
          editorState={this.state.editorState}
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
        />

        <FormField
          id={'team'}
          formdata={this.state.formdata.team}
          change={(element) => this.updateForm(element)}
        />

        <Uploader 
          filename={(filename) => this.storeFilname(filename)}
        />

        { this.submitButton() }
        { this.submitError() }
      </form>
    )
  }
}

export default Dashboard;