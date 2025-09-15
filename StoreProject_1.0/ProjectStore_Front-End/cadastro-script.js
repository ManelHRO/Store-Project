cadastroForm = document.getElementById('cadastro-form')

cadastroForm.addEventListener('submit', async(event) => {
    event.preventDefault()

    const gmail = document.getElementById('gmail').value
    const senha = document.getElementById('senha').value
    
    const userDate = {gmail: gmail, senha: senha}

    try{
        const response = await fetch('http://localhost:3000/cadastro', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userDate)
        })
        const data = await response.json()

        if(data.success){
            console.log('Cadastro efetuado com sucesso!', data.message)
            location.href = './login.html'
        }
        else{
            console.log('Falha no Cadastro:', data.message)
        }
    } catch (error){
        console.error('Erro de comunicação com o servidor:', data.message)
    }
})