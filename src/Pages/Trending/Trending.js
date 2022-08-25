import axios from "axios";
import { useState, useEffect } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import './Trending.css'
import CustomPagination from '../../components/Pagination/CustomPagination'
const Trending = () => {
    const [content, setContent] = useState([])
    const [page, setPage] = useState(1)
    const [numberOfPage,setNumberOfPages]=useState()
    const fetchTrending = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=f74eddea8aa099ac2a5aaee0ffef3ce5&page=${page}`);
    
        setContent(data.results)
        setNumberOfPages(data.total_pages)


    }

    useEffect(() => {
        fetchTrending()
        
    }, [page])

    return (
        <div>
            <span className="pageTitle"> Trending </span>
            <div className="trending">
                {
                    content && content.map((item) =>
                        <SingleContent
                            key={item.id}
                            id={item.id}
                            title={item.title || item.original_name}
                            poster={item.poster_path}
                            date={item.first_air_date || item.release_date}
                            media_type={item.media_type}
                            vote_average={item.vote_average}
                        />



                    )
                }
            </div>
            <CustomPagination setPage={setPage} numberOfPage={numberOfPage}/>

        </div>
    )

}
export default Trending;