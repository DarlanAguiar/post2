export const validaData = (data) => {

    //console.log(data)

    /* const dataSeparada = data.split("-").reverse().join("-")

    const novaData = new Date(dataSeparada)

    console.log(novaData); */

    let expressao = new RegExp(/^[0-3]?[0-9]-[0-1]?[0-9]-[1-2]\d\d\d$/, "g");

    if(expressao.test(data)){
        
        console.log("correto")
        return true;
        
    }else{

        console.log("errado")
        return false
    }
   
  
}