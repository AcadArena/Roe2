import Routes from "./routes"
import { MantineProvider } from "ui"

import { BrowserRouter } from "react-router-dom"
import { GreycliffCF } from "./fonts/GreyCliffCF/GreyCliffCF.font"

function App() {
  return (
    <BrowserRouter>
      <MantineProvider>
        <Routes />
        <GreycliffCF />
      </MantineProvider>
    </BrowserRouter>
  )
}

export default App
