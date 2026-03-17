---
language:
  - ps
  - en
  - ur
license: apache-2.0
tags:
  - pashto
  - gguf
  - llama-cpp
  - lm-studio
  - apple-silicon
  - qwen2
  - text-generation
  - conversational
base_model: junaid008/qehwa-pashto-llm
model_name: Qehwa Pashto LLM GGUF
pipeline_tag: text-generation
---

# ☕ Qehwa Pashto LLM — GGUF (Q8_0)

**GGUF-quantized version of [Qehwa](https://huggingface.co/junaid008/qehwa-pashto-llm) — Pashto's first instruction-tuned LLM — optimized for macOS, LM Studio, and llama.cpp.**

| | |
|---|---|
| **Original Model** | [junaid008/qehwa-pashto-llm](https://huggingface.co/junaid008/qehwa-pashto-llm) |
| **Original Author** | [Junaid Khan](https://huggingface.co/junaid008) |
| **Base Architecture** | Qwen2.5-7B |
| **Quantization** | Q8_0 (~8GB) |
| **Format** | GGUF |
| **Compatibility** | llama.cpp, LM Studio, Ollama, GPT4All |

---

## 🌟 About the Original Model

Qehwa is the **first fully instruction-tuned Pashto LLM**, created by [Junaid Khan](https://huggingface.co/junaid008). It was built using a two-stage training pipeline:

1. **Continued Pre-Training (CPT)** — Trained on Pashto documents to learn the language deeply
2. **Supervised Fine-Tuning (SFT)** — Trained on high-quality Pashto instruction-response pairs

The model targets the **Peshawari/KPK dialect** of Pashto and can:
- ✅ Answer questions in Pashto
- ✅ Respond to English and Urdu instructions in Pashto
- ✅ Creative writing, poetry, and storytelling in Pashto
- ✅ Translation between Pashto, English, and Urdu

> All credit for the model training goes to **[Junaid Khan](https://huggingface.co/junaid008)**. This repository only provides the GGUF conversion for local inference.

---

## 📥 Download

### Using `hf` CLI
```bash
brew install hf
hf download hasnainayaz/qehwa-pashto-llm-gguf
```

### Using `huggingface-cli`
```bash
pip install huggingface-hub
huggingface-cli download hasnainayaz/qehwa-pashto-llm-gguf --local-dir ./qehwa-model
```

### Direct Download
Click the **Files** tab above to download `qehwa-q8_0.gguf` directly.

---

## 🧩 Usage

### LM Studio (Easiest)

1. Download [LM Studio](https://lmstudio.ai/)
2. Import the `qehwa-q8_0.gguf` file
3. Start chatting in Pashto!

### llama.cpp (CLI)

```bash
./llama-cli -m qehwa-q8_0.gguf -p "Below is an instruction in Pashto or English. Write a detailed response in Pashto.\n\n### Instruction:\nد پیښور تاریخ راته ووایه\n\n### Response:\n" -n 200
```

### llama-cpp-python (Python)

```python
from llama_cpp import Llama

llm = Llama(model_path="qehwa-q8_0.gguf", n_gpu_layers=-1)

output = llm(
    "Below is an instruction in Pashto or English. Write a detailed response in Pashto.\n\n"
    "### Instruction:\nد پیښور تاریخ راته ووایه\n\n### Response:\n",
    max_tokens=500,
    temperature=0.7,
    repeat_penalty=1.1,
    stop=["### Instruction:"],
)

print(output["choices"][0]["text"])
```

---

## 💬 Prompt Format

This model uses the **Alpaca prompt template**:

```
Below is an instruction in Pashto or English. Write a detailed response in Pashto.

### Instruction:
{your prompt here}

### Response:

```

### Example Prompts

| Language | Prompt |
|----------|--------|
| پښتو | `د پیښور تاریخ راته ووایه` |
| English | `Tell me about Pashtunwali` |
| اردو | `پشاور کے بارے میں بتاؤ` |

---

## 🖥️ Web UI

A modern chat interface is also available at:
👉 **[github.com/hasnainkhan8532/PashtoLLM](https://github.com/hasnainkhan8532/PashtoLLM)**

Built with Next.js, Shadcn/UI, Bahij Badiya font, and full RTL support for Pashto.

---

## ⚙️ Quantization Details

| Property | Value |
|----------|-------|
| Source format | SafeTensors (bfloat16) |
| Source size | ~15.2 GB |
| GGUF quant type | Q8_0 |
| GGUF size | ~8 GB |
| Conversion tool | llama.cpp `convert_hf_to_gguf.py` |

---

## 🙏 Credits

- **Model Author**: [Junaid Khan](https://huggingface.co/junaid008) — created and trained Qehwa Pashto LLM
- **Base Model**: [Qwen2.5-7B](https://huggingface.co/Qwen/Qwen2.5-7B) by Alibaba
- **GGUF Conversion & Web UI**: [Hasnain Ayaz](https://hasnainayaz.com)

---

## 📜 License

This GGUF conversion follows the license of the [original model](https://huggingface.co/junaid008/qehwa-pashto-llm). Please refer to the original repository for licensing terms.

---

<p align="center">
  <sub>GGUF conversion & Web UI by <a href="https://hasnainayaz.com">hasnainayaz.com</a></sub>
</p>
