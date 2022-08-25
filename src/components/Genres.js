import Chip from '@mui/material/Chip';

import axios from "axios";
import { useEffect } from "react";

const Genres = ({
    type,
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    setPage,
}) => {

    const handleAdd = (genre) => {
        console.log(genre)
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    };

    const handleRemove = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
    };


    const fetchGenres = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=f74eddea8aa099ac2a5aaee0ffef3ce5&language=en-US`
        );
        setGenres(data.genres);
    };

    // console.log(genres);
    useEffect(() => {
        fetchGenres();

        return () => {
            setGenres({}); // unmounting
        };
        // eslint-disable-next-line
    }, []);

    return (

        <div style={{ padding: "6px 0" }}>

            {selectedGenres && selectedGenres.map((genre) =>
                <Chip
                    key={genre.id}
                    label={genre.name}
                    style={{ margin: 2, color: 'black' }}
                    color='primary'
                    clickable
                    size='small'
                    onDelete={() => handleRemove(genre)}

                />

            )
            }

            {genres && genres.map((genre) =>
                <Chip
                    key={genre.id}
                    label={genre.name}
                    style={{ margin: 2, color: 'white' }}
                    clickable
                    size='small'
                    onClick={() => handleAdd(genre)}

                />

            )
            }
        </div>

    )
}

export default Genres