import tenderTypes from "../../../components/global_functions/tenderTypes"

const tenderSort = (tenderObj)=> {

    const tType = tenderTypes

    const unsortedTendersArr = Object.keys(tenderObj)

    // tender types, in the order they should be processed.
    let sortedTenders = [
        ...unsortedTendersArr.filter((thisTender)=>{
            return tenderObj[thisTender].tenderType === tType.credit
        }),
        ...unsortedTendersArr.filter((thisTender)=>{
            return tenderObj[thisTender].tenderType === tType.debit
        }),
        ...unsortedTendersArr.filter((thisTender)=>{
            return tenderObj[thisTender].tenderType === tType.check
        }),
        ...unsortedTendersArr.filter((thisTender)=>{
            return tenderObj[thisTender].tenderType === tType.storeCredit
        }),
        ...unsortedTendersArr.filter((thisTender)=>{
            return tenderObj[thisTender].tenderType === tType.cash
        }),    
    ]
    return sortedTenders
}

export default tenderSort;