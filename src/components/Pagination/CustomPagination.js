import { Pagination, createTheme, ThemeProvider } from "@mui/material"




const CustomPagination = ({ setPage, numberOfPage = 10 }) => {
    const handlePageChange = (page) => {
        setPage(page)
        window.scroll(0, 0)
    }
    return (
        <div
            style={{
                width: "100%",
                display: 'flex',
                justifyContent: 'center',
                marginTop: 10,


            }}>

               
            <Pagination 
            color='secondary' 
            count={numberOfPage} 
            onChange={e => handlePageChange(e.target.textContent)} 
            hideNextButton
            hidePrevButton/>
        </div>
    )


}
export default CustomPagination;