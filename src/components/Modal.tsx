"use client"
import { Dispatch, SetStateAction, useState } from 'react';
import ReactDOM from 'react-dom';

export interface ModalProps {
    title?: string;
    children?: React.ReactNode;
    canClose?: boolean;
}

let setModalContentGlobal: Dispatch<SetStateAction<ModalProps | null>>;

export function showModal(content: ModalProps) {
    setModalContentGlobal(content);
}

export function closeModal() {
    setModalContentGlobal(null);
}

export const Modal: React.FC<ModalProps> = ({ title, children, canClose = true }) => {
    return (
        <div className='ma fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50'>
            <div className='max-w-2xl rounded-lg bg-white px-8 pt-6 pb-8'>
                <div className='flex justify-between'>
                    {title && <h2 className='text-lg font-bold'>{title}</h2>}
                    {canClose &&
                        <button className='btn btn-sm btn-square btn-ghost text-lg' onClick={closeModal}>
                            ×
                        </button>
                    }
                </div>
                {children && <div className='mb-4 whitespace-pre-line'>{children}</div>}
            </div>
            {canClose && <div className='-z-10 fixed w-full h-full' onClick={closeModal} />}
        </div>
    );
};

export const ModalManager = () => {
    const [modalContent, setModalContent] = useState<ModalProps | null>(null);

    setModalContentGlobal = setModalContent;

    if (!modalContent) return null;

    return ReactDOM.createPortal(<Modal {...modalContent} />, document.body);
};