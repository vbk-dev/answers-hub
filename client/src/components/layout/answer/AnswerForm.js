import React, { Fragment, useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
 
import {setAlert} from '../../../actions/alert';
import {postAnswer} from '../../../actions/answer';
import Alert from '../Alert';

const ALERT_LOCATION = "ANSWER_FORM";

const AnswerForm = ({isAuthenticated, questionId, alertLocation, setAlert, postAnswer}) => {
    const [answer, setAnswer] = useState('');

    const editorConfiguration = {
        toolbar: [ 'heading', 'bold', 'italic', 'link', 'bulletedlist', 'numberedlist', 
            'indent', 'outdent', 'undo', 'redo' ]
    };

    const onFormSubmitHandler = event => {
        event.preventDefault();
        if (answer.trim() === ''){
            setAlert('Answer is required', 'danger', ALERT_LOCATION);
        } else {
            postAnswer(answer, questionId, ALERT_LOCATION);
        }
    }

    return (
        <Fragment>
            {alertLocation === ALERT_LOCATION && <Alert />}
            { isAuthenticated ? (
                <form onSubmit={onFormSubmitHandler}>
                    <div className="form-group">
                        <CKEditor  editor={ ClassicEditor } config={editorConfiguration} data={answer}
                            onChange={(event, editor) => setAnswer(editor.getData())} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Post Answer" className='btn btn-info' />
                    </div>
                </form>
            ) : (
                <h4 className='text-center' >Please <Link to='/login'>Login</Link> or <Link to='/register'>Register</Link> to post answer.</h4>
            ) }
            
        </Fragment>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    alertLocation: state.global.alertLocation
});

export default connect(mapStateToProps, {setAlert, postAnswer})(AnswerForm);