import { useEffect } from "react";
import TopBar from "./components/TopBar/TopBar";
import WidgetHolder from "./components/WidgetHolder/WidgetHolder";
import Footer from "./components/Footer/Footer";
import SearchBar from "./components/SearchBar/SearchBar";
import styles from "./app.module.scss";

function App() {
	useEffect(() => {
		const handleRefresh = (event: TouchEvent) => {
			if (event.touches[0].clientY > 50) {
				window.location.reload();
			}
		};

		window.addEventListener("touchend", handleRefresh);

		return () => {
			window.removeEventListener("touchend", handleRefresh);
		};
	}, []);

	return (
		<>
			<div className={styles.app}>
				<TopBar />
				<SearchBar />
				<WidgetHolder />
				<Footer />
			</div>
		</>
	);
}

export default App;
