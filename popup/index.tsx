import { Favorites } from "~/popup/components/Favorites"
import { Header } from "~/popup/components/Header"
import { TopBar } from "~/popup/components/TopBar"
import { CollectionsManager, CollectionAssignment, OriginWebsites } from "~/popup/components/Modals"

import "~/style.css"

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
