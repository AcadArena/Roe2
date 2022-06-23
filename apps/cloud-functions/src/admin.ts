import * as admin from "firebase-admin"
import * as functions from "firebase-functions"

admin.initializeApp()
export const db = admin.firestore()
export const auth = admin.auth()
export { functions, admin }

export const twitterAxios = async () => {
  const { default: axios } = await import("axios")

  return axios.create({
    baseURL: "https://api.twitter.com/2",
    headers: {
      Authorization: `Bearer ${functions.config().twitter.bearer}`,
    },
  })
}

export const Err = functions.https.HttpsError
