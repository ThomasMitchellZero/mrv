


const ReturnTotaler = (matchedItemsObj) =>{
    const returnValuesObj = {}
    let matchObjArr = []

    for (const product of Object.values(matchedItemsObj)){
        matchObjArr = [...matchObjArr, ...product.matches]
    }

    console.log(matchObjArr);



    return matchObjArr
}


export default ReturnTotaler

/*




*/