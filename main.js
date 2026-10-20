const calendario = document.getElementById("calendario");
const mesAtual = document.getElementById("mes-atual");
const listaAniversarios = document.getElementById("lista-aniversarios");

const botaoAnterior = document.getElementById("mes-anterior");
const botaoProximo = document.getElementById("proximo-mes");

const modal = document.getElementById("modal-aniversario");
const fecharModal = document.getElementById("fechar-modal");
const nomeAniversariante = document.getElementById("nome-aniversariante");
const confetes = document.getElementById("confetes");

const meses = [
"Janeiro",
"Fevereiro",
"Março",
"Abril",
"Maio",
"Junho",
"Julho",
"Agosto",
"Setembro",
"Outubro",
"Novembro",
"Dezembro"
];

const aniversarios = [
{
nome: "Lara",
dia: 24,
mes: 7
},
{
nome: "Laura",
dia: 25,
mes: 8
},
{
nome: "Samuel",
dia: 9,
mes: 11
},
{
nome: "Miguel",
dia: 5,
mes: 7
},
{
nome: "Artur Amarante",
dia: 1,
mes: 9
},
{
nome: "Fernando",
dia: 2,
mes: 8
},
{
nome: "Thiago Flexa",
dia: 1,
mes: 5
},
{
nome: "Arthur Pirondi",
dia: 4,
mes: 4
},
{
nome: "Vanessa",
dia: 22,
mes: 3
},
{
nome: "Jeancarlo",
dia: 2,
mes: 9
},
{
nome: "Alan",
dia: 8,
mes: 0
},
{
nome: "Erick",
dia: 5,
mes: 8
},
{
nome: "Bernardo",
dia: 25,
mes: 2
},
{
nome: "Gabrielle",
dia: 21,
mes: 4
},
{
nome: "Antony",
dia: 21,
mes: 11
},
{
nome: "Kauan",
dia: 15,
mes: 3
},
{
nome: "Guilherme",
dia: 23,
mes: 0
},
{
nome: "Eduardo",
dia: 18,
mes: 4
},
{
nome: "Yago",
dia: 12,
mes: 1
},
{
nome: "Gabriel Vieira",
dia: 22,
mes: 4
},
{
nome: "Vinicius",
dia: 27,
mes: 8
},
{
nome: "Henrique",
dia: 25,
mes: 9
},
{
nome: "Nicolas Alves",
dia: 27,
mes: 1
},
{
nome: "Maria Luiza",
dia: 1,
mes: 8
},
{
nome: "Natália",
dia: 22,
mes: 8
},
{
nome: "Nicolas Oliveira",
dia: 24,
mes: 7
},
{
nome: "Mateus",
dia: 16,
mes: 9
},
{
nome: "Gustavo",
dia: 15,
mes: 4
},
{
nome: "Gabriel Bentaqui",
dia: 6,
mes: 7
},
{
nome: "Nicolas Marques",
dia: 23,
mes: 5
},
{
nome: "Enzo",
dia: 6,
mes: 11
},
{
nome: "Luíza",
dia: 30,
mes: 10
},
{
nome: "Dafeni",
dia: 29,
mes: 8
},
{
nome: "Manuela",
dia: 29,
mes: 5
},
{
nome: "Maria Eduarda",
dia: 18,
mes: 10
},
{
nome: "Letícia",
dia: 8,
mes: 11
},



];

let mesSelecionado = new Date().getMonth();
let anoSelecionado = new Date().getFullYear();

function criarCalendario() {


calendario.innerHTML = "";

mesAtual.textContent = meses[mesSelecionado];

const primeiroDia = new Date(
    anoSelecionado,
    mesSelecionado,
    1
).getDay();

const quantidadeDias = new Date(
    anoSelecionado,
    mesSelecionado + 1,
    0
).getDate();

for (let i = 0; i < primeiroDia; i++) {

    const diaVazio = document.createElement("div");

    diaVazio.classList.add(
        "dia",
        "vazio"
    );

    calendario.appendChild(diaVazio);
}

for (let dia = 1; dia <= quantidadeDias; dia++) {

    const elementoDia = document.createElement("div");

    elementoDia.classList.add("dia");

    const numero = document.createElement("span");

    numero.classList.add("dia-numero");

    numero.textContent = dia;

    elementoDia.appendChild(numero);

    const aniversariantes = aniversarios.filter(
        pessoa =>
            pessoa.dia === dia &&
            pessoa.mes === mesSelecionado
    );

    if (aniversariantes.length > 0) {

        elementoDia.classList.add(
            "aniversario"
        );

        const icone = document.createElement("span");

        icone.classList.add(
            "aniversario-icone"
        );

        icone.textContent = "🎂";

        elementoDia.appendChild(icone);

        const nomes = document.createElement("span");

        nomes.classList.add(
            "nome-aniversariante"
        );

        nomes.textContent = aniversariantes
            .map(pessoa => pessoa.nome)
            .join(", ");

        elementoDia.appendChild(nomes);

        elementoDia.addEventListener(
            "click",
            () => abrirAniversario(aniversariantes)
        );
    }

    verificarDiaAtual(
        elementoDia,
        dia
    );

    calendario.appendChild(
        elementoDia
    );
}

mostrarAniversarios();


}

function verificarDiaAtual(elemento, dia) {


const hoje = new Date();

if (
    dia === hoje.getDate() &&
    mesSelecionado === hoje.getMonth() &&
    anoSelecionado === hoje.getFullYear()
) {
    elemento.classList.add("hoje");
}


}

function mostrarAniversarios() {


listaAniversarios.innerHTML = "";

const aniversariantesDoMes = aniversarios
    .filter(
        pessoa =>
            pessoa.mes === mesSelecionado
    )
    .sort(
        (a, b) =>
            a.dia - b.dia
    );

if (aniversariantesDoMes.length === 0) {

    const mensagem =
        document.createElement("p");

    mensagem.classList.add(
        "sem-aniversarios"
    );

    mensagem.textContent =
        "Nenhum aniversário este mês.";

    listaAniversarios.appendChild(
        mensagem
    );

    return;
}

aniversariantesDoMes.forEach(
    pessoa => {

        const item =
            document.createElement("div");

        item.classList.add(
            "aniversariante"
        );

        const icone =
            document.createElement("div");

        icone.classList.add(
            "icone"
        );

        icone.textContent =
            pessoa.nome
                .charAt(0)
                .toUpperCase();

        const informacoes =
            document.createElement("div");

        const nome =
            document.createElement("strong");

        nome.textContent =
            pessoa.nome;

        const data =
            document.createElement("small");

        data.textContent =
            `${pessoa.dia} de ${meses[pessoa.mes]}`;

        informacoes.appendChild(nome);
        informacoes.appendChild(data);

        item.appendChild(icone);
        item.appendChild(informacoes);

        listaAniversarios.appendChild(item);
    }
);


}

function abrirAniversario(aniversariantes) {


const nomes = aniversariantes
    .map(pessoa => pessoa.nome)
    .join(" e ");

nomeAniversariante.textContent =
    `Feliz aniversário, ${nomes}!`;

modal.classList.add("ativo");

criarConfetes();


}

function fecharAniversario() {


modal.classList.remove("ativo");

confetes.innerHTML = "";


}

fecharModal.addEventListener(
"click",
fecharAniversario
);

modal.addEventListener(
"click",
event => {


    if (event.target === modal) {
        fecharAniversario();
    }
}


);

botaoAnterior.addEventListener(
"click",
() => {


    mesSelecionado--;

    if (mesSelecionado < 0) {
        mesSelecionado = 11;
        anoSelecionado--;
    }

    criarCalendario();
}

);

botaoProximo.addEventListener(
"click",
() => {


    mesSelecionado++;

    if (mesSelecionado > 11) {
        mesSelecionado = 0;
        anoSelecionado++;
    }

    criarCalendario();
}


);

function criarConfetes() {


confetes.innerHTML = "";

const cores = [
    "#00e5ff",
    "#7c4dff",
    "#ff2bd6",
    "#ff7a00",
    "#2ed573"
];

const formas = [
    "quadrado",
    "redondo",
    "estrela"
];

for (let i = 0; i < 120; i++) {

    const confete =
        document.createElement("div");

    confete.classList.add("confete");

    const forma =
        formas[
            Math.floor(
                Math.random() * formas.length
            )
        ];

    const cor =
        cores[
            Math.floor(
                Math.random() * cores.length
            )
        ];

    confete.style.left =
        Math.random() * 100 + "%";

    confete.style.animationDuration =
        Math.random() * 3 + 2 + "s";

    confete.style.animationDelay =
        Math.random() * 1.5 + "s";

    confete.style.transform =
        `rotate(${Math.random() * 360}deg)`;

    if (forma === "redondo") {
        confete.style.borderRadius = "50%";
    }

    if (forma === "estrela") {

        confete.textContent = "✦";

        confete.style.width = "auto";
        confete.style.height = "auto";
        confete.style.background = "transparent";
        confete.style.color = cor;
        confete.style.fontSize = "14px";

    } else {

        confete.style.background = cor;
    }

    confetes.appendChild(confete);
}


}

function verificarAniversarioDeHoje() {

const hoje = new Date();

const aniversariantes =
    aniversarios.filter(
        pessoa =>
            pessoa.dia === hoje.getDate() &&
            pessoa.mes === hoje.getMonth()
    );

if (aniversariantes.length > 0) {
    abrirAniversario(aniversariantes);
}


}

criarCalendario();

verificarAniversarioDeHoje();
