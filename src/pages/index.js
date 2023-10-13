import { useRouter } from 'next/router';

export default function Home() {
	const router = useRouter();

	return (
		<div>
			<p style={{ fontSize: 18 }}>Strona główna</p>
			<div style={{ display: 'flex', marginTop: 20, marginBottom: 20 }}>
				<p>Przejdź do podstrony z kawałami:</p>
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
