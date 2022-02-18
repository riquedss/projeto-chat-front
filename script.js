const url = "http://treinamento-ajax-api.herokuapp.com/messages"

function mostraMensagemNaTela(mensagem) {
    const tela = document.querySelector(".mensagem")

    //Printa todas as mensagens da Api na tela
    for (objeto of mensagem) {
        
        const div = document.createElement("div")
        div.classList.add("guarda-mensagem")
        div.innerHTML = `<section class="mensagem-tela"><p">${objeto.content}</p></section>
                    <section class="section-btn">
                    <input type="button" value="deletar" class="btn-deletar" onclick="deletar(this)">
                    <input type="button" value="editar" class="btn-editar" onclick="editar(this)">
                </section></section>`
        tela.appendChild(div)
        div.id = `${objeto.id}`
    }
}

function obterMensagemDaApi() {
    const tela = document.querySelector(".mensagem")
    tela.innerHTML = "";

    fetch(url).then(response => {
        response.json().then(todasMensagens => {
            //Código para mostrar em html
            mostraMensagemNaTela(todasMensagens);
        }).catch(err => console.log(err))
    }).catch(err => console.log(err)).finally(() => console.log("Sem erro de execução"))

}

function enviar() {
    const texto = document.querySelector(".texto");

    const fetchBody = {
        message: { 
            content: texto.value,
            author: "Ronaldinho"
        }
    }

    const fetchConfig = {
        method: "POST",
        body: JSON.stringify(fetchBody),
        headers: {"Content-Type":"application/json"}
    }

    fetch(url, fetchConfig).then(response => {
        response.json().then(mensagem => {
            obterMensagemDaApi();
            console.log(mensagem);
        }).catch(err => console.log(err))
    }).catch(err => console.log(err)).finally(() => console.log("Sem erro de execução"))

    texto.value = ""
    

    
 
}

// Apagar na Api
function deletar(elemento){
    const fetchConfig = {
        method: "DELETE"
    }
    //id da mensagem para ser apagada
    const id = elemento.parentElement.parentElement.id;

    fetch(url + "/"+ id, fetchConfig).then(() => {
        obterMensagemDaApi();
        console.log("Apagou!");
    }).catch(err => console.log(err)).finally(() => console.log("Sem erro de execução"));
    
    

}
obterMensagemDaApi();


// botao.addEventListener("click", (elemento) => {
//     console.log(elemento)
//     const mensagem = document.querySelector(".mensagem")
//     const text = document.querySelector(".texto")

//     const div = document.createElement("div")
//     div.classList.add("guarda-mensagem")
//     div.innerHTML = `<section class="mensagem-tela"><p">${text.value}</p></section>
//                     <section class="section-btn">
//                     <input type="button" value="deletar" class="btn-deletar" onclick="deletar(this)">
//                     <input type="button" value="editar" class="btn-editar" onclick="editar(this)">
//                 </section></section>`
//     text.value = "";


//     mensagem.appendChild(div)
// })




// function editar(elemento){
   
//     elemento.parentElement.parentElement.innerHTML = `<section class="mensagem-tela"></section>
//     <section class="section-btn">
//     <input type="button" value="deletar" class="btn-deletar" onclick="deletar(this)">
//     <input type="button" value="enviar" class="botao-enviar">
// </section></section>`

// }

