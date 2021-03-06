import { Waypoint } from "interface"
import { getRoom, setRoom } from "./room.store.service"

type Tour = Waypoint.Tournament
type GetTournament = (roomId: string) => Tour | null
type SetTournamentFn = (state: Tour) => Tour
type SetTournamentAction = SetTournamentFn | Tour
type SetTournament = (roomId: string, payload: SetTournamentAction) => void

const defaultTour: Tour = {
  _leagueTitle: "",
  customFields: {},
  id: "",
  leagueId: "",
  leagueTitle: "",
  orgId: "",
  tournament: {
    name: "",
  },
  visibility: "public",
}

export const getTournament: GetTournament = (roomId) => {
  const room = getRoom(roomId)
  if (!room) return null
  return room.tournament
}

export const setTournament: SetTournament = (roomId, payload) => {
  const isFn = typeof payload === "function"
  const tour = getTournament(roomId)
  if (isFn) {
    const tournament = { ...tour, ...payload(tour || defaultTour) }
    setRoom(roomId, (s) => ({ ...s, tournament }))
    return
  }
  setRoom(roomId, (s) => ({ ...s, tournament: payload }))
}
