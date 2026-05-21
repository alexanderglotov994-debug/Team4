// Navigation Helper
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // CLI Terminal Simulator Setup
    setupTerminal();

    // Fluctuating GPU/Data flow statistics
    startTelemetryUpdates();
});

// Interactive CLI Terminal Logic
function setupTerminal() {
    const termInput = document.getElementById('term-input');
    const termScreen = document.getElementById('terminal-screen');

    if (!termInput || !termScreen) return;

    termInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = termInput.value.trim();
            termInput.value = '';
            
            // Execute command
            executeCommand(command);
        }
    });

    function executeCommand(cmd) {
        // Create user prompt line
        const promptLine = document.createElement('div');
        promptLine.className = 'term-output';
        promptLine.innerHTML = `<span class="term-prompt">guest@team-04:~$</span> ${escapeHTML(cmd)}`;
        
        // Insert prompt line before the input row
        const inputRow = termScreen.querySelector('.term-input-row');
        termScreen.insertBefore(promptLine, inputRow);

        if (!cmd) {
            termScreen.scrollTop = termScreen.scrollHeight;
            return;
        }

        const normalizedCmd = cmd.toLowerCase().trim();
        let response = '';
        let isError = false;

        switch(normalizedCmd) {
            case 'help':
                response = `Доступные команды:<br>` +
                           `  <span class="highlight">team</span>   - информация о Команде 4<br>` +
                           `  <span class="highlight">stats</span>  - ключевые показатели Big Data<br>` +
                           `  <span class="highlight">skills</span> - наш технологический стек<br>` +
                           `  <span class="highlight">clear</span>  - очистить экран консоли`;
                break;
            case 'team':
                response = `[КОМАНДА 4 — Data Wizards]<br>` +
                           `Мы лаборатория машинного обучения и анализа данных.<br>` +
                           `Специализируемся на внедрении искусственного интеллекта в бизнес-процессы.<br>` +
                           `Разрабатываем собственные LLM, строим пайплайны обработки данных и интегрируем смарт-ботов (включая виджеты Mango Dialogues).`;
                break;
            case 'stats':
                response = `--- ТЕЛЕМЕТРИЯ АНАЛИТИКИ ---\r<br>` +
                           `  • Задержка пайплайна: 1.8 сек (Real-time stream)<br>` +
                           `  • Суточный объем логов: 12.5 TB (ClickHouse cluster)<br>` +
                           `  • Параметры active-моделей: 175 миллиардов (FP16)<br>` +
                           `  • Автоматизация отчетности: 92% (Zero human manual work)`;
                break;
            case 'skills':
                response = `--- ТЕХНОЛОГИЧЕСКИЙ СТЕК ---\r<br>` +
                           `  • ML & AI: PyTorch, Transformers, HuggingFace, OpenAI API<br>` +
                           `  • Big Data: Apache Kafka, Apache Spark, Airflow<br>` +
                           `  • Базы данных: ClickHouse, PostgreSQL, pgvector (Vector DB)<br>` +
                           `  • Бэкенд & Инфраструктура: Python (FastAPI), Docker, Kubernetes`;
                break;
            case 'clear':
                // Clear all outputs except the input row
                const outputs = termScreen.querySelectorAll('.term-output');
                outputs.forEach(node => node.remove());
                termScreen.scrollTop = termScreen.scrollHeight;
                return;
            default:
                response = `bash: команда не найдена: ${escapeHTML(cmd)}. Введите 'help' для получения списка команд.`;
                isError = true;
        }

        // Print response line
        const responseLine = document.createElement('div');
        responseLine.className = `term-output ${isError ? 'error' : ''}`;
        responseLine.innerHTML = response;
        termScreen.insertBefore(responseLine, inputRow);

        // Auto Scroll screen
        termScreen.scrollTop = termScreen.scrollHeight;
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
}

// Telemetry charts simulated updates
function startTelemetryUpdates() {
    const valCards = document.querySelectorAll('.tel-value');
    if (valCards.length < 3) return;

    setInterval(() => {
        // Fluctuate pipeline latency slightly: 1.7s to 2.1s
        const newVal = (Math.random() * (2.1 - 1.7) + 1.7).toFixed(1);
        valCards[0].innerText = `${newVal}s`;
    }, 4000);
}
