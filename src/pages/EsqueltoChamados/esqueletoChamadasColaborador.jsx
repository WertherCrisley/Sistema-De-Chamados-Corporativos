import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import Navbar from "../../components/navbar/navBar.jsx"
import Footer from "../../components/footer/footer.jsx"

function DetalheChamadoColaborador() {
    const { id } = useParams()
    const navigate = useNavigate()

    const chamadosIniciais = JSON.parse(localStorage.getItem("chamados")) || []
    const chamadoInicial = chamadosIniciais.find(c => String(c.id) === id)
    const [chamado, setChamado] = useState(chamadoInicial)

    // states que faltavam
    const [NovoStatus, setNovoStatus] = useState('')
    const [Resposta, setResposta] = useState('')

    // cor do badge de acordo com o valor
    const corStatus = {
        Aberto: "bg-primary",
        "Em andamento": "bg-warning text-dark",
        Finalizado: "bg-success",
    }
    const corPrioridade = {
        Baixa: "bg-success",
        Media: "bg-warning text-dark",
        Alta: "bg-danger",
    }

    function AtualizarStatus() {
        if (NovoStatus === '') {
            alert('Escolha o novo status!')
            return
        }

        const chamados = JSON.parse(localStorage.getItem("chamados")) || []

        const chamadosAtualizados = chamados.map(c => {
            if (String(c.id) === id) {
                return { ...c, status: NovoStatus, resposta: Resposta }
            }
            return c
        })

        localStorage.setItem("chamados", JSON.stringify(chamadosAtualizados))
        setChamado({ ...chamado, status: NovoStatus, resposta: Resposta })
    }

    if (!chamado) {
        return (
            <div className="container py-5 d-flex justify-content-center">
                <div className="bg-white p-4 rounded-4 border-top border-danger border-5 text-center w-100" style={{ maxWidth: "500px" }}>
                    <h5 className="mb-3">Chamado não encontrado.</h5>
                    <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>Voltar</button>
                </div>
            </div>
        )
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar></Navbar>
            <div className="container py-4 d-flex justify-content-center">

                <div className="w-100" style={{ maxWidth: "700px" }}>

                    <button className="btn btn-outline-primary mb-3" onClick={() => navigate(-1)}>
                        ← Voltar
                    </button>

                    {/* Card com os dados do chamado */}
                    <div className="bg-white p-4 shadow-sm border-top border-primary border-5 rounded-4 mb-4">
                        <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
                            <h4 className="fw-bold mb-0">Chamado #{chamado.id}</h4>
                            <span className={`badge fs-6 ${corStatus[chamado.status] || "bg-secondary"}`}>
                                {chamado.status}
                            </span>
                        </div>

                        <h5 className="mb-3">{chamado.titulo}</h5>

                        <div className="row g-3 mb-3">
                            <div className="col-sm-6">
                                <small className="text-muted d-block">Contato</small>
                                <span className="fw-semibold">{chamado.contato}</span>
                            </div>
                            <div className="col-sm-6">
                                <small className="text-muted d-block">Data</small>
                                <span className="fw-semibold">{chamado.data}</span>
                            </div>
                            <div className="col-sm-6">
                                <small className="text-muted d-block">Setor</small>
                                <span className="badge bg-dark">{chamado.setor}</span>
                            </div>
                            <div className="col-sm-6">
                                <small className="text-muted d-block">Prioridade</small>
                                <span className={`badge ${corPrioridade[chamado.prioridade] || "bg-secondary"}`}>
                                    {chamado.prioridade}
                                </span>
                            </div>
                        </div>

                        <hr />

                        <small className="text-muted d-block mb-1">Descrição</small>
                        <p className="mb-0">{chamado.descricao}</p>

                        {chamado.resposta && (
                            <div className="alert alert-primary mt-4 mb-0" role="alert">
                                <strong>Resposta:</strong> {chamado.resposta}
                            </div>
                        )}
                    </div>



                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default DetalheChamadoColaborador