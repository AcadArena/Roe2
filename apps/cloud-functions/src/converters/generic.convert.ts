import { FirestoreConverter, Snap } from "../types"

type GenericAdminFC = <T extends object = object>() => FirestoreConverter<T>

export const genericAdminFC: GenericAdminFC = <T extends object>() => {
  return {
    fromFirestore: (snap: Snap<T>) => snap.data(),
    toFirestore: (data) => data,
  }
}
