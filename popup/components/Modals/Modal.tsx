import { useSetAtom } from "jotai"
import ReactModal from "react-modal"

import { modalOpenAtom } from "~popup/atoms"

ReactModal.setAppElement("#__plasmo")

interface IModal {
  isModalOpen: boolean
  contentLabel: string
  children: React.ReactNode
}

export const Modal = ({ children, isModalOpen, contentLabel }: IModal) => {
  const setModalOpen = useSetAtom(modalOpenAtom)
  const closeModal = () => setModalOpen("")

  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          border: "none",
          maxWidth: "80%",
          maxHeight: "80%",
          overflow: "auto",
          borderRadius: "16px",
          padding: "0"
        },
        overlay: {
          background: "hsla(226, 74%, 9%, 0.6)"
        }
      }}
      bodyOpenClassName="body-open"
      contentLabel={contentLabel}>
      {children}
    </ReactModal>
  )
}
