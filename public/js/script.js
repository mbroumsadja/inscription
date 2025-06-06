 class AuthManager {
            constructor() {
                this.formContainer = document.getElementById('inscription-form');
                this.userInfoContainer = document.getElementById('user-info');
                this.passwordInput = document.getElementById('password');
                this.passwordError = document.getElementById('password-error');
                this.successMessage = document.getElementById('success-message');
                this.displayUsername = document.getElementById('display-username');
                this.displayEmail = document.getElementById('display-email');
                this.displayPassword = document.getElementById('display-password');
                this.togglePasswordButton = document.getElementById('toggle-password');
                this.togglePasswordButton.addEventListener('click', () => this.togglePassword());
            }

            getCookie(name) {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(';').shift();
                return null;
            }

            setCookie(name, value, days = 7) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                const expires = `expires=${date.toUTCString()}`;
                document.cookie = `${name}=${value};${expires};path=/`;
            }

            checkCache() {
                const userData = this.getCookie('id-inscription');
                if (userData) {
                    const user = JSON.parse(decodeURIComponent(userData));
                    this.formContainer.classList.add('hidden');
                    this.userInfoContainer.classList.remove('hidden');
                    this.displayUsername.textContent = this.escapeHTML(user.username);
                    this.displayEmail.textContent = this.escapeHTML(user.email);
                    this.displayPassword.dataset.password = this.escapeHTML(user.password);
                } else {
                    this.formContainer.classList.remove('hidden');
                    this.userInfoContainer.classList.add('hidden');
                }
            }

            validatePassword(password) {
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
                return regex.test(password);
            }

            validateEmail(email) {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(email);
            }

            escapeHTML(str) {
                return str.replace(/[&<>"']/g, (match) => ({
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#39;'
                }[match]));
            }

            togglePassword() {
                if (this.displayPassword.classList.contains('hidden')) {
                    this.displayPassword.classList.remove('hidden');
                    this.displayPassword.textContent = this.escapeHTML(this.displayPassword.dataset.password);
                    this.togglePasswordButton.innerHTML = '🙈 Masquer';
                } else {
                    this.displayPassword.classList.add('hidden');
                    this.displayPassword.textContent = '********';
                    this.togglePasswordButton.innerHTML = '👁️ Afficher';
                }
            }

            register() {
                const button = event.target;
                const username = document.getElementById('username').value.trim();
                const email = document.getElementById('email').value.trim();
                const password = this.passwordInput.value;

                if (!username || !email || !password) {
                    alert('Veuillez remplir tous les champs.');
                    return;
                }

                if (!this.validateEmail(email)) {
                    alert('Veuillez entrer un email valide.');
                    return;
                }

                if (!this.validatePassword(password)) {
                    this.passwordInput.classList.add('error');
                    this.passwordError.style.display = 'block';
                    return;
                }

                // Animation de chargement
                button.classList.add('loading');
                setTimeout(() => {
                    this.passwordInput.classList.remove('error');
                    this.passwordError.style.display = 'none';

                    const userData = { username, email, password };
                    this.setCookie('id-inscription', encodeURIComponent(JSON.stringify(userData)), 7);
                    this.successMessage.style.display = 'block';
                    setTimeout(() => {
                        this.successMessage.style.display = 'none';
                    }, 3000);
                    this.checkCache();
                    button.classList.remove('loading');
                }, 1000);
            }

            logout() {
                this.setCookie('id-inscription', '', -1);
                this.checkCache();
            }
        }

        const auth = new AuthManager();
        window.onload = () => auth.checkCache();
        window.register = () => auth.register();
        window.logout = () => auth.logout();