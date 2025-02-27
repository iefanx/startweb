import styles from "./footer.module.scss";

const Footer = () => {
	const clearLocalStorage = () => {
		localStorage.clear();
		alert("Local storage cleared!");
	};

	return (
		<footer className={styles.footer}>
			{/* <p className={styles.description}>
				PWA designed to manage all your web apps in one place with a universal search option.
			</p> */}
			<button onClick={clearLocalStorage} style={{ color: "#9c988d" , border: "none", padding: "2px", borderRadius: "5px", fontWeight: "bold", cursor: "pointer"}}>
				Reset
			</button>
			
		</footer>
	);
};

export default Footer;
