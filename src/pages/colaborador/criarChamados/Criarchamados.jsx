//criar chamdos 
import { useState } from "react"
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import NavBar from "../../../components/navbar/navBar.jsx"
import Footer from "../../../components/footer/footer.jsx"

function CriarChamados() {
    /*Use state sub-pagina*/
    const [abrir, setAbrir] = useState(false)
    //variaveis com input titulo descricao e contato
    const [titulo, setTitulo] = useState('')
    const [contato, setContato] = useState('')
    const [descricao, setDescricao] = useState('')





    //variavel da msg campo vazio acho q vai ser temporaria vo por algum tipo de msg como aletrta
    const [MsgCampoVazio, setMsgCampoVazio] = useState(false)

    /*Funcção para checar se os inputs estão vazios, se estiver não abre o modal*/
    function CheckInput() {
        if (titulo.trim() != '' && contato.trim() != '' && descricao.trim() != '') {
            setAbrir(true)
            setMsgCampoVazio(false)

        } else {
            setMsgCampoVazio(true)
        }
    }

    //variavel com os campo de seleção setor e prioridade
    const [Setor, setSetor] = useState('')
    const [Prioridade, setPrioridade] = useState('')
    //função para enviar chamado e  checar se 'selectes' estão vazios


    function mostrarAlerta() {
        Swal.fire({
            title: 'Sucesso!',
            text: 'Chamado criado com sucesso.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#0a1f44'
        });
    }

    const formValido = Setor !== '' && Prioridade !== '';
    function check() {
        if (Setor.trim() != '' && Prioridade.trim() != '') {
            //chamar função que cria chamado
            enviarChamado()


            //Zerar os inputs e os Selects
            setTitulo('')
            setContato('')
            setDescricao('')
            setSetor('')
            setPrioridade('')

            //fechar modal
            setAbrir(false)
        } else {
            //mensagem de input vazio
            console.log('Campos Setor e prioridade Vazios')
        }
    }

    function enviarChamado() {


        mostrarAlerta()




        const chamados = JSON.parse(//JSON.parse() transforma o texto novamente em JavaScript
            localStorage.getItem("chamados")//localStorage.getItem Pega os chamados do localStorage
        ) || []; //|| [] evita que fique nulo

        //formato do chamado
        const novoChamado = {
            id: Date.now(),
            titulo: titulo,
            contato: contato,
            status: 'Aberto',
            descricao: descricao,
            setor: Setor,
            prioridade: Prioridade,
            resposta: null,
            data: new Date().toLocaleDateString('pt-BR')
        }

        chamados.push(novoChamado);

        localStorage.setItem(// setItem() serve para salvar alguma coisa no localStorage.
            "chamados",
            JSON.stringify(chamados));//JSON.stringify(chamados) transforma os dados em string






    }


    return (
        <div className="d-flex flex-column min-vh-100">
            <NavBar></NavBar>

            <div className="d-flex justify-content-center">

                <div className="bg-white w-25 h-25 p-3 border-top border-primary border-5 rounded-4">
                    <h5>Criar Chamado</h5>
                    {/* mensagem de campo vazio */}
                    {MsgCampoVazio && (<h6 className="bg-danger  bg-opacity-25 text-danger p-2">*Os Campos não podem estar vazios!*</h6>)}
                    {/* inputs  */}
                    <p>Titulo:<span className="text-danger">*</span></p>
                    <input id="Titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} type="text" placeholder="Digite o Titulo!" className="w-100 border rounded-2 p-1 form-control" autoComplete="off" />

                    <p>Contato:<span className="text-danger">*</span></p>
                    <input id="Contato" value={contato} onChange={(e) => setContato(e.target.value)} type="text" placeholder="Seu contato!" className="w-100 border rounded-2 p-1 form-control" autoComplete="off" />

                    <p>Descrição:<span className="text-danger">*</span></p>
                    <textarea id="Descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} type="text" placeholder="Digite a descrição do serviço!" className="w-100 h-25 border rounded-2 p-1 form-control" autoComplete="off" />

                    <div className="mt-3 d-flex justify-content-between">
                        <Link to="/ColaboradorDashboard"><button className="btn btn-outline-primary">voltar</button></Link>
                        <button className="btn btn-primary btn-dark--hover" onClick={CheckInput}>Continuar</button>
                    </div>




                </div>
            </div>
            {/* Sub pagina para escolher setor e prioridade*/}

            {abrir && (
                <div className="modal d-block" tabIndex="-1" role="dialog"
                    style={{ backgroundColor: "rgba(10, 10, 10, 0.65)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content" style={{ borderTop: "5px solid #1e5bd8" }}>

                            <div className="modal-header border-0 d-flex justify-content-between">
                                <h5 className="modal-title fw-bold">Setor e Prioridade</h5>
                                <button className="btn btn-danger" onClick={() => setAbrir(false)}>X</button>
                            </div>

                            <div className="modal-body">
                                <label htmlFor="setor" className="form-label fw-semibold">Setor:</label>
                                <select className="form-select mb-3" onChange={(e) => setSetor(e.target.value)} id="setor" defaultValue={''}>
                                    <option value="" disabled>Escolha o setor!</option>
                                    <option value="TI">TI</option>
                                    <option value="FINANCEIRO">Financeiro</option>
                                    <option value="RH">RH</option>
                                </select>

                                <label htmlFor="prioridade" className="form-label fw-semibold">Prioridade:</label>
                                <select className="form-select" onChange={(e) => setPrioridade(e.target.value)} id="prioridade" defaultValue={''}>
                                    <option value="" disabled>Nível de prioridade</option>
                                    <option value="Baixa">Baixa</option>
                                    <option value="Media">Média</option>
                                    <option value="Alta">Alta</option>
                                </select>
                            </div>

                            <div className="modal-footer border-0">
                                <button className="btn btn-primary w-100" onClick={check} disabled={!formValido}>Enviar</button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
            <Footer></Footer>
        </div>
    )
}

export default CriarChamados
