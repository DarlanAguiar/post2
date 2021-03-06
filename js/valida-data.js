export const validaData = (data) => {
  //console.log(data)

  /* const dataSeparada = data.split("-").reverse().join("-")
    const novaData = new Date(dataSeparada)
    console.log(novaData); */

  //let expressao = new RegExp(/^[0-3]?[0-9]-[0-1]?[0-9]-[1-2]\d\d\d$/, "g");

  let expressao = new RegExp(
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
    "g"
  );

  if (expressao.test(data)) {
    return true;
  } else {
    return false;
  }
};
