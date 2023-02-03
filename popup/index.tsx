import { Favorites } from "./components/Favorites"
import { Header } from "./components/Header"
import { TopBar } from "./components/TopBar"
import { CollectionsManager, CollectionAssignment, OriginWebsites } from "./components/Modals"

import "../style.css"

function IndexPopup() {
  return (
    <div className="overflow-hidden">
      <Header />
      <TopBar />
      <Favorites />
      <CollectionsManager />
      <CollectionAssignment />
      <OriginWebsites />
    </div>
  )
}

export default IndexPopup
