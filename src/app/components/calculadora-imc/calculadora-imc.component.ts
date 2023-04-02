import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-calculadora-imc',
  templateUrl: './calculadora-imc.component.html',
  styleUrls: ['./calculadora-imc.component.css']
})
export class CalculadoraImcComponent {
  errorMessage: string = '';
  visibility: string = 'hidden'; // default visibility for the result div
  images: string[] = [ // array of images
    'assets/underweight.png',
    'assets/normal.png',
    'assets/overweight.png',
    'assets/obese.png',
    'assets/obese2.png',
    'assets/obese3.png'
  ];

  imageDescription: string[] = [ // variable of html alt="" 
    'Abaixo do peso',
    'Peso normal',
    'Sobrepeso',
    'Obesidade Grau I',
    'Obesidade Grau II',
    'Obesidade Grau III'
  ];

  title: string[] = [ // title of result
    'ABAIXO DO PESO (abaixo de 18.5):',
    'PESO NORMAL (entre 18.5 e 24.9):',
    'SOBREPESO (entre 25 e 29.9):',
    'OBESIDADE GRAU I (entre 30 e 34.9):',
    'OBESIDADE GRAU II (entre 35 e 39.9):',
    'OBESIDADE GRAU III (acima de 40):'
  ];

  description: string[] = [ // description of the result
    'Você está na categoria abaixo do peso, para ajudar a melhorar sua situação, é importante consultar um médico para avaliar a causa do baixo peso e receber orientações nutricionais e médicas adequadas. Você pode consumir alimentos ricos em nutrientes e calorias, como frutas secas, nozes e sementes, abacate, azeite de oliva, entre outros, e fazer exercícios de força para aumentar a massa muscular e melhorar a saúde óssea.',

    'Você tem um peso saudável para sua altura, o que significa que corre menor risco de desenvolver doenças crônicas. Para manter-se assim, é importante manter um estilo de vida ativo, praticando atividades físicas regularmente, ter uma alimentação saudável e equilibrada, com variedade de nutrientes e moderação de alimentos ricos em gordura e açúcar, e controlar o estresse e buscar hábitos saudáveis para a saúde mental, como meditação e sono adequado.',

    'Você está na categoria de sobrepeso, o que significa que tem um excesso de peso que pode aumentar o risco de desenvolver doenças como diabetes, hipertensão e problemas cardíacos. Para ajudar a melhorar sua situação, é importante adotar uma alimentação saudável, com redução de calorias e aumento de nutrientes, praticar atividades físicas regulares e de intensidade moderada a vigorosa, como caminhada, corrida, natação, entre outros, e buscar orientação médica para identificar fatores de risco e receber tratamentos adequados, se necessário.',

    'Você está na categoria de obesidade grau I, o que significa que tem um excesso de peso significativo que aumenta consideravelmente o risco de doenças crônicas. Para ajudar a melhorar sua situação, é importante buscar orientação médica para avaliar o risco de doenças crônicas e receber tratamentos adequados, se necessário, reduzir o consumo de alimentos processados e ricos em gordura e açúcar e praticar atividades físicas regulares e de intensidade moderada a vigorosa, com orientação de um profissional de educação física.',

    'Você está na categoria de obesidade grau II, o que significa que tem um excesso de peso muito elevado que aumenta consideravelmente o risco de doenças crônicas e pode comprometer sua qualidade de vida. Para ajudar a melhorar sua situação, é importante buscar orientação médica para avaliar o risco de doenças crônicas e receber tratamentos adequados, se necessário, adotar um plano de alimentação saudável e equilibrado, com moderação de alimentos ricos em gordura e açúcar.',

    'Você está na categoria de obesidade grau III, o que significa que está muito acima do peso. Aumenta consideravelmente o risco de doenças crônicas e muitas outras. A obesidade mórbida também pode limitar sua capacidade de realizar atividades diárias, aumentando o risco de depressão e outras condições de saúde mental. Para ajudar a melhorar sua situação, é importante buscar orientação médica. Além disso, é importante adotar um plano de alimentação saudável e equilibrado, com moderação de alimentos ricos em gordura e açúcar, praticar atividades físicas com orientação de um profissional de educação física e, em casos selecionados, considerar tratamentos de suporte, como terapia comportamental, para ajudar a modificar comportamentos alimentares e de estilo de vida.'

  ]
  i!: number; // index number of images 

  tmp: string = ''; // temporary string, helps in validateNumbers function
  height!: number; // input 'altura'
  weight!: number; // input 'peso'
  bmi: number = 0; // body mass index
  isBlank: boolean = false; // is the input blank?

  bmiTypeColor: string = '';
  bmiString: string = '';

  verifyInput() { //function to verify the input
    if (this.height === 0 || this.weight === 0) { // if inputs are 0
      this.isBlank = true;
      this.setErrorMessage('Os valores devem ser diferentes de 0!');
    }    
    else if (this.height < 0 || this.weight < 0) { // if inputs are 0
      this.isBlank = true;
      this.setErrorMessage('Os valores devem ser positivos!');
    }
    else if (!this.height || !this.weight) { // if input are not defined
      this.isBlank = true;
      this.setErrorMessage('Você deve preencher todos os campos!');
    }
    else { // if both inputs are filled
      this.setErrorMessage('');
      this.isBlank = false;
      this.validateNumbers(this.height, this.weight);
      this.setBmi(); // calls setBmi() function
    }
  }

  validateNumbers(height: number, weight: number) { 
    if (height > 3){
      this.height = height / 100;
    }

    this.tmp = this.height.toString();
    this.tmp = this.tmp.replace(/,/g, ".");
    this.height = Number(this.tmp);

    this.tmp = weight.toString();
    this.tmp = this.tmp.replace(/,/g, ".");
    this.weight = Number(this.tmp);
  }

  //Body Mass Index
  setBmi() { //only calculate if isBlank variable is false
    if (!this.isBlank) { // isBlank false
      this.bmi = this.weight / Math.pow(this.height, 2);
    }
    else { // isBlank true
      // do nothing
    }

    this.bmiAssignment(this.bmi);
  }

  setIndex(index: number) {
    this.i = index;    
  }

  bmiAssignment(bmi: number) {
    if (bmi < 18.5) { //underweight
      this.setIndex(0);
      this.setBmiColor('underweight');
    }
    else if (bmi < 24.9) { // normal
      this.setIndex(1);
      this.setBmiColor('normal');
    }
    else if (bmi < 29.9) { // overweight
      this.setIndex(2);
      this.setBmiColor('overweight');
    }
    else if (bmi < 34.9) { // grade 1 obesity
      this.setIndex(3);
      this.setBmiColor('obesity1');
    }
    else if (bmi < 39.9) { // grade 2 obesity
      this.setIndex(4);
      this.setBmiColor('obesity2');
    }
    else { // grade 3 obesity
      this.setIndex(5);
      this.setBmiColor('obesity3');
    }

    this.bmiToString(bmi);
    this.makeVisible();
  }

  setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  setBmiColor(type: string) {
    this.bmiTypeColor = type;
  }

  bmiToString(bmi: number){
    this.bmiString = this.bmi.toFixed(2);
  }

  makeVisible() {
    this.visibility = 'visible';
  }

}
