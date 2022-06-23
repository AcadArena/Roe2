import type { User } from "interface/db"
import { genericAdminFC } from "./generic.convert"
1
export const userAdminFC = genericAdminFC<User>()
