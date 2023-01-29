import { saveNewStandingsFiles } from "./FetchNewRanks/index.mjs"
import { returnLastStandingsFiles } from './ReturnOldRanks/index.mjs'

const updateData = () => {
    try {
        saveNewStandingsFiles()
    } catch (err) {
        throw err
    }
    try {
        const standingForCompare = returnLastStandingsFiles()
        console.log("standings files : " + standingForCompare)
    } catch (err) {
        throw err
    }
}

updateData()
