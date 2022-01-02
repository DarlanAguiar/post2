import { montaCheckList } from "./monta-check.js";
import { removerItem } from "./index2.js";
import { editaTudo } from "./edita-card.js";

export function criarCard(
  titulo,
  conteudo,
  cursor,
  itensChecados,
  data,
  dataEdicao
) {
  let checkList = montaCheckList(itensChecados);

  let div = document.createElement("div");
  div.classList.add("post-it");

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
  h4titulo.setAttribute("contenteditable", true);
  h4titulo.addEventListener("blur", (e) => {
    let filho = e.target.parentNode;
    let alvoPai = filho.parentNode;

    editaTudo(alvoPai);
  });

  let pConteudo = document.createElement("p");
  pConteudo.classList.add("texto");
  pConteudo.classList.add("filtrar");
  pConteudo.textContent = conteudo;
  pConteudo.setAttribute("data-id", cursor.value.id);
  pConteudo.setAttribute("contenteditable", true);
  pConteudo.addEventListener("blur", (e) => {
    let filho = e.target.parentNode;
    let alvoPai = filho.parentNode;

    editaTudo(alvoPai);
  });

  let pData = document.createElement("p");
  pData.classList.add("data-card");
  pData.setAttribute("contenteditable", true);
  pData.addEventListener("blur", (e) => {
    let filho = e.target.parentNode;
    let alvoPai = filho.parentNode;

    editaTudo(filho);
  });

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

  div.appendChild(pDataEdicao);

  return div;
}

const esmaecerItem = (evento) => {
  const paiDoAlvo = evento.target.parentNode;
  const voDoalvo = paiDoAlvo.parentNode;

  voDoalvo.classList.add("esmaecer");
};

export const adiocionaErroNaData = (alvo) => {
  const textoDeErro = document.createElement("p");
  textoDeErro.classList.add("texto-erro-data");
  textoDeErro.textContent = "Formato aceito 01-01-2001";

  const local = alvo.querySelector(".card-div-checar");

  const mudaCoraParaVermelho = alvo.querySelector(".data-card");
  mudaCoraParaVermelho.classList.add("texto-vermelho");
  
  local.appendChild(textoDeErro);
};
