import React from 'react'
import { Editor } from 'react-draft-wysiwyg'

export class TinyEditor extends React.Component {
  
  render() {
    const editorState = this.props.editorState
    return (
      <Editor
        editorState={ editorState }
        onEditorStateChange={this.props.onEditorStateChange}
        wrapperClassName="demo-wrapper"
        editorClassName="write-box"
        localization={{
          locale: 'es'
        }}
        readOnly={(this.props.readOnly)? this.props.readOnly : false}
        handlePastedText={() => false}
        toolbar={ (this.props.uploadImageCallback != null)? 
          {
            options: ['inline', 'image', 'list', 'textAlign'],
            inline: { inDropdown: false },
            list: { inDropdown: false },
            textAlign: { inDropdown: true },
            image: {
              uploadCallback: this.props.uploadImageCallback,
              alt: { present: false, mandatory: false },
              previewImage: true,
              alignmentEnabled: false,
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/bmp,image/svg'
            },
          } :
          {
            options: ['inline', 'list', 'textAlign'],
            inline: { inDropdown: false },
            list: { inDropdown: false },
            textAlign: { inDropdown: true },
          }
        }
      />
    )
  }
}