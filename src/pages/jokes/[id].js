// import axios from '@/helpers/axios';
import { useRouter } from 'next/router';

export default function Joke({ isRequestFailed, joke }) {
	const router = useRouter();

	if (router.isFallback) {
		return (
			<div>
				<p>Ładowanie żartu</p>
			</div>
		);
	}

	if (isRequestFailed) {
		return (
			<div>
				<p>Ups, coś poszło nie tak...</p>
			</div>
		);
	}

	return (
		<div>
			<p style={{ marginBottom: 10 }}>Żart o id: {joke.id}</p>
			<p style={{ marginBottom: 10 }}>Treść żartu: {joke.value}</p>
			<p style={{ marginBottom: 10 }}>Data dodania: {joke.updated_at}</p>
			<div style={{ display: 'flex' }}>
				<p>Przejdź do strony z listą żartów:</p>
				<button
					style={{ marginLeft: 20 }}
					onClick={() => router.push('/jokes')}
				>
					Click!
				</button>
			</div>
		</div>
	);
}
export async function getStaticPaths() {
	return { paths: [], fallback: false };
}

export async function getStaticProps(context) {
	const id = context.params.id;
	const url =
		'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/search?query=bam';
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			'X-RapidAPI-Key': '0305113434msh91a23d7be1ae531p1c4c59jsnff5ea436e476',
			'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
		},
	};

	try {
		const response = await fetch(url, options);
		if (response.status !== 200) {
			throw new Error(
				`Network response was not ok, status: ${response.status}`
			);
		}

		const data = await response.json();
		const joke = data.result.find((object) => object.id == id);

		if (!joke) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				isRequestFailed: false,
				isIdValid: true,
				joke: joke,
			},
		};
	} catch (error) {
		console.error('Błąd:', error);
		return {
			props: {
				isRequestFailed: true,
			},
		};
	}
}
