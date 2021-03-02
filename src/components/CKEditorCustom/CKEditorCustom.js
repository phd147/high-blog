import React,{useState} from 'react';

// ck editor 
import {CKEditor} from '@ckeditor/ckeditor5-react';

// custom build editor 



// classic editor 
//import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'

import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';



// material ui 
import {Grid,Button} from '@material-ui/core';

// config depedencies of the editor 


// html parser 
import parse from 'html-react-parser';

// import parse from 'html-react-parser';



// configuration of editor 
const config = {
    plugins: [ Autoformat ],
    toolbar: [  ]
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
                    config={config}
                    onBlur={ ( event, editor ) => {
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