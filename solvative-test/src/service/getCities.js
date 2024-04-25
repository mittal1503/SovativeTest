import axios from "axios";

const get_cities_by_prefix = async (prefix, limit, offset) => {
    const response = await axios.get(
        `http://localhost:5000/?city_name=${prefix}&limit=${limit}&offset=${offset}`
    );

    console.log(response, offset);

    const city_list = response.data.data.map((city, index) => {
        return {
            id: index + 1 + offset,
            city: city.name,
            country: city.country,
        };
    });

    return { city_list, total: response.data.metadata.totalCount };
};

export default get_cities_by_prefix;
