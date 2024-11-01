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
  
  function obterNomesProdutos() {
    const spreadsheetId = 'ID_AQUI'; // Substitua pelo seu ID da planilha
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('SemanaS32');
    const data = sheet.getDataRange().getValues();
    const nomesProdutos = new Set(); // Usar um Set para garantir nomes únicos
  
    for (let i = 1; i < data.length; i++) {
      const nomeProduto = data[i][3]; // coluna 3 (ajustado para o índice correto)
      if (nomeProduto) {
        nomesProdutos.add(nomeProduto); // Adiciona ao Set
      }
    }
    
    return Array.from(nomesProdutos); // Retorna um array com nomes únicos
  }
  
  function obterDatasFabricao(nomeProduto) {
    const spreadsheetId = 'ID_AQUI'; // Substitua pelo seu ID da planilha
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('NOME_DA_ABA_AQUI');
    const data = sheet.getDataRange().getValues();
    const datasFabricao = [];
  
    for (let i = 1; i < data.length; i++) {
      if (data[i][3].toLowerCase() === nomeProduto.toLowerCase()) { // coluna 3
        const dataFabricao = data[i][1]; // coluna 2
        if (dataFabricao && !datasFabricao.includes(dataFabricao)) {
          datasFabricao.push(dataFabricao);
        }
      }
    }
    
    return datasFabricao;
  }
  
  function buscarProdutoPorNome(nomeProduto, dataFabricao) {
    const spreadsheetId = 'ID_AQUI'; // Substitua pelo seu ID da planilha
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('NOME_DA_ABA_AQUI');
    const data = sheet.getDataRange().getValues();
    let resultadoHTML = '';
  
    for (let i = 1; i < data.length; i++) {
      if (data[i][3].toLowerCase() === nomeProduto.toLowerCase() && data[i][1] === dataFabricao) { // coluna 3 e coluna 2
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
                      <!-- <td class="cab">CARACTERÍSITCA <br> ANALISADA</td> -->
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
  
    if (resultadoHTML === '') {
      return 'Produto não encontrado para a data selecionada.';
    }
  
    return `
      <table class="parametro">
        <tr>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        ${resultadoHTML}
      </table>
    `;
  }