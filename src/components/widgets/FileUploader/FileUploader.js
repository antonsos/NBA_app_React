import React, { Component } from 'react';

//FILEUPLOADER
import FileUploader from 'react-firebase-file-uploader'

//FIREBASE
import { firebase } from '../../../firebase'

class Uploader extends Component {

  state = {
    name: '',
    isUploading: false,
    progress: 0,
    fileURL: ''
  }

  handleUploadStart = () => {
    this.setState({
      isUploading: true,
      progress: 0
    })
  }

  handleUploadError = (error) => {
    this.setState({
      isUploading: true,
      error
    })

    console.log(error)
  }

  handleProgress = (progress) => {
    this.setState({
      progress
    })
  }

  handleUploadSuccsess = (filename) => {
    this.setState({
      name: filename,
      isUploading: false,
      progress: 100
    })

    firebase.storage().ref('images')
    .child(filename).getDownloadURL()
    .then( url => {
      this.setState({
        fileURL: url
      })
    })

    this.props.filename(filename)
  }

  render() {
    return (
      <div className='file-uploader'>
        <FileUploader className='file-uploader__button'
          accept='image/*'
          name='image'
          randomizeFilename
          storageRef={firebase.storage().ref('images')}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccsess}
          onProgress={this.handleProgress}
        />

        {this.state.isUploading ?
          <p>Progress: {this.state.progress}</p>
          :
          null
        }
        {this.state.fileURL && <img style={{display: 'block', height: '20rem', margin: '0 auto'}} src={this.state.fileURL} alt={this.state.filename}/> }
      </div>
    )
  }
}

export default Uploader;