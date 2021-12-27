import { editaTudo } from "./edita-card.js";

export const montaCheckList = (itensChecados, itensNaoChecados) => {

    let divCheck = document.createElement("div")
    divCheck.classList.add("card-div-checar")

    


    
    itensChecados.forEach(elementchecado => {
        

        let divCheckItem = document.createElement("div")
        divCheckItem.classList.add("card-div-checar-item")
            
        let pTexto = document.createElement("p");
        pTexto.classList.add("card-item-check");
        pTexto.classList.add("texto-riscado");
        pTexto.setAttribute("contenteditable", true);
        pTexto.setAttribute("data-checado", 1);
        pTexto.textContent = elementchecado;
        pTexto.addEventListener("blur", (e)=>{
            let filho = e.target.parentNode
            let pai = filho.parentNode;
            let alvoVo = pai.parentNode;
        
            editaTudo(alvoVo);
        });
        
       

        let divBotoesCheck = document.createElement("div");
        divBotoesCheck.classList.add("card-botoes-check");

        let pRiscar = document.createElement("p");
        pRiscar.classList.add("card-riscar-check");
        pRiscar.addEventListener("click", riscaCheckCard);
        pRiscar.addEventListener("click", (e)=>{
            let filho = e.target.parentNode
            let pai = filho.parentNode;
            let vo = pai.parentNode;
            let alvoBisavo = vo.parentNode;
            
            editaTudo(alvoBisavo);
        });

        let pApagar = document.createElement("p");
        pApagar.classList.add("card-apagar-check")
        pApagar.addEventListener("click", (e)=>{
            let filho = e.target.parentNode
            let pai = filho.parentNode;
            let vo = pai.parentNode;
            let alvoBisavo = vo.parentNode;
            removeCheckCard(e)
            editaTudo(alvoBisavo);
        });

        

        divBotoesCheck.appendChild(pRiscar);
        divBotoesCheck.appendChild(pApagar);

        divCheckItem.appendChild(pTexto);
        divCheckItem.appendChild(divBotoesCheck);

        divCheck.appendChild(divCheckItem);

    });


    itensNaoChecados.forEach(elementoNChecado =>{
        
        let divCheckItem = document.createElement("div")
        divCheckItem.classList.add("card-div-checar-item")
            
        let pTexto = document.createElement("p");
        pTexto.classList.add("card-item-check");
        pTexto.setAttribute("contenteditable", true);
        pTexto.setAttribute("data-checado", 0);
        pTexto.textContent = elementoNChecado;
        pTexto.addEventListener("blur", (e)=>{
            let filho = e.target.parentNode
            let pai = filho.parentNode;
            let alvoVo = pai.parentNode;
        
            editaTudo(alvoVo);
        });
        
       

        let divBotoesCheck = document.createElement("div");
        divBotoesCheck.classList.add("card-botoes-check");

        let pRiscar = document.createElement("p");
        pRiscar.classList.add("card-riscar-check");
        pRiscar.addEventListener("click", riscaCheckCard);
        pRiscar.addEventListener("click", (e)=>{
            let filho = e.target.parentNode
            let pai = filho.parentNode;
            let vo = pai.parentNode;
            let alvoBisavo = vo.parentNode;
            
            editaTudo(alvoBisavo);
        });

        let pApagar = document.createElement("p");
        pApagar.classList.add("card-apagar-check")
        pApagar.addEventListener("click", (e)=>{
            let filho = e.target.parentNode
            let pai = filho.parentNode;
            let vo = pai.parentNode;
            let alvoBisavo = vo.parentNode;
            removeCheckCard(e)
            editaTudo(alvoBisavo);
        });

        divBotoesCheck.appendChild(pRiscar);
        divBotoesCheck.appendChild(pApagar);

        divCheckItem.appendChild(pTexto);
        divCheckItem.appendChild(divBotoesCheck);

        divCheck.appendChild(divCheckItem);
    })

    return divCheck;

}


const riscaCheckCard = (e) => {

    let alvo = e.target;
    let pai = alvo.parentNode;
    let vo = pai.parentNode;
    
    let textoParaRiscar = vo.querySelector(".card-item-check");
   
    textoParaRiscar.classList.toggle("texto-riscado")
    

    const index = textoParaRiscar.dataset.checado;
  
    if(index == 0){
        textoParaRiscar.dataset.checado = 1
    }else{
        textoParaRiscar.dataset.checado = 0
    }

    
}

const removeCheckCard = (e) =>{
    let alvo = e.target;
    let pai = alvo.parentNode;
    let vo = pai.parentNode.remove();

}

