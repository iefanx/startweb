import TopBar from "./components/TopBar/TopBar";
import WidgetHolder from "./components/WidgetHolder/WidgetHolder";
import Footer from "./components/Footer/Footer";
import SearchBar from "./components/SearchBar/SearchBar";
import styles from "./app.module.scss";

function App() {
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
