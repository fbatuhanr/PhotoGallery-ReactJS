import React, {useState} from 'react';
import ProgressBar from './ProgressBar';

function UploadForm() {

    const [startUpload, setStartUpload] = useState(false);

    const [file, setFile] = useState({
        photo: null,
        title: null
    });
    const [error, setError] = useState(null);

    const changeInput = (e) => {
        setFile({
            ...file,
            [e.target.name]: e.target.files ? e.target.files[0] : e.target.value
        })
    }

    const allowedTypes = ['image/png', 'image/jpeg'];
    const formUpload = (e) => {
        e.preventDefault();

        
        console.log("1photo:" + file.photo);
        console.log("1title:" + file.title);
        
        let selectedFile = file.photo;
        let selectedTitle = file.title;

        if( selectedFile && allowedTypes.includes(selectedFile.type) ){
            
            setStartUpload(true);
            setError(null);
        }
        else {
            setStartUpload(false);
            setError("Please select an image file (png or jpeg)!");
        }
        
    }

    return (
        <div className="row justify-content-center mt-3">
          <div className="col col-8 pt-5 pb-5">
              <form action="" method="post" onSubmit={formUpload}>

                <div className="input-group input-group-lg">
                    <label className="input-group-text" htmlFor="photo">Photo:</label>
                    <input onChange={changeInput} type="file" className="form-control form-control-lg" id="photo" name="photo" required/>
                </div>

                <div className="input-group input-group-lg mt-3 mb-3">
                    <span className="input-group-text">Photo Title:</span>
                    <input onChange={changeInput} type="text" className="form-control" id="title" name="title" required/>
                </div>

                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-secondary">Upload Photo</button>
                </div>
  
                <div className="inputOutput">
                    <div className="error"> {error} </div>

                    {  startUpload && file && <ProgressBar file={file} setFile={setFile} setStartUpload={setStartUpload}/>  }
                </div>
  
              </form>
          </div>
        </div>
    )
}

export default UploadForm;
