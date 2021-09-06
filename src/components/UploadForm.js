import React, {useState} from 'react';
import ProgressBar from './ProgressBar';

function UploadForm() {

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const allowedTypes = ['image/png', 'image/jpeg'];

    const uploadChange = (e) => {
        let selectedFile = e.target.files[0];

        if( selectedFile && allowedTypes.includes(selectedFile.type) ){
            setFile(selectedFile);
            setError(null);
        }
        else {
            setFile(null);
            setError("Please select an image file (png or jpeg)!");
        }
    }

    return (
        <div className="row justify-content-center mt-3" style={{minHeight: "85vh"}}>
          <div className="col col-6">
              <form action="" method="post">
  
                <label htmlFor="uploadPhoto" className="form-label h4">Upload a photo for start...</label>
                <input onChange={uploadChange}
                className="form-control form-control-lg" id="uploadPhoto" type="file" />
  
                <div className="inputOutput">
                    <div className="error"> {error} </div>

                    { file && <ProgressBar file={file} setFile={setFile}/> }
                </div>
  
              </form>
          </div>
        </div>
    )
}

export default UploadForm;
