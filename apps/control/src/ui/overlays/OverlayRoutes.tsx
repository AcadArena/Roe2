import { Tournament, Icon } from "tabler-icons-react"

interface OverlayAdjustables {
  adjText: boolean
  record: boolean
}
export interface OverlayLink {
  link: string
  label: string
  icon: string
  adjust?: Partial<OverlayLink> & Partial<OverlayAdjustables>
  team?: "a" | "b"
  teamCode?: "shortcode" | "name" | "shortname" | "schoolShortcode" | "school"
  playerCode?: "photoURL" | "username" | "school"
  statIndex?: number
  index?: number
}

const OverlayRoutes = ({
  team,
  teamCode,
  playerCode,
  statIndex,
  index,
}: Partial<OverlayLink>) => {
  const OverlayLinks: Record<string, OverlayLink> = {
    Shoutout: {
      link: "/shoutout",
      label: "Shoutout",
      icon: "π",
    },
    UpNext: {
      link: "/upnext",
      label: "Up Next",
      icon: "β­",
    },
    Schedules: {
      link: "/schedules",
      label: "Schedules",
      icon: "π",
    },
    LT: {
      link: "/lowerthirds",
      label: "Lower Thirds",
      icon: "πͺ",
    },
    Talent: {
      link: `/talent/${index}`,
      label: "Talents",
      icon: "πββοΈ",
      adjust: { index: index },
    },
    TeamLogo: {
      link: `/team/${team}/logo`,
      label: "Team Logo",
      icon: "π",
      adjust: { team: team },
    },
    TeamName: {
      link: `/team/${team}/${teamCode}`,
      label: "Team Names",
      icon: "π ",
      adjust: {
        team: team,
        teamCode: teamCode,
        adjText: true,
      },
    },
    TeamScore: {
      link: `/team/${team}/score`,
      label: "Team Score",
      icon: "π’",
      adjust: { team: team, adjText: true },
    },
    Player: {
      link: `/team/${team}/player/${index}/${playerCode}`,
      label: "Player",
      icon: "π¦ΈββοΈ",
      adjust: {
        team: team,
        index: index,
        playerCode: playerCode,
        adjText: true,
      },
    },
    PlayerStats: {
      link: `/team/${team}/player/${index}/stats/${statIndex}`,
      label: "Player Stats",
      icon: "π¨βπ»",
      adjust: {
        team: team,
        index: index,
        statIndex: statIndex,
        adjText: true,
        record: true,
      },
    },
  }

  return OverlayLinks
}

export default OverlayRoutes
