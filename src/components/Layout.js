export default function Layout({ children }) {
	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					height: '50px',
					marginBottom: 10,
					backgroundColor: '#f2f2f2',
				}}
			>
				<p style={{ fontSize: 20 }}>Kraje świata</p>
			</div>
			{children}
		</>
	);
}
