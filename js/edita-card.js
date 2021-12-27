import { salvarEdicao } from "./index2.js";
import { separaItensChecados } from "./edit-check-list.js";
import { adiocionaErroNaData } from "./cria-lembrete.js";
import { validaData } from "./valida-data.js";



export const editaTudo = (alvo) => {
    //let alvo = e.target.parentNode
    
    let data = alvo.querySelector(".data-card").textContent;
    
    if(data.length > 0){

        var dataValidada = validaData(data);
       
        if(!dataValidada){
            adiocionaErroNaData(alvo)
            return
        }
    }


    let id = alvo.querySelector(".botao-cancelar").dataset.id;
    let titulo = alvo.querySelector("h4").textContent;
    let conteudo = alvo.querySelector(".texto").textContent;

    const dataED = new Date();
    const dia = String(dataED. getDate()). padStart(2 ,'0');
    const mes = String(dataED. getMonth() + 1). padStart(2, '0');
    const ano = dataED.getFullYear();
    const hora = dataED.getHours();
    let minutos = dataED.getMinutes();
    minutos.toString().length == 2 ? minutos = minutos : minutos = `0${minutos}`;

    var dataAtual =`Editado ${dia}/${mes}/${ano} às ${hora}:${minutos}`;

    let checkList = alvo.querySelectorAll(".card-item-check");

    let checkListSeparado = separaItensChecados(checkList);

    salvarEdicao(id, titulo, conteudo, checkListSeparado[0], checkListSeparado[1], data, dataAtual);

}