export interface Poll {
  id: string
  roomId: string
  title: string
  description: string
  img: string
  forceClosed: boolean
  openDate: number
  closeDate: number
  items: Record<string, PollItem>
  votes: Record<string, number>
}

export interface PollItem {
  id: string
  name: string
  img: string
  description: string
}

export interface Vote {
  uid: string
  vote: string
  pollId: string
}
