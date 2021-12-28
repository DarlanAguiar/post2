
export const separaItensChecados = (arrayRecebido) => {

    let arrayValores = [];
   
    arrayRecebido.forEach(item => {
        
        const riscado = item.dataset.checado;
        const texto = item.textContent;
       
        if(riscado == 1){

            arrayValores.push({texto: `${texto}`, checado: true});

        }else{

            arrayValores.push({texto: `${texto}`, checado: false});
            
        }
    
    });
 
    return arrayValores
}
