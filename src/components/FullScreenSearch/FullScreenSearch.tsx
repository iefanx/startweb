import React, { useState } from "react";
import styles from "./fullscreensearch.module.scss";

interface FullScreenSearchProps {
	onClose: () => void;
}

const FullScreenSearch: React.FC<FullScreenSearchProps> = ({ onClose }) => {
	const [query, setQuery] = useState("");

	const handleSearch = () => {
		window.location.href = `https://unduck.link?q=${encodeURIComponent(query)}`;
	};

	return (
		<div className={styles.fullScreenSearch}>
			<button onClick={onClose} className={styles.closeButton}>
				✖
			</button>
			<input
				type="text"
				placeholder="Search..."
				className={styles.searchInput}
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyPress={(e) => {
					if (e.key === "Enter") handleSearch();
				}}
			/>
		</div>
	);
};

export default FullScreenSearch;
