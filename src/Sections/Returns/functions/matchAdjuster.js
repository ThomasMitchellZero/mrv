

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

    for( const matchObj in rmoMatchArr){

    }

    return newMatchObj
}

export default matchCostAdjuster