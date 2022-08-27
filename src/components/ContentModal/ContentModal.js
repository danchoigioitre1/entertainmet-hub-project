import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { img_500, unavailable } from '../../config/config';
import axios from 'axios'
import { useState, useEffect } from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './ContentModal.css'
import Carousel from '../Carousel/Carousel'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '80%',
    bgcolor: '#39445a',
    border: '2px solid #000',
    boxShadow: 24,
    color: 'white',
    p: 4,
    borderRadius: 10
};

export default function ContentModal({ children, media_type, id }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [content, setContent] = useState()
    const [video, setVideo] = useState()

    const fetchData = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=f74eddea8aa099ac2a5aaee0ffef3ce5&language=en-US`
        )
        setContent(data)
    }

    const fetchVideo = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=f74eddea8aa099ac2a5aaee0ffef3ce5&language=en-US`

        )
        setVideo(data.results[0]?.key)
      

    }

    useEffect(() => {
        fetchData()
        fetchVideo()
    }, [])

    return (
        <div>
            <div className='media' 
            style={{cursor:'pointer'}}
            onClick={handleOpen}>
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        {content && <div className='ContentModal'>
                            <img
                                alt={content.name || content.title}
                                className='ContentModal__portrait'
                                src={
                                    content.poster_path
                                        ? `${img_500}/${content.poster_path}`
                                        : unavailable} />
                            <img
                                alt={content.name || content.title}
                                className='ContentModal__landscape'
                                src={
                                    content.backdrop_path
                                        ? `${img_500}/${content.backdrop_path}`
                                        : unavailable} />

                            <div className='ContentModal__about' >
                                <span className='ContentModal__title'>
                                    {content.name || content.title}({
                                        (content.first_air_date || content.release_date || "----")
                                    })
                                </span>

                                {content.tagline && (
                                    <i className='tagline'>{content.tagline}</i>
                                )}
                                <span className='ContentModal__description'>{content.overview} </span>

                                <div>
                                    <Carousel
                                    media_type={media_type}
                                    id={id}/>
                                </div>
                               
                                <Button
                                variant='contained'
                                startIcon={<YouTubeIcon/>}
                              
                              color='secondary'
                              target="_blank"
                              href={`https://www.youtube.com/watch?v=${video}`}
                              >
                                Watch the Trailer
                              </Button>

                            </div>


                        </div>}
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}