// Taken from: https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
export const arraybufferToString = (buf: ArrayBuffer) => {
  var bufView = new Uint16Array(buf);
  var length = bufView.length;
  var result = '';
  var addition = Math.pow(2,16)-1;

  for(var i = 0; i<length; i+=addition){
    if(i + addition > length){
        addition = length - i;
    }
    result += String.fromCharCode.apply(null, bufView.subarray(i,i+addition));
  }

  return result;
}

export const stringToArraybuffer = (str: string) => {
  var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);

  for (var i=0, strLen=str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }

  return buf;
}
