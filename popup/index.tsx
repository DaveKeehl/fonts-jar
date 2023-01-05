import "../style.css"
import { Favorites } from "./Favorites"
import { Header } from "./Header"
import { TopBar } from "./TopBar"

function IndexPopup() {
  return (
    <>
      <Header />
      <TopBar />
      <Favorites />
    </>
  )
}

export default IndexPopup
