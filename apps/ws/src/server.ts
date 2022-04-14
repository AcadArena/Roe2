// import Fastify from "fastify"
import { Server } from "socket.io"
import http from "http"
import { tournamentEvents } from "./events/tournaments"

const PORT = process.env.PORT || 1337

const httpServer = http.createServer()
const io = new Server(httpServer, {
  cors: { origin: "*" },
})

io.on("connection", async (socket) => {
  console.log(`New Connection: ${socket.id}`)
  socket.onAny((eventName, ...args: any[]) => {
    console.log(`[${socket.id}]: emitted ${eventName} with ${args}`)
  })

  socket.on("ping", (data) => {
    io.emit("ping", data)
  })

  tournamentEvents(io, socket)
})

httpServer.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})