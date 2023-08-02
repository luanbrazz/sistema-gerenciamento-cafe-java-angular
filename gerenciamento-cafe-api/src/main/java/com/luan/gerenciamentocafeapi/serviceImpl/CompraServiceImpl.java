package com.luan.gerenciamentocafeapi.serviceImpl;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.luan.gerenciamentocafeapi.JWT.JwtFilter;
import com.luan.gerenciamentocafeapi.POJO.Compra;
import com.luan.gerenciamentocafeapi.constents.CafeConstants;
import com.luan.gerenciamentocafeapi.dao.CompraDao;
import com.luan.gerenciamentocafeapi.service.CompraService;
import com.luan.gerenciamentocafeapi.utils.CafeUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.io.IOUtils;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

@Slf4j
@Service
public class CompraServiceImpl implements CompraService {

    @Autowired
    JwtFilter jwtFilter;

    @Autowired
    CompraDao compraDao;

    @Override
    public ResponseEntity<String> gerarRelatorio(Map<String, Object> requestMap) {
        // Loga a entrada no método gerarRelatorio
        log.info("Dentro do metodo gerarRelatorio");
        try {
            String nomeArquivo;
            if (validateRequestMap(requestMap)) {
                // Verifica se o mapa de requisição possui uma chave chamada "isGenerate" com valor falso
                if (requestMap.containsKey("isGenerate") && !(Boolean) requestMap.get("isGenerate")) {
                    // Se possuir, usa o valor do campo "uuid" como nomeArquivo
                    nomeArquivo = (String) requestMap.get("uuid");
                } else {
                    // Caso contrário, gera um UUID como nomeArquivo e salva no mapa de requisição
                    nomeArquivo = CafeUtils.getUUID();
                    requestMap.put("uuid", nomeArquivo);
                    // Chama o método insertCompra para persistir os dados no banco de dados
                    insertCompra(requestMap);
                }
                // Cria a string com os dados a serem impressos no início do relatório
                String dados = "Nome: " + requestMap.get("nome") + "\n" + "Número de Contato: " + requestMap.get("numeroContato")
                        + "\n" + "E-mail: " + requestMap.get("email") + "\n" + "Forma de pagamento: " + requestMap.get("pagamento");

                // Cria um novo documento PDF e define o nome do arquivo usando o nomeArquivo gerado
                Document documento = new Document();
                PdfWriter.getInstance(documento, new FileOutputStream(CafeConstants.LOCAL_LOJA_NFE + "\\" + nomeArquivo + ".pdf"));
                log.info("Novo documento " + (String) requestMap.get("uuid") + " gerado na pasta " + CafeConstants.LOCAL_LOJA_NFE);

                // Abre o documento PDF
                documento.open();

                // Adiciona um retângulo na página
                setRetangleInPdf(documento);

                // Adiciona o título ao documento
                Paragraph titulo = new Paragraph(CafeConstants.TITULO, getFont("Header"));
                titulo.setAlignment(Element.ALIGN_CENTER);
                documento.add(titulo);

                // Adiciona os dados ao documento
                Paragraph paragraph = new Paragraph(dados + "\n \n", getFont("Dados"));
                documento.add(paragraph);

                // Cria uma tabela com 5 colunas
                PdfPTable table = new PdfPTable(5);
                table.setWidthPercentage(100);

                // Adiciona o cabeçalho da tabela
                addTableHeader(table);

                // Converte a string de detalheProduto em um JSONArray
                JSONArray jsonArray = CafeUtils.getJsonArrayFromString((String) requestMap.get("detalheProduto"));

                // Adiciona as linhas à tabela a partir do JSONArray
                for (int i = 0; i < jsonArray.length(); i++) {
                    addLinhasNaTabela(table, CafeUtils.getMapFromJson(jsonArray.getString(i)));
                }

                // Adiciona a tabela ao documento
                documento.add(table);

                // Adiciona o rodapé ao documento
                Paragraph footer = new Paragraph("Total: " + requestMap.get("totalCompra") + "\n"
                        + "OBRIGADO PELA PREFERÊNCIA!" + "\n" + CafeUtils.getDataHoraAtualFormatada(), getFont("Dados"));
                documento.add(footer);

                // Fecha o documento PDF
                documento.close();

                // Retorna uma resposta HTTP com o nome do arquivo gerado (UUID) e status OK
                return new ResponseEntity<>("{\"uuid\":\"" + nomeArquivo + "\"}", HttpStatus.OK);
            }
            // Caso não seja possível gerar o relatório devido a dados ausentes, retorna uma resposta HTTP com status BadRequest
            return CafeUtils.getResponseEntity(CafeConstants.DADOS_NAO_ENCONTRADO, HttpStatus.BAD_REQUEST);
        } catch (Exception exception) {
            // Em caso de exceção, imprime o stack trace do erro e retorna uma resposta HTTP com status InternalServerError
            exception.printStackTrace();
        }
        return CafeUtils.getResponseEntity(CafeConstants.ALGO_DEU_ERRADO, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    // Método para adicionar as linhas na tabela do PDF a partir de um Map de dados
    private void addLinhasNaTabela(PdfPTable table, Map<String, Object> dados) {
        log.info("Dentro do metodo addLinhasNaTabela");
        table.addCell((String) dados.get("nome"));
        table.addCell((String) dados.get("categoria"));
        table.addCell((String) dados.get("quantidade"));
        table.addCell(Double.toString((Double) dados.get("preco")));
        table.addCell(Double.toString((Double) dados.get("total")));
    }

    // Método para adicionar o cabeçalho da tabela do PDF
    private void addTableHeader(PdfPTable table) {
        log.info("Dentro do metodo addTableHeader");
        Stream.of("Nome", "Categoria", "Quantidade", "Preço", "Sub Total")
                .forEach(tituloColuna -> {
                    PdfPCell header = new PdfPCell();
                    header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                    header.setBorderWidth(2);
                    header.setPhrase(new Phrase(tituloColuna));
                    header.setBackgroundColor(BaseColor.BLUE);
                    header.setHorizontalAlignment(Element.ALIGN_CENTER);
                    header.setVerticalAlignment(Element.ALIGN_CENTER);
                    table.addCell(header);
                });
    }

    // Método para obter a fonte utilizada no PDF
    private Font getFont(String type) {
        log.info("Dentro do metodo getFont");
        switch (type) {
            case "Header":
                // Define a fonte como "HELVETICA_BOLDOBLIQUE" com tamanho 18 e cor preta (BaseColor.BLACK).
                Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLDOBLIQUE, 18, BaseColor.BLACK);
                headerFont.setStyle(Font.BOLD); // Define o estilo da fonte como negrito.
                return headerFont; // Retorna a fonte criada para o cabeçalho.
            case "Dados":
                // Define a fonte como "TIMES_ROMAN" com tamanho 11 e cor preta (BaseColor.BLACK).
                Font dadosFont = FontFactory.getFont(FontFactory.TIMES_ROMAN, 11, BaseColor.BLACK);
                dadosFont.setStyle(Font.BOLD); // Define o estilo da fonte como negrito.
                return dadosFont; // Retorna a fonte criada para os dados.
            default:
                // Caso o tipo não seja "Header" ou "Dados", retorna uma fonte padrão (Font).
                return new Font();
        }
    }


    private void setRetangleInPdf(Document documento) throws DocumentException {
        log.info("Dentro do metodo setRetangleInPdf");
        // Cria um retângulo nas coordenadas (18, 15) com largura 577 e altura 825.
        Rectangle rectangle = new Rectangle(577, 825, 18, 15);
        // Habilita os lados do retângulo.
        rectangle.enableBorderSide(1);
        rectangle.enableBorderSide(2);
        rectangle.enableBorderSide(4);
        rectangle.enableBorderSide(8);
        rectangle.setBorderColor(BaseColor.BLACK); // Define a cor da borda do retângulo como preta.
        rectangle.setBorderWidth(1); // Define a largura da borda do retângulo como 1.
        documento.add(rectangle); // Adiciona o retângulo ao documento PDF.
    }


    private void insertCompra(Map<String, Object> requestMap) {
        try {
            // Cria uma nova instância da classe Compra.
            Compra compra = new Compra();
            // Define os atributos da compra a partir dos dados presentes no requestMap.
            compra.setUuid((String) requestMap.get("uuid"));
            compra.setNome((String) requestMap.get("nome"));
            compra.setEmail((String) requestMap.get("email"));
            compra.setNumeroContato((String) requestMap.get("numeroContato"));
            compra.setPagamento((String) requestMap.get("pagamento"));
            compra.setTotalCompra(Integer.parseInt((String) requestMap.get("totalCompra")));
            compra.setDetalheProduto((String) requestMap.get("detalheProduto"));
            compra.setCriadoPor(jwtFilter.getUsuarioAtual()); // Define o usuário criador da compra.
            compraDao.save(compra); // Salva a compra no banco de dados.
        } catch (Exception exception) {
            exception.printStackTrace(); // Em caso de exceção, imprime o stack trace do erro.
        }
    }


    private boolean validateRequestMap(Map<String, Object> requestMap) {
        // Verifica se o mapa de requisição contém todas as chaves necessárias para gerar o relatório.
        return requestMap.containsKey("nome") &&
                requestMap.containsKey("email") &&
                requestMap.containsKey("numeroContato") &&
                requestMap.containsKey("pagamento") &&
                requestMap.containsKey("totalCompra") &&
                requestMap.containsKey("detalheProduto");
    }

    @Override
    public ResponseEntity<List<Compra>> getCompra() {
        List<Compra> lista = new ArrayList<>();
        if (jwtFilter.isAdmin()) {
            lista = compraDao.getAllCompra();
        } else {
            lista = compraDao.getCompraByUsername(jwtFilter.getUsuarioAtual());

        }
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<byte[]> getPdf(Map<String, Object> requestMap) {
        log.info("Dentro do metodo getPdf : {}", requestMap);
        try {
            //byte tamanho 0
            byte[] byteArray = new byte[0];

            if (!requestMap.containsKey("uuid") && validateRequestMap(requestMap))
                return new ResponseEntity<>(byteArray, HttpStatus.BAD_REQUEST);

            String caminhoArquivo = CafeConstants.LOCAL_LOJA_NFE + "\\" + (String) requestMap.get("uuid") + ".pdf";

            if (CafeUtils.isArquivoExiste(caminhoArquivo)) {
                // Obtém os bytes do arquivo PDF e atribui ao array de bytes
                byteArray = getByteArray(caminhoArquivo);

                return new ResponseEntity<>(byteArray, HttpStatus.OK);
            } else {
                requestMap.put("isGenerate", false);
                log.info("GERANDO UM NOVO ARQUIVO PDF : {}", requestMap.get("uuid"));
                gerarRelatorio(requestMap);
                byteArray = getByteArray(caminhoArquivo);
                return new ResponseEntity<>(byteArray, HttpStatus.OK);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return null;
    }


    // Método privado para obter os bytes do arquivo PDF
    private byte[] getByteArray(String caminhoArquivo) throws Exception {
        // Cria um objeto File com base no caminho do arquivo PDF
        File arquivoInicial = new File(caminhoArquivo);

        // Abre um fluxo de entrada para ler o arquivo PDF
        InputStream targetStream = new FileInputStream(arquivoInicial);

        // Lê os bytes do fluxo de entrada e armazena no array de bytes
        byte[] byteArray = IOUtils.toByteArray(targetStream);

        // Fecha o fluxo de entrada
        targetStream.close();

        // Retorna o array de bytes contendo o conteúdo do arquivo PDF
        return byteArray;
    }

}
