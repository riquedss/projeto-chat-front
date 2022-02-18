const botao = document.querySelector(".botao-enviar")

botao.addEventListener("click", (elemento) => {
    console.log(elemento)
    const mensagem = document.querySelector(".mensagem")
    const text = document.querySelector(".texto")

    const div = document.createElement("div")
    div.classList.add("guarda-mensagem")
    div.innerHTML = `<section class="mensagem-tela"><p">${text.value}</p></section>
                    <section class="section-btn">
                    <input type="button" value="deletar" class="btn-deletar" onclick="deletar(this)">
                    <input type="button" value="editar" class="btn-editar" onclick="editar(this)">
                </section></section>`
    text.value = "";


    mensagem.appendChild(div)
})

function deletar(elemento){
    elemento.parentElement.parentElement.remove();
}

function editar(elemento){
   
    elemento.parentElement.parentElement.innerHTML = `<section class="mensagem-tela"></section>
    <section class="section-btn">
    <input type="button" value="deletar" class="btn-deletar" onclick="deletar(this)">
    <input type="button" value="enviar" class="botao-enviar">
</section></section>`

}

