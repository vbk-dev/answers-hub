import React, {useState, Fragment, useEffect} from 'react';
import {connect} from 'react-redux'; 
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link, Redirect, withRouter } from 'react-router-dom';

import {setAlert} from '../../../actions/alert';
import {updateQuestion, postQuestion} from '../../../actions/question';
import Alert from '../Alert';
import SmallSpinner from '../SmallSpinner';

const ALERT_LOCATION = 'QUESTION_FORM';

const QuestionForm = ({setAlert, alertLocation, type, question, authUser, dashedTitle, history, updateQuestion, postQuestion, globalLoading}) => {
    const [formData, setFormData] = useState({
        title: type === 'EDIT' ? question.title: '',
        description: type === 'EDIT' ? question.description: '',
        tags: type === 'EDIT' ? question.tags: ''
    });

    useEffect(()=> {
        console.log({alertLocation, globalLoading, question, authUser});
    }, []);

    const { title, description, tags } = formData;

    const onValueChangeHandler = event => setFormData({...formData, [event.target.name]: event.target.value});

    const dataValidation = () => {
        let isValid = true;
        if (title.trim() === ''){
            setAlert('Title is required', 'danger', ALERT_LOCATION);
            isValid = false;
        } else if (title.length < 3){
            setAlert('Title must be atleast 3 character', 'danger', ALERT_LOCATION);
            isValid = false;
        } else if (title.length > 128) {
            setAlert('Title must be less than 128 character', 'danger', ALERT_LOCATION);
            isValid = false;
        } else if (tags.length > 128){
            setAlert('Tags must be less than 128 character', 'danger', ALERT_LOCATION);
            isValid = false;
        } else if (description.trim() === ''){
            setAlert('Description is required', 'danger', ALERT_LOCATION);
            isValid = false;
        }
        return isValid;
    }

    const onAskFormSubmithandler = event => {
        event.preventDefault();
        console.log('i am inside here');
        if (dataValidation()){
            postQuestion(formData, ALERT_LOCATION, history);
        }
    }

    const onEditFormSubmithandler = event => {
        event.preventDefault();
        if (dataValidation()){
            updateQuestion(formData, question._id, ALERT_LOCATION, history);
        }
    }

    const editorConfiguration = {
        toolbar: [ 'heading', 'bold', 'italic', 'link', 'bulletedlist', 'numberedlist', 
            'indent', 'outdent', 'undo', 'redo' ]
    };

    if (type === 'EDIT' && question.postedBy._id !== authUser){
        console.log('Id: ', question.postedBy._id, authUser);
        console.log('condition: ', question.postedBy._id !== authUser)
        return <Redirect to='/' />
    }

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-lg-12 text-center">
                    {type === 'EDIT' ? (<h1>Edit your Question</h1>) : (<h1>Ask your Question</h1>) }
                </div>
            </div>
            {alertLocation === ALERT_LOCATION && <Alert />}
            <form onSubmit={type === 'EDIT' ? onEditFormSubmithandler : onAskFormSubmithandler}>
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
                            <CKEditor  editor={ ClassicEditor } config={editorConfiguration} data={description}
                                onChange={(event, editor) => setFormData({...formData, description: editor.getData()})} />
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
                    <div className="col-lg-12 text-center">
                        {type === 'EDIT' ? (
                            <Fragment>
                                {!globalLoading ? (<Fragment>
                                    <input type="submit" value="update Question" className='btn btn-success mx-2' />
                                    <Link className='btn btn-danger mx-2' to={`/question/${question._id}/${dashedTitle}`}>Cancel Update</Link>
                                </Fragment>) : (<Fragment>
                                    <button className='btn btn-info btn-block' disabled>
                                        <SmallSpinner />{` `}
                                        updating Question
                                    </button>
                                </Fragment>)}
                            </Fragment>
                        ) : (
                            <Fragment>
                                {!globalLoading ? (<Fragment>
                                    <input type="submit" value="Post Your Question" className='btn btn-info btn-block' />
                                </Fragment>) : (<Fragment>
                                    <button className='btn btn-info btn-block' disabled>
                                        <SmallSpinner />{` `}
                                        Posting Your Question
                                    </button>
                                </Fragment>)}
                            </Fragment>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}

const mapStateToProps = state => ({
    alertLocation: state.global.alertLocation,
    globalLoading: state.global.isLoading,
    question: state.ques.question.details,
    authUser: state.auth.user._id
});

export default connect(mapStateToProps, { setAlert, updateQuestion, postQuestion })(withRouter(QuestionForm));