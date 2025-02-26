import React, { useState } from "react";
import FullScreenSearch from "../FullScreenSearch/FullScreenSearch";
import styles from "./searchbar.module.scss";

const SearchBar = () => {
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	const handleSearchClick = () => {
		setIsSearchOpen(true);
	};

	const handleClose = () => {
		setIsSearchOpen(false);
	};

	return (
		<>
			<div className={styles.searchBar}>
				<button onClick={handleSearchClick} className={styles.searchIcon}>
					🔍
				</button>
			</div>
			{isSearchOpen && <FullScreenSearch onClose={handleClose} />}
		</>
	);
};

export default SearchBar;
