(function () {
  function byId(id) { return document.getElementById(id); }

  // Página inicial
  var copyButton = byId('copy-fone');
  if (copyButton) {
    copyButton.addEventListener('click', function () {
      var phone = byId('fone');
      if (!phone) return;
      var button = this;
      function copied() {
        button.textContent = 'Copiado';
        setTimeout(function () { button.textContent = 'Copiar'; }, 1600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(phone.textContent.trim()).then(copied, function () {
          button.textContent = phone.textContent.trim();
        });
      } else {
        button.textContent = phone.textContent.trim();
      }
    });
  }

  // A farmácia funciona 24 horas, todos os dias.
  var openTitle = byId('open-title');
  if (openTitle) {
    openTitle.textContent = 'Aberta 24 horas';
    if (byId('open-sub')) byId('open-sub').textContent = 'Atendimento todos os dias, a qualquer hora';
    if (byId('pulse')) byId('pulse').className = 'pulse open';
  }

  // Área do funcionário
  var registerToggle = byId('show-employee-register');
  var registerForm = byId('employee-register');
  if (registerToggle && registerForm) {
    registerToggle.addEventListener('click', function () {
      registerForm.hidden = !registerForm.hidden;
      this.textContent = registerForm.hidden ? 'Cadastrar funcionário' : 'Fechar cadastro';
    });
    registerForm.addEventListener('submit', function (event) {
      event.preventDefault();
      byId('employee-register-message').textContent =
        'Cadastro preenchido com sucesso!';
      registerForm.reset();
    });
  }

  var employeeForm = byId('login-form');
  if (employeeForm) {
    var password = byId('senha');
    var togglePassword = byId('toggle-pw');
    if (togglePassword && password) {
      togglePassword.addEventListener('click', function () {
        var show = password.type === 'password';
        password.type = show ? 'text' : 'password';
        this.setAttribute('aria-pressed', String(show));
        this.setAttribute('aria-label', show ? 'Ocultar senha' : 'Mostrar senha');
      });
    }
    if (byId('forgot')) {
      byId('forgot').addEventListener('click', function () {
        if (byId('forgot-msg')) byId('forgot-msg').hidden = false;
      });
    }

    try {
      var saved = localStorage.getItem('vv-mat');
      if (saved && byId('mat')) {
        byId('mat').value = saved;
        if (byId('lembrar')) byId('lembrar').checked = true;
      }
    } catch (error) {}

    employeeForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var unit = byId('unidade').value;
      var registration = byId('mat').value.trim();
      var pass = byId('senha').value;
      if (!unit || registration.length < 4 || pass.length < 6) {
        alert('Preencha a unidade, a matrícula (mínimo 4 caracteres) e a senha (mínimo 6 caracteres).');
        return;
      }
      try {
        if (byId('lembrar').checked) localStorage.setItem('vv-mat', registration);
        else localStorage.removeItem('vv-mat');
      } catch (error) {}

      byId('view-entrar').hidden = true;
      var panel = byId('view-painel');
      if (panel) panel.hidden = false;
      if (byId('p-greet')) {
        var hour = new Date().getHours();
        var greeting = hour < 12 ? 'Bom dia' : (hour < 18 ? 'Boa tarde' : 'Boa noite');
        byId('p-greet').textContent = greeting + ', equipe ' + unit.replace('Unidade ', '');
        byId('p-unit').textContent = unit;
        byId('p-mat').textContent = 'Matrícula ' + registration;
        byId('p-date').textContent = new Date().toLocaleDateString('pt-BR', {
          weekday: 'long', day: 'numeric', month: 'long'
        });
      }
      window.scrollTo(0, 0);
    });

    var logout = byId('logout');
    if (logout) {
      logout.addEventListener('click', function () {
        if (byId('view-painel')) byId('view-painel').hidden = true;
        byId('view-entrar').hidden = false;
        window.scrollTo(0, 0);
      });
    }

    var tasks = document.querySelectorAll('#tasks input');
    if (tasks.length) {
      function updateProgress() {
        var done = 0;
        tasks.forEach(function (task) { if (task.checked) done++; });
        byId('progress-text').textContent = done + ' de ' + tasks.length + ' concluídas';
        byId('progress-bar').style.width = (done / tasks.length * 100) + '%';
      }
      tasks.forEach(function (task) { task.addEventListener('change', updateProgress); });
    }
  }

  // Área do cliente
  var customerForm = byId('customer-login-form');
  if (customerForm) {
    customerForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var email = byId('cliente-email').value.trim();
      var password = byId('cliente-senha').value;
      var message = byId('customer-login-message');
      if (!email || password.length < 6) {
        message.textContent = 'Informe um e-mail válido e uma senha com pelo menos 6 caracteres.';
        return;
      }
      message.textContent = 'Dados informados com sucesso!';
    });
  }
})();
