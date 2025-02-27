import { useState } from "react";
import { WidgetType, type WidgetData } from "../../utils/widgetsUtils";
import Modal from "../shared/Modal/Modal";
import styles from "./addEditWidgetModal.module.scss";

type AddEditWidgetModalProps = {
	isEditModal: boolean;
	show: boolean;
	onClose: () => void;
	addEditHandler: (widgetData: WidgetData) => void;
	// Removed unused widgetToEditData
};

const extractNameFromUrl = (url: string): string => {
	try {
		const { hostname } = new URL(url);
		const parts = hostname.split('.');
		if (parts.length > 2) {
			return parts[0]; // subdomain
		}
		return parts.slice(0, -1).join('.'); // domain without TLD
	} catch {
		return "Invalid URL";
	}
};

const AddEditWidgetModal = ({
	isEditModal,
	show,
	onClose,
	addEditHandler,
}: AddEditWidgetModalProps) => {
	const [error, setError] = useState<string | null>(null);

	const handlePasteClick = async () => {
		try {
			const text = await navigator.clipboard.readText();
			if (!text) {
				setError("Clipboard is empty!");
				return;
			}

			const nameFromUrl = extractNameFromUrl(text);

			const newWidgetData: WidgetData = {
				type: WidgetType.BookmarkWidget,
				link: text,
				name: nameFromUrl,
			};

			addEditHandler(newWidgetData);
		} catch (err) {
			setError("Failed to read clipboard contents!");
		}
	};

	return (
		<Modal showModal={show} headerText={`${isEditModal ? "Edit" : "New"} Bookmark`}>
			<div className={styles.modalContent}>
				<p>Copy the URL you want to add to the clipboard, then click the "Paste" button.</p>
				{error && <p className={styles.error}>{error}</p>}
				<div className={styles.modalFooter}>
					<button type="button" className={styles.closeButton} onClick={onClose}>
						Close
					</button>
					<button type="button" className={styles.pasteButton} onClick={handlePasteClick}>
						Paste
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default AddEditWidgetModal;
