const minhaLista = new LinkedList();

 // Função para adicionar um elemento no Inicio
 function adicionarElementoInicio() {
    const descricao = document.getElementById("txtnovaTarefa").value.trim();
    const prioridade = document.getElementById("txtnovaPrioridade").value.trim();

    const novaTarefa = new Tarefa(descricao,prioridade,obterDataAtual(),obterHoraAtual());
    minhaLista.addFirst(novaTarefa);
    console.log(minhaLista.toString());
    //limpar input
    document.getElementById("txtnovaTarefa").value = "";
    document.getElementById("txtnovaPrioridade").value = "";
    document.getElementById("txtnovaTarefa").focus();
    atualizarLista();
 }
 //---------
  function adicionarElementoFinal() {
    const descricao = document.getElementById("txtnovaTarefa").value.trim();
    const prioridade = document.getElementById("txtnovaPrioridade").value.trim();

    const novaTarefa = new Tarefa(descricao,prioridade,obterDataAtual(),obterHoraAtual());
    minhaLista.addLast(novaTarefa);
    console.log(minhaLista.toString());
    //limpar input
    document.getElementById("txtnovaTarefa").value = "";
    document.getElementById("txtnovaPrioridade").value = "";
    document.getElementById("txtnovaTarefa").focus();
    atualizarLista();
  }

  //--------------------------------------------------------------------------------------------
// Função para inserir uma nova tarefa ordenada por prioridade
  function adicionarElementoOrdenado(novaTarefa) {
    if (minhaLista.isEmpty()) {
        minhaLista.addFirst(novaTarefa);
    } else {
        let noAtual = minhaLista.head;
        // Procurar a posição correta para inserção
        while (noAtual && novaTarefa.prioridade >= noAtual.dado.prioridade) {
            noAtual = noAtual.prox;
        }

        if (!noAtual) {
            minhaLista.addLast(novaTarefa);  // Adiciona ao final se não encontrou um nó com prioridade menor
        } else if (noAtual === minhaLista.head) {
            minhaLista.addFirst(novaTarefa); // Adiciona ao início se a prioridade é menor que todas
        } else {
            let novoNo = new No(novaTarefa);
            novoNo.ant = noAtual.ant;
            novoNo.prox = noAtual;
            noAtual.ant.prox = novoNo;
            noAtual.ant = novoNo;
            minhaLista.length++;
        }
    }
}


// Função para mostrar a tarefa do início sem removê-la
/*function mostrarElementoInicio() {
  if (!minhaLista.isEmpty()) {
      const tarefa = minhaLista.getFirst();
      alert(`Primeira tarefa: ${tarefa.toString()}`);
  } else {
      alert("Lista de Tarefas Vazia");
  }
}*/

// Função para remover a tarefa do início e mostrar o tempo para concluí-la
function concluirTarefa() {
  if (minhaLista.isEmpty()) {
    alert("Lista de Tarefas Vazia");
    return;
  }

  // Procurar o nó com a maior prioridade
  let tarefaMaiorPrioridade = minhaLista.head;
  for (let noAtual = minhaLista.head; noAtual !== null; noAtual = noAtual.prox) {
    if (noAtual.dado.prioridade < tarefaMaiorPrioridade.dado.prioridade) {
      tarefaMaiorPrioridade = noAtual;
    }
  }

  // Remover a tarefa de maior prioridade
  const tarefaRealizada = tarefaMaiorPrioridade.dado;

  if (tarefaMaiorPrioridade === minhaLista.head) {
    minhaLista.removeFirst();
  } else if (tarefaMaiorPrioridade === minhaLista.tail) {
    minhaLista.removeLast();
  } else {
    tarefaMaiorPrioridade.ant.prox = tarefaMaiorPrioridade.prox;
    tarefaMaiorPrioridade.prox.ant = tarefaMaiorPrioridade.ant;
    minhaLista.length--;
  }

  // Calcular o tempo para concluir a tarefa
  const diferencaDias = calcularDiferencaDias(tarefaRealizada.data, obterDataAtual());
  const diferencaHoras = calcularDiferencaHoras(tarefaRealizada.hora, obterHoraAtual());

  mostrarMensagemRemocao(tarefaRealizada);
  alert(`Tempo para concluir: ${diferencaDias} dias, ${diferencaHoras}`);
  atualizarLista();
}

// Função para mostrar a tarefa que está há mais tempo na lista
function mostrarTarefaMaisAntiga() {
  if (!minhaLista.isEmpty()) {
      let tarefaMaisAntiga = minhaLista.getFirst();
      for (const tarefa of minhaLista) {
          tarefaMaisAntiga = comparaTarefasDataHora(tarefaMaisAntiga, tarefa);
      }
      alert(`Tarefa mais antiga: ${tarefaMaisAntiga.toString()}`);
  } else {
      alert("Lista de Tarefas Vazia");
  }
}

 
//--------------------------------------------------------------------------------------------
 // Função para remover o primeiro elemento da lista
 function removerElementoInicio() {
    if(!minhaLista.isEmpty()){
      const tarefaRealizada = minhaLista.removeFirst();
      mostrarMensagemRemocao(tarefaRealizada);
      atualizarLista();
    }
    else{
      alert("Lista de Tarefas Vazia");
    }
   
 }
 //--------------------------------------------------------------------------------------------
 // Função para remover o ultimo elemento da lista
 function removerElementoFinal() {
  if(!minhaLista.isEmpty()){
    const tarefaRealizada = minhaLista.removeLast();
    mostrarMensagemRemocao(tarefaRealizada);
    atualizarLista();
  }
  else{
    alert("Lista de Tarefas Vazia");
  }
}

//--------------------------------------------------------------------------------------------
function mostrarMensagemRemocao(tarefaRealizada) {
    const mensagem = document.getElementById("mensagem-remocao");
    mensagem.innerHTML ="Tarefa realizada: "+ tarefaRealizada.descricao;
    mensagem.style.display = "block";
  }
//-------------------------------------------------------------------------------------------- 
// Função para atualizar a exibição da fila
 function atualizarLista() {
   const listaTarefas = 
       document.getElementById("list_listadeTarefas");
   const lblTarefas = 
          document.getElementById("lblmostraTarefas");
   listaTarefas.innerHTML = "";    // limpar antes de mostrar
   
   if(!minhaLista.isEmpty()){
      lblTarefas.innerHTML = "Lista de Tarefas";
       // limpar antes de mostrar
       
       const arrayTarefas = [...minhaLista];
       arrayTarefas.sort((a, b) => a.prioridade - b.prioridade);

      for(const tarefa of arrayTarefas){
          const novaLinha = document.createElement("li");
          novaLinha.innerHTML = tarefa.toString();
          listaTarefas.appendChild(novaLinha);
      }
   }
   else{
        lblTarefas.innerHTML = "Lista de Tarefas Vazia";
      }
      
 }
 //--------------------------------------------------------------------------------------------
  //FUNÇÕES COMPLEMENTARES PARA A APLICAÇÃO
 //-----------------------------------------
 
 // funcao data
 function obterDataAtual() {
    let dataAtual = new Date();
    let dia = dataAtual.getDate();
    let mes = dataAtual.getMonth() + 1; // Adiciona 1 porque o mês inicia do zero
    let ano = dataAtual.getFullYear();
    // Formata a data como "dd/mm/aaaa"
    let dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
    return dataFormatada;
}
//--------------------------------------------------------------------------------------------
function obterHoraAtual() {
  const data = new Date();
  const hora = data.getHours().toString().padStart(2, '0');
  const minuto = data.getMinutes().toString().padStart(2, '0');
  const segundo = data.getSeconds().toString().padStart(2, '0');
  return `${hora}:${minuto}:${segundo}`;
}
//--------------------------------------------------------------------------------------------
function calcularDiferencaHoras(hora1, hora2) {
  const [h1, m1, s1] = hora1.split(':').map(Number);
  const [h2, m2, s2] = hora2.split(':').map(Number);
  
  const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);
  
  const horas = Math.floor(diferencaSegundos / 3600);
  const minutos = Math.floor((diferencaSegundos % 3600) / 60);
  const segundos = diferencaSegundos % 60;
  
  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}
//--------------------------------------------------------------------------------------------
function calcularDiferencaDias(dataInicial, dataFinal) {
  // Converte as datas em milissegundos
  const msPorDia = 24 * 60 * 60 * 1000; // Quantidade de milissegundos em um dia
  const [diaIni, mesIni, anoIni] = dataInicial.split('/').map(Number);
  const [diaFim, mesFim, anoFim] = dataFinal.split('/').map(Number);
  // Cria objetos Date com as datas fornecidas
  const dataIni = new Date(anoIni, mesIni - 1, diaIni); // Subtrai 1 do mês porque o mês inicia do zero
  const dataFim = new Date(anoFim, mesFim - 1, diaFim);
  // Calcula a diferença em milissegundos entre as duas datas
  const diferencaMs = dataFim - dataIni;
  // Converte a diferença de milissegundos para dias e arredonda para baixo
  const diferencaDias = Math.floor(diferencaMs / msPorDia);
  return diferencaDias;
}
//--------------------------------------------------------------------------------------------
function converterDataFormatoISO8601(data) {
  const partes = data.split('/');
  const dia = partes[0].padStart(2, '0');
  const mes = partes[1].padStart(2, '0');
  const ano = partes[2];
  return `${ano}-${mes}-${dia}`;
}
//--------------------------------------------------------------------------------------------
function comparaTarefasDataHora(tarefa1, tarefa2) {
  const dataHoraTarefa1 = new Date(`${converterDataFormatoISO8601(tarefa1.data)}T${tarefa1.hora}`);
  const dataHoraTarefa2 = new Date(`${converterDataFormatoISO8601(tarefa2.data)}T${tarefa2.hora}`);
  if (dataHoraTarefa1.getTime() < dataHoraTarefa2.getTime()) {
    return tarefa1;
  } else {
    return tarefa2;
  }
}
//--------------------------------------------------------------------------------------------
function saveLinkedListToLocalStorage() {
  console.log("saveLinkedListToLocalStorage");
  let listaParaSalvar = [];
  for(const item of minhaLista){
      listaParaSalvar.push({
          _descricao: item.descricao,
          _prioridade: item.prioridade,
          _data: item.data,
          _hora: item.hora
      });
      console.log(item.toString());
  };
  let jsonStr = JSON.stringify(listaParaSalvar);
  console.log(jsonStr);
  localStorage.setItem('myLinkedList', jsonStr);
  alert("Lista salva com sucesso!");
}
//-----------------------------
function loadLinkedListFromLocalStorage() {
  console.log("loadLinkedListFromLocalStorage");
  let jsonStr = localStorage.getItem('myLinkedList');
  if (jsonStr) {
      let listaCarregada = JSON.parse(jsonStr);
      for (let i = 0; i < listaCarregada.length; i++) {
          let obj = listaCarregada[i];
          let novaTarefa = new Tarefa(obj._descricao, obj._prioridade, obj._data, obj._hora);
          console.log(novaTarefa.toString());
          minhaLista.addLast(novaTarefa);
      }
      atualizarLista();
      alert("Lista carregada com sucesso!");
  }
}
//----------  ----------------------------------------------------------------------------------
