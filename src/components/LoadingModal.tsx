import { LoadingIcon } from "./LoadingIcon";
import { showModal } from "./Modal";

export default function showLoadingModal() {
    showModal({
        children: <LoadingIcon/>,
        canClose: false,
    });
}