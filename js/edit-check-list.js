
export const separaItensChecados = (arrayRecebido) => {


    let arrayValoresChecados = [];
    let arrayValoresNaoChecados = []

    arrayRecebido.forEach(item => {
        
        const riscado = item.dataset.checado;
        const texto = item.textContent;
        
        if(riscado == 1){

            arrayValoresChecados.push(texto);

        }else{

            arrayValoresNaoChecados.push(texto);
            
        }
    
    });

    let arrayJunto = [];

    arrayJunto.push(arrayValoresChecados);

    arrayJunto.push(arrayValoresNaoChecados);

    return arrayJunto

}
