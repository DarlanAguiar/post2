import { botaoIncluir } from "./input-check.js";
import { criarCard } from "./cria-lembrete.js";
import { separaItensChecados } from "./edit-check-list.js";

// Salvar automaticamente
// Consertar o onupgradeneeded
// Enter para adicionar um novo item
// Validador de data

let bancoDeDados;
let nomeDoBancoDeDados = "BancoDePostit2";
let nomeDaLista = "listaDeDados2";

function criaBancoDeDados() {
  let requisicao = window.indexedDB.open(nomeDoBancoDeDados, 3);

  requisicao.onsuccess = (evento) => {
    bancoDeDados = requisicao.result;

    //console.log("banco de dados criado", evento, bancoDeDados);

    mostrarCardNaTela();
  };

  requisicao.onupgradeneeded = (evento) => {
    bancoDeDados = evento.target.result;
    if (bancoDeDados.objectStoreNames.contains(nomeDaLista)) {
      return;
    }

    const objetoSalvo = bancoDeDados.createObjectStore(nomeDaLista, {
      keyPath: "id",
      autoIncrement: true,
    });

    objetoSalvo.createIndex("lembrete", "lembrete", { unique: false });

    //console.log("houve um upgrade", evento)
  };

  requisicao.onerror = (evento) => {
    console.log("hove um erro", evento);
  };
}

function salvarDados(conteudoTitulo, lembrete, itens, data, dataEdicao) {
  let localParaAdicionar = bancoDeDados.transaction([nomeDaLista], "readwrite");

  let listaParaAdicionar = localParaAdicionar.objectStore(nomeDaLista);

  let novaMensagem = {
    titulo: conteudoTitulo,
    mensagem: lembrete,
    listaCheck: itens,
    data: data,
    dataEdicao: dataEdicao,
  };

  listaParaAdicionar.add(novaMensagem);
  console.log(itens);

  mostrarCardNaTela();
}

// itensCheck = ['um check', 'dois check'];
// itensNaoCheck = ['tres check', 'quatro check'];

// itens = [
//     {texto: 'um check', checked: true},
//     {texto: 'dois check', checked: true},
//     {texto: 'tres check', checked: false},
//     {texto: 'quatro check', checked: false},
// ];

export function salvarEdicao(id, titulo, conteudo, checados, data, dataAtual) {
  let numeroId = Number(id);

  let localParaAdicionar = bancoDeDados.transaction([nomeDaLista], "readwrite");

  let listaParaAdicionar = localParaAdicionar.objectStore(nomeDaLista);

  // let local = listaParaAdicionar.get(localId);

  // local.onsuccess = function(e) {
  //     var data = e.target.result;

  //     console.log(`Data ${JSON.stringify(data)} localId: ${localId}`)
  //     data.mensagem = lembrete;
  //     listaParaAdicionar.put(data);
  // }

  listaParaAdicionar.put({
    id: numeroId,
    titulo: titulo,
    mensagem: conteudo,
    listaCheck: checados,
    data: data,
    dataEdicao: dataAtual,
  });
  mostrarCardNaTela();
}

export const removerItem = (eventoClick) => {
  setTimeout(function () {
    const localId = Number(eventoClick.target.getAttribute("data-id"));

    let localParaAdicionar = bancoDeDados.transaction(
      [nomeDaLista],
      "readwrite"
    );

    let listaParaAdicionar = localParaAdicionar.objectStore(nomeDaLista);

    listaParaAdicionar.delete(localId);

    mostrarCardNaTela();
  }, 800);
};

function mostrarCardNaTela() {
  let local = document.querySelector(".container-cards");
  local.innerHTML = "";

  let objetoGuardado = bancoDeDados
    .transaction(nomeDaLista)
    .objectStore(nomeDaLista);

  objetoGuardado.openCursor().onsuccess = (evento) => {
    const cursor = evento.target.result;

    if (cursor) {
      const titulo = cursor.value.titulo;
      const conteudo = cursor.value.mensagem;
      const itensChecados = cursor.value.listaCheck;

      const data = cursor.value.data;
      const dataEdicao = cursor.value.dataEdicao;

      const card = criarCard(
        titulo,
        conteudo,
        cursor,
        itensChecados,
        data,
        dataEdicao
      );

      local.appendChild(card);

      cursor.continue();
    }
  };
}

function pegarDados() {
  var campoInformacoes = document.querySelector("[data-mensagem]");
  var conteudo = campoInformacoes.value;
  var campoTitulo = document.querySelector("[data-titulo]");
  var conteudoTitulo = campoTitulo.value;
  let arrayCheck = document.querySelectorAll(".item-check");

  let separados = separaItensChecados(arrayCheck);

  var data = document.querySelector(".data");
  var dataFormatada = data.value.split("-").reverse().join("-");

  let dataEdicao = "";

  document.querySelector("[data-itensCheck]").innerHTML = "";

  if (conteudo.length > 0) {
    salvarDados(conteudoTitulo, conteudo, separados, dataFormatada, dataEdicao);

    campoInformacoes.value = "";
    campoTitulo.value = "";
    data.value = "";
  } else {
    campoInformacoes.value = "";
    campoTitulo.value = "";
  }
}

// filtrar

let campoDigitavelBusca = document.querySelector(".filtro");

campoDigitavelBusca.addEventListener("input", () => {
  var camposDeBusca = document.querySelectorAll(".textos");

  if (campoDigitavelBusca.value.length > 0) {
    camposDeBusca.forEach((elemento, indice) => {
      let conteudoTitulo = elemento.querySelector("p").textContent;
      let conteudoTexto = elemento.querySelector("h4").textContent;
      let conteudoCheck =
        elemento.parentNode.querySelectorAll(".card-item-check");
      let conteudoArray = [];

      console.log(conteudoCheck[0]);

      let conteudoTotalTexto = conteudoTitulo.concat(conteudoTexto);

      conteudoCheck.forEach((item) => {
        let textos = item.textContent;
        conteudoArray.push(textos);
      });

      let checkString = conteudoArray.join();

      let conteudoTotal = conteudoTotalTexto.concat(checkString);

      let expressao = new RegExp(campoDigitavelBusca.value, "i");

      if (expressao.test(conteudoTotal)) {
        elemento.parentNode.classList.remove("invisivel");
      } else {
        elemento.parentNode.classList.add("invisivel");
      }
    });
  } else {
    camposDeBusca.forEach((elemento) => {
      elemento.parentNode.classList.remove("invisivel");
    });
  }
});

// Eventos

document.querySelector(".botao-cancelar").addEventListener("click", () => {
  var campoInformacoes = document.querySelector("[data-mensagem]");
  campoInformacoes.value = "";

  var data = document.querySelector(".data");
  data.value = "";

  const areaDeAviso = document
    .querySelector(".aviso")
    .classList.remove("visualiza-aviso");

  campoInformacoes.classList.remove("borda-vermelha");

  var campoTitulo = document.querySelector("[data-titulo]");
  campoTitulo.value = "";

  document
    .querySelector(".menu-deslizante")
    .classList.toggle("menu-deslizante--ativo");
  document.querySelector(".botao-adicionar").classList.toggle("apaga-botao");
  document.querySelector("[data-itensCheck]").innerHTML = "";
  document.querySelector("[data-inputChecar]").value = "";
});

document.querySelector(".botao-salvar").addEventListener("click", () => {
  const temMensagem = document.getElementById("mensagem");
  const areaDeAviso = document.querySelector(".aviso");

  if (temMensagem.value.length > 0) {
    document
      .querySelector(".menu-deslizante")
      .classList.toggle("menu-deslizante--ativo");

    document.querySelector(".botao-adicionar").classList.toggle("apaga-botao");

    temMensagem.classList.remove("borda-vermelha");
    areaDeAviso.classList.remove("visualiza-aviso");

    pegarDados();
  } else {
    temMensagem.classList.add("borda-vermelha");
    areaDeAviso.classList.add("visualiza-aviso");
  }
});

document.querySelector(".botao-adicionar").addEventListener("click", () => {
  document
    .querySelector(".menu-deslizante")
    .classList.toggle("menu-deslizante--ativo");
  document.querySelector(".botao-adicionar").classList.toggle("apaga-botao");
});

document.querySelector(".lupa").addEventListener("click", () => {
  const campoBuscar = document
    .querySelector(".div-busca")
    .classList.toggle("busca-ativa");
});
document.querySelector(".filtro").addEventListener("blur", () => {
  const campoBuscar = document.querySelector(".div-busca");
  campoBuscar.classList.remove("busca-ativa");
});

criaBancoDeDados();

botaoIncluir();
