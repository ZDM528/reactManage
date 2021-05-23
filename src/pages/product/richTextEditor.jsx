import React, {Component} from "react"
import {message} from 'antd'
import { EditorState, convertToRaw} from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'

class RichTextEditor extends Component {
    constructor(props){
        super(props)
        this.state={
            editorState:EditorState.createEmpty()
        }
    }

    onEditorStateChange = (editorState)=>{
        this.setState({
            editorState
        })
    }

    getDetail=()=>{
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }

    render() {
        const {editorState}=this.state
        return (
            <div>
                <Editor
                    editorState={editorState}
                    editorStyle={{border:'1px solid',padding:'10px',minHeight:'150px'}}
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        )
    }
}

export default RichTextEditor