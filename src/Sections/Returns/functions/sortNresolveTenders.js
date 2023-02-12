import tType from "../../../components/global_functions/tenderTypes"
import tenderStatusCodes from "./tenderStatusCodes"

const tenderSort = (tenderPack, failure)=> {

    const unsortedTendersArr = tenderPack.tenderArr
    let newIndex = tenderPack.activeIndex

    // tender types, in the order they should be processed.
    let sortedTenders = [
        ...unsortedTendersArr.filter((thisTender)=>{
            return thisTender.tenderType === tType.credit
        }),
        ...unsortedTendersArr.filter((thisTender)=>{
            return thisTender.tenderType === tType.debit
        }),
        ...unsortedTendersArr.filter((thisTender)=>{
            return thisTender.tenderType === tType.check
        }),
        ...unsortedTendersArr.filter((thisTender)=>{
            return thisTender.tenderType === tType.storeCredit
        }),
        ...unsortedTendersArr.filter((thisTender)=>{
            return thisTender.tenderType === tType.cash
        }),
    ]

    for (newIndex; newIndex < unsortedTendersArr.length; newIndex++ ){
        if(sortedTenders[newIndex].status === 1){}
    }



    return sortedTenders
}

export default tenderSort;