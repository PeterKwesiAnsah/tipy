const upperCase=(name)=>{
const strArray=[...name]
strArray[0]=strArray[0].toUpperCase()
const newString=strArray.join("")
return newString

}
export default upperCase

