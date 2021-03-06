import {
  Divider,
  Stack,
  Title,
  Text,
  Group,
  ActionIcon,
  Tooltip,
} from "@mantine/core"
import { Live } from "interface/ws"
import { SquareX } from "tabler-icons-react"
import { useLive, useMatches } from "utils/hooks"
import { setLive } from "utils/socket/events"
import { useBSave } from "../../context/bsave/bsave.hook"
import MatchCard from "../match/MatchCard.ui"
import Confirm from "../popups/Confirm.ui"

const LiveMatches = () => {
  const { activeMatch, nextMatch, schedule } = useMatches()
  const bSave = useBSave()

  const clearSchedule = () => {
    const saveData: Partial<Live> = { schedule: [] }
    setLive(saveData)
    bSave(saveData)
  }

  return (
    <Stack spacing="xl" pr="xl">
      <Stack spacing="xs">
        <Title order={4}>Active Match</Title>
        {activeMatch ? (
          <MatchCard match={activeMatch} />
        ) : (
          <Text align="center">No active match selected.</Text>
        )}
      </Stack>
      <Divider variant="dashed" />
      <Stack>
        <Title order={4}>Next Match</Title>
        {nextMatch ? (
          <MatchCard match={nextMatch} small withBorder />
        ) : (
          <Text align="center">Next match not yet selected.</Text>
        )}
      </Stack>
      <Divider variant="dashed" />
      <Stack>
        <Group align="center">
          <Title order={4}>Schedule</Title>
          <Confirm onConfirm={clearSchedule}>
            <Tooltip label="Clear Schedule">
              <ActionIcon variant="light">
                <SquareX size={18} />
              </ActionIcon>
            </Tooltip>
          </Confirm>
        </Group>
        {schedule.length ? (
          schedule.map((match) => (
            <MatchCard key={match.id} small match={match} withBorder />
          ))
        ) : (
          <Text align="center">No schedule yet.</Text>
        )}
      </Stack>
    </Stack>
  )
}
export default LiveMatches
