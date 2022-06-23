import { admin, db, Err, functions } from "../admin"
import { genericAdminFC } from "../converters/generic.convert"
import { pollAdminFC } from "../converters/poll.converter"
import type { Vote } from "interface/db/Poll.interface"

export const pollVote = functions
  .region("east-asia2")
  .https.onCall(async (data, context) => {
    const auth = context.auth
    if (!auth) {
      const msg = "Login required."
      throw new Err("unauthenticated", msg)
    }

    const { z } = await import("zod")
    const schema = z.object({
      uid: z.literal(auth.uid),
      pollId: z.string(),
      vote: z.string(),
    })

    const res = schema.safeParse(data)
    if (!res.success || !res.data) {
      const msg = "Invalid Vote"
      throw new Err("invalid-argument", msg)
    }

    const { pollId, uid, vote } = res.data

    try {
      return db.runTransaction(async (trans) => {
        const pollPath = `polls/${pollId}`
        const pollRef = db.doc(pollPath).withConverter(pollAdminFC)
        const pollSnap = await trans.get(pollRef)
        const pollData = pollSnap.data()
        if (!pollData) {
          throw "Poll not found"
        }

        if (!pollData.items[vote]) {
          throw "Invalid vote, voted item not found"
        }

        const votePath = `${pollPath}/votes/${uid}`
        const voteRef = db.doc(votePath).withConverter(genericAdminFC<Vote>())
        const voteSnap = await trans.get(voteRef)
        const voteData = voteSnap.data()

        const increment = admin.firestore.FieldValue.increment

        if (voteData) {
          return trans.update(pollRef, {
            [`votes.${voteData.vote}`]: increment(-1),
            [`votes.${vote}`]: increment(1),
          })
        }
        return trans.update(pollRef, {
          [`votes.${vote}`]: increment(1),
        })
      })
    } catch (e) {
      const err = e as { message: string }
      const message = err?.message || "Unable to cast vote"
      throw new Err("aborted", message, e)
    }
  })
