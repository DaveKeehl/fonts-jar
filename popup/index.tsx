import { Favorites } from "./components/Favorites"
import { Header } from "./components/Header"
import { TopBar } from "./components/TopBar"

import "../style.css"

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
