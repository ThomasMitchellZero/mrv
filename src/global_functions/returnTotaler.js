


const ReturnTotaler = (matchedItemsObj) =>{
    const returnValuesObj = {
        RefundTotal: 0,
        taxSum: 0,
        subtotal: 0,
        adjustments: 0,
    }
    let matchObjArr = []

    for (const product of Object.values(matchedItemsObj)){
        matchObjArr = [...matchObjArr, ...product.matchBitesArr]
    }

    

    



    return matchObjArr
}


export default ReturnTotaler

/*




*/