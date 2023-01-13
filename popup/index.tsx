import { Favorites } from "./components/Favorites"
import { Header } from "./components/Header"
import { TopBar } from "./components/TopBar"
import { CollectionsManagerModal } from "./components/Modals/CollectionsManagerModal"

import "../style.css"
import { CollectionAssignmentModal } from "./components/Modals/CollectionAssignmentModal"

function IndexPopup() {
  return (
    <>
      <Header />
      <TopBar />
      <Favorites />
      <CollectionsManagerModal />
      <CollectionAssignmentModal />
    </>
  )
}

export default IndexPopup
