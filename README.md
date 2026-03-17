# ☕ Qehwa — Pashto's First LLM (macOS Edition)

<p align="center">
  <strong>A GGUF-quantized version of Qehwa Pashto LLM with a modern web interface — optimized for Apple Silicon.</strong>
</p>

<p align="center">
  <a href="https://huggingface.co/junaid008/qehwa-pashto-llm">Original Model</a> ·
  <a href="#-quick-start">Quick Start</a> ·
  <a href="#-web-ui">Web UI</a> ·
  <a href="#-lm-studio">LM Studio</a>
</p>

---

## 🌟 About

This project makes [Qehwa](https://huggingface.co/junaid008/qehwa-pashto-llm) — Pashto's first instruction-tuned Large Language Model — accessible on **macOS** and **LM Studio** by converting it to the efficient GGUF format.

The original model was built by **[Junaid Khan](https://huggingface.co/junaid008)** using a two-stage training pipeline (CPT + SFT) on top of Qwen2.5-7B, targeting the Peshawari/KPK dialect of Pashto.

### What's in this repo

- 🧠 **GGUF Model** — Q8_0 quantized (~8GB), runs with Metal GPU acceleration
- 🖥️ **Web UI** — Modern chat interface built with Next.js and Shadcn/UI
- ⚡ **FastAPI Backend** — Serves the model locally via REST API
- 🍎 **Apple Silicon Ready** — Optimized for M1/M2/M3/M4 Macs

---

## 📥 Download the GGUF Model

The quantized GGUF model file is hosted separately due to its size (~8GB):

Download from HuggingFace:

```bash
pip install huggingface-hub
huggingface-cli download hasnainayaz/qehwa-pashto-llm-gguf --local-dir ./qehwa-model
```

Or download directly from: **[huggingface.co/hasnainayaz/qehwa-pashto-llm-gguf](https://huggingface.co/hasnainayaz/qehwa-pashto-llm-gguf)**

---

## 🚀 Quick Start

### Prerequisites
- macOS with Apple Silicon (M1/M2/M3/M4)
- Python 3.10+
- Node.js 18+

### 1. Clone & Setup

```bash
git clone https://github.com/hasnainkhan8532/PashtoLLM.git
cd PashtoLLM

# Create Python environment
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn llama-cpp-python

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Download the Model

Download `qehwa-q8_0.gguf` from the link above and place it in `qehwa-model/`.

### 3. Run

Open **two terminals**:

**Terminal 1 — Backend:**
```bash
source venv/bin/activate
python backend.py
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

### 4. Open

Go to **[http://localhost:3000](http://localhost:3000)** and start chatting in Pashto! 🎉

---

## 🖥️ Web UI

The web interface features:
- ✅ Clean, modern design with Shadcn/UI components
- ✅ Full **RTL** (Right-to-Left) support for Pashto text
- ✅ **Bahij Badiya** font for beautiful Pashto typography
- ✅ Quick prompt suggestions to get started
- ✅ Responsive layout for all screen sizes

### Example Prompts
| Language | Prompt |
|----------|--------|
| پښتو | `د پیښور تاریخ راته ووایه` |
| English | `Tell me about Pashtunwali` |
| اردو | `پشاور کے بارے میں بتاؤ` |

---

## 🧩 LM Studio

You can also use the GGUF model directly in **[LM Studio](https://lmstudio.ai/)**:

1. Download [LM Studio](https://lmstudio.ai/)
2. Import the `qehwa-q8_0.gguf` file
3. Select it and start chatting

No code needed — LM Studio handles everything with a built-in UI.

---

## 🏗️ Project Structure

```
pashtollm/
├── backend.py              # FastAPI server (model serving)
├── frontend/               # Next.js + Shadcn/UI chat interface
│   ├── app/
│   │   ├── page.tsx        # Main chat page
│   │   ├── layout.tsx      # Root layout
│   │   └── globals.css     # Styles + Bahij Badiya font
│   ├── components/ui/      # Shadcn/UI components
│   └── public/fonts/       # Bahij Badiya font files
├── qehwa-model/
│   └── qehwa-q8_0.gguf    # Quantized model (~8GB)
└── venv/                   # Python virtual environment
```

---

## 🙏 Credits

- **Original Model**: [Qehwa Pashto LLM](https://huggingface.co/junaid008/qehwa-pashto-llm) by **[Junaid Khan](https://huggingface.co/junaid008)**
  - Built on Qwen2.5-7B with CPT + SFT training pipeline
  - Trained on Pashto documents and instruction-response pairs
  - Targeting the Peshawari/KPK dialect
- **Base Model**: [Qwen2.5-7B](https://huggingface.co/Qwen/Qwen2.5-7B) by Alibaba
- **GGUF Conversion & Web UI**: [Hasnain Ayaz](https://hasnainayaz.com)
- **Font**: Bahij Badiya (Arabic/Pashto typography)

---

## 📜 License

This project follows the license of the [original Qehwa model](https://huggingface.co/junaid008/qehwa-pashto-llm). Please refer to the original repository for licensing details.

---

<p align="center">
  <sub>Designed by <a href="https://hasnainayaz.com">hasnainayaz.com</a></sub>
</p>
