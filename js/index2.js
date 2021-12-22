import { botaoIncluir } from "./input-check.js";
import { montaCheckList } from "./monta-check.js";
import { criarCard } from "./cria-lembrete.js"
import {separaItensChecados} from "./edit-check-list.js"

let localId;
let bancoDeDados;
let nomeDoBancoDeDados = "BancoDePostit2";
let nomeDaLista = "listaDeDados2"

function criaBancoDeDados () {
    
    let requisicao = window.indexedDB.open( nomeDoBancoDeDados, 1);

    requisicao.onsuccess = (evento) => {

        bancoDeDados = requisicao.result;

        //console.log("banco de dados criado", evento, bancoDeDados);
        
        mostrarCardNaTela ()
    }

    requisicao.onupgradeneeded = (evento) => {

        bancoDeDados = evento.target.result;

        const objetoSalvo = bancoDeDados.createObjectStore(nomeDaLista, {
            keyPath: "id",
            autoIncrement: true
        });

        objetoSalvo.createIndex("lembrete", "lembrete", {unique: false});

        //console.log("houve um upgrade", evento)
    }


    requisicao.onerror = (evento) => {

        console.log("hove um erro", evento);
    }
}

function salvarDados (conteudoTitulo, lembrete, itensCheck, itensNaoCheck) {
    
   
    let localParaAdicionar = bancoDeDados.transaction([nomeDaLista], "readwrite");

    let listaParaAdicionar = localParaAdicionar.objectStore(nomeDaLista);

    let novaMensagem = {titulo: conteudoTitulo, mensagem: lembrete, listaCheck: itensCheck, listaNaoCheck: itensNaoCheck};

    listaParaAdicionar.add(novaMensagem);

    mostrarCardNaTela ()       
}


export function salvarEdicao (id, titulo, conteudo, checados, naoChecados) {

    let numeroId = Number(id)
    
    let localParaAdicionar = bancoDeDados.transaction([nomeDaLista], "readwrite");

    let listaParaAdicionar = localParaAdicionar.objectStore(nomeDaLista);

    // let local = listaParaAdicionar.get(localId);

    // local.onsuccess = function(e) {
    //     var data = e.target.result;

    //     console.log(`Data ${JSON.stringify(data)} localId: ${localId}`)
    //     data.mensagem = lembrete;
    //     listaParaAdicionar.put(data);
    // }

    listaParaAdicionar.put({id: numeroId, titulo: titulo, mensagem: conteudo, listaCheck: checados, listaNaoCheck: naoChecados});
    mostrarCardNaTela ();
 
}


export const removerItem = (eventoClick) => {

    setTimeout(function(){
        
        console.log(eventoClick.target);
    
        const localId = Number(eventoClick.target.getAttribute("data-id"));
    
        let localParaAdicionar = bancoDeDados.transaction([nomeDaLista], "readwrite");
    
        let listaParaAdicionar = localParaAdicionar.objectStore(nomeDaLista);
    
        listaParaAdicionar.delete(localId);
    
        mostrarCardNaTela ();

    }, 800)

};


function mostrarCardNaTela(){

    let local = document.querySelector(".container-cards");
    local.innerHTML  = ""

    let objetoGuardado = bancoDeDados.transaction(nomeDaLista).objectStore(nomeDaLista);

    objetoGuardado.openCursor().onsuccess = (evento) => {

        const cursor = evento.target.result;

        if(cursor){

            const titulo = cursor.value.titulo;
            const conteudo = cursor.value.mensagem;
            const itensChecados = cursor.value.listaCheck;
            const itensNaoChecados = cursor.value.listaNaoCheck;

            const card = criarCard(titulo, conteudo, cursor, itensChecados, itensNaoChecados); 
        
            local.appendChild(card)

            cursor.continue();
        }
    }
}


function pegarDados(){
    
    var campoInformacoes = document.querySelector("[data-mensagem]");
    var conteudo = campoInformacoes.value;
    var campoTitulo = document.querySelector("[data-titulo]");
    var conteudoTitulo = campoTitulo.value;
    let arrayCheck = document.querySelectorAll(".item-check");
    
    let separados = separaItensChecados(arrayCheck);
    
    document.querySelector("[data-itensCheck]").innerHTML = ""
    
    if(conteudo.length > 0){
        
        salvarDados(conteudoTitulo, conteudo, separados[0], separados[1]);
               
        campoInformacoes.value = ""
        campoTitulo.value = ""

    }else{
        
        campoInformacoes.value = ""
        campoTitulo.value = ""
        
    }
}

// filtrar

let campoDigitavelBusca = document.querySelector(".filtro");

    campoDigitavelBusca.addEventListener("input", () => {

        var camposDeBusca = document.querySelectorAll(".textos");

        if(campoDigitavelBusca.value.length > 0){

            camposDeBusca.forEach((elemento, indice) => {

                let conteudoTitulo = elemento.querySelector("p").textContent;
                let conteudoTexto = elemento.querySelector("h4").textContent;

                let conteudoTotal = conteudoTitulo.concat(conteudoTexto);

                console.log(conteudoTotal)

                let expressao = new RegExp(campoDigitavelBusca.value, "i")

                if(expressao.test(conteudoTotal)){
                    elemento.parentNode.classList.remove("invisivel");
                   
                }else{

                    elemento.parentNode.classList.add("invisivel");
                }
            })
        }else{
            camposDeBusca.forEach(elemento => {
                
                elemento.parentNode.classList.remove("invisivel");
            })
        }
    })



// Eventos

document.querySelector(".botao-cancelar").addEventListener("click" ,()=>{
    var campoInformacoes = document.querySelector("[data-mensagem]");
    campoInformacoes.value = "";

    const areaDeAviso = document.querySelector(".aviso")
        .classList.remove("visualiza-aviso");
    

    campoInformacoes.classList.remove("borda-vermelha");

    var campoTitulo = document.querySelector("[data-titulo]");
    campoTitulo.value = ""

    document.querySelector('.menu-deslizante').classList.toggle('menu-deslizante--ativo')
    document.querySelector('.botao-adicionar').classList.toggle('apaga-botao');
    document.querySelector("[data-itensCheck]").innerHTML = ""
    document.querySelector("[data-inputChecar]").value = ""
});

document.querySelector(".botao-salvar").addEventListener("click", ()=>{
    const temMensagem = document.getElementById("mensagem");
    const areaDeAviso = document.querySelector(".aviso");
    
    if(temMensagem.value.length > 0){

        document.querySelector('.menu-deslizante').classList.toggle('menu-deslizante--ativo')

        document.querySelector('.botao-adicionar').classList.toggle('apaga-botao');

        temMensagem.classList.remove("borda-vermelha");
        areaDeAviso.classList.remove("visualiza-aviso");

        pegarDados()
    }else{
        temMensagem.classList.add("borda-vermelha");
        areaDeAviso.classList.add("visualiza-aviso");
    }


});


document.querySelector('.botao-adicionar').addEventListener('click', () => {

    document.querySelector('.menu-deslizante').classList.toggle('menu-deslizante--ativo')
    document.querySelector('.botao-adicionar').classList.toggle('apaga-botao');
});





document.querySelector(".lupa").addEventListener("click", () => {
    const campoBuscar = document.querySelector(".div-busca").classList.toggle("busca-ativa")
})
document.querySelector(".filtro").addEventListener("blur", ()=> {
    const campoBuscar = document.querySelector(".div-busca");
    campoBuscar.classList.remove("busca-ativa")
})



criaBancoDeDados();

botaoIncluir();


