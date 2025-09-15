loginForm = document.getElementById('login-form')
mensagemErro = document.querySelector('.mensagem-erro')
estadoUsuario = document.querySelector('.login')
lembrarSenha = document.getElementById('lembrar-senha')

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const gmail = document.getElementById('gmail').value
    const senha = document.getElementById('senha').value
    
    const userDate = {gmail : gmail, senha : senha}
    mensagemErro.classList.remove('ativo')
    try{
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userDate)
        })

        const data = await response.json()
        
        if(response.status === 200){
            if(lembrarSenha.checked){
                localStorage.setItem('gmail', userDate.gmail)
            }
            else{
                sessionStorage.setItem('gmail', userDate.gmail)
            }
            console.log('Login efetuado com sucesso!', data.message)
            location.href = './home.html'
        }   
        else{
            console.log('Falha no Login:', data.message)
            mensagemErro.textContent = 'Email ou senha incorretos!'
            mensagemErro.classList.add('ativo')
        }
    } catch (error){
        console.error('Erro na comunicação com o servidor:', data.message)
        mensagemErro.textContent = 'Tente novamente mais tarde.'
        mensagem.classList.add('ativo')
    }
})