import { montaCheckList } from "./monta-check.js";
import { salvarEdicao, removerItem } from "./index2.js";
import { separaItensChecados } from "./edit-check-list.js";

export function criarCard(titulo, conteudo, cursor, itensChecados, itensNaoChecados) {

    let checkList = montaCheckList(itensChecados, itensNaoChecados)

    console.log(checkList)

    console.log(itensChecados)
    console.log(itensNaoChecados)

    let div = document.createElement("div");
    div.classList.add("post-it");

    let salvarEdicao = document.createElement("p");
    salvarEdicao.classList.add("botao-edicao-card");
    salvarEdicao.textContent = "Salvar"
    salvarEdicao.addEventListener("click", editaTudo)
    


    let divtexto = document.createElement("div");
    divtexto.classList.add("textos");

    let divFilha = document.createElement("div");
    divFilha.classList.add("xis");
    divFilha.textContent = "X";
    divFilha.classList.add("botao-cancelar");
    divFilha.setAttribute("data-id", cursor.value.id);
    divFilha.addEventListener("click", removerItem);
    divFilha.addEventListener("click", esmaecerItem);

    let h4titulo = document.createElement("h4");
    h4titulo.textContent = titulo;
    h4titulo.classList.add("filtrar");
    h4titulo.setAttribute("data-id", cursor.value.id);
    h4titulo.setAttribute("contenteditable", true)
    

    let pConteudo = document.createElement("p");
    pConteudo.classList.add("texto");
    pConteudo.classList.add("filtrar");
    pConteudo.textContent = conteudo;
    pConteudo.setAttribute("data-id", cursor.value.id);
    pConteudo.setAttribute("contenteditable", true)
  
    let divBotoes = document.createElement("div");
    divBotoes.classList.add("botao-post-it");

    divtexto.appendChild(divFilha);
    divtexto.appendChild(h4titulo);

    divtexto.appendChild(pConteudo);
    

    div.appendChild(divtexto);

    div.appendChild(checkList);

    div.appendChild(salvarEdicao);
    
    
    return div;
}


const editaTudo = (e) => {
    let alvo = e.target.parentNode

    let id = alvo.querySelector(".botao-cancelar").dataset.id;
    let titulo = alvo.querySelector("h4").textContent;
    let conteudo = alvo.querySelector(".texto").textContent;

    let checkList = alvo.querySelectorAll(".card-item-check");

    let checkListSeparado = separaItensChecados(checkList);

    salvarEdicao(id, titulo, conteudo, checkListSeparado[0], checkListSeparado[1])

}





const esmaecerItem = (evento) =>{
    const paiDoAlvo = evento.target.parentNode;
    const voDoalvo = paiDoAlvo.parentNode;
    
    voDoalvo.classList.add("esmaecer");
}