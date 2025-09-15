const anteriorButton = document.getElementById('anterior')
const proximoButton = document.getElementById('proximo')
const dots = document.querySelectorAll('.dot')
const numeroIndicado = document.querySelector('.numeros')
const item = document.querySelectorAll('.item')
const btnSM = document.querySelectorAll('.btn')
const circulo = document.querySelectorAll('.circulo')
const login = document.querySelector('.login')
const logout = document.getElementById('logout')

ativo = 0
total = item.length
let tempo

const nomeUsuario = localStorage.getItem('gmail') || sessionStorage.getItem('gmail')

if(nomeUsuario){
    login.textContent = nomeUsuario
}
else{
    login.textContent = 'Login'
    login.addEventListener('click', () => {
        location.href = './login.html'
    })
}

function update(direcao){

    document.querySelector('.item.ativo').classList.remove('ativo')
    document.querySelector('.dot.ativo').classList.remove('ativo')

    setTimeout(() => {
        circulo.forEach(c => {
            c.classList.remove('ativo')
        }, 10)
    })
    circulo.forEach(c => {
        c.classList.remove('ativo')
    })

    if(direcao === 1){
        ativo = (ativo + 1) % total
    }
    else{
        ativo = ativo - 1
        if(ativo < 0) ativo = total - 1
    }

    item[ativo].classList.add('ativo')
    dots[ativo].classList.add('ativo')
    numeroIndicado.textContent = String(ativo + 1).padStart(2, '0')
    
    setTimeout(() => {
        circulo.forEach(c => {
            c.classList.add('ativo')
        })
    }, 10);
}

btnSM.forEach(botao => {
    botao.addEventListener('click', () => {
        alert(circulo.length)
    })
})

anteriorButton.addEventListener('click', () => {
    update(-1)
})

proximoButton.addEventListener('click', () => {
    update(1)
})

logout.addEventListener('click', () => {
    localStorage.clear()
    sessionStorage.clear()
    location.href = './home.html'
})

