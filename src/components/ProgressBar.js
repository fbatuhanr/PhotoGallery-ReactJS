import React, {useEffect} from 'react';
import useStorage from '../hooks/useStorage';
import { motion } from 'framer-motion';

const ProgressBar = ({ file, setFile }) => {

    const {url, progress } = useStorage(file);
    
    useEffect(() => {
        if(url) setFile(null);
    }, [url, setFile]);

    return (
        <div className="progressBar">
            <h5 className="text-center mt-1 mb-0">{progress.toFixed(1)}%</h5>
            <motion.div className="progress-bar background-primary p-2" 
                style={{ height: '20px'}}
                initial={{ width: 0 }}
                animate={{ width: progress + '%' }}
            ></motion.div>
        </div>
    )
}
export default ProgressBar;