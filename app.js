// Conectar ao Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDl6N3XUYxxmXA2RUADrxSpnfkQNXrxyeQ",
  authDomain: "lava-jato-2c558.firebaseapp.com",
  projectId: "lava-jato-2c558",
  storageBucket: "lava-jato-2c558.appspot.com",
  messagingSenderId: "1022255063781",
  appId: "1:1022255063781:web:104d21506d5ec7d47f2a0c",
  measurementId: "G-GHWQ8H3C1E",
};
firebase.initializeApp(firebaseConfig);

// Referência ao banco de dados
var dbRef = firebase.database().ref("registros");

// Manipulação do formulário
document
  .getElementById("crud-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var whatsapp = document.getElementById("whatsapp").value;
    var instagram = document.getElementById("instagram").value;
    var endereco = document.getElementById("endereco").value;
    var veiculo1 = document.getElementById("veiculo1").value;
    var placa = document.getElementById("placa").value;
    var veiculo2 = document.getElementById("veiculo2").value;
    var placa2 = document.getElementById("placa2").value;

    // Adicionar um novo registro ao banco de dados
    dbRef.push({
      nome: nome,
      email: email,
      whatsapp: whatsapp,
      instagram: instagram,
      endereco: endereco,
      veiculo1: veiculo1,
      placa: placa,
      veiculo3: veiculo2,
      placa2: placa2,
    });

    // Limpar o formulário
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("whatsapp").value = "";
    document.getElementById("instagram").value = "";
    document.getElementById("endereco").value = "";
    document.getElementById("veiculo1").value = "";
    document.getElementById("placa").value = "";
    document.getElementById("veiculo2").value = "";
    document.getElementById("placa2").value = "";
  });

// Função para exibir os registros na tabela
function exibirRegistros() {
  dbRef.on("child_added", function (snapshot) {
    var registro = snapshot.val();
    var linha = criarLinhaTabela(snapshot.key, registro);
    document.getElementById("tabela-corpo").innerHTML += linha;
  });
}

// Função para criar a linha da tabela com um registro
function criarLinhaTabela(chave, registro) {
  var linha = `
          <tr data-key="${chave}" onclick="abrirModalDetalhes('${chave}')">
            <td data-column="nome">${registro.nome}</td>
            <td data-column="email">${registro.email}</td>
            <td data-column="whatsapp">${registro.whatsapp}</td>
            <td data-column="instagram">${registro.instagram}</td>
            <td data-column="endereco">${registro.endereco}</td>
            <td data-column="veiculo1">${registro.veiculo1}</td>
            <td data-column="placa">${registro.placa}</td>
            <td data-column="veiculo2">${registro.veiculo3}</td>
            <td data-column="placa2">${registro.placa2}</td>
          </tr>`;
  return linha;
}

// Função para pesquisar um usuário
function pesquisarUsuario() {
  const termoPesquisa = document
    .getElementById("campo-pesquisa")
    .value.toLowerCase();
  const linhas = document.querySelectorAll("#tabela-corpo tr");

  linhas.forEach(function (linha) {
    const colunaNome = linha.querySelector("td:first-child");
    if (colunaNome) {
      const textoNome = colunaNome.textContent.toLowerCase();
      linha.style.display = textoNome.includes(termoPesquisa) ? "" : "none";
    }
  });

  //   const linhas2 = document.querySelectorAll("#tabela-corpo tr");

  //   linhas2.forEach(function (linha) {
  //     const terceiraCelula = linha.querySelector("td:nth-child(3)");
  //     if (terceiraCelula) {
  //       const textoNome = terceiraCelula.textContent.toLowerCase();
  //       linha.style.display = textoNome.includes(termoPesquisa) ? "" : "none";
  //     }
  //   });
}

// Função para abrir modal com detalhes e CRUD do registro
function abrirModalDetalhes(chave) {
  var registro = dbRef.child(chave);

  registro.once("value").then(function (snapshot) {
    var detalhes = snapshot.val();

    var modal = document.getElementById("registroModal");

    // Obtém os valores dos objetos
    var nome = detalhes.nome;
    var email = detalhes.email;
    var whatsapp = detalhes.whatsapp;
    var instagram = detalhes.instagram;
    var endereco = detalhes.endereco;
    var veiculo1 = detalhes.veiculo1;
    var placa = detalhes.placa;
    var veiculo2 = detalhes.veiculo2;
    var placa2 = detalhes.placa2;
    var submitButton = document.getElementById("submit-edit");
    var excluirButton = document.getElementById("excluir-edit");
    var cancel = document.getElementById("cancel-edit");

    // Preenche os campos do formulário
    document.getElementById("nome-edit").value = nome;
    document.getElementById("email-edit").value = email;
    document.getElementById("whatsapp-edit").value = whatsapp;
    document.getElementById("instagram-edit").value = instagram;
    document.getElementById("endereco-edit").value = endereco;
    document.getElementById("veiculo1-edit").value = veiculo1;
    document.getElementById("placa-edit").value = placa;
    document.getElementById("veiculo2-edit").value = veiculo2;
    document.getElementById("placa2-edit").value = placa2;

    // Cria os botões de submit

    cancel.onclick = function () {
      fecharModal();
    };

    submitButton.type = "submit";

    submitButton.onclick = function () {
      // Atualiza os dados do registro
      var nome = document.getElementById("nome-edit").value;
      var email = document.getElementById("email-edit").value;
      var whatsapp = document.getElementById("whatsapp-edit").value;
      var instagram = document.getElementById("instagram-edit").value;
      var endereco = document.getElementById("endereco-edit").value;
      var veiculo1 = document.getElementById("veiculo1-edit").value;
      var placa = document.getElementById("placa-edit").value;
      var veiculo2 = document.getElementById("veiculo2-edit").value;
      var placa2 = document.getElementById("placa2-edit").value;

      registro.update({
        nome: nome,
        email: email,
        whatsapp: whatsapp,
        instagram: instagram,
        endereco: endereco,
        veiculo1: veiculo1,
        placa: placa,
        veiculo2: veiculo2,
        placa2: placa2,
      });

      // Fecha o modal
      modal.style.display = "none";
    };

    excluirButton.onclick = function () {
      confirmarExclusao(chave);
      //modal.style.display = "none";
    };
    // Mostra o modal
    modal.style.display = "block";
  });
}

function confirmarExclusao(chave) {
  const confirmaModal = document.querySelector(".modal-confirmacao-exclusao");
  var modal = document.getElementById("registroModal");

  confirmaModal.style.display = "block";

  document.getElementById("confirmar").onclick = function () {
    excluirRegistro(chave);
    confirmaModal.style.display = "none";
    modal.style.display = "none";
  };

  document.getElementById("cancelar").onclick = function () {
    confirmaModal.style.display = "none";
    // modal.style.display = "none";
  };
}

// Função para atualizar um registro
function atualizarRegistro(chave) {
  var registro = dbRef.child(chave);

  var nome = document.getElementById("nome").value;
  var email = document.getElementById("email").value;
  var whatsapp = document.getElementById("whatsapp").value;
  var instagram = document.getElementById("instagram").value;
  var endereco = document.getElementById("endereco").value;
  var veiculo1 = document.getElementById("veiculo1").value;
  var placa = document.getElementById("placa").value;
  var veiculo2 = document.getElementById("veiculo2").value;
  var placa2 = document.getElementById("placa2").value;

  var atualizacao = {
    nome: nome,
    email: email,
    whatsapp: whatsapp,
    instagram: instagram,
    endereco: endereco,
    veiculo1: veiculo1,
    placa: placa,
    veiculo2: veiculo2,
    placa: placa2,
  };

  // Atualizar os dados do registro no banco de dados
  registro.update(atualizacao).then(() => {
    // Limpar o formulário e fechar o modal de edição
    // limparFormulario();
    // fecharModal();
  });
}

function adicionarRegistro() {
  var whatsapp = document.getElementById("whatsapp").value;

  // Verificar se o número de WhatsApp já existe em algum registro
  dbRef
    .orderByChild("whatsapp")
    .equalTo(whatsapp)
    .once("value")
    .then(function (snapshot) {
      if (snapshot.exists()) {
        alert("Esse número de WhatsApp já está cadastrado.");
      } else {
        // Se o número não existe, proceda com a adição do registro
        var nome = document.getElementById("nome").value;
        var email = document.getElementById("email").value;
        var instagram = document.getElementById("instagram").value;
        var endereco = document.getElementById("endereco").value;
        var veiculo1 = document.getElementById("veiculo1").value;
        var placa = document.getElementById("placa").value;
        var veiculo2 = document.getElementById("veiculo2").value;
        var placa2 = document.getElementById("placa2").value;

        // Adicionar um novo registro ao banco de dados
        dbRef.push({
          nome: nome,
          email: email,
          whatsapp: whatsapp,
          instagram: instagram,
          endereco: endereco,
          veiculo1: veiculo1,
          placa: placa,
          veiculo2: veiculo2,
          placa2: placa2,
        });

        // Limpar o formulário
        limparFormulario();
      }
    });
}

// Função para limpar o formulário de edição
function limparFormulario() {
  document.getElementById("crud-form").reset();
  var submitButton = document.querySelector("#crud-form button[type='submit']");
  submitButton.textContent = "Adicionar";
  submitButton.onclick = function () {
    adicionarRegistro();
  };
}

// Função para abrir o modal de edição
function abrirModalEdicao() {
  var modal = document.getElementById("registroModal");
  modal.style.display = "block";
}

function fecharModal() {
  var modal = document.getElementById("registroModal");
  modal.style.display = "none";
}

// Função para excluir um registro
function excluirRegistro(chave) {
  console.log("excluirRegistro");
  if (chave) {
    dbRef.child(chave).remove();
    var linhaParaRemover = document.querySelector(
      "tr[data-key='" + chave + "']"
    );
    if (linhaParaRemover) {
      linhaParaRemover.remove();
    }
  }
}

// Exibir registros ao carregar a página
window.onload = function () {
  exibirRegistros();
};
