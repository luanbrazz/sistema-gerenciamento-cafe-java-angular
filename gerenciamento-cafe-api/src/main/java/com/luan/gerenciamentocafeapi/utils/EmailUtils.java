package com.luan.gerenciamentocafeapi.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailUtils {

    // Injeção da dependência do JavaMailSender para enviar e-mails
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String remetente; // sender

    // Criação de um logger estático usando o SLF4J para registrar informações de log.
    private static final Logger LOGGER = LoggerFactory.getLogger(EmailUtils.class);

    // Método para enviar um e-mail simples
    public void sendSimpleMessage(String para, String assunto, String texto, List<String> lista) {
        // Cria uma instância de SimpleMailMessage para construir o e-mail
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(remetente); // Define o remetente do e-mail como o e-mail da empresa
        message.setTo(para); // Define o destinatário do e-mail
        message.setSubject(assunto); // Define o assunto do e-mail
        message.setText(texto); // Define o corpo do e-mail
        LOGGER.info("Mensagem do email criada");

        // Se a lista de destinatários em cópia (cc) não for vazia, adiciona os destinatários cc ao e-mail
        if (lista != null && lista.size() > 0)
            message.setCc(getCcArray(lista));

        // Envia o e-mail usando o JavaMailSender
        javaMailSender.send(message);
        LOGGER.info("E-mail enviado para: {}", lista.toString());
    }

    // Método privado para converter a lista de destinatários em cópia (cc) em um array de strings.
    private String[] getCcArray(List<String> ccLista) {
        String[] cc = new String[ccLista.size()];
        for (int i = 0; i < ccLista.size(); i++) {
            cc[i] = ccLista.get(i);
        }
        return cc;
    }
}
