let profissionais = [];
const grid = document.getElementById('profissionaisGrid');
const modal = document.getElementById('modalOverlay');
const form = document.getElementById('proForm');
const dayButtons = document.querySelectorAll('.day-btn');

// Lógica de seleção dos botões no Modal
dayButtons.forEach(btn => {
    btn.onclick = (e) => {
        e.preventDefault();
        btn.classList.toggle('active');
    };
});

function renderizar() {
    grid.innerHTML = '';
    const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    
    if (profissionais.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-user-slash" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.1;"></i>
                <p style="font-size: 1.2rem; color: #666;">Nenhum profissional cadastrado.</p>
                <span style="color: #444;">Adicione colaboradores para gerir a sua equipa.</span>
            </div>`;
        document.getElementById('proCount').innerText = "0 profissionais";
        return;
    }

    profissionais.forEach((pro, index) => {
        // Criando as tags de dias para o card
        const diasHTML = diasSemana.map(dia => {
            const ativo = pro.dias.includes(dia);
            return `<span class="day-tag ${ativo ? 'active' : ''}">${dia}</span>`;
        }).join('');

        const card = document.createElement('div');
        card.className = 'pro-card';
        card.innerHTML = `
            <div class="pro-header">
                <div class="avatar">${pro.nome.charAt(0).toUpperCase()}</div>
                <div class="pro-title">
                    <h3>${pro.nome}</h3>
                    <span class="badge" style="background: #202024; color: #888; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem;">${pro.cargo}</span>
                </div>
                <div class="pro-actions">
                    <button onclick="editar(${index})"><i class="fas fa-edit"></i></button>
                    <button onclick="remover(${index})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="pro-details">
                <p><i class="fas fa-phone" style="color:#9d4edd"></i> ${pro.tel}</p>
                <p><i class="fas fa-percentage" style="color:#9d4edd"></i> <span style="color:#9d4edd; font-weight: 600;">${pro.comissao}% de comissão</span></p>
                <div class="work-days">
                    ${diasHTML}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
    
    document.getElementById('proCount').innerText = `${profissionais.length} profissionais`;
}

form.onsubmit = (e) => {
    e.preventDefault();
    const index = document.getElementById('editIndex').value;
    const selecionados = [];
    document.querySelectorAll('.day-btn.active').forEach(btn => selecionados.push(btn.innerText));

    const dados = {
        nome: document.getElementById('nomePro').value,
        tel: document.getElementById('telPro').value,
        cargo: document.getElementById('cargoPro').value,
        comissao: document.getElementById('comissaoPro').value,
        dias: selecionados
    };

    if (index === "") profissionais.push(dados);
    else profissionais[index] = dados;

    fecharModal();
    renderizar();
};

function fecharModal() {
    modal.classList.remove('active');
    form.reset();
    document.getElementById('editIndex').value = "";
    dayButtons.forEach(btn => btn.classList.remove('active'));
}

function editar(index) {
    const pro = profissionais[index];
    document.getElementById('nomePro').value = pro.nome;
    document.getElementById('telPro').value = pro.tel;
    document.getElementById('cargoPro').value = pro.cargo;
    document.getElementById('comissaoPro').value = pro.comissao;
    document.getElementById('editIndex').value = index;
    
    dayButtons.forEach(btn => {
        if (pro.dias.includes(btn.innerText)) btn.classList.add('active');
    });

    modal.classList.add('active');
}

function remover(index) {
    if(confirm("Deseja excluir este profissional?")) {
        profissionais.splice(index, 1);
        renderizar();
    }
}

document.getElementById('openModal').onclick = () => modal.classList.add('active');
document.getElementById('closeModal').onclick = fecharModal;
document.getElementById('cancelBtn').onclick = fecharModal;

renderizar();