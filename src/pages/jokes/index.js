import { useRouter } from 'next/router';
import Link from 'next/link';
// import axios from '@/helpers/axios';
import axios from 'axios';

export default function Home({ isRequestFailed, jokes }) {
	const router = useRouter();

	if (isRequestFailed) {
		return (
			<div>
				<p>Upsss, coś poszło nie tak...</p>
			</div>
		);
	}

	return (
		<div>
			<p style={{ fontSize: 18 }}>Podstrona z kawałami</p>
			<div style={{ display: 'flex', marginTop: 20, marginBottom: 20 }}>
				<p>Przejdź do strony głównej:</p>
				<button style={{ marginLeft: 20 }} onClick={() => router.push('/')}>
					Click!
				</button>
			</div>
			<div>
				<p>Lista żartów (kliknij aby przejść na podstronę z pełnym żartem)</p>
				<ul>
					{jokes.map((joke) => (
						<li key={joke.id}>
							<Link
								href={`/jokes/${joke.id}`}
								style={{
									color: 'black',
									textDecoration: 'none',
									padding: '5px',
								}}
							>
								{joke.value.slice(0, 27)}...
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export async function getStaticProps() {
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

		return {
			props: {
				isRequestFailed: false,
				jokes: data.result,
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
