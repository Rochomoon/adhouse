import React, { Component } from 'react'
import ReactSummernote from 'react-summernote'
import 'react-summernote/dist/react-summernote.css' // import styles
import 'react-summernote/lang/summernote-es-ES' // you can import any other locale

class DocumentEditor extends Component {
  constructor() {
    super()
    this.isEmpty = this.isEmpty.bind(this)
    this.getToolbar = this.getToolbar.bind(this)
  }

  isEmpty() {
    return this.summernote.isEmpty()
  }

  uploadImageCallback(file, parentFunction) {
    parentFunction(file).then((fileUrl) => {
      ReactSummernote.insertImage(fileUrl)
    })
  }

  getToolbar() {
    let toolbar = [
      ['style', ['bold', 'underline', 'clear']],
      ['font', ['superscript', 'subscript']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['table', ['table']]
    ]
    if (this.props.uploadImageCallback != null) {
      toolbar.push(['insert', ['link', 'picture']])
    }
    toolbar.push(['view', ['fullscreen']])
    return toolbar
  }

  render() {
    return (
      <ReactSummernote
        value={this.props.value}
        options={{
          lang: 'es-ES',
          height: 350,
          toolbar: this.getToolbar(),
          fontNames: ['Arial']
        }}
        disabled={this.props.disabled}
        onChange={this.props.onDocumentChange}
        ref={(summernote) => { this.summernote = summernote }}
        onImageUpload={(file) => this.uploadImageCallback(file, this.props.uploadImageCallback)}
      />
    )
  }
}

export default DocumentEditor