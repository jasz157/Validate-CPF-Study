function Validate_cpf (cpf) {
 this.cpf = cpf
}

Validate_cpf.prototype.clean_cpf = function () {
    const cleanCpf = this.cpf.replace(/\D+/g, '');
    
    return cleanCpf;
}

// função de debug
Validate_cpf.prototype.showCpf = function () {
    const cleanCpf  = this.clean_cpf();
     console.log(cleanCpf);
}

Validate_cpf.prototype.validate = function () {
   if(typeof this.cpf === "undefined") return false;
   if(this.isSequence()) return false;

    
   const cleanCpf = this.clean_cpf();
   if(cleanCpf.length != 11) return false;

   const half_cpf = cleanCpf.slice(0 , -2);
   const digit1 = this.digit(half_cpf);
   const digit2 = this.digit(half_cpf + digit1);

   const cpfToValidate = half_cpf + digit1 + digit2;
   
   return cleanCpf === cpfToValidate;
}

Validate_cpf.prototype.digit = function (halfCpf) {
    const arrayCpf = Array.from(halfCpf);
    let regressiveCount = arrayCpf.length + 1;
    const digitTotal = arrayCpf.reduce((ac , val) =>  {
        ac += (regressiveCount * Number(val))
        regressiveCount--
        return ac;
    }, 0)
    const digit = 11 - (digitTotal % 11);
   
    return digit > 9 ? '0' : String(digit);
}

Validate_cpf.prototype.isSequence = function () {
    const cleanCpf = this.clean_cpf();
    const sequence = cleanCpf[0].repeat(cleanCpf.length);
    
    return sequence === cleanCpf;
}

document.addEventListener ("click" , (e) => {
 el = e.target;



if(el.classList.contains('btn-validate')) {
    const cpf_num = document.querySelector("#cpf_num");
    const newCpf = new Validate_cpf(cpf_num.value).validate(); 
    if(newCpf === true)  return console.log("CPF VALIDO") 
    else console.log("CPF INVALIDO")
}

})



