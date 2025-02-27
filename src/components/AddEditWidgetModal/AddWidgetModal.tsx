import { type FormEvent } from "react";
import { WidgetType, type WidgetData } from "../../utils/widgetsUtils";
import Modal from "../shared/Modal/Modal";
import InputField from "../shared/InputField/InputField";
import styles from "./addEditWidgetModal.module.scss";

type AddEditWidgetModalProps = {
	isEditModal: boolean;
	show: boolean;
	onClose: () => void;
	addEditHandler: (widgetData: WidgetData) => void;
	widgetToEditData?: WidgetData;
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
	widgetToEditData,
}: AddEditWidgetModalProps) => {
	const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const linkFromForm = formData.get("url")?.toString() || "";

		if (!linkFromForm) {
			alert("Link is Invalid!");
			return;
		}

		const nameFromUrl = extractNameFromUrl(linkFromForm);

		const newWidgetData: WidgetData = {
			type: WidgetType.BookmarkWidget,
			link: linkFromForm,
			name: nameFromUrl,
		};

		addEditHandler(newWidgetData);
	};

	const defaultLink = isEditModal ? widgetToEditData?.link || "" : "";
	return (
		<Modal showModal={show} headerText={`${isEditModal ? "Edit" : "New"} Bookmark`}>
			<form className={styles.modalContent} onSubmit={onFormSubmit}>
				{/* Removed name input field */}
				<div className={styles.formInputHolder}>
					<InputField
						id="url"
						label="Link"
						type="url"
						required
						defaultValue={defaultLink}
						
					/>
				</div>
				<div className={styles.modalFooter}>
					<button type="button" onClick={onClose}>
						Cancel
					</button>
					<button type="submit">{isEditModal ? "Update" : "Add"}</button>
				</div>
			</form>
		</Modal>
	);
};

export default AddEditWidgetModal;
