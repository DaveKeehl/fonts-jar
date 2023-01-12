import { useState } from "react"
import Modal from "react-modal"

import { Favorites } from "./components/Favorites"
import { Header } from "./components/Header"
import { TopBar } from "./components/TopBar"

import "../style.css"
import { useAtom } from "jotai"
import { isModalOpenAtom } from "./atoms"

Modal.setAppElement("#root")

function IndexPopup() {
  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom)

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  return (
    <>
      <Header />
      <TopBar />
      <Favorites />
      <button onClick={openModal}>Open Modal</button>
      <Modal
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
            border: "none"
          },
          overlay: {
            background: "rgba(0, 0, 0, 0.5)"
          }
        }}
        contentLabel="Example Modal">
        <h2>I am a modal</h2>
        <button onClick={closeModal}>close</button>
      </Modal>
    </>
  )
}

export default IndexPopup
