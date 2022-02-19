const url = "http://treinamento-ajax-api.herokuapp.com/messages"

function mostraMensagemNaTela(mensagem) {
    const tela = document.querySelector(".mensagem-caixa")

    //Printa todas as mensagens da Api na tela
    for (objeto of mensagem) {
        
        const div = document.createElement("div")
        div.classList.add("guarda-mensagem")
        div.innerHTML = `
        <section class="mensagem-tela"> 
            <p class="p1">${objeto.author}:</p>
             <p class="p2">${objeto.content}</p>
        </section>
        <section class="section-btn">
            <input type="button" value="deletar" class="btn-deletar" onclick="deletar(this)">
            <input type="button" value="editar" class="btn-editar" onclick="editar(this)">
        </section></section>`
        tela.appendChild(div)
        div.id = `${objeto.id}`
    }
}

function obterMensagemDaApi() {
    const tela = document.querySelector(".mensagem-caixa")
    tela.innerHTML = "";

    fetch(url).then(response => {
        response.json().then(todasMensagens => {
            mostraMensagemNaTela(todasMensagens);
        }).catch(err => console.log(err))
    }).catch(err => console.log(err)).finally(() => console.log("Executou!"))

}

function enviar() {
    const texto = document.querySelector(".texto");

    const fetchBody = {
        message: { 
            content: texto.value,
            author: "Lobinho" //bug só está m
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
    }).catch(err => console.log(err))

    texto.value = ""
}

// Apagar na Api
function deletar(elemento){
    const fetchConfig = {
        method: "DELETE"
    }
    //id da mensagem para ser apagada
    const id = elemento.parentElement.parentElement.id;

    fetch(url + "/"+ id, fetchConfig).then(mensagem => {
            obterMensagemDaApi();
            console.log(mensagem);
    }).catch(err => console.log(err))
    
}

function editar(elemento){
    const caixaDeMensagem = elemento.parentElement.parentElement
    // console.log(caixaDeMensagem)
    caixaDeMensagem.innerHTML = `
        <section class="mensagem-tela"> 
        <form class="form2">
        <textarea class="texto-edicao" placeholder="Edite a mensagem aqui"></textarea>
        </form>
        </section>
        <section class="section-btn">
            <input type="button" value="enviar" class="btn-enviar-edicao" onclick="enviarEdicao(this)">
        </section></section>`
}

function enviarEdicao(elemento){
    const textoEdicao = document.querySelector(".texto-edicao").value;
    //id da mensagem para ser editada
    const id = elemento.parentElement.parentElement.id;
    
    const fetchBody = {
        message: { 
            content: textoEdicao
        }
    }

    const fetchConfig = {
        method: "PUT",
        body: JSON.stringify(fetchBody),
        headers: {"Content-Type":"application/json"}
    }

    fetch(url + "/" + id, fetchConfig).then(response => {
        response.json().then(mensagem => {
            obterMensagemDaApi();
            console.log(mensagem);
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
    

}

obterMensagemDaApi();