const ab = new ArrayBuffer(4);
const dataView = new DataView(ab);

dataView.setInt8(0,2308);

console.log(ab)
