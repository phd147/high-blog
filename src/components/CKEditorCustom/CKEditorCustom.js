import React,{useState} from 'react';

import {checkToken} from '../../services/user.service';

// ck editor 
import {CKEditor} from '@ckeditor/ckeditor5-react';

// custom build editor 




// classic editor 
//import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'

import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import Font from '@ckeditor/ckeditor5-font/src/font';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';




// material ui 
import {Grid,Button} from '@material-ui/core';

// config depedencies of the editor 


// html parser 
import parse from 'html-react-parser';

// import parse from 'html-react-parser';



const editorConfiguration = {
    plugins: [Essentials, Bold, Italic, Paragraph,SimpleUploadAdapter,CodeBlock,Highlight,Font, Alignment ],
    toolbar: ["bold", "italic",'image','codeBlock','highlight','fontSize','fontColor', 'fontBackgroundColor','imageTextAlternative','insertImage','uploadImage','alignment'],
    simpleUpload : {
        uploadUrl : 'http://localhost:8080/image',
        withCredentials: true,

            // Headers sent along with the XMLHttpRequest to the upload server.
        headers: {
                'X-CSRF-TOKEN': 'CSRF-Token',
                Authorization: `Bearer ${checkToken()}`
        }

    },
    codeBlock: {
        languages: [
            { language: 'plaintext', label: 'Plain text' }, // The default language.
            { language: 'c', label: 'C' },
            { language: 'cs', label: 'C#' },
            { language: 'cpp', label: 'C++' },
            { language: 'css', label: 'CSS' },
            { language: 'diff', label: 'Diff' },
            { language: 'html', label: 'HTML' },
            { language: 'java', label: 'Java' },
            { language: 'javascript', label: 'JavaScript',class : 'js javascript js-code' },
            { language: 'php', label: 'PHP' },
            { language: 'python', label: 'Python' },
            { language: 'ruby', label: 'Ruby' },
            { language: 'typescript', label: 'TypeScript' },
            { language: 'xml', label: 'XML' }
        ]
    },
    fontSize: {
        options: [
            9,
            11,
            13,
            'default',
            17,
            19,
            21
        ]
    },
    fontColor: {
        columns : 3,
        colors: [
            {
                color: 'hsl(0, 0%, 0%)',
                label: 'Black'
            },
            {
                color: 'hsl(0, 0%, 30%)',
                label: 'Dim grey'
            },
            {
                color: 'hsl(0, 0%, 60%)',
                label: 'Grey'
            },
            {
                color: 'hsl(0, 0%, 90%)',
                label: 'Light grey'
            },
            {
                color: 'hsl(0, 0%, 100%)',
                label: 'White',
                hasBorder: true
            },

            // ...
        ]
    },
    fontBackgroundColor: {
        columns : 6,
        colors: [
            {
                color: 'hsl(0, 75%, 60%)',
                label: 'Red'
            },
            {
                color: 'hsl(30, 75%, 60%)',
                label: 'Orange'
            },
            {
                color: 'hsl(60, 75%, 60%)',
                label: 'Yellow'
            },
            {
                color: 'hsl(90, 75%, 60%)',
                label: 'Light green'
            },
            {
                color: 'hsl(120, 75%, 60%)',
                label: 'Green'
            },

            // ...
        ]
    },
    highlight: {
        options: [
            {
                model: 'greenMarker',
                class: 'marker-green',
                title: 'Green marker',
                color: 'rgb(25, 156, 25)',
                type: 'marker'
            },
            {
                model: 'yellowMarker',
                class: 'marker-yellow',
                title: 'Yellow marker',
                color: '#cac407',
                type: 'marker'
            },
            {
                model: 'redPen',
                class: 'pen-red',
                title: 'Red pen',
                color: 'hsl(343, 82%, 58%)',
                type: 'pen'
            }
        ]
    }
  };


const CKEditorCustom = props => {

    const [data,setData] = useState("<p>Please enter some thing</p>");


    return (
        <div>
            <Grid container spacing={3}>

                <Grid item md={3} xs={12}></Grid>
                <Grid item md={6} xs={12}>
                    {/* ck editor  */}
                    <CKEditor
                    editor={ClassicEditor}
                    data={data}
                    disabled={false}
                    config={editorConfiguration}
                    onBlur={ ( event, editor ) => {
                        console.log(Array.from( editor.ui.componentFactory.names() ));
                        console.log(editor.getData());
                        setData(editor.getData());
                    } }
                    />
                    <Button variant="contained" color="primary" onClick={() => {}}>click to save</Button>
                </Grid>
                
                <Grid item md={3} xs={12}></Grid>
                <Grid item md={3} xs={12}></Grid>
                <Grid item md={6} xs={12}>
                <div
                  >{parse(data)}</div>
                </Grid>
                
                <Grid item md={3} xs={12}></Grid>

            </Grid>
        </div>
    )
};


export default CKEditorCustom;