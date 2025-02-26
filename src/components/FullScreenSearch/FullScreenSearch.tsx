import React, { useState, useEffect } from "react";
import styles from "./fullscreensearch.module.scss";

interface FullScreenSearchProps {
	onClose: () => void;
}

interface Bang {
	name: string;
}

const initialBangs: Bang[] = [
	{ name: "!g" }, // Google  
	{ name: "!ddg" }, // DuckDuckGo  
	{ name: "!bing" }, // Bing  
	{ name: "!yt" }, // YouTube  
	{ name: "!twitter" }, // Twitter/X  
	{ name: "!reddit" }, // Reddit  
	{ name: "!w" }, // Wikipedia  
	{ name: "!imdb" }, // IMDb  
	{ name: "!amazon" }, // Amazon  
	{ name: "!ebay" }, // eBay  
	{ name: "!ghtrending" }, // GitHub Trending  
	{ name: "!hackernews" }, // Hacker News  
	{ name: "!openai" }, // OpenAI  
	{ name: "!arxiv" }, // ArXiv research papers  
	{ name: "!wolfram" }, // Wolfram Alpha  
	{ name: "!coinmarketcap" }, // Crypto market data  
	{ name: "!wayback" }, // Internet Archive  
	{ name: "!spotify" }, // Spotify  
	{ name: "!tmdb" }, // The Movie Database  
	{ name: "!translate" }, // Google Translate  
];

const FullScreenSearch: React.FC<FullScreenSearchProps> = ({ onClose }) => {
	const [query, setQuery] = useState("");
	const [bangs, setBangs] = useState<Bang[]>(() => {
		const storedBangs = localStorage.getItem("bangs");
		return storedBangs ? JSON.parse(storedBangs) : initialBangs;
	});
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		localStorage.setItem("bangs", JSON.stringify(bangs));
	}, [bangs]);

	const handleSearch = (bang: string) => {
		const searchQuery = `${bang} ${query}`.trim();
		window.location.href = `https://unduck.link?q=${encodeURIComponent(searchQuery)}`;
	};

	const addCustomBang = () => {
		if (query.startsWith("!") && !bangs.some(bang => bang.name === query)) {
			setBangs((prevBangs) => {
				const newBangs = [...prevBangs, { name: query }];
				return newBangs.sort((a, b) => a.name.localeCompare(b.name));
			});
			setQuery("");
		}
	};

	const deleteBang = (bangName: string) => {
		setBangs((prevBangs) => prevBangs.filter(bang => bang.name !== bangName));
	};

	const getFaviconUrl = (bangName: string) => {
		const domain = bangName.slice(1);
		return `https://icons.duckduckgo.com/ip3/${domain}.com.ico`;
	};

	return (
		<div className={styles.fullScreenSearch}>
            <h2 className={styles.heading}>Universal Search</h2>
			<button onClick={onClose} className={styles.closeButton}>
							✖
			</button>
			<div className={styles.searchContainer}>
				<input
					type="text"
					placeholder={isEditing ? "Add new bang" : "Search.."}
					className={`${styles.searchInput} ${styles.animatedInput}`}
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							if (isEditing) {
								addCustomBang();
							} else {
								handleSearch("");
							}
						}
					}}
				/>
				<div className={styles.bangOptions}>
					{bangs.map((bang) => (
						<div key={bang.name} className={styles.bangButtonContainer}>
							
							<button
                        
								className={styles.bangButton}
								onClick={() => handleSearch(bang.name)}
							>
                                <img src={getFaviconUrl(bang.name)} alt={`${bang.name} icon`} className={styles.bangIcon} />
								{bang.name}
							</button>
							{isEditing && (
								<button
									className={styles.deleteButton}
									onClick={() => deleteBang(bang.name)}
								>
												✖
								</button>
							)}
						</div>
					))}
				</div>
				
			</div>
						<button onClick={() => setIsEditing(!isEditing)} className={styles.editButton}>
							{isEditing ? "Done" : "Edit"}
						</button>
		</div>
	);
};

export default FullScreenSearch;
