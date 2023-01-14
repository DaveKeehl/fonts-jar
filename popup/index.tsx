import { Favorites } from "./components/Favorites"
import { Header } from "./components/Header"
import { TopBar } from "./components/TopBar"
import { CollectionsManager, CollectionAssignment } from "./components/Modals"

import "../style.css"

function IndexPopup() {
  return (
    <>
      <Header />
      <TopBar />
      <Favorites />
      <CollectionsManager />
      <CollectionAssignment />
    </>
  )
}

export default IndexPopup
