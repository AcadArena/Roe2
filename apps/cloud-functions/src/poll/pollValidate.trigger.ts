import { functions } from "../admin"

interface Params {
  pollId: string
}

export const validatePoll = functions
  .region("asia-east2")
  .firestore.document("polls/{pollId}")
  .onWrite(async (change, context) => {
    const data = change.after.data()
    const ref = change.after.ref
    const { pollId } = context.params as Params

    // Check if delete trigger
    if (!data) return

    const { z } = await import("zod")

    const url = z.string().url("Invalid image url").or(z.literal(""))
    const pollItemSchema = z.object({
      id: z.string(),
      name: z.string(),
      img: url,
      description: z.string(),
    })

    const pollSchema = z.object({
      id: z.literal(pollId),
      roomId: z.string(),
      title: z.string().min(1),
      description: z.string(),
      img: url,
      forceClosed: z.boolean(),
      openDate: z.number().min(0),
      closeDate: z.number().min(0),
      items: z.record(pollItemSchema),
      votes: z.record(z.number()),
    })

    const res = pollSchema.safeParse(data)
    if (!res.success) {
      const message = "Poll submitted was invalid"
      functions.logger.info(message)
      return ref.delete()
    }
    const msg = `Successfully validated poll: ${res.data.title}`
    return functions.logger.info(msg)
  })
