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
    
    console.log("docs:"+JSON.stringify(docs));

    const chunkedDocs = chunkArray(docs, 7);

    const imgContainer = {
        begin: {
            opacity:0
        },
        rest: {
            opacity:1,
            transition: {
                delay:1
            }
        }
    };
    const imgMotion = {
        rest: { 
            opacity: 0.8 
        },
        hover: { 
            opacity: 1,
        }
    };
    const spanBgMotion = {
        begin: {
            height: 0,
            backgroundColor: "rgba(0, 0, 0, 0)"
        },
        rest: {
            height: 0,
            backgroundColor: "rgba(0, 0, 0, 0)"
        },
        hover: {
            height: 60,
            backgroundColor: "rgba(0, 0, 0, 0.25)"
        }
    }
    const spanMotion = {
        begin: {
            opacity: 0
        },
        rest: {
          opacity: 0,
          transition: {
              delay:0,
              duration:0
          }
        },
        hover: {
          color: "white",
          opacity: 1,
          transition: {
              delay:0.3
          }
        }
      };
    return (
        <div className="image-grid row justify-content-center mt-3 pt-2 pb-2">
        {
            chunkedDocs.map( (container, i) => (
                <div className="wrap p-1" key={i} style={{flex: '25%'}}>
                    { 
                        container.map(row => (
                            <motion.div className="img-wrap position-relative mb-2" key={row.id}
                                layout
                                initial="begin" 
                                whileHover="hover" 
                                animate="rest"
                                variants={imgContainer}
                            >
                                <motion.img 
                                    src={row.url} 
                                    alt={row.title} 
                                    className="shadow-1-strong rounded img-fluid align-middle" 
                                    variants={imgMotion}
                                />
                                <motion.div 
                                    className="title-bg position-absolute z-1 top-0 start-0 end-0"
                                    variants={spanBgMotion}
                                >        
                                    <motion.span 
                                        className="title-banner h4 fw-bold d-inline-block w-100 text-center p-3"
                                        variants={spanMotion}
                                    >
                                        {row.title}
                                    </motion.span>
                                </motion.div>
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