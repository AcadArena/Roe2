import {
  Text,
  Card,
  CardProps,
  Stack,
  Image,
  useMantineTheme,
  Group,
  ActionIcon,
  Loader,
  Menu,
} from "@mantine/core"
import { SanitizedParticipantMap, SanitizedSeriesMap } from "interface/waypoint"
import { useState } from "react"
import {
  Check,
  CircleMinus,
  CirclePlus,
  Dots,
  Minus,
  Select,
  UserPlus,
} from "tabler-icons-react"
import { getMatches, getParticipants } from "utils/axios"
import {
  getTournament,
  ShallowTournament,
} from "utils/axios/tournament.queries"
import { useMatches, useParticipants, useTournament } from "utils/hooks"
import { useWsAction } from "utils/socket"
import { useBSave } from "../../context/bsave/bsave.hook"
import { useRoom } from "../../context/room/Room.hooks"
import { usePermission } from "../../hooks/usePermission.hook"
import Confirm from "../popups/Confirm.ui"

type TournamentCardProps = Omit<CardProps<"div">, "children"> &
  ShallowTournament
const TournamentCard = ({ id, logo, name, org }: TournamentCardProps) => {
  const isAllowed = usePermission()
  const room = useRoom()
  const [loading, setLoading] = useState(false)
  const tournament = useTournament()
  const { matches: currentMatches } = useMatches()
  const { participants: currentParticipants } = useParticipants()
  const {
    tournament: setTournament,
    participants: setParticipants,
    matches: setMatches,
  } = useWsAction()
  const theme = useMantineTheme()
  const bSave = useBSave()

  const selectTournament = async () => {
    close()
    setLoading(true)
    const { matches, participants, ...tour } = await getTournament(id)
    setTournament(tour)
    setMatches(matches)
    setParticipants(participants)
    await room?.save({
      tournament: tour,
      matches,
      participants,
      roomId: room.id,
      activeMatch: "",
      nextMatch: "",
      schedule: [],
    })
    setLoading(false)
  }

  const addToMultiTournament = async () => {
    setLoading(true)
    const { matches, participants, ...tour } = await getTournament(id)
    const newTournament = {
      ...tournament,
      extends: { ...tournament.extends, [id]: tour.tournament.name },
    }
    setTournament(newTournament)
    setMatches({ ...currentMatches, ...matches })
    setParticipants({ ...currentParticipants, ...participants })
    await room?.save({
      tournament: newTournament,
      participants,
      matches,
    })
    setLoading(false)
  }

  const removeFromMultiTournament = async () => {
    setLoading(true)
    const { matches, participants } = await getTournament(id)
    const { [id]: omitted, ...rest } = tournament.extends ?? {}
    const newMatches = Object.entries(
      currentMatches
    ).reduce<SanitizedSeriesMap>((acc, [matchId, match]) => {
      if (matches[matchId]) return acc
      return { ...acc, [matchId]: match }
    }, {})
    const newParticipants = Object.entries(
      currentParticipants
    ).reduce<SanitizedParticipantMap>((acc, [teamId, team]) => {
      if (participants[teamId]) return acc
      return { ...acc, [teamId]: team }
    }, {})
    const newTournament = { ...tournament, extends: rest }
    setTournament(newTournament)
    setMatches(newMatches)
    setParticipants(newParticipants)
    await room?.save({
      tournament: newTournament,
      participants,
      matches,
    })
    setLoading(false)
  }

  const addParticipants = async () => {
    setLoading(true)
    const res = await getParticipants(id)
    const resEntries = Object.entries(res)
    const addedParticipants = resEntries.reduce<SanitizedParticipantMap>(
      (acc, [teamId, team]) => {
        if (currentParticipants[teamId]) return acc
        return { ...acc, [teamId]: team }
      },
      {}
    )
    const newParticipants = { ...currentParticipants, ...addedParticipants }
    setParticipants(newParticipants)
    bSave({ participants: newParticipants })
    setLoading(false)
  }

  const addMatches = async () => {
    setLoading(true)
    const res = await getMatches(id)
    const newMatches = { ...currentMatches, ...res }
    setMatches(newMatches)
    bSave({ matches: newMatches })
    setLoading(false)
  }

  const isSelected = tournament.id === id
  const isExtension = !!(tournament.extends ?? {})[id]
  const shadow = isSelected ? "lg" : "md"

  return (
    <Card radius="md" shadow={shadow} sx={{ height: "100%" }}>
      <Stack>
        <Group position="apart" p={0} align="start">
          <Image src={logo} height={50} width={50} radius="md" />

          <Menu
            closeOnItemClick={false}
            control={
              <ActionIcon>
                {loading ? (
                  <Loader size={18} />
                ) : isSelected ? (
                  <Check />
                ) : isExtension ? (
                  <Minus size={18} />
                ) : (
                  <Dots color={theme.colors.gray[5]} />
                )}
              </ActionIcon>
            }
          >
            <Confirm
              message="Selecting tournament will reset all the matches and participants"
              onConfirm={selectTournament}
              sx={{ width: "100%" }}
            >
              <Menu.Item sx={{ width: "100%" }} icon={<Select size={18} />}>
                Select
              </Menu.Item>
            </Confirm>
            {!isSelected &&
              (isExtension ? (
                <Confirm
                  sx={{ width: "100%" }}
                  onConfirm={removeFromMultiTournament}
                >
                  <Menu.Item
                    sx={{ width: "100%" }}
                    icon={<CircleMinus size={18}></CircleMinus>}
                    color="red"
                  >
                    Remove matches &amp; participants
                  </Menu.Item>
                </Confirm>
              ) : (
                <Confirm
                  sx={{ width: "100%" }}
                  onConfirm={addToMultiTournament}
                  title="?????? Warning"
                  message="This will replace all participant and matches"
                >
                  <Menu.Item
                    sx={{ width: "100%" }}
                    icon={<CirclePlus size={18}></CirclePlus>}
                  >
                    Add matches &amp; participants
                  </Menu.Item>
                </Confirm>
              ))}
            <Menu.Item onClick={addParticipants} icon={<UserPlus size={18} />}>
              Add Participants
            </Menu.Item>
            <Menu.Item onClick={addMatches} icon={<CirclePlus size={18} />}>
              Add Mathces
            </Menu.Item>
          </Menu>
        </Group>
        <Stack spacing={0}>
          <Text>{name}</Text>
          <Text size="sm">Hosted by {org}</Text>
        </Stack>
      </Stack>
    </Card>
  )
}

export default TournamentCard
