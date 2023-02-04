import tenderTypes from "../../../components/global_functions/tenderTypes"

const tenderSort = (tenderObj)=> {

    const unsortedTendersArr = Object.values(tenderObj)

    // tender types, in the order they should be processed.
    let sortedTenders = [
        ...unsortedTendersArr.filter((thisTender)=>{
            return thisTender.tenderType === tenderTypes.credit
        }),
        ...unsortedTendersArr.filter((thisTender)=>{
            return thisTender.tenderType === tenderTypes.debit
        }),
        ...unsortedTendersArr.filter((thisTender)=>{
            return thisTender.tenderType === tenderTypes.check
        }),
        ...unsortedTendersArr.filter((thisTender)=>{
            return thisTender.tenderType === tenderTypes.storeCredit
        }),
        ...unsortedTendersArr.filter((thisTender)=>{
            return thisTender.tenderType === tenderTypes.cash
        }),    
    ]
    return sortedTenders
}

export default tenderSort;