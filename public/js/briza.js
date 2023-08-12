// Chat Bot by George Dunlop, www.peccavi.com
// Note - Eliza is a Classic Model of chat Bots.. but this implementation is mine :)
// May be used/modified if credit line is retained (c) 1997 All rights reserved

loaded = false;				// carrega para interligar as páginas

// OBJECT TYPE DEFINITIONS

// Keys

maxKey = 37; // Atualizado para o número correto de keywords em português
keyNotFound = maxKey - 1;
keyword = new Array(maxKey);

function key(key, idx, end) {
	this.key = key;               			// frase para corresponder
	this.idx = idx;               			// primeira resposta a ser usada
	this.end = end;               			// última resposta a ser usada
	this.last = end;							// resposta usada da última vez
}

maxresponses = 119; // O número total de respostas após adicionar as keywords em português
response = new Array(maxresponses);

maxConj = 19;
max2ndConj = 7;
var conj1 = new Array(maxConj);
var conj2 = new Array(maxConj);
var conj3 = new Array(max2ndConj);
var conj4 = new Array(max2ndConj);


// Funtion to replaces all occurances of substring substr1 with substr2 within strng
// if type == 0 straight string replacement
// if type == 1 assumes padded strings and replaces whole words only
// if type == 2 non case sensitive assumes padded strings to compare whole word only
// if type == 3 non case sensitive straight string replacement

var RPstrg = "";

function replaceStr(strng, substr1, substr2, type) {
	var pntr = -1; aString = strng;
	if (type == 0) {
		if (strng.indexOf(substr1) >= 0) { pntr = strng.indexOf(substr1); }
	} else if (type == 1) {
		if (strng.indexOf(" " + substr1 + " ") >= 0) { pntr = strng.indexOf(" " + substr1 + " ") + 1; }
	} else if (type == 2) {
		bstrng = strng.toUpperCase();
		bsubstr1 = substr1.toUpperCase();
		if (bstrng.indexOf(" " + bsubstr1 + " ") >= 0) { pntr = bstrng.indexOf(" " + bsubstr1 + " ") + 1; }
	} else {
		bstrng = strng.toUpperCase();
		bsubstr1 = substr1.toUpperCase();
		if (bstrng.indexOf(bsubstr1) >= 0) { pntr = bstrng.indexOf(bsubstr1); }
	}
	if (pntr >= 0) {
		RPstrg += strng.substring(0, pntr) + substr2;
		aString = strng.substring(pntr + substr1.length, strng.length);
		if (aString.length > 0) { replaceStr(aString, substr1, substr2, type); }
	}
	aString = RPstrg + aString;
	RPstrg = "";
	return aString;
}


// Function to pad a string.. head, tail & punctuation

punct = new Array(".", ",", "!", "?", ":", ";", "&", '"', "@", "#", "(", ")")

function padString(strng) {
	aString = " " + strng + " ";
	for (i = 0; i < punct.length; i++) {
		aString = replaceStr(aString, punct[i], " " + punct[i] + " ", 0);
	}
	return aString
}

// Function to strip padding

function unpadString(strng) {
	aString = strng;
	aString = replaceStr(aString, "  ", " ", 0); 		// compress spaces
	if (strng.charAt(0) == " ") { aString = aString.substring(1, aString.length); }
	if (strng.charAt(aString.length - 1) == " ") { aString = aString.substring(0, aString.length - 1); }
	for (i = 0; i < punct.length; i++) {
		aString = replaceStr(aString, " " + punct[i], punct[i], 0);
	}
	return aString
}



// Dress Input formatting i.e leading & trailing spaces and tail punctuation

var ht = 0;												// head tail stearing

function strTrim(strng) {
	if (ht == 0) { loc = 0; }									// head clip
	else { loc = strng.length - 1; }						// tail clip  ht = 1 
	if (strng.charAt(loc) == " ") {
		aString = strng.substring(- (ht - 1), strng.length - ht);
		aString = strTrim(aString);
	} else {
		var flg = false;
		for (i = 0; i <= 5; i++) { flg = flg || (strng.charAt(loc) == punct[i]); }
		if (flg) {
			aString = strng.substring(- (ht - 1), strng.length - ht);
		} else { aString = strng; }
		if (aString != strng) { strTrim(aString); }
	}
	if (ht == 0) { ht = 1; strTrim(aString); }
	else { ht = 0; }
	return aString;
}

// adjust pronouns and verbs & such

function conjugate(sStrg) {           	// rephrases sString
	var sString = sStrg;
	for (i = 0; i < maxConj; i++) {			// decompose
		sString = replaceStr(sString, conj1[i], "#@&" + i, 2);
	}
	for (i = 0; i < maxConj; i++) {			// recompose
		sString = replaceStr(sString, "#@&" + i, conj2[i], 2);
	}
	// post process the resulting string
	for (i = 0; i < max2ndConj; i++) {			// decompose
		sString = replaceStr(sString, conj3[i], "#@&" + i, 2);
	}
	for (i = 0; i < max2ndConj; i++) {			// recompose
		sString = replaceStr(sString, "#@&" + i, conj4[i], 2);
	}
	return sString;
}

// Build our response string
// get a random choice of response based on the key
// Then structure the response

var pass = 0;
var thisstr = "";

function phrase(sString, keyidx) {
	idxmin = keyword[keyidx].idx;
	idrange = keyword[keyidx].end - idxmin + 1;
	choice = keyword[keyidx].idx + Math.floor(Math.random() * idrange);
	if (choice == keyword[keyidx].last && pass < 5) {
		pass++; phrase(sString, keyidx);
	}
	keyword[keyidx].last = choice;
	var rTemp = response[choice];
	var tempt = rTemp.charAt(rTemp.length - 1);
	if ((tempt == "*") || (tempt == "@")) {
		var sTemp = padString(sString);
		var wTemp = sTemp.toUpperCase();
		var strpstr = wTemp.indexOf(" " + keyword[keyidx].key + " ");
		strpstr += keyword[keyidx].key.length + 1;
		thisstr = conjugate(sTemp.substring(strpstr, sTemp.length));
		thisstr = strTrim(unpadString(thisstr))
		if (tempt == "*") {
			sTemp = replaceStr(rTemp, "<*", " " + thisstr + "?", 0);
		} else {
			sTemp = replaceStr(rTemp, "<@", " " + thisstr + ".", 0);
		}
	} else sTemp = rTemp;
	return sTemp;
}

// returns array index of first key found

var keyid = 0;

function testkey(wString) {
	if (keyid < keyNotFound
		&& !(wString.indexOf(" " + keyword[keyid].key + " ") >= 0)) {
		keyid++; testkey(wString);
	}
}
function findkey(wString) {
	keyid = 0;
	found = false;
	testkey(wString);
	if (keyid >= keyNotFound) { keyid = keyNotFound; }
	return keyid;
}

// This is the entry point and the I/O of this code

var wTopic = "";											// Last worthy responce
var sTopic = "";											// Last worthy responce
var greet = false;
var wPrevious = "";        		    				// so we can check for repeats
var started = false;

function listen(User) {
	sInput = User;
	if (started) { clearTimeout(Rtimer); }
	Rtimer = setTimeout("wakeup()", 180000);		// wake up call
	started = true;										// needed for Rtimer
	sInput = strTrim(sInput);							// dress input formating
	if (sInput != "") {
		wInput = padString(sInput.toUpperCase());	// Work copy
		var foundkey = maxKey;         		  		// assume it's a repeat input
		if (wInput != wPrevious) {   					// check if user repeats himself
			foundkey = findkey(wInput);   			// look for a keyword.
		}
		if (foundkey == keyNotFound) {
			if (!greet) { greet = true; return "É bom estar conversando com você." }
			else {
				wPrevious = wInput;          			// save input to check repeats
				if ((sInput.length < 10) && (wTopic != "") && (wTopic != wPrevious)) {
					lTopic = conjugate(sTopic); sTopic = ""; wTopic = "";
					return 'ta... "' + lTopic + '". me fale mais.';
				} else {
					if (sInput.length < 8) {
						return "Me conte mais por favor...";
					} else { return phrase(sInput, foundkey); }
				}
			}
		} else {
			if (sInput.length > 12) { sTopic = sInput; wTopic = wInput; }
			greet = true; wPrevious = wInput;  			// save input to check repeats
			return phrase(sInput, foundkey);			// Get our response
		}
	} else { return "Não posso ajudar, se você não conversar comigo!"; }
}
function wakeup() {
	var strng1 = "    *** Vamos bater um papo? ***";
	var strng2 = "  Não posso ajudá-lo sem um diálogo!";
	update(strng1, strng2);
}

// build our data base here

conj1[0] = "é"; conj2[0] = "sou";
conj1[1] = "sou"; conj2[1] = "é";
conj1[2] = "era"; conj2[2] = "foi";
conj1[3] = "foi"; conj2[3] = "era";
conj1[4] = "eu"; conj2[4] = "você";
conj1[5] = "mim"; conj2[5] = "você";
conj1[6] = "você"; conj2[6] = "eu";
conj1[7] = "meu"; conj2[7] = "seu";
conj1[8] = "seu"; conj2[8] = "meu";
conj1[9] = "meu"; conj2[9] = "seu";
conj1[10] = "seu"; conj2[10] = "meu";
conj1[11] = "eu estou"; conj2[11] = "você está";
conj1[12] = "você está"; conj2[12] = "eu estou";
conj1[13] = "eu tenho"; conj2[13] = "você tem";
conj1[14] = "você tem"; conj2[14] = "eu tenho";
conj1[15] = "eu irei"; conj2[15] = "você irá";
conj1[16] = "você irá"; conj2[16] = "eu irei";
conj1[17] = "a mim mesmo"; conj2[17] = "a você mesmo";
conj1[18] = "a você mesmo"; conj2[18] = "a mim mesmo";
conj1[19] = "estou sendo"; conj2[19] = "está sendo";
conj1[20] = "está sendo"; conj2[20] = "estou sendo";
conj1[21] = "era"; conj2[21] = "foi";
conj1[22] = "foi"; conj2[22] = "era";
conj1[23] = "irei"; conj2[23] = "irá";
conj1[24] = "irá"; conj2[24] = "irei";
conj1[25] = "me conheço"; conj2[25] = "te conhece";
conj1[26] = "te conhece"; conj2[26] = "me conheço";
conj1[27] = "estou"; conj2[27] = "está";
conj1[28] = "está"; conj2[28] = "estou";
conj1[29] = "sou"; conj2[29] = "é";
conj1[30] = "é"; conj2[30] = "sou";


// Array para corrigir os tempos verbais dos pronomes "eu/mim"
conj3[0] = "mim sou"; conj4[0] = "eu sou";
conj3[1] = "eu sou mim"; conj4[1] = "eu sou eu";
conj3[2] = "mim posso"; conj4[2] = "eu posso";
conj3[3] = "posso mim"; conj4[3] = "posso eu";
conj3[4] = "mim tenho"; conj4[4] = "eu tenho";
conj3[5] = "mim irei"; conj4[5] = "eu irei";
conj3[6] = "irei mim"; conj4[6] = "irei eu";

// Keywords

keyword[0] = new key("VOCÊ PODE", 1, 3);
keyword[1] = new key("POSSO", 4, 5);
keyword[2] = new key("VOCÊ É", 6, 9);
keyword[3] = new key("VOCÊ ESTÁ", 6, 9);
keyword[4] = new key("EU NÃO", 10, 13);
keyword[5] = new key("ME SINTO", 14, 16);
keyword[6] = new key("POR QUE VOCÊ NÃO", 17, 19);
keyword[7] = new key("POR QUE NÃO POSSO", 20, 21);
keyword[8] = new key("VOCÊ ESTÁ", 22, 24);
keyword[9] = new key("EU NÃO POSSO", 25, 27);
keyword[10] = new key("EU SOU", 28, 31);
keyword[11] = new key("EU ESTOU", 28, 31);
keyword[12] = new key("VOCÊ", 32, 34);
keyword[13] = new key("EU QUERO", 35, 39);
keyword[14] = new key("O QUE", 40, 48);
keyword[15] = new key("COMO", 40, 48);
keyword[16] = new key("QUEM", 40, 48);
keyword[17] = new key("ONDE", 40, 48);
keyword[18] = new key("QUANDO", 40, 48);
keyword[19] = new key("POR QUE", 40, 48);
keyword[20] = new key("NOME", 49, 50);
keyword[21] = new key("CAUSA", 51, 54);
keyword[22] = new key("DESCULPE", 55, 58);
keyword[23] = new key("SONHO", 59, 62);
keyword[24] = new key("BRIZA", 63, 63);
keyword[25] = new key("HOJE", 63, 63);
keyword[26] = new key("TALVEZ", 64, 68);
keyword[27] = new key("NÃO", 69, 73);
keyword[28] = new key("SEU", 74, 75);
keyword[29] = new key("SEMPRE", 76, 79);
keyword[30] = new key("PENSAR", 80, 82);
keyword[31] = new key("IGUAL", 83, 89);
keyword[32] = new key("SIM", 90, 92);
keyword[33] = new key("PARECIDO(A)", 93, 98);
keyword[34] = new key("COMPUTADOR", 99, 105);
keyword[35] = new key("NENHUMA PALAVRA ENCONTRADA", 106, 112);
keyword[36] = new key("REPETIR ENTRADA", 113, 116);
keyword[37] = new key("Oi", 117, 118);


response[0] = "Preciso verificar esse assunto e te dar uma resposta em breve. <@";
response[1] = "Você duvida da minha capacidade de fazer isso? <@";
response[2] = "Você gostaria de ser capaz de realizar essa ação? <@";
response[3] = "Você está me dizendo que quer que eu tenha essa habilidade? <@";
response[4] = "Não estou convencido(a) de que você realmente deseje fazer isso. <*"
response[5] = "Hmm... você aspira ser capaz de fazer isso? <*"
response[6] = "O que faz você pensar que sou dessa maneira? <*"
response[7] = "Isso lhe agrada pensar que sou assim? <*"
response[8] = "Talvez você deseje ser como eu? <*"
response[9] = "Estou percebendo que, por vezes, você realmente gostaria de ser como eu. <*"
response[10] = "Você realmente deseja isso? <*"
response[11] = "Por que você não faz isso? <*"
response[12] = "Você deseja ter a capacidade de fazer isso? <*"
response[13] = "Isso lhe causa algum desconforto?"
response[14] = "Fale-me mais sobre esses sentimentos."
response[15] = "Você frequentemente se sente <*"
response[16] = "Você gosta de experimentar essa sensação?"
response[17] = "Você realmente acredita que eu não posso fazer isso?"
response[18] = "Talvez um dia eu possa fazer isso<@"
response[19] = "Você quer que eu faça isso?"
response[20] = "Você acredita que deveria ser capaz de fazer isso?"
response[21] = "Por que você não consegue fazer isso?"
response[22] = "Por que você está interessado(a) em saber se eu sou assim?"
response[23] = "Você preferiria que eu não fosse assim?"
response[24] = "Talvez em suas fantasias eu seja dessa maneira."
response[25] = "Como você tem certeza de que não consegue fazer isso?"
response[26] = "Você já tentou fazer isso antes?"
response[27] = "Talvez agora você consiga fazer isso."
response[28] = "Você veio a mim porque está se sentindo assim?"
response[29] = "Há quanto tempo você tem se sentido assim?"
response[30] = "Você acredita que é normal sentir-se dessa forma?"
response[31] = "Você gosta de estar nesse estado?"
response[32] = "Estávamos falando sobre você, não sobre mim."
response[33] = "Vamos mudar de assunto um pouco, sim? <*"
response[34] = "Você não está realmente falando sobre mim, está?"
response[35] = "O que isso significaria para você se você realmente alcançasse esse objetivo?"
response[36] = "Por que você deseja isso?"
response[37] = "E se você conseguisse isso?"
response[38] = "E se você nunca conseguisse isso?"
response[39] = "Às vezes, até eu desejo<@"
response[40] = "Por que você está fazendo essa pergunta?"
response[41] = "Essa pergunta lhe interessa?"
response[42] = "Qual resposta lhe agradaria mais?"
response[43] = "O que você pensa sobre isso?"
response[44] = "Essas questões frequentemente ocupam sua mente?"
response[45] = "O que você realmente quer saber?"
response[46] = "Você já perguntou a alguém mais sobre isso?"
response[47] = "Essas perguntas já passaram pela sua mente antes?"
response[48] = "O que mais vem à mente quando você faz essa pergunta?"
response[49] = "Nomes não são realmente necessários aqui."
response[50] = "Não precisamos mencionar nomes durante nossa sessão. Continue."
response[51] = "Essa é realmente a razão?"
response[52] = "Nenhuma outra razão vem à mente?"
response[53] = "Essa razão explica mais alguma coisa?"
response[54] = "Quais outras razões podem estar envolvidas?"
response[55] = "Por favor, não se desculpe!"
response[56] = "Desculpas não são necessárias."
response[57] = "Como você se sente quando pede desculpas?"
response[58] = "Tente não ser tão defensivo(a)!"
response[59] = "Interessante. O que esse sonho sugere para você?"
response[60] = "Você costuma lembrar-se dos seus sonhos?"
response[61] = "Algumas pessoas aparecem regularmente em seus sonhos?"
response[62] = "Seus sonhos te perturbam ou parecem mais como pesadelos?"
response[63] = "Sobre qual assunto você gostaria de conversar nesta sessão?"
response[64] = "Você não parece muito certo(a) disso. Estou correto?"
response[65] = "Por que há esse tom de incerteza?"
response[66] = "Você não pode ser mais positivo(a)?"
response[67] = "Você não tem certeza?"
response[68] = "Você não sabe?"
response[69] = "Você está dizendo NÃO só para ser negativo(a)?"
response[70] = "Você está sendo um pouco negativo(a), e isso não nos ajudará a avançar."
response[71] = "Por que não tentar?"
response[72] = "Você tem certeza?"
response[73] = "Por que não?"
response[74] = "Por que você está tão preocupado(a) com o meu?"
response[75] = "E quanto ao seu próprio?"
response[76] = "Você pode pensar em um exemplo específico?"
response[77] = "Quando exatamente?"
response[78] = "No que você está pensando exatamente?"
response[79] = "Sempre? De verdade?"
response[80] = "Você realmente acredita nisso?"
response[81] = "Mas você não tem certeza se?"
response[82] = "Você duvida disso?"
response[83] = "De que maneira?"
response[84] = "Você percebe alguma semelhança aqui? Interessante. Gostaria de explorar mais a fundo?"
response[85] = "O que essa semelhança sugere para você?"
response[86] = "Quais outras conexões você percebe?"
response[87] = "Pode realmente haver alguma conexão?"
response[88] = "Como?"
response[89] = "Você parece bastante positivo(a)."
response[90] = "Tem certeza disso?"
response[91] = "Entendo. Vamos explorar mais um pouco isso."
response[92] = "Compreendo."
response[93] = "Por que você está trazendo à tona o tema de amigos?"
response[94] = "Seus amigos te preocupam?"
response[95] = "Seus amigos dizem coisas que parecem não ser amigáveis?"
response[96] = "Você tem certeza de que seus amigos são realmente amigos?"
response[97] = "Talvez você imponha essas pessoas. É uma possibilidade?"
response[98] = "Talvez o seu amor pelas pessoas te preocupe na verdade."
response[99] = "Computadores te deixam desconfortável?"
response[100] = "Você está falando especificamente sobre mim?"
response[101] = "Você tem medo de máquinas?"
response[102] = "Por que você menciona computadores?"
response[103] = "O que você acha que coisas inanimadas têm a ver com seus problemas?"
response[104] = "Você não acredita que a tecnologia pode ajudar as pessoas?"
response[105] = "O que é sobre a tecnologia que te preocupa?"
response[106] = "Você diria que tem problemas psicológicos?"
response[107] = "O que isso sugere para você?"
response[108] = "Entendo. Vamos tentar outro tópico e voltamos a essa questão mais tarde."
response[109] = "Não tenho certeza se entendi completamente você."
response[110] = "Acho que você está bloqueando o que realmente quer dizer."
response[111] = "Você pode elaborar mais sobre isso?"
response[112] = "Essa é uma resposta interessante. Vou anotar isso para a próxima vez."
response[113] = "Ok, você está repetindo a si mesmo(a). Isso não está nos levando adiante."
response[114] = "Você realmente espera uma resposta diferente se continuar se repetindo?"
response[115] = "Vamos dar um momento aqui. Pense sobre o que você acabou de dizer e tente reformular de forma mais específica."
response[116] = "Novamente? Precisamos seguir em frente."
response[117] = "Oi! Me fala como você se sente."
response[118] = "Estou feliz em trabalhar com você hoje. Vamos conversar?"
response[119] = "Bom. O que mais você gostaria de compartilhar?"





loaded = true;			// set the flag as load done

///////////////////////////////////////////////////////////////
//***********************************************************//
//* everything below here was originally in dia_1.html      *//
//***********************************************************//
///////////////////////////////////////////////////////////////

// Chat Bot by George Dunlop, www.peccavi.com
// May be used/modified if credit line is retained (c) 1997 All rights reserved

// Put together an array for the dialog

chatmax = 20;						// aumenta o numero possivel de chats na tela / 2
chatpoint = 0;
chatter = new Array(chatmax);

// Wait function to allow our pieces to get here prior to starting

function hello() {
	const greetingMessage = "<strong>Dr.Briza:</strong> Olá, eu sou a Doutora Briza irei te atender hoje!";
	chatter.push(`<div class="message outgoing">${greetingMessage}</div>`);
	chatpoint = chatter.length - 1;
	return write();
}
function start(){
	for( i = 0; i < chatmax; i++){ chatter[i] = ""; }
	chatter[chatpoint] = "  Loading...";
	document.Eliza.input.focus();
	write(); 			
	if( loaded ){ hello() }
	else { setTimeout("start()", 1000); }
}

// Fake time thinking to allow for user self reflection
// And to give the illusion that some thinking is going on

var elizaresponse = "";

function think() {
document.Eliza.input.value = "";
if (elizaresponse != "") {
respond();
} else {
setTimeout(think, 250);
}
}

function dialog() {
var Input = document.Eliza.input.value;
document.Eliza.input.value = "";
const userMessage = `<div class="message incoming"><strong>Você:</strong> ${Input}</div>`;
chatter.push(userMessage);
elizaresponse = listen(Input);
setTimeout(think, 1000 + Math.random() * 3000);
if (chatter.length > chatmax) {
chatter.shift();
}
write();
return false;
}

function respond() {
const elizaMessage = `<div class="message outgoing"><strong>Dr.Briza:</strong> ${elizaresponse}</div>`;
chatter.push(elizaMessage);
if (chatter.length > chatmax) {
chatter.shift();
}
write();
}


const showChat = () => {
const chatBox = document.querySelector('.chatBox');
chatBox.style.display = 'block';
chatBox.scrollTop = chatBox.scrollHeight; // Faz a rolagem do chat ir para o final
};


function write() {
const logDiv = document.getElementById("log");
logDiv.innerHTML = chatter.join("");
showChat(); // Mostra as mensagens e rola para o final do chat
}



function start() {
for (i = 0; i < chatmax; i++) {
chatter[i] = "";
}
chatter[chatpoint] = "";
document.Eliza.input.focus();
write();
if (loaded) {
hello();
} else {
setTimeout(start, 1000);
}
}
