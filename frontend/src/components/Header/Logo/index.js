import logo from '../../../static/logo-grupo-pi.png'

function Logo() {
  return (
    <div className='logo'>
      <img src={logo} alt='Logotipo do projeto. Glfinho usando óculos e digitando em um teclado de computador' />
      <p>PROJETO INTEGRADOR II</p>
    </div>
  );
}

export default Logo;