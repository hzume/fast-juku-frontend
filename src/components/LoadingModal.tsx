import { showModal } from "./Modal";

export default function showLoadingModal() {
    showModal({
        children: <span className="loading loading-spinner loading-lg"></span>,
        canClose: false,
    });
}