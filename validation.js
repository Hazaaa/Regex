//Regex za bilo koji karakter od a-z ne brine se da li je veliko ili malo slovo jer imamo insensitiv flag
//I posto smo stavili flag global onda znaci da mozemo da dobijemo vise pronadjenih karaktera
var reg = /[a-z]/gi;

//Ovo je drugi nacin da se napise regex
var reg2 = new RegExp(/[a-z]/,"gi");

//Objekat koji cuva sve regex patterne koji nam trebaju kao propertije objekta
const patterns = {
    //^ i $ smo stavili da bi se ubacilo tacno 11 cifara jer da smo stavili bez toga onda bi pogodak bio i "abc12345678912cba" jer smo uneli telefon od 11 cifara ali se nismo odgradili od obicnih karaktera
    //zbog ^ i $ uneti telefon mora da bude tacno 11 cifara inace se ne vraca pogodak
    telephone: /^\d{11}$/,
    username: /^[a-z\d]{5,12}$/i,
    password: /^[\w@-]{8,20}$/,
    slug: /^[a-z\d-]{8,20}$/,
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
}; 

//Vraca kolekciju svih input elemenata u html-u
const inputs = document.querySelectorAll("input");

//Za svaki input element dodajemo eventlistener keyup koji se okida svaki put kada se pritisne i otpusti neki taster
//i onda se svaki put proveri da li vrednost u inputu odgovara patternu
inputs.forEach((input) => {
    input.addEventListener('keyup', (e) =>{
        //console.log(e.target.attributes.name.value);

        //Funkicja za validaciju prvo saljemo input element, a onda odgovarajuci pattern iz propertija patterns objekta
        validate(e.target, patterns[e.target.attributes.name.value]);
    })
})

//Funkcija koja vrsi validaciju
//Prvi parametar koji element se proverava, a drugi parametar je regex patters
function validate(field,regex){

    //regex je prosledjeni pattern
    if(regex.test(field.value)){
        field.className = "valid";
    }else {
        field.className = "invalid";
    }
}