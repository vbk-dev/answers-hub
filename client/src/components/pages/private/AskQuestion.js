import React, {useState} from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {connect} from 'react-redux'; 
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

import {setAlert} from '../../../actions/alert';
import {postQuestion} from '../../../actions/question';
import Alert from '../../layout/Alert';

const ALERT_LOCATION = 'ASK_QUESTION_FORM';

const AskQuestion = ({ setAlert, alertLocation, postQuestion }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: ''
    });
    const [posted, setposted] = useState(false)

    const { title,description,tags } = formData;

    const onValueChangeHandler = event => setFormData({...formData, [event.target.name]: event.target.value}); 

    const dataValidation = () => {
        // validating title
        if (title.trim() === '')
            return setAlert('Title is required', 'danger', ALERT_LOCATION);
        if (title.length < 3)
            return setAlert('Title must be atleast 3 character', 'danger', ALERT_LOCATION);
        if (title.length > 128)
            return setAlert('Title must be less than 128 character', 'danger', ALERT_LOCATION);
        // validating tags
        if (tags.length > 128)
            return setAlert('Tags must be less than 128 character', 'danger', ALERT_LOCATION);
        // validating description
        if (title.trim() === '')
            return setAlert('Description is required', 'danger', ALERT_LOCATION);
    }

    const onFormSubmithandler = event => {
        event.preventDefault();
        dataValidation();
        const res = postQuestion(formData, ALERT_LOCATION);
        console.log('Res: ', res);
        if (res){
            setposted(true)
        }
    }

    const editorConfiguration = {
        toolbar: [ 'heading', 'bold', 'italic', 'link', 'bulletedlist', 'numberedlist', 
            'indent', 'outdent', 'undo', 'redo' ]
    };

    if (posted) {
        return <Redirect to='/' />
    }

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h1>Ask your Question</h1>
                </div>
            </div>
            { alertLocation === ALERT_LOCATION && <Alert /> }
            <form onSubmit={onFormSubmithandler}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label htmlFor="title">Question title</label>
                            <input type="text" className="form-control" name='title' value={title}
                                onChange={onValueChangeHandler} required minLength="2" maxLength="128" />
                            <small className="form-text text-muted">Title must be less than 128 character.</small>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                    <div className="form-group">
                            <label htmlFor="title">Question Description</label>
                            <CKEditor  editor={ ClassicEditor } config={ editorConfiguration } data={description}
                                onChange={ ( event, editor ) => setFormData({...formData, description: editor.getData()})} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label htmlFor="title">Tags</label>
                            <input type="text" className="form-control" name='tags' value={tags}
                                onChange={onValueChangeHandler} required maxLength="128" />
                            <small className="form-text text-muted">Please separate tags using ","(Comma). Example "NodeJs,Express,Java"</small>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <input type="submit" value="Post Your Question" className='btn btn-info btn-block' />
                    </div>
                </div>
            </form>
        </div>
    )
}

AskQuestion.prototype = {
    setAlert: PropTypes.func.isRequired, 
    alertLocation: PropTypes.string, 
    postQuestion: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    alertLocation: state.global.alertLocation
})

export default connect(mapStateToProps, { setAlert, postQuestion })(AskQuestion);
