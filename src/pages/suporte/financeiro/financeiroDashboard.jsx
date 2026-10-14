//lista de chamados craido e dashboard
//importa navigate para criar url com id do chamado
import { useNavigate, Link } from "react-router-dom"
import { useState } from 'react';
import NavBar from "../../../components/navbar/navBar.jsx"
import Footer from "../../../components/footer/footer.jsx"

function financeiroDash() {
    const chamados = JSON.parse(//JSON.parse() transforma o texto novamente em JavaScript
        localStorage.getItem("chamados")//localStorage.getItem Pega os chamados do localStorage
    ) || []; //|| [] evita que fique nulo

    //armazaerna o navigate para usar la em baixo
    const navigate = useNavigate()

    //variavel que armazena somente os chamados com setor = Financeiro
    let chamadosCriados = chamados.filter(e => e.setor == 'FINANCEIRO')

    //codigo para contar chamados aberto e respondidos
    let totalChamadosAbertos = 0
    let totalChamadosFinalizados = 0
    let totalChamadosCancelados = 0
    for (let i = 0; i < chamados.length; i++) {
        if (chamados[i].status == 'Aberto') {
            totalChamadosAbertos++
        }
        if (chamados[i].status == 'Finalizado') {
            totalChamadosFinalizados++
        }
        if (chamados[i].status == 'Cancelado') {
            totalChamadosCancelados++
        }
    }



    //Funções para Marca botoes do filtro

    const [AbertoMarcado, setAbertoMarcado] = useState(false);
    const [FechadoMarcado, setFechadoMarcado] = useState(false);
    const [CanceladoMarcado, setCanceladoMarcado] = useState(false);
    //Funçãos para filtrar os chamdos entre aberto e fechado etc

    // monta a lista de status selecionados
    const statusSelecionados = [];
    if (AbertoMarcado) statusSelecionados.push('Aberto');
    if (FechadoMarcado) statusSelecionados.push('Concluido');
    if (CanceladoMarcado) statusSelecionados.push('Cancelado');

    // se nenhum filtro estiver marcado, mostra todos; senão, só os selecionados
    const chamadosFiltrados = statusSelecionados.length === 0
        ? chamadosCriados
        : chamadosCriados.filter(c => statusSelecionados.includes(c.status));



    return (
        <div className="d-flex flex-column min-vh-100">
            <NavBar></NavBar>
            <div className=" w-100 d-flex flex-column align-items-center justify-content-center">
                <div className="w-50">
                    <div className="w-50">
                        <h1 className="fw-bold fs-2 text-primary text-opacity-50">Dash Equipe Financeira</h1>
                    </div>

                    { /* informações  */}
                    <div className="w-100 d-flex justify-content-between ">
                        <div className="border-top border-primary border-5 bg-light w-50 m-2 shadow-lg p-3 mb-5 bg-body-tertiary rounded-4">
                            <p className="fw-bold">chamados aberto</p>
                            <span className="text-primary fs-1 fw-bold">{totalChamadosAbertos}</span>
                        </div>
                        <div className="border-top border-primary border-5 bg-light w-50 m-2 shadow-lg p-3 mb-5 bg-body-tertiary rounded-4">
                            <p className="fw-bold">chamados finalizados</p>
                            <span className="text-dark fs-1 fw-bold">{totalChamadosFinalizados}</span>
                        </div>
                        <div className="border-top border-primary border-5 bg-light w-50 m-2 shadow-lg p-3 mb-5 bg-body-tertiary rounded-4">
                            <p className="fw-bold">chamados Cancelados</p>
                            <span className="text-dark fs-1 fw-bold">{totalChamadosCancelados}</span>
                        </div>
                    </div>
                    {/* codigo para renderizar os chamados na tela*/}
                    {/*btns de filtro de chamados */}

                    <div className="backgroundColorBlueDark text-white d-flex justify-content-between align-items-center w-100 ps-3 pe-3 rounded-top">
                        <div className="mt-2 w-50">
                            <h6>Meus Chamados</h6>
                        </div>

                        <div className="d-flex w-50 mt-2 justify-content-end">
                            <p className="mt-1 me-1 p-1">Filtrar:</p>
                            <p className="mt-1 me-2 p-2  border-white rounded-pill" onClick={() => setAbertoMarcado(!AbertoMarcado)} style={{ backgroundColor: AbertoMarcado ? "#1c5dce" : "#0a1f44", color: "white", cursor: "pointer", border: "none", border: AbertoMarcado ? "none" : "1px solid" }}>{AbertoMarcado ? "Abertos -" : "Abertos +"}</p>
                            <p className="mt-1 me-2 p-2  border-white rounded-pill" onClick={() => setFechadoMarcado(!FechadoMarcado)} style={{ backgroundColor: FechadoMarcado ? "#1c5dce" : "#0a1f44", color: "white", cursor: "pointer", border: "none", border: FechadoMarcado ? "none" : "1px solid" }}>{FechadoMarcado ? "Concluidos -" : "Concluidos +"}</p>
                            <p className="mt-1 me-2 p-2  border-white rounded-pill" onClick={() => setCanceladoMarcado(!CanceladoMarcado)} style={{ backgroundColor: CanceladoMarcado ? "#1c5dce" : "#0a1f44", color: "white", cursor: "pointer", border: CanceladoMarcado ? "none" : "1px solid" }}>{CanceladoMarcado ? "Cancelados -" : "Cancelados +"} </p>
                        </div>

                    </div>

                    <div className="shadow">
                        <div className="Titulo fw-bold bg-white">
                            <p>Protocolo</p>
                            <p>Setor</p>
                            <p>Assunto</p>
                            <p>Data</p>
                            <p>Prioridade</p>
                            <p className="ms-4">Status</p>
                        </div>
                        { /* renderizar chamados da variavel chamados  */}
                        {chamadosFiltrados.map((chamado) => (
                            <div className="Titulo bg-white"
                                key={chamado.id} onClick={() => navigate(`/chamado/${chamado.id}`)}
                                style={{ cursor: 'pointer' }}>
                                <span style={{ flex: 10 }}>{chamado.id}</span>
                                <p style={{ flex: 10 }}>{chamado.setor}</p>
                                <p style={{ flex: 40 }}>{chamado.titulo}</p>
                                <p style={{ flex: 10 }}>{chamado.data}</p>
                                <p className={chamado.prioridade === 'Alta' ? 'text-danger fw-bold' : chamado.prioridade === 'Media' ? 'text-success fw-bold' : ''} style={{ flex: 10 }}>{chamado.prioridade}</p>
                                <p className={chamado.status === 'Aberto' ? 'text-white fw-bold bg-primary p-1 ps-3 rounded-pill' : chamado.status === 'Concluido' ? 'text-white fw-bold  bg-success p-1 rounded-pill' : 'text-white fw-bold bg-danger p-1 rounded-pill'}
                                    style={{ flex: 10, marginLeft: '20px' }}>{chamado.status}</p>
                            </div>
                        ))}
                    </div>



                    <div className="w-10 d-flex justify-content-between mt-2 p-3">
                        <Link to="/">
                            <button className="btn btn-outline-primary">Voltar para Home</button>
                        </Link>
                    </div>

                </div>
            </div>
            <Footer></Footer>
        </div >


    )




}


export default financeiroDash