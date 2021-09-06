import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';


const chunkArray = (arr, chunkSize = 2) => {
    const chunkedArr = [];
    for(let i=0; i<arr.length; i+=chunkSize) chunkedArr.push(arr.slice(i, i+chunkSize));
    return chunkedArr;
}
const ImageGrid = () => {

    const { docs } = useFirestore("images");
    
    const chunkedDocs = chunkArray(docs, 7);

    return (
        <div className="row justify-content-center mt-3 pt-2 pb-2">
        {
            chunkedDocs.map( (container, i) => (
                <div className="wrap p-1" key={i} style={{flex: '25%'}}>
                    { 
                        container.map(row => (
                            <motion.div className="img-wrap mb-2" key={row.id}
                                style={{opacity:0.8}}
                                layout
                                whileHover={{ opacity: 1}}
                            >
                                <motion.img 
                                    src={row.url} 
                                    alt="" 
                                    className="shadow-1-strong rounded img-fluid align-middle" 
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 1}}
                                />
                            </motion.div>
                        ))
                    }
                </div>
            ))
        }
        </div>
    )
}
export default ImageGrid;