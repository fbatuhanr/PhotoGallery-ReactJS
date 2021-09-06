import React from 'react';
import useStorage from '../hooks/useStorage';

const ProgressBar = ({ file, setFile }) => {

    const {url, progress } = useStorage(file);
    console.log("Bar: ", progress, url);

    return (
        <div className="progressBar">
            <h5 className="text-center mt-1 mb-0">{progress.toFixed(1)}%</h5>
            <div className="progress-bar background-primary p-2" style={{ width: progress+'%', height: '20px'}}></div>
        </div>
    )
}
export default ProgressBar;