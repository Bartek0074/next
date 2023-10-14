// import axios from '@/helpers/axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';

import fetchData from '@/functions/fetchData/fetchData';

export default function Joke() {
	const router = useRouter();
	const params = useParams();

	const [data, setData] = useState(null);

	useEffect(() => {
		if (params?.id) {
			async function getData() {
				try {
					const fetchedData = await fetchData({ url: `alpha/${params.id}` });
					setData(fetchedData[0]);
				} catch (error) {
					console.error(error);
				}
			}
			getData();
		}
	}, [params]);

	if (!data) {
		return <div>Ładowanie lub coś poszło nie tak</div>;
	}

	return (
		<div style={{ marginLeft: 10 }}>
			<div style={{ display: 'flex', marginBottom: 15 }}>
				<p>Przejdź do strony z listą krajów:</p>
				<button
					style={{ marginLeft: 20 }}
					onClick={() => router.push('/countries')}
				>
					Click!
				</button>
			</div>
			<p style={{ fontSize: 72 }}>{data.flag}</p>
			<p style={{ marginBottom: 10 }}>Nazwa: {data.name.common}</p>
			<p style={{ marginBottom: 10 }}>Stolica: {data.capital[0]}</p>
			<p style={{ marginBottom: 10 }}>
				Kontynent: {data.continents.map((continent) => continent)}
			</p>
		</div>
	);
}
// export async function getStaticPaths() {
// 	return { paths: [], fallback: false };
// }

// export async function getStaticProps(context) {
// 	const id = context.params.id;
// 	const url =
// 		'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/search?query=bam';
// 	const options = {
// 		method: 'GET',
// 		headers: {
// 			accept: 'application/json',
// 			'X-RapidAPI-Key': '0305113434msh91a23d7be1ae531p1c4c59jsnff5ea436e476',
// 			'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
// 		},
// 	};

// 	try {
// 		const response = await fetch(url, options);
// 		if (response.status !== 200) {
// 			throw new Error(
// 				`Network response was not ok, status: ${response.status}`
// 			);
// 		}

// 		const data = await response.json();
// 		const joke = data.result.find((object) => object.id == id);

// 		if (!joke) {
// 			return {
// 				notFound: true,
// 			};
// 		}

// 		return {
// 			props: {
// 				isRequestFailed: false,
// 				isIdValid: true,
// 				joke: joke,
// 			},
// 		};
// 	} catch (error) {
// 		console.error('Błąd:', error);
// 		return {
// 			props: {
// 				isRequestFailed: true,
// 			},
// 		};
// 	}
// }
