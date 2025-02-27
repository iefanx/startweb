import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
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
					<FontAwesomeIcon icon={faSearch} />
					<span className={styles.searchLabel}> Universal Web Search</span>
				</button>
				{isSearchOpen && <FullScreenSearch onClose={handleClose} />}
			</div>
		</>
	);
};

export default SearchBar;
