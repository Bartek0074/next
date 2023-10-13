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

	return {
		props: {
			isRequestFailed: false,
			jokes: data.result,
		},
	};
}
