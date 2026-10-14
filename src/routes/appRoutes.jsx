import { HashRouter, Routes, Route } from 'react-router-dom'

import Home from '../pages/home/login.jsx'
import ColaboradorDashboard from '../pages/colaborador/dashBoard/dashboard.jsx'
import ColaboradorChamados from '../pages/colaborador/criarChamados/Criarchamados.jsx'
import SuporteFinanceiro from '../pages/suporte/financeiro/financeiroDashboard.jsx'
import SuporteRh from '../pages/suporte/rh/rhDashboard.jsx'
import SuporteTi from '../pages/suporte/ti/tiDashboard.jsx'
import Chamado from '../pages/EsqueltoChamados/esqueletoChamadas.jsx'
import ChamadoColaborador from '../pages/EsqueltoChamados/esqueletoChamadasColaborador.jsx'


function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ColaboradorDashboard" element={<ColaboradorDashboard />} />
        <Route path="/ColaboradorChamados" element={<ColaboradorChamados />} />
        <Route path="/SuporteFinanceiro" element={<SuporteFinanceiro />} />
        <Route path="/SuporteRh" element={<SuporteRh />} />
        <Route path="/SuporteTi" element={<SuporteTi />} />
        <Route path="/Chamado/:id" element={<Chamado />} />
        <Route path="/ChamadoColaborador/:id" element={<ChamadoColaborador />} />
      </Routes>
    </HashRouter>
  )
}

export default AppRoutes
