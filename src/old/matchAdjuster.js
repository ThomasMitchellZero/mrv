

const matchCostAdjuster = (rawMatchedObj)=>{

    const costValues = {
        totalPrice: 0,
        totalTax: 0,
        totalAdjustments: 0,
    }

    const newMatchObj = {...rawMatchedObj}


    const rmoMatchArr = rawMatchedObj.matches

    /*

        200:{ 
            specialConditions:{SOS: 0.2,}
            matches:[
            {
                price:44.00,
                tax:4.10,
                payment:"Check",
                invoice: AAA,
                disposition:{doesntWork: 8, unwanted: 4},
            },
            {
                ...
            },
            ...
        ]
    }
    
    
    */
    //// LOOP through the current Item's matches arr
    for( const matchObj of rmoMatchArr){

        const costValues = {
            totalPrice: 0,
            totalTax: 0,
            totalAdjustments: 0,
        }

        // Building new matchArr object
        const outItemInvoMatchObj = {...matchObj, ...costValues}

        for (const dispos of Object.keys(matchObj.disposition) ){
            
        }


    }

    return newMatchObj
}

export default matchCostAdjuster