import { genericAdminFC } from "./generic.convert"
import type { Poll } from "interface/db/Poll.interface"
export const pollAdminFC = genericAdminFC<Poll>()
