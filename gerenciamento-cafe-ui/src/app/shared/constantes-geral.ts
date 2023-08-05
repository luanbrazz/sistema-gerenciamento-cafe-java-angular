export class ConstantesGeral {

  public static erroGenerico: string = "Ops! Algo deu errado :( . Por favor, tente novamente mais tarde";

  // [a-zA-Z0-9 ]* expressão regular que permite letras maiúsculas, letras minúsculas, números e espaços em branco.
  public static nomeRegex: string = "[a-zA-Z0-9 ]*";

  // [A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3} regular que valida um endereço de e-mail. Essa expressão regular permite letras maiúsculas, letras minúsculas, números e alguns caracteres
  // especiais na parte local do e-mail, seguidos de um símbolo '@', seguidos por letras maiúsculas, letras minúsculas, números e alguns caracteres especiais no domínio do e-mail, seguidos
  // por um ponto e entre 2 a 3 letras minúsculas para a extensão do domínio.
  public static emailRegex: string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";

  // [e0-9]{10,10}$ expressão regular que valida um número de contato. Essa expressão regular permite apenas dígitos numéricos exatamente com 10 caracteres.
  public static numeroContatoRegex: string = "^[e0-9]{11,11}$";

  public static error: string = "error";
}
