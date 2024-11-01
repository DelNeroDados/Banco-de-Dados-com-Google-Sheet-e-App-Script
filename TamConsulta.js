function doGet() {
    return HtmlService.createHtmlOutputFromFile('Index');
  }
  
  function onOpen() {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('Consulta de Estoque')
      .addItem('Abrir Consulta', 'mostrarConsulta')
      .addToUi();
  }
  
  function mostrarConsulta() {
    const html = HtmlService.createHtmlOutputFromFile('ConsultaProduto')
        .setWidth(400)
        .setHeight(300);
    SpreadsheetApp.getUi().showModalDialog(html, 'Consulta de Estoque');
  }

// Função para obter todos os nomes de produtos exclusivos de todas as abas da planilha
function obterNomesProdutos() {
  const spreadsheetId = 'ID_AQUI';
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheets = spreadsheet.getSheets();
  const nomesProdutos = new Set();

  sheets.forEach(sheet => {
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      const nomeProduto = data[i][3]; // Coluna 3, onde o nome do produto está
      if (nomeProduto) {
        nomesProdutos.add(nomeProduto); // Adiciona ao Set para evitar duplicatas
      }
    }
  });

  return Array.from(nomesProdutos); // Retorna como array
}

// Função para obter datas de fabricação únicas para um produto específico
function obterDatasFabricao(nomeProduto) {
  const spreadsheetId = 'ID_AQUI';
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheets = spreadsheet.getSheets();
  const datasFabricao = new Set();
  sheets.forEach(sheet => {
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        // Confere o nome do produto na coluna 3 e se é igual ao nome pesquisado
        if (data[i][3] && data[i][3].toLowerCase() === nomeProduto.toLowerCase()) {
          const dataFabricao = data[i][2]; // Coluna 2 (confirme se é a coluna de data)
          if (dataFabricao) {
            datasFabricao.add(String(dataFabricao)); // Mantém como texto
          }
        }
      }
  });

  return Array.from(datasFabricao); // Retorna array de datas únicas
}

// Função para buscar informações do produto pelo nome e data de fabricação
function buscarProdutoPorNome(nomeProduto, dataFabricao) {
  const spreadsheetId = 'ID_AQUI';
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheets = spreadsheet.getSheets();
  let resultadoHTML = '';

  sheets.forEach(sheet => {
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      // Compara nome e data de fabricação
      if (data[i][3] && data[i][3].toLowerCase() === nomeProduto.toLowerCase() && data[i][2].toString() === dataFabricao) {
        // Construa HTML com informações detalhadas do produto
        resultadoHTML += `
          <div class="tabelas">
              <div class="img">
                  <img class="img1" src="" width="100%">
                  <h1>INSIRA O CABEÇALHO AQUI</h1>
              </div>
              <h1 class="cabecalho">RESULTADO DAS ANÁLISES</h1>
  
              <table class="titulo">
                  <tr>
                      <td class="col">PRODUTO:</td>
                      <td class="ptitulo">${data[i][3]}</td>
                  </tr>
                  <tr>
                      <td class="col">DATA DE FABRICAÇÃO:</td>
                      <td class="ptitulo">${data[i][2]}</td>
                  </tr>
                  <tr>
                      <td class="col">DATA DA ANÁLISE:</td>
                      <td class="ptitulo">${data[i][1]}</td>
                  </tr>
                  <tr>
                      <td class="col">LOTE:</td>
                      <td class="ptitulo">${data[i][5]}</td>
                  </tr>
                  <tr>
                      <td class="col">QUANTIDADE:</td>
                      <td class="ptitulo">${data[i][8]}</td>
                  </tr>
              </table>
              <br>
              <h3>CARACTERÍSITCAS ANALISADAS</h3>
              <table class="parametro">
                  <tr>
                      <td class="cab"></td> 
                      <td class="cab">PARAMETROS</td>
                      <td class="cab">RESULTADOS</td>
                      <td class="cab">VARIABILIDADE</td>
                  </tr>
                  <tr>
                      <td class="col">TEMPERATURA:</td>
                      <td></td>
                      <td></td>
                      <td>${data[i][7]}</td>
                  </tr>
                  <tr>
                      <td class="col">ASPECTO:</td>
                      <td>${data[i][34]}</td>
                      <td>${data[i][41]}</td>
                      <td>${data[i][6]}</td>
                  </tr>
                  <tr>
                      <td class="col">COR:</td>
                      <td>${data[i][35]}</td>
                      <td>${data[i][42]}</td>
                      <td>${data[i][4]}</td>
                  </tr>
                  <tr>
                      <td class="col">pH:</td>
                      <td>${data[i][36]}</td>
                      <td>${data[i][43]}</td>
                      <td>${data[i][12]}</td>
                  </tr>
                  <tr>
                      <td class="col">VISCOSIDADE:</td>
                      <td>${data[i][37]}</td>
                      <td>${data[i][44]}</td>
                      <td>${data[i][29]}</td>
                  </tr>
                  <tr>
                      <td class="col">DENSIDADE RELATIVA:</td>
                      <td>${data[i][38]}</td>
                      <td>${data[i][45]}</td>
                      <td>${data[i][28]}</td>
                  </tr>
                  <tr>
                      <td class="col">ATIVO:</td>
                      <td>${data[i][39]}</td>
                      <td>${data[i][46]}</td>
                      <td>${data[i][30]}</td>
                  </tr>
                  <tr>
                      <td class="col">GRAU ALCOOLICO:</td>
                      <td>${data[i][40]}</td>
                      <td>${data[i][47]}</td>
                      <td>${data[i][27]}</td>
                  </tr>
              </table>
              <br>
              <table class="titulo">
                  <tr>
                      <td class="col">SITUAÇÃO SEGUNDO PARÂMETROS ANALISADOS:</td>
                      <td class="ptitulo">${data[i][48]}</td>
                  </tr>
              </table>
              <br>
          <div class="img">
              <img class="img1" src="" width="90%">
                <h1>INSIRA O RODAPÉ AQUI</h1>
          </div>
          </div>
        `;
      }
    }
  });
  return resultadoHTML || '<p>Produto não encontrado.</p>'; // Retorna mensagem caso nenhum produto seja encontrado
}
