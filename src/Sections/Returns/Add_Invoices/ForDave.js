
const dataObj = {} // converted from your JSON file

const dataArr = Object.values(dataObj) // converts object to array

const datArr2 = Object.keys(dataObj)

// .map returns a second array that results from calling the callback on every entry in the first array.

const dropdownOptionsArr = dataArr.map((entry) => {
    // entry.name is your primary key that you want to appear in the list for each entry.
    <option value={dataObj[entry].name}>{entry.name}</option>
})

// the actual dropdown
const DropdownComponent = ()=>{
    <select>
        {dropdownOptionsArr}
    </select>
}

export default DropdownComponent