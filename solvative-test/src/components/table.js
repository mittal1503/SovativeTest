import { useState, useEffect } from "react";
import getCities from "../service/getCities";

const Table = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const itemsPerPage = 3;
    const [totalPages, setTotalPages] = useState(0);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Function to handle pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getCity = async () => {
        await getCities(searchTerm, 3, (currentPage - 1) * 3).then(
            (response) => {
                console.log(response);
                setData([...response.city_list]);
                setTotalPages(Math.ceil(response.total / itemsPerPage));
            }
        );
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            getCity();
        }
    };

    useEffect(() => {
        console.log("useEffect");
        console.log(searchTerm.trim());
        if (searchTerm.trim() !== "") {
            getCity();
        }
    }, [currentPage]);

    return (
        <div>
            <input
                type="text"
                className="search-box"
                placeholder="Search Places"
                onKeyPress={handleKeyPress}
                value={searchTerm}
                onChange={handleSearchChange}
            />

            <table className="custom-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>City</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.city}</td>
                            <td>{item.country}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? "active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Table;
