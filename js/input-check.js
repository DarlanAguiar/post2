let id = 0;

export const botaoIncluir = () => {

    

    let botaoIncluir = document.querySelector("[data-botaoIncluir]");
    botaoIncluir.addEventListener("click", () => {

        let textoChecar = document.querySelector("[data-inputChecar]").value;

        if(textoChecar.length > 0){
            criaItensCheck();
        }
    });


    document.addEventListener("keypress", function(e) {
        if(e.key === 'Enter') {

            let textoChecar = document.querySelector("[data-inputChecar]").value;

            if(textoChecar.length > 0){
                criaItensCheck();
            }
        
        }
    });
    

};

const criaItensCheck = () => {

    let localListaCheck = document.querySelector("[data-itensCheck]");

    let textoChecar = document.querySelector("[data-inputChecar]");

    let divChecar = document.createElement("div");
    divChecar.classList.add("div-checar")

    let divBotoes = document.createElement("div");
    divBotoes.classList.add("div-Botoes-input")

    let riscar = document.createElement("p");
    riscar.classList.add("riscar-input");
    riscar.addEventListener("click", riscacheck)
    
    let apagar = document.createElement("p");
    apagar.classList.add("apagar-input")
    apagar.addEventListener("click", removeCheck);

    let lista = document.createElement("p");
    lista.setAttribute("data-id", id);
    lista.setAttribute("contenteditable", true)
    lista.setAttribute("data-checado", 0)
    /* lista.setAttribute("id", "item-check"); */
    lista.classList.add("item-check");
    lista.textContent = textoChecar.value;

    divBotoes.appendChild(riscar);
    divBotoes.appendChild(apagar)

    divChecar.appendChild(lista);
    divChecar.appendChild(divBotoes);
    

    localListaCheck.appendChild(divChecar);
    id++

    
    textoChecar.value = "";

}



export const removeCheck = (e) =>{
    let alvo = e.target;
    let pai = alvo.parentNode;
    let vo = pai.parentNode.remove();

}

export const riscacheck = (e) => {

    let alvo = e.target;
    let pai = alvo.parentNode;
    let vo = pai.parentNode;
    
    let textoParaRiscar = vo.querySelector(".item-check");
   
    textoParaRiscar.classList.toggle("texto-riscado")
    

    const index = textoParaRiscar.dataset.checado;
  
    if(index == 0){
        textoParaRiscar.dataset.checado = 1
    }else{
        textoParaRiscar.dataset.checado = 0
    }

    
}

