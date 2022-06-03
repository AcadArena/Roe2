import { Box, Image } from "@mantine/core"
import { LowerthirdData } from "interface/ws"
import { useLive, useLt } from "utils/hooks"
import LowerTicker from "./LowerTicker.o"
import { ReactNode } from "react"
import useRoom from "../../hooks/useRoom.hook"
import AdSingle from "./AdSingle.o"
import AdPool from "./AdPool.o"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { LayoutGroup } from "framer-motion"
import BG from "../../public/LTBanner.png"

type SwitchLT = (mode: keyof LowerthirdData) => ReactNode
const height = 160

const switchLT: SwitchLT = (mode) => {
  switch (mode) {
    case "ad":
      return <AdSingle />
    case "adPool":
      return <AdPool />
    case "matchPoll":
      return <></>
    case "ticker":
      return <LowerTicker />
    default:
      return null
  }
}

const list: Variants = {
  initial: { opacity: 0, y: height },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: height },
}

const item: Variants = {
  initial: { opacity: 0, y: height },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: height * -1 },
}

const LowerThirds = () => {
  useRoom()
  const {
    live: {
      lt: { mode, show },
    },
  } = useLive()
  return (
    <AnimatePresence>
      {show && (
        <LayoutGroup>
          <motion.div
            layout
            initial="initial"
            animate="animate"
            exit="exit"
            variants={list}
            style={{
              backgroundImage: `url("${BG}")`,
              backgroundSize: "100% 100%",
              width: 1585,
              height: 300,
              border: "2px solid red",
              padding: "55px 50px",
            }}
          >
            <Box
              sx={{
                position: "relative",
                zIndex: 99,
                width: "100%",
                height,
                overflow: "hidden",
              }}
            >
              <AnimatePresence>
                <motion.div
                  key={mode}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={item}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {switchLT(mode)}
                </motion.div>
              </AnimatePresence>
            </Box>
          </motion.div>
        </LayoutGroup>
      )}
    </AnimatePresence>
  )
}

export default LowerThirds
