// import axios from '@/helpers/axios';
import axios from 'axios';
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

	const { data, status } = await axios.get(
		'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/search',
		{
			headers: {
				accept: 'application/json',
				'X-RapidAPI-Key': '0305113434msh91a23d7be1ae531p1c4c59jsnff5ea436e476',
				'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
			},
			params: {
				query: 'bam',
			},
		}
	);

	if (!status === 200) {
		return {
			props: {
				isRequestFailed: true,
			},
		};
	}

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
}
