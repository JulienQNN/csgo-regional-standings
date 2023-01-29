import { saveNewStandingsFiles } from "./FetchNewRanks/index.mjs"
import { returnLastStandingsFiles } from './ReturnOldRanks/index.mjs'
import { transformFiles } from './TransformMdToJson/index.mjs'
const updateData = () => {
    try {
        saveNewStandingsFiles()
    } catch (err) {
        throw err
    }
    try {
        transformFiles(returnLastStandingsFiles())
    } catch (err) {
        throw err
    }
}

updateData()
