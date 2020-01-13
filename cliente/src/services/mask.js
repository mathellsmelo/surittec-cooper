export const retirarFormatacao = (valor) => {
    //eslint-disable-next-line
    return valor = valor.replace(/(\.|\/|\-)/g,"");
}

export const mascaraCpf = (valor) => {
    //eslint-disable-next-line
    return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
}

export const mascaraCep = (valor) => {
    //eslint-disable-next-line
    return valor.replace(/^([\d]{2})\.?([\d]{3})\-?([\d]{3})/, "\$1.\$2\-\$3");
}

export const mascaraTelefone = (value) => {
    //eslint-disable-next-line
    value = value.replace(/\D/g,"");

    //eslint-disable-next-line
    value = value.replace(/^(\d\d)(\d)/g,"($1) $2");

    //eslint-disable-next-line
    if(value.length < 14) value = value.replace(/(\d{4})(\d)/,"$1-$2");
    //eslint-disable-next-line
    else value = value.replace(/(\d{5})(\d)/,"$1-$2");

    return value;
}
