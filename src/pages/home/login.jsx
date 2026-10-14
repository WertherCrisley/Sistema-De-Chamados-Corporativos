//escolher com quem fazer
import { Link } from "react-router-dom";
import NavBar from "../../components/navbar/navBar.jsx"
import Footer from "../../components/footer/footer.jsx"

function login() {
    return (
        <>
            <NavBar></NavBar>
            <div className="backgroundColorBlueWhite w-100 min-vh-100 min-vh-100 justify-content-center d-flex">

                <main className="m-2 p-4 bg-white border-top border-primary border-5 rounded shadow-lg p-3 mb-5 bg-body rounded" style={{ width: "55vh", height: "70vh" }}>
                    <h2 className="fonte fs-3 ">Bem-Vindo</h2>
                    <p className="fw-light text-secondary" style={{ "--bs-text-opacity": 0.8 }}>Escolha como você quer entrar</p>


                    <p>Ao entrar como colaborador, simule uma abertura de chamado para algum serviço.</p>
                    <Link to="/ColaboradorDashboard"><button className="btn btn-primary btn-dark--hover w-100">Entrar como Colaborador</button></Link>

                    {/* essa parte e para a linha ou */}
                    <div className="d-flex align-items-center gap-3 my-3">
                        <hr className="flex-grow-1" />
                        <span className="text-secondary">ou</span>
                        <hr className="flex-grow-1" />
                    </div>

                    <p>Ao selecionar um dos departamentos: 'Ti', 'Rh' ou 'Financeiro', você estará analisando e respondendo os chamados.</p>


                    <Link to="/SuporteTi"> <button className="backgroundColorBlueDark m-1 btn btn-primary btn-dark--hover w-100">Entrar como Departamento Ti</button></Link>
                    <Link to="/SuporteFinanceiro"><button className="backgroundColorBlueDark m-1 btn btn-primary btn-dark--hover w-100">Entrar como Departamento Financeiro</button></Link>
                    <Link to="/SuporteRh"><button className="backgroundColorBlueDark m-1 btn btn-primary btn-dark--hover w-100">Entrar como Departamento Recursos Humanos(Rh)</button></Link>

                    <p className=" bg-light.bg-gradient backgroundColorBlueWhite mt-3 p-2 rounded border-start border-primary border-3">Recomendo entrar primeiro como Colaborar e criar alguns chamados.</p>
                </main>
            </div>
            <Footer></Footer>
        </>
    )

}

export default login