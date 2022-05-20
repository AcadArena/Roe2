import { useMatches, useParticipants } from "utils/hooks"
import { useParams } from "react-router-dom"
import useRoom from "../../hooks/useRoom.hook"
import { Image, Box, Text } from "@mantine/core"
import { useInverse } from "../../hooks/useInverse.hook"
import { defaultSeries } from "utils/general"
import { QueryColor, QueryFont } from "../../utils/queryParams"
import { useQuery } from "../../utils/useQuery"

type Params = Record<"team" | "score", string>

const Score = () => {
  // add this to every overlay page
  useRoom()
  const params = useParams<Params>()
  const query = useQuery()
  const { chalTeams } = useParticipants()
  const { activeMatch, getScore } = useMatches()
  const isInversed = useInverse()
  const teamSide = isInversed(params.team === "a" ? "teamA" : "teamB")
  const teamSideLetter = teamSide === "teamA" ? "a" : "b"
  const teamId = activeMatch?.[teamSide].id || ""
  const teamScore = getScore(activeMatch ?? defaultSeries)?.[teamSideLetter]
    .scores
  const font = QueryFont[query.get("font") ?? "industry"]
  const fontColor = QueryColor[query.get("color") ?? "black"]

  return (
    <Box sx={{ height: 600, width: 600 }}>
      {/* <Image src={team?.logo} height={600} width={600} fit="contain" /> */}
      <Text sx={{ fontFamily: font, fontSize: 40, color: fontColor }}>
        {teamScore}
      </Text>
    </Box>
  )
}
export default Score