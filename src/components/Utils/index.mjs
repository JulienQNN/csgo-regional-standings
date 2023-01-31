import saveNewStandingsFiles from "./FetchNewRanks/index.mjs"
import returnLastStandingsFiles from './ReturnOldRanks/index.mjs'
import transformFiles from './TransformMdToJson/index.mjs'

function updateData() {
    try {
        saveNewStandingsFiles()
    } catch (err) {
        throw err
    }
    finally {
        transformFiles(returnLastStandingsFiles())
    }
}

updateData()
