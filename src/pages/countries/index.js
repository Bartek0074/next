import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';

import fetchData from '@/functions/fetchData/fetchData';

export default function Home() {
	const router = useRouter();

	const [data, setData] = useState(null);

	useEffect(() => {
		async function getData() {
			try {
				const fetchedData = await fetchData({ url: 'all' });
				setData(fetchedData);
			} catch (error) {
				console.error(error);
			}
		}
		getData();
	}, []);

	if (!data) {
		return <div>Ładowanie lub coś poszło nie tak</div>;
	}
	return (
		<div style={{ marginLeft: 10 }}>
			<p style={{ fontSize: 18 }}>Podstrona z listą krajów</p>
			<div style={{ display: 'flex', marginTop: 20, marginBottom: 20 }}>
				<p>Przejdź do strony głównej:</p>
				<button style={{ marginLeft: 20 }} onClick={() => router.push('/')}>
					Click!
				</button>
			</div>
			<div>
				<p>Lista krajów (kliknij aby przejść na podstronę z szczegółowymi informacjami o danym kraju)</p>
				<ul>
					{data.map((country) => (
						<li
							key={country.cca3}
							style={{
								color: 'black',
								padding: '5px',
							}}
						>
							<Link
								href={`/countries/${country.cca3}`}
								style={{
									color: 'black',
									textDecoration: 'none',
								}}
							>
								{country.flag}
								{country.name.common}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
