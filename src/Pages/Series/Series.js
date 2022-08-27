import axios from "axios";
import { useEffect, useState } from "react";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import Genres from '../../components/Genres'
import useGenre from "../../hooks/useGenre";

const Series = () => {
    const [page, setPage] = useState(1)
    const [content, setContent] = useState([])
    const [numberOfPages, setNumberOfPages] = useState()
    const [selectedGenres, setSelectedGenres] = useState([])
    const [genres, setGenres] = useState([])
    const genreforURL = useGenre(selectedGenres)

    const fetchSeries = async () => {
        const { data } = await axios.get(`
        https://api.themoviedb.org/3/discover/tv?api_key=f74eddea8aa099ac2a5aaee0ffef3ce5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)

        // console.log(data)
        setContent(data.results)
        setNumberOfPages(data.total_pages)
    }

    useEffect(() => {
        fetchSeries();
    }, [page, genreforURL])

    return (
        <div>
            <span className="pageTitle"> TV series </span>

            <Genres
                type="tv"
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />

            <div className="trending">
                {
                    content && content.map((item) =>
                        <SingleContent
                            key={item.id}
                            id={item.id}
                            title={item.title || item.original_name}
                            poster={item.poster_path}
                            date={item.first_air_date || item.release_date}
                            media_type='tv'
                            vote_average={item.vote_average}
                        />



                    )
                }
            </div>
            <CustomPagination setPage={setPage} numberOfPage={numberOfPages} />


        </div>
    )

}
export default Series;