let listaFilme= [];
let oQueEstaFazendo = '';
let filme= null;
bloquearAtributos(true);
function procurePorChavePrimaria(chave) {
   for (let i = 0; i < listaFilme.length; i++) {
   const filme = listaFilme[i];

   if (filme.id== chave) {

filme.posicaoNaLista = i;

   return listaFilme[i];
  }
  }
  return null;
  }

function procure() {
  const id = document.getElementById("inputid").value;

  if (isNaN(id) || !Number.isInteger(Number(id))) {

  mostrarAviso("Precisa ser um número inteiro");
  document.getElementById("inputid").focus();
  return;
  }

  if(id) {
filme = procurePorChavePrimaria(id)

  if (filme) {
    mostrarDadosFilme(filme)
    visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none');
    mostrarAviso("Achou na lista, pode alterar ou excluir");
    } else {
    limparAtributos();
    visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
    mostrarAviso("Não achou na lista, pode inserir");
    }
    } else {
    document.getElementById("inputid").focus();
    return;
   }
   }

function inserir() {

bloquearAtributos(false);
visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
oQueEstaFazendo = 'inserindo';
mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
document.getElementById("inputid").focus();

}

function alterar() {

   bloquearAtributos(false);

   visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
   oQueEstaFazendo = 'alterando';
   mostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");
}

function excluir() {
  bloquearAtributos(false);

  visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');

  oQueEstaFazendo = 'excluindo';
  mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");
}

function salvar() {
  let id;
  if (filme == null){
id =  parseInt(document.getElementById("inputid").value);
  } else {
id = filme.id;
  }

const titulo= document.getElementById("inputtitulo").value;
const diretor= document.getElementById("inputdiretor").value;
const datalançamento= document.getElementById("inputdatalançamento").value;
const avaliacao= parseFloat(document.getElementById("inputavaliacao").value);
  if(id && titulo && diretor && datalançamento && avaliacao) {
    switch (oQueEstaFazendo) {
    case 'inserindo':
filme = new Filme(id,titulo,diretor,datalançamento,avaliacao);
listaFilme.push(filme);
mostrarAviso("Inserido na lista");
break;
case 'alterando':
filmeAlterado = new Filme(id,titulo,diretor,datalançamento,avaliacao);
listaFilme[filme.posicaoNaLista] = filmeAlterado;
mostrarAviso("Alterado");
break;
case 'excluindo':
  let novaLista = [];

for (let i = 0; i < listaFilme.length; i++) {

   if(filme.posicaoNaLista != i) {
   novaLista.push(listaFilme[i]);
}
}
listaFilme = novaLista;
mostrarAviso("EXCLUIDO");
break;
default:

mostrarAviso("Erro aleatório");
}
visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
limparAtributos();
listar();
document.getElementById("inputid").focus();
 } else {
 alert("Erro nos dados digitados");
return;
}
}
function preparaListagem(vetor) {
let texto = "";
for (let i = 0; i < vetor.length; i++) {
 const linha = vetor[i];
texto += 
linha.id+" - "+
linha.titulo+" - "+
linha.diretor+" - "+
linha.datalançamento+" - "+
linha.avaliacao+" <br> ";
}
return texto;
}

function listar() {
 document.getElementById("outputSaida").innerHTML = preparaListagem(listaFilme);
}function cancelarOperacao() {
 limparAtributos();
bloquearAtributos(true);
visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
 document.getElementById("divAviso").innerHTML = mensagem;
}

function mostrarDadosFilme(filme){
document.getElementById("inputid").value = filme.id;
document.getElementById("inputtitulo").value = filme.titulo;
document.getElementById("inputdiretor").value = filme.diretor;
document.getElementById("inputdatalançamento").value = filme.datalançamento;
document.getElementById("inputavaliacao").value = filme.avaliacao;
 bloquearAtributos(true);
}function limparAtributos() {
document.getElementById("inputtitulo").value = "";
document.getElementById("inputdiretor").value = "";
document.getElementById("inputdatalançamento").value = "";
document.getElementById("inputavaliacao").value = "";
bloquearAtributos(true);
}
function bloquearAtributos(soLeitura) {
document.getElementById("inputid").readOnly = !soLeitura;
document.getElementById("inputtitulo").readOnly = soLeitura;
document.getElementById("inputdiretor").readOnly = soLeitura;
document.getElementById("inputdatalançamento").readOnly = soLeitura;
document.getElementById("inputavaliacao").readOnly = soLeitura;
}

function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
document.getElementById("btProcure").style.display = btProcure;
document.getElementById("btInserir").style.display = btInserir;
document.getElementById("btAlterar").style.display = btAlterar;
document.getElementById("btExcluir").style.display = btExcluir;
document.getElementById("btSalvar").style.display = btSalvar;
document.getElementById("btCancelar").style.display = btSalvar;
document.getElementById("inputid").focus();
}

function persistirEmLocalPermanente(arquivoDestino, conteudo) {
const blob = new Blob([conteudo], { type: 'text/plain' });
 const link = document.createElement('a');
 link.href = URL.createObjectURL(blob);
 link.download = arquivoDestino;
link.click(); 
 URL.revokeObjectURL(link.href);
}

function abrirArquivoSalvoEmLocalPermanente() {
const input = document.createElement('input');
 input.type = 'file';
 input.accept = '.csv';
input.onchange = function (event) {
const arquivo = event.target.files[0];
console.log(arquivo.name);
 if (arquivo) {
  converterDeCSVparaListaObjeto(arquivo);
}
};
input.click();
}

function prepararESalvarCSV() {
  let nomeDoArquivoDestino = "./Filme.csv";
let textoCSV = "";
for (let i = 0; i < listaFilme.length; i++) {
const linha = listaFilme[i];
textoCSV += linha.id+";"+
linha.titulo+";"+
linha.diretor+";"+
linha.datalançamento+";"+
linha.avaliacao+"\n";
}
 persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
}
function converterDeCSVparaListaObjeto(arquivo) {
 const leitor = new FileReader();
leitor.onload = function (e) {
    const conteudo = e.target.result;
  const linhas = conteudo.split('\n');
 listaFilme =[];
 for (let i = 0; i < linhas.length; i++) {
const linha = linhas[i].trim();
 if (linha) {
const dados = linha.split(';');
 if (dados.length ===5) {
listaFilme.push({
id: dados[0],
titulo: dados[1],
diretor: dados[2],
datalançamento: dados[3],
avaliacao: dados[4]
});
}
}
}
 listar();
};
leitor.readAsText(arquivo);
}

function FiltroAvaliaçao() {
   let lista="";
   for (let i = 0; i < listaFilme.length; i++) {
    let linha= listaFilme[i];
    if(parseFloat(linha.avaliacao)>=8){
        lista+=
        linha.id+" - "+
linha.titulo+" - "+
linha.diretor+" - "+
linha.datalançamento+" - "+
linha.avaliacao+" <br> ";
    }
    
   }
   document.getElementById("outputSaida2").innerHTML = lista
}