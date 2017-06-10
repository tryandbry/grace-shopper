// Name: printPrice
// Purpose: Formats a float into a "price" string
// ----------------------------------
export const printPrice = (num)=>{
  let temp = `${num}`.split('.');
  let cents;
  let dollars = "";
  let buffer = temp[0].split('');
  //process dollars
  for(let i=0;buffer.length;i++){
    if(i != 0 && i%3 == 0) dollars = ',' + dollars;
    dollars = buffer.pop() + dollars;
  }
  //process cents
  if(temp.length == 1) cents = "00";
  if(temp.length == 2){
    cents = temp[1].slice(0,2);
    for(let i=cents.length;i<2;i++){
      cents += "0";
    }
  }
  return `$${dollars}.${cents}`;
}
