import { Favorites } from "./components/Favorites"
import { Header } from "./components/Header"
import { TopBar } from "./components/TopBar"
import { CollectionsManager, CollectionAssignment } from "./components/Modals"

import "../style.css"

function IndexPopup() {
  return (
    <div className="overflow-hidden">
      <Header />
      <TopBar />
      <Favorites />
      <CollectionsManager />
      <CollectionAssignment />
    </div>
  )
}

export default IndexPopup
