import axios from 'axios';

export default axios.create({
	baseURL: 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
	headers: {
		accept: 'application/json',
		'X-RapidAPI-Key': process.env.RAPID_API_KEY,
		'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
	},
});

// export const fetchJokes = async (query) => {
//     const response = await axiosInstance.get('/jokes/search', {
//       params: { query },
//     });
//     return response;

// };
