import { montaCheckList } from "./monta-check.js";
import { salvarEdicao, removerItem } from "./index2.js";
import { separaItensChecados } from "./edit-check-list.js";

export function criarCard(titulo, conteudo, cursor, itensChecados, itensNaoChecados, data, dataEdicao) {

    let checkList = montaCheckList(itensChecados, itensNaoChecados)

   
    let div = document.createElement("div");
    div.classList.add("post-it");

    let salvarEdicao = document.createElement("p");
    salvarEdicao.classList.add("botao-edicao-card");
    salvarEdicao.textContent = "Salvar";
    salvarEdicao.addEventListener("click", editaTudo);


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
    pConteudo.setAttribute("contenteditable", true);
  
    let divBotoes = document.createElement("div");
    divBotoes.classList.add("botao-post-it");
    
    let pData = document.createElement("p");
    pData.classList.add("data-card");
    pData.setAttribute("contenteditable", true);
    pData.textContent = data;

    let pDataEdicao = document.createElement("p");
    pDataEdicao.classList.add("data-card-edicao");
    pDataEdicao.textContent = dataEdicao;



    divtexto.appendChild(divFilha);
    divtexto.appendChild(h4titulo);

    divtexto.appendChild(pConteudo);
    

    div.appendChild(divtexto);

    div.appendChild(checkList);

    div.appendChild(pData);

    div.appendChild(salvarEdicao);

    div.appendChild(pDataEdicao);
    
    
    return div;
}


const editaTudo = (e) => {
    let alvo = e.target.parentNode

    let id = alvo.querySelector(".botao-cancelar").dataset.id;
    let titulo = alvo.querySelector("h4").textContent;
    let conteudo = alvo.querySelector(".texto").textContent;
    let data = alvo.querySelector(".data-card").textContent;




    var dataED = new Date();
    var dia = String(dataED. getDate()). padStart(2 ,'0');
    var mes = String(dataED. getMonth() + 1). padStart(2, '0');
    var ano = dataED.getFullYear();
    var hora = dataED.getHours();
    var minutos = dataED.getMinutes();
    var dataAtual =`Editado ${dia}/${mes}/${ano} às ${hora}:${minutos}`;
    




    let checkList = alvo.querySelectorAll(".card-item-check");

    let checkListSeparado = separaItensChecados(checkList);

    salvarEdicao(id, titulo, conteudo, checkListSeparado[0], checkListSeparado[1], data, dataAtual);

}


const esmaecerItem = (evento) =>{
    const paiDoAlvo = evento.target.parentNode;
    const voDoalvo = paiDoAlvo.parentNode;
    
    voDoalvo.classList.add("esmaecer");
}