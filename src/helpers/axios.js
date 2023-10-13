import axios from 'axios';


export default axios.create({
	baseURL: 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
	headers: {
		accept: 'application/json',
		'X-RapidAPI-Key': '0305113434msh91a23d7be1ae531p1c4c59jsnff5ea436e476',
		'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
	},
});

// export const fetchJokes = async (query) => {
//     const response = await axiosInstance.get('/jokes/search', {
//       params: { query },
//     });
//     return response;

// };
