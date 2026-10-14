function Footer() {
    const ano = new Date().getFullYear()

    return (
        <footer
            className="mt-auto text-white border-top border-primary border-4"
            style={{ backgroundColor: "#0a1f44" }}
        >
            <div className="container py-3">
                <div className="row align-items-center gy-2 text-center text-md-start">
                    <div className="col-md-6">
                        <span className="fw-bold">Sistema de Chamados</span>
                        <small className="d-block text-white-50">
                            Abra, acompanhe e responda chamados em um só lugar.
                        </small>
                    </div>

                    <div className="col-md-6 text-md-end">
                        <small className="text-white-50">
                            © {ano} Sistema de Chamados. Todos os direitos reservados. Werthercr7@gmail.com
                        </small>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer